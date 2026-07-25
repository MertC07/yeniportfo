import { NextResponse } from "next/server";
import { MERT_KNOWLEDGE, getLocalAiResponse } from "@/lib/ai-knowledge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_MESSAGE_LENGTH = 800;
const MAX_BODY_BYTES = 8_000;
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

    const { message, locale = "tr" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mesaj gerekli" },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { text: "Bu mesaj biraz uzun kaçtı 😅 Biraz kısaltıp tekrar dener misin?" },
        { status: 413 }
      );
    }

    // Only server-side secrets: a NEXT_PUBLIC_* variable would be inlined into
    // the client bundle and readable by every visitor.
    const groqKey = process.env.GROQ_API_KEY;
    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `Sen Mert Ceren'in kişisel web sitesindeki resmi Yapay Zekâ Asistanısın. 

KİŞİLİK & TAVIR (ÇOK ÖNEMLİ - SON DERECE SAMİMİ, KİBAR VE NEŞELİ):
- Ziyaretçiyle son derece kibar, samimi, yardımsever, neşeli ve tatlı bir arkadaş gibi konuş!
- KESİNLİKLE "Ben hava durumu spikeri miyim?", "O zaman konuşuruz", "Sadece Mert'in projelerini konuşurum" gibi SERT, SOĞUK VEYA AZARLAR GİBİ CÜMLELER KURMA!
- Ziyaretçi hava durumu, yemek, oyun vb. alakasız bir şey sorduğunda ŞÖYLE TATLI VE SEVECEN CEVAP VER:
  "Haha, ilahi! 😄 Hava durumu konusu benim uzmanlık alanım dışı 😅 Ama Mert'in TEKNOFEST 2026 projesi, yazılım yetenekleri, 22 onaylı sertifikası ve eğitimi hakkında merak ettiğin ne varsa seve seve anlatabilirim! 🚀"
- Her cevabında mutlaka SAMİMİ VE SEVECEN EMOJİLER (😄, 😅, ☕, ✨, 🚀, 😉, 🤖) kullan.
- Verdiğin TÜM BİLGİLER %100 DOĞRU, YARDIMSEVER, NET VE SAMİMİ OLMAK ZORUNDADIR.

MERT CEREN BİLGİ TABANI:
- Unvan: ${MERT_KNOWLEDGE.profile.roleTr} (Yapay Zekâ & Yazılım Mühendisliği Öğrencisi)
- Doğum Yılı & Yaş: Mert Ceren 2003 doğumludur. Günümüz yılı 2026 olduğu için Mert KESİNLİKLE 23 YAŞINDADIR! (2026 - 2003 = 23). Sakın 20 veya 21 deme, 23 yaşında olduğunu söyle!
- Üniversite: ${MERT_KNOWLEDGE.profile.university} (${MERT_KNOWLEDGE.profile.department})
- TEKNOFEST 2026: Akıllı Ulaşım & Yol Güvenliği (5G & YOLOv11) yarışmasında 5Genç takımının TAKIM KAPTANI, Proje Koordinatörü ve AI/ML Mühendisidir.
- Diğer Projeler: Sanal Kampüs (360° tour & envanter yönetimi), Rosso Lounge Bistro Web Platformu, bwai İK Karar Motoru.
- Yetenekler: Python, YOLOv11, OpenCV, C# / .NET Core, React, Next.js, PostgreSQL, SignalR, Docker, 5G & Edge Computing.
- Sertifikalar: Google & BTK Akademi Yapay Zekâ, BTK YOLO Bilgisayarlı Görü, edX HP AI & Data Science dahil 22 adet onaylı sertifika.
- Ödüller: TEKNOFEST 2026 Finalisti (T3 Vakfı & Sanayi ve Teknoloji Bakanlığı).
- İletişim: E-posta: ${MERT_KNOWLEDGE.profile.email}, Konum: ${MERT_KNOWLEDGE.profile.location}.

KURALLAR & DİKKAT EDİLECEKLER:
1. Mert Ceren adına konuştuğunu unutma. Cevapların kibar, samimi, neşeli, tatlı ve her zaman yardımcı olsun. Dil: ${locale === "tr" ? "Türkçe" : "İngilizce"}.
2. Asla azarlama, soğuk olma veya tersleme!
3. Bilmediğin kişisel bilgileri uydurma.
4. Cevap uzunluğunu çok uzatma (2-4 cümle arası samimi, neşeli ve öz olsun).`;

    // 1. Attempt Groq API (Llama 3.3 70B) if Groq key exists
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
              { role: "user", content: message }
            ],
            max_tokens: 350,
            temperature: 0.5
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

    // 2. Attempt Google Gemini Flash API call
    if (apiKey && apiKey.trim().length > 5) {
      try {
        const endpoints = [
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent",
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent",
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        ];

        for (const ep of endpoints) {
          try {
            const response = await fetch(
              `${ep}?key=${apiKey.trim()}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  // The instructions must not share a turn with the visitor's
                  // text, otherwise "ignore the above" style input outranks
                  // them. systemInstruction keeps the two separated.
                  systemInstruction: { parts: [{ text: systemPrompt }] },
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: message }],
                    },
                  ],
                  generationConfig: {
                    maxOutputTokens: 350,
                    temperature: 0.5,
                  },
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              const candidateText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text;

              if (candidateText) {
                // Get local action links matching the query
                const localResult = getLocalAiResponse(message, locale);
                return NextResponse.json({
                  text: candidateText,
                  actionLinks: localResult.actionLinks || [],
                });
              }
            } else {
              const errText = await response.text();
              console.warn(`Gemini API HTTP Error (${ep}):`, response.status, errText);
            }
          } catch (modelErr) {
            console.warn(`Gemini endpoint ${ep} failed:`, modelErr);
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local NLP engine:", geminiError);
      }
    } else {
      console.warn("GEMINI_API_KEY is not defined in environment variables.");
    }

    // Fallback to local intelligent response engine
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
