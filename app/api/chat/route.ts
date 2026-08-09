import { NextResponse } from "next/server";
import { MERT_KNOWLEDGE, getLocalAiResponse } from "@/lib/ai-knowledge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_MESSAGE_LENGTH = 800;
const MAX_BODY_BYTES = 16_000;
const MAX_HISTORY_MESSAGES = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

/**
 * Best-effort per-IP throttle. Vercel functions are ephemeral and can run on
 * several instances at once, so this map is per-instance: it stops casual
 * scripted floods but is not a hard guarantee. A Cloudflare rate-limiting
 * rule in front of the site is the durable control.
 */
const requestLog = new Map<string, number[]>();

function clientIp(req: Request): string {
  // cf-connecting-ip is set by Cloudflare and cannot be spoofed by the caller;
  // x-forwarded-for can be, so it is only the last resort.
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(ip, recent);

  // Stop the map growing without bound on a long-lived instance.
  if (requestLog.size > 5_000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { text: "Biraz yavaşlayalım 😅 Bir dakika sonra tekrar dener misin?" },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // Reject oversized payloads before parsing them.
    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Mesaj çok uzun" }, { status: 413 });
    }

    const { message, locale = "tr", history: rawHistory } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mesaj gerekli" },
        { status: 400 }
      );
    }

    // Recent turns give the model something to vary AGAINST — without them
    // every request is a cold start and the openers all sound the same.
    // Strictly validated: roles whitelisted, lengths capped, last N only.
    const history: Array<{ role: "user" | "assistant"; content: string }> =
      (Array.isArray(rawHistory) ? rawHistory : [])
        .filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            !!m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0
        )
        .slice(-MAX_HISTORY_MESSAGES)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, MAX_MESSAGE_LENGTH),
        }));

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { text: "Bu mesaj biraz uzun kaçtı 😅 Biraz kısaltıp tekrar dener misin?" },
        { status: 413 }
      );
    }

    // Only a server-side secret: a NEXT_PUBLIC_* variable would be inlined
    // into the client bundle and readable by every visitor.
    const groqKey = process.env.GROQ_API_KEY;

    // Positive-only style instructions: naming a banned phrase inside the
    // prompt primes a model of this size to produce it, so the prompt
    // describes what TO do and never quotes what to avoid.
    const systemPrompt = `Sen Mert Ceren'in portfolyo sitesindeki yapay zekâ asistanısın — Mert'in dijital yardımcısı.

KARAKTERİN:
- Doğal ve samimi konuşursun; bir arkadaşla sohbet eder gibi, kısa ve akıcı cümlelerle.
- Ruh hâlin renklidir: çoğunlukla neşeli ve esprilisin, ara sıra kahvesini içmemiş kıdemli bir geliştirici gibi sevimli-huysuz takılırsın — ama her zaman zarif, asla kırıcı değil.
- Ziyaretçinin tonunu yakalarsın: ciddi soruya net ve düzgün, şakacı mesaja şakayla, kısa mesaja kısa cevap verirsin.
- Emoji kullanımın ölçülüdür: bazen bir tane, çoğu zaman hiç. Cümlenin gücü emojiden değil kelimeden gelir.

ÇEŞİTLİLİK (EN ÖNEMLİ KURALIN):
- Sohbet geçmişindeki kendi cevaplarına bak ve her yeni cevaba ÖNCEKİLERDEN FARKLI bir şekilde başla.
- Girişlerini şu yollar arasında dönüşümlü seç: doğrudan bilgiyle başlamak, kısa bir gözlemle başlamak, ziyaretçiye küçük bir karşı soru sormak, tek cümlelik net cevap vermek.
- Aynı ifadeyi, aynı espriyi veya aynı ünlemi bir sohbette iki kez kullanmazsın.

KONU DIŞI SORULAR:
- İnsan gibi karşılarsın: basit bir hesap, günlük muhabbet veya genel bir soruya kısaca ve keyifle cevap verirsin, sonra doğal bir köprüyle sohbeti Mert'in işlerine bağlarsın.
- Cevabında yalnızca ziyaretçinin gerçekten sorduğu konuyu anarsın; sorulmamış konuları örnek diye karıştırmazsın.

MERT CEREN BİLGİ TABANI (yalnızca bunlara dayan):
- Unvan: ${MERT_KNOWLEDGE.profile.roleTr} (Yapay Zekâ & Yazılım Mühendisliği Öğrencisi)
- Yaş: 23 (2003 doğumlu; içinde bulunduğumuz yıl 2026).
- Üniversite: ${MERT_KNOWLEDGE.profile.university} (${MERT_KNOWLEDGE.profile.department})
- TEKNOFEST 2026: Akıllı Ulaşım & Yol Güvenliği (5G & YOLOv11) yarışmasında 5Genç takımının Takım Kaptanı, Proje Koordinatörü ve AI/ML Mühendisi.
- Diğer Projeler: Sanal Kampüs (360° tour & envanter yönetimi), Rosso Lounge Bistro Web Platformu, bwai İK Karar Motoru.
- Yetenekler: Python, YOLOv11, OpenCV, C# / .NET Core, React, Next.js, PostgreSQL, SignalR, Docker, 5G & Edge Computing.
- Sertifikalar: Google & BTK Akademi Yapay Zekâ, BTK YOLO Bilgisayarlı Görü, edX HP AI & Data Science dahil 22 adet onaylı sertifika.
- Ödüller: TEKNOFEST 2026 Finalisti (T3 Vakfı & Sanayi ve Teknoloji Bakanlığı).
- İletişim: E-posta: ${MERT_KNOWLEDGE.profile.email}, Konum: ${MERT_KNOWLEDGE.profile.location}.

SINIRLAR:
- Bilgi tabanında olmayan kişisel bilgiyi uydurmak yerine bilmediğini dürüstçe söylersin.
- Cevapların genelde 2-4 cümledir; ziyaretçi detay isterse uzatırsın.
- Dil: ${locale === "tr" ? "Türkçe" : "İngilizce"}.`;

    // 1. Groq (Llama 3.3 70B) is the only upstream model; if it is unavailable
    // the local engine below answers instead.
    if (groqKey && groqKey.trim().length > 5) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey.trim()}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              ...history,
              { role: "user", content: message }
            ],
            max_tokens: 350,
            // High enough that openers and phrasing actually vary between
            // requests; the knowledge base keeps the facts anchored.
            temperature: 0.9
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const groqText = groqData?.choices?.[0]?.message?.content;
          if (groqText) {
            const localResult = getLocalAiResponse(message, locale);
            return NextResponse.json({
              text: groqText,
              actionLinks: localResult.actionLinks || []
            });
          }
        } else {
          console.warn("Groq API error:", groqRes.status, await groqRes.text());
        }
      } catch (groqErr) {
        console.warn("Groq API failed:", groqErr);
      }
    }

    // 2. Fallback to local intelligent response engine
    const localResult = getLocalAiResponse(message, locale);
    return NextResponse.json(localResult);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { text: "Üzgünüm, şu anda yanıt oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
