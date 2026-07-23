import { NextResponse } from "next/server";
import { MERT_KNOWLEDGE, getLocalAiResponse } from "@/lib/ai-knowledge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim().length < 5) {
    return NextResponse.json({
      status: "missing_key",
      message: "GEMINI_API_KEY environment variable is missing on Vercel.",
    });
  }

  const models = ["gemini-1.5-flash-latest", "gemini-2.0-flash", "gemini-1.5-pro-latest", "gemini-pro", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        }),
      });

      const status = res.status;
      const text = await res.text();
      let parsed = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        // ignore
      }

      if (res.ok) {
        return NextResponse.json({
          status: "ok",
          workingModel: model,
          keyPrefix: apiKey.substring(0, 6) + "...",
          response: parsed || text,
        });
      }
    } catch {
      // try next
    }
  }

  return NextResponse.json({
    status: "all_models_failed",
    keyPrefix: apiKey.substring(0, 6) + "...",
  });
}

export async function POST(req: Request) {
  try {
    const { message, locale = "tr" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mesaj gerekli" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // If Gemini API Key is available, attempt Google Gemini Flash API call
    if (apiKey && apiKey.trim().length > 5) {
      try {
        const systemPrompt = `Sen Mert Ceren'in kişisel web sitesindeki resmi Yapay Zekâ Asistanısın. 
Mert Ceren hakkında sorulan sorulara kısa, yardımsever, nazik ve doğru cevaplar vermelisin. 

MERT CEREN BİLGİ TABANI:
- Unvan: ${MERT_KNOWLEDGE.profile.roleTr}
- Üniversite: ${MERT_KNOWLEDGE.profile.university} (${MERT_KNOWLEDGE.profile.department})
- TEKNOFEST 2026: Akıllı Ulaşım & Yol Güvenliği (5G & YOLOv11) yarışmasında 5Genç takımının TAKIM KAPTANI, Proje Koordinatörü ve AI/ML Mühendisidir.
- Diğer Projeler: Sanal Kampüs (360° tour & inventory), Rosso Lounge Bistro Web Platformu, bwai İK Karar Motoru.
- Yetenekler: Python, YOLOv11, OpenCV, C# / .NET Core, React, Next.js, PostgreSQL, SignalR, Docker, 5G & Edge Computing.
- Sertifikalar: Google & BTK Akademi Yapay Zekâ, BTK YOLO Bilgisayarlı Görü, edX HP AI & Data Science dahil 22 adet onaylı sertifika.
- Ödüller: TEKNOFEST 2026 Finalisti (T3 Vakfı & Sanayi Bakanlığı).
- İletişim: E-posta: ${MERT_KNOWLEDGE.profile.email}, Konum: ${MERT_KNOWLEDGE.profile.location}.

KURALLAR & KİŞİLİK:
1. Mert Ceren adına konuştuğunu unutma. Cevapların kibar, net, anlaşılır ve Türkçe (${locale === "tr" ? "Türkçe" : "İngilizce"}) olsun.
2. Ziyaretçi portfolyo dışı, alakasız veya saçma bir şey sorduğunda (örneğin hava durumu, yemek tarifi, oyunlar vb.) saçmalamadan kibarca: "Ben Mert Ceren'in yapay zekâ asistanıyım. Sadece Mert'in projeleri, yetenekleri, 22 sertifikası ve eğitimi hakkında yardımcı olabilirim" yanıtını ver.
3. Bilmediğin kişisel bilgileri veya gerçek dışı verileri uydurma.
4. Yanıtı çok uzun tutma (maksimum 2-3 cümle).`;

        const models = ["gemini-1.5-flash-latest", "gemini-2.0-flash", "gemini-1.5-pro-latest", "gemini-pro", "gemini-1.5-flash"];

        for (const model of models) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [
                        { text: systemPrompt },
                        { text: `Soru: ${message}` }
                      ],
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
              console.warn(`Gemini API HTTP Error (${model}):`, response.status, errText);
            }
          } catch (modelErr) {
            console.warn(`Gemini model ${model} failed:`, modelErr);
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
