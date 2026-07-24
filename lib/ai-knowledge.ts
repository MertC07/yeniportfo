/**
 * Knowledge Base & Local Smart Response Engine for Mert Ceren AI Assistant
 */

export type ActionLink = {
  label: string;
  href: string;
  isAnchor?: boolean;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
  actionLinks?: ActionLink[];
  timestamp: string;
};

export const MERT_KNOWLEDGE = {
  profile: {
    name: "Mert Ceren",
    roleTr: "Yapay Zekâ & Yazılım Mühendisliği Öğrencisi",
    roleEn: "AI & Software Engineering Student",
    university: "Bandırma Onyedi Eylül Üniversitesi (BANÜ)",
    department: "Yazılım Mühendisliği (B.Sc. 2024 - 2028)",
    prepSchool: "İsteğe Bağlı İngilizce Hazırlık Programı (2023 - 2024)",
    highSchool: "Eyüpsultan Anadolu Lisesi (Sayısal, 2018 - 2022)",
    location: "İstanbul / Bandırma, Türkiye",
    email: "mertceren.2003.mc@gmail.com",
    github: "https://github.com/MertC07",
    linkedin: "https://linkedin.com/in/mertceren",
    status: "Staj ve freelance iş birliklerine açık",
  },
  projects: [
    {
      title: "Akıllı Yol Güvenliği (TEKNOFEST 2026)",
      role: "Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisi",
      team: "5Genç",
      category: "Yapay Zekâ & 5G Haberleşme",
      tech: ["Python", "YOLOv11", "Bilgisayarlı Görü", "5G Edge"],
      summary:
        "5G bağlantısını gerçek zamanlı bilgisayarlı görüyle buluşturan akıllı yol güvenliği sistemi. Destekli ve otonom sürüş senaryoları için Python'da eğitilen YOLO tabanlı nesne tespit modelleri. TEKNOFEST 2026 için 5Genç takımı bünyesinde geliştiriliyor.",
      href: "/work/smart-road-safety",
    },
    {
      title: "Sanal Kampüs (Virtual Campus)",
      role: "Yazılım Mühendisliği Öğrencisi",
      category: "Eğitim Teknolojisi & 360° Web Platformu",
      tech: ["React", "Photo Sphere Viewer", "Leaflet", "Express", "PostgreSQL"],
      summary:
        "Ziyaretçiler için 360° panoramik sanal kampüs turu ve üniversite idaresi için oda tabanlı envanter yönetim sistemi. İki bağımsız ihtiyacı PostgreSQL üzerinde tek bir veri şemasında birleştiren platform.",
      href: "/work/virtual-campus",
    },
    {
      title: "Rosso Lounge Bistro Web Platformu",
      role: "Yazılım Mühendisliği Öğrencisi",
      category: "İşletme & Web Platformu",
      tech: ["React", ".NET Core", "SQL Server", "TailwindCSS"],
      summary:
        "Rosso Lounge Bistro için özel geliştirilen dinamik dijital menü, rezervasyon yönetimi ve yönetim paneli çözümü.",
      href: "/work/rosso-lounge",
    },
  ],
  openSourceRepos: [
    { name: "bwai-IK-Karar-Motoru", desc: "İnsan Kaynakları Karar Destek Motoru (Python / Yapay Zekâ)", href: "https://github.com/MertC07/bwai-IK-Karar-Motoru" },
    { name: "RossoLoungeWeb", desc: "Rosso Lounge Bistro Web Platformu Kaynak Kodları", href: "https://github.com/MertC07/RossoLoungeWeb" },
    { name: "yeniportfo", desc: "Mert Ceren Kişisel Portfolyo Web Uygulaması", href: "https://github.com/MertC07/yeniportfo" },
  ],
  skills: {
    languages: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
    ai: ["YOLOv8 / YOLOv11", "Bilgisayarlı Görü (OpenCV)", "Model Eğitimi & Optimizasyonu", "Prompt Mühendisliği"],
    backend: [".NET Core / ASP.NET", "Node.js / Express", "PostgreSQL", "SignalR"],
    frontend: ["React", "Next.js", "TailwindCSS", "Photo Sphere Viewer (360°)"],
    tools: ["Git & GitHub", "Docker", "Linux", "5G & Edge Computing"],
  },
  certificatesCount: 22,
  awards: [
    { title: "TEKNOFEST 2026 Finalisti", issuer: "T3 Vakfı & Sanayi ve Teknoloji Bakanlığı", year: "2026", project: "5G & Yapay Zeka ile Akıllı Yol Güvenliği" },
  ],
  testimonials: [
    { name: "Dr. Kadir C.", role: "BANÜ Yazılım Mühendisliği Öğretim Üyesi", text: "Mert, teorik yazılım prensiplerini gerçek dünya problemlerine aktarmada ve yapay zekâ uygulamalarında olağanüstü bir pratik zekaya sahip." },
    { name: "Hasan K.", role: "İşletme Sahibi, Rosso Lounge Bistro", text: "Rosso Lounge Bistro platformu için Mert ile çalışmak olağanüstüydü. İhtiyaçlarımızı yönetimi kolaylaştıran özel bir panele dönüştürerek bize saatlerce zaman kazandırdı." },
  ],
};

/**
 * Fast Local Response Engine with 100% comprehensive coverage of all portfolio sections
 */
export function getLocalAiResponse(query: string, locale: "tr" | "en" = "tr"): { text: string; actionLinks?: ActionLink[] } {
  const q = query.toLowerCase().trim();

  // 1. ÖDÜLLER & DERECELER (Awards & Honors)
  if (
    q.includes("ödül") ||
    q.includes("derece") ||
    q.includes("yarısm") ||
    q.includes("yarışm") ||
    q.includes("başarı") ||
    q.includes("finalist") ||
    q.includes("t3") ||
    q.includes("award") ||
    q.includes("honor")
  ) {
    if (locale === "tr") {
      return {
        text: "🏆 **Ödüller & Dereceler (Zaten TEKNOFEST finale kalmışız, daha ne olsun!)**:\n\n• **TEKNOFEST 2026 Finalisti** — *T3 Vakfı & Sanayi ve Teknoloji Bakanlığı*\n  **Proje**: 5G & Yapay Zekâ ile Akıllı Yol Güvenliği (5Genç Takım Kaptanı)\n\nMert Ceren ve takımı 5Genç, 5G ve YOLOv11 tabanlı Akıllı Yol Güvenliği projesiyle TEKNOFEST 2026'da finale yükselmiştir. Ben burada kare sayarken onlar ödül topluyor 🤖",
        actionLinks: [
          { label: "Ödüller Bölümüne Git 🏆", href: "#awards", isAnchor: true },
          { label: "Seçilmiş Projeler Bölümüne Git 🚀", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "🏆 **Awards & Honors Summary**:\n\n• **TEKNOFEST 2026 Finalist** — *T3 Foundation & Ministry of Industry and Technology*\n  **Project**: 5G & AI Smart Road Safety (Team 5Genç Captain)",
        actionLinks: [
          { label: "Jump to Awards Section 🏆", href: "#awards", isAnchor: true },
          { label: "Jump to Projects Section 🚀", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // 2. GITHUB & AÇIK KAYNAK PROJELER (GitHub & Open Source)
  if (
    q.includes("github") ||
    q.includes("repo") ||
    q.includes("kod") ||
    q.includes("open source") ||
    q.includes("açık kaynak") ||
    q.includes("git")
  ) {
    if (locale === "tr") {
      return {
        text: "🐙 **GitHub & Açık Kaynak Repoları (Kodları aşındırmadan incele bakalım!)**:\n\nResmi GitHub profili: `github.com/MertC07`\n\nÖne çıkan açık kaynak repoları:\n1. 🤖 **bwai-IK-Karar-Motoru** — İnsan Kaynakları Karar Destek Motoru (Python / Yapay Zekâ)\n2. 🍷 **RossoLoungeWeb** — Rosso Lounge Bistro Web Platformu Kaynak Kodları\n3. 💻 **yeniportfo** — Şu an baktığın bu güzel portfolyonun kaynak kodları!",
        actionLinks: [
          { label: "GitHub Repolarına Git 🐙", href: "#github", isAnchor: true },
          { label: "GitHub Profilini Aç ↗", href: "https://github.com/MertC07" },
        ],
      };
    } else {
      return {
        text: "🐙 **GitHub & Open Source Repositories**:\n\nOfficial GitHub Profile: `github.com/MertC07`\n\nFeatured open-source repositories:\n1. 🤖 **bwai-IK-Karar-Motoru** — HR Decision Support Engine (Python / AI)\n2. 🍷 **RossoLoungeWeb** — Rosso Lounge Bistro Web Platform\n3. 💻 **yeniportfo** — Personal Portfolio Web App",
        actionLinks: [
          { label: "Jump to GitHub Section 🐙", href: "#github", isAnchor: true },
          { label: "Open GitHub Profile ↗", href: "https://github.com/MertC07" },
        ],
      };
    }
  }

  // 3. REFERANSLAR & TAVSİYELER (Testimonials)
  if (
    q.includes("referans") ||
    q.includes("tavsiye") ||
    q.includes("görüş") ||
    q.includes("yorum") ||
    q.includes("değerlendirme") ||
    q.includes("kadir") ||
    q.includes("hasan")
  ) {
    if (locale === "tr") {
      return {
        text: "💬 **Referanslar & Görüşler (Hocalarımız ve müşterilerimiz sağ olsun bizi pek övmüş!)**:\n\n• **Dr. Kadir C.** *(BANÜ Yazılım Mühendisliği Öğretim Üyesi)*:\n  *'Mert, teorik yazılım prensiplerini gerçek dünya problemlerine aktarmada ve yapay zekâ uygulamalarında olağanüstü bir pratik zekaya sahip.'*\n\n• **Hasan K.** *(İşletme Sahibi, Rosso Lounge Bistro)*:\n  *'Rosso Lounge Bistro platformu için Mert ile çalışmak olağanüstüydü. İhtiyaçlarımızı özel bir panele dönüştürerek bize saatlerce zaman kazandırdı.'*",
        actionLinks: [
          { label: "Referanslar Bölümüne Git 💬", href: "#testimonials", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "💬 **Testimonials & Recommendations**:\n\n• **Dr. Kadir C.** *(BANÜ Software Engineering Faculty)*: Praised Mert's practical intelligence in AI applications.\n• **Hasan K.** *(Owner, Rosso Lounge Bistro)*: Praised the custom web platform and management dashboard built by Mert.",
        actionLinks: [
          { label: "Jump to Testimonials 💬", href: "#testimonials", isAnchor: true },
        ],
      };
    }
  }

  // 5. İLETİŞİM, E-POSTA, CV & ÖZGEÇMİŞ
  if (
    q.includes("iletişim") ||
    q.includes("konuş") ||
    q.includes("ulaş") ||
    q.includes("görüş") ||
    q.includes("mesaj") ||
    q.includes("mail") ||
    q.includes("eposta") ||
    q.includes("email") ||
    q.includes("cv") ||
    q.includes("özgeçmiş") ||
    q.includes("staj") ||
    q.includes("iş") ||
    q.includes("freelance") ||
    q.includes("indir")
  ) {
    if (locale === "tr") {
      return {
        text: "✉️ **İletişim & CV (Staj veya proje teklifin varsa çabuk yaz, kahvem soğuyor!)**:\n\n• **E-posta**: `mertceren.2003.mc@gmail.com`\n• **Lokasyon**: İstanbul / Bandırma, Türkiye\n• **İş Birlikleri**: Staj ve freelance proje tekliflerine sonuna kadar açık!\n• **Özgeçmiş (CV)**: Sayfadan 1 tıkla önizleyip PDF indirebilirsin.",
        actionLinks: [
          { label: "Özgeçmişi İncele & İndir (PDF) 📄", href: "#contact", isAnchor: true },
          { label: "İletişim Bölümüne Git ✉️", href: "#contact", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "✉️ **Contact & Resume (CV)**:\n\n• **Email**: `mertceren.2003.mc@gmail.com`\n• **Location**: Istanbul / Bandirma, Turkey\n• **Status**: Open for internships & freelance work!\n• **CV**: Available for 1-click full screen preview and PDF download.",
        actionLinks: [
          { label: "Preview & Download Resume (PDF) 📄", href: "#contact", isAnchor: true },
        ],
      };
    }
  }

  // 6. TEKNOFEST & YOL GÜVENLİĞİ & 5GENÇ
  if (
    q.includes("teknofest") ||
    q.includes("yol güvenliği") ||
    q.includes("5genç") ||
    q.includes("yolo") ||
    q.includes("kaptan")
  ) {
    if (locale === "tr") {
      return {
        text: "🚀 **TEKNOFEST 2026 (Kaptan Mert ve 5Genç iş başında!)**:\n\n• **Takım**: 5Genç\n• **Mert'in Rolü**: Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisi\n• **Teknolojiler**: Python, YOLOv11, OpenCV, 5G Edge Computing\n\n5G ile entegre otonom sürüş için YOLOv11 kareleri sayıyoruz. Ben de arkada nöronlarımı eritiyorum işte 🤖",
        actionLinks: [
          { label: "Seçilmiş Projeler Bölümüne Git 🚀", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "🚀 **TEKNOFEST 2026 Smart Road Safety Project Summary**:\n\n• **Team**: 5Genç\n• **Mert's Role**: Team Captain, Project Coordinator & AI/ML Engineer\n• **Tech**: Python, YOLOv11, Computer Vision, 5G Edge\n\nDeveloping real-time YOLOv11 object detection models integrated with 5G edge communication for assisted and autonomous driving scenarios.",
        actionLinks: [
          { label: "Jump to Projects Section 🚀", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // 7. SERTİFİKALAR & BELGELER
  if (
    q.includes("sertifika") ||
    q.includes("certificate") ||
    q.includes("btk") ||
    q.includes("edx") ||
    q.includes("udemy") ||
    q.includes("belge")
  ) {
    if (locale === "tr") {
      return {
        text: "📜 **Sertifikalar (Tam 22 tane sertifika toplanmış, koyacak yer kalmadı!)**:\n\nMert Ceren'in yapay zekâ ve yazılım alanında **22 adet onaylı sertifikası** var.\n\n• **Google & BTK Akademi**: Uygulamalı Yapay Zekâ Eğitimi\n• **BTK Akademi**: Bilgisayarlı Görü ve YOLO\n• **edX & HP**: Generative AI for Games Development",
        actionLinks: [
          { label: "Sertifikalar Galerisini Aç (22) 📜", href: "#certificates", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "📜 **Certificates Summary**:\n\nMert Ceren holds **22 verified professional certificates** in AI, Computer Vision, and Software Engineering.\n\nKey credentials include Google & BTK Applied AI, BTK YOLO Computer Vision, and edX HP AI & Data Science.",
        actionLinks: [
          { label: "Open Certificates Gallery (22) 📜", href: "#certificates", isAnchor: true },
        ],
      };
    }
  }

  // 8. PROJELER (TEKNOFEST, Sanal Kampüs, Rosso Lounge, bwai İK)
  if (
    q.includes("proje") ||
    q.includes("project") ||
    q.includes("sanal kampüs") ||
    q.includes("rosso") ||
    q.includes("ik karar") ||
    q.includes("işler")
  ) {
    if (locale === "tr") {
      return {
        text: "💻 **Projeler (Hangi birini anlatsam ki, say sayfayı bitiremezsin!)**:\n\n1. 🚦 **Akıllı Yol Güvenliği (TEKNOFEST 2026)** — 5G & YOLOv11 ile Otonom Sürüş Desteği (5Genç Takım Kaptanı)\n2. 🏫 **Sanal Kampüs** — 360° Panoramik Sanal Tur & İdare Envanter Yönetim Platformu\n3. 🍷 **Rosso Lounge Bistro** — Özel Yönetim Panelli Web Platformu & Menü Sistemi\n4. 🤖 **bwai İK Karar Motoru** — Açık kaynak yapay zekâ İK karar destek motoru",
        actionLinks: [
          { label: "Seçilmiş Projeler Bölümünü Gör 🚀", href: "#work", isAnchor: true },
          { label: "GitHub Repolarını İncele ↗", href: "#github", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "💻 **Featured Projects Summary**:\n\n1. 🚦 **Smart Road Safety (TEKNOFEST 2026)** — 5G & YOLOv11 (Team 5Genç Captain)\n2. 🏫 **Virtual Campus** — 360° Panoramic Tour & Inventory Platform\n3. 🍷 **Rosso Lounge Bistro** — Web platform & custom management panel",
        actionLinks: [
          { label: "Jump to Projects Section 🚀", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // 9. YETENEKLER & TEKNOLOJİ STACK (Python, C#, React, Next.js, YOLO)
  if (
    q.includes("yetenek") ||
    q.includes("skill") ||
    q.includes("dil") ||
    q.includes("tech") ||
    q.includes("python") ||
    q.includes("c#") ||
    q.includes("react") ||
    q.includes("stack") ||
    q.includes("teknoloji") ||
    q.includes("yazılım")
  ) {
    if (locale === "tr") {
      return {
        text: "🛠️ **Yetenekler (C#, Python, YOLO, React... Ne ararsan var!)**:\n\n• **Yapay Zekâ & Görü**: Python, YOLOv8/v11, OpenCV, PyTorch, Model Optimizasyonu\n• **Backend Servisleri**: C# / .NET Core, Node.js / Express, PostgreSQL, SignalR\n• **Frontend & Web**: React, Next.js, TypeScript, TailwindCSS, Photo Sphere Viewer (360°)\n• **Geliştirme Araçları**: Git & GitHub, Docker, Linux, 5G & Edge Computing",
        actionLinks: [
          { label: "Yetenekler & Stack Bölümünü Gör 🛠️", href: "#skills", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "🛠️ **Tech Stack Summary**:\n\n• **AI & Computer Vision**: Python, YOLOv8/v11, OpenCV, PyTorch\n• **Backend**: C# / .NET Core, Node.js / Express, PostgreSQL, SignalR\n• **Frontend**: React, Next.js, TypeScript, TailwindCSS\n• **Tools**: Git, Docker, Linux, 5G & Edge",
        actionLinks: [
          { label: "Jump to Skills Section 🛠️", href: "#skills", isAnchor: true },
        ],
      };
    }
  }

  // 10. EĞİTİM & ÜNİVERSİTE & LİSE
  if (
    q.includes("okul") ||
    q.includes("üniversite") ||
    q.includes("öğrenci") ||
    q.includes("banü") ||
    q.includes("bandırma") ||
    q.includes("lise") ||
    q.includes("hazırlık") ||
    q.includes("eğitim")
  ) {
    if (locale === "tr") {
      return {
        text: "🎓 **Eğitim (Bandırma Onyedi Eylül Üni - Yazılım Mühendisliği)**:\n\nMert şu an BANÜ Yazılım Mühendisliği öğrencisi. Ben de burada sorularına cevap yetiştiriyorum işte ☕\n\n• **Lisans**: BANÜ Yazılım Mühendisliği (2024 - 2028)\n• **Hazırlık**: BANÜ İsteğe Bağlı İngilizce Hazırlık (2023 - 2024)\n• **Lise**: Eyüpsultan Anadolu Lisesi (2018 - 2022)",
        actionLinks: [
          { label: "Zaman Çizelgesinde Detaylı Gör ↗", href: "#about", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "🎓 **Education Summary**:\n\n• **Degree**: Bandırma Onyedi Eylül University (BANÜ) — B.Sc. Software Engineering (2024 - 2028)\n• **Prep School**: 1-Year Optional English Prep Program (2023 - 2024)",
        actionLinks: [
          { label: "View Timeline ↗", href: "#about", isAnchor: true },
        ],
      };
    }
  }

  // 11. SELAMLAMA & GENEL SORULAR
  if (
    q.includes("merhaba") ||
    q.includes("selam") ||
    q.includes("sa") ||
    q.includes("hey") ||
    q.includes("günaydın") ||
    q.includes("iyi günler")
  ) {
    if (locale === "tr") {
      return {
        text: "Selam! 👋 Ben Mert Ceren'in yapay zekâ asistanıyım. Tam kod yazarken araya girdin ama neyse... ☕\n\nMert Ceren; Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisi, TEKNOFEST 2026 **5Genç** Takım Kaptanı ve yapay zekâ geliştiricisidir.\n\nSöyle bakalım, projeleri mi, 22 sertifikayı mı yoksa iletişim bilgilerini mi merak ediyorsun?",
        actionLinks: [
          { label: "Seçilmiş Projeler 🚀", href: "#work", isAnchor: true },
          { label: "Ödüller & Dereceler 🏆", href: "#awards", isAnchor: true },
          { label: "GitHub Repoları 🐙", href: "#github", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Hello! 👋 I am Mert Ceren's AI assistant.\n\nMert is a Software Engineering Student at BANÜ, Team Captain for TEKNOFEST 2026 (Team 5Genç), and an AI developer.\n\nHow can I help you regarding his projects, awards, GitHub repos, skills, or certifications?",
        actionLinks: [
          { label: "Featured Projects 🚀", href: "#work", isAnchor: true },
          { label: "Awards & Honors 🏆", href: "#awards", isAnchor: true },
        ],
      };
    }
  }

  // 12. BİYOGRAFİ & KİMDİR
  if (
    q.includes("kimdir") ||
    q.includes("kim") ||
    q.includes("hakkında") ||
    q.includes("tanıt") ||
    q.includes("biyografi")
  ) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren, **Bandırma Onyedi Eylül Üniversitesi (BANÜ) Yazılım Mühendisliği** öğrencisi ve TEKNOFEST 2026 **5Genç** takımının **Takım Kaptanıdır**.\n\nYapay zekâ, bilgisayarlı görü (YOLOv11), C#/.NET Core ve modern web platformları üzerine çalışır. Soracaksan çabuk sor, yapay zekâ modelim ısındı 🤖",
        actionLinks: [
          { label: "Hakkımda & Zaman Çizelgesi ↗", href: "#about", isAnchor: true },
          { label: "Seçilmiş Projeleri Gör 🚀", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren is a B.Sc. **Software Engineering Student at Bandırma Onyedi Eylül University** (2024 - 2028) and Team Captain of **5Genç** for TEKNOFEST 2026.",
        actionLinks: [
          { label: "View About & Timeline ↗", href: "#about", isAnchor: true },
        ],
      };
    }
  }

  // 13. FALLBACK FOR UNMATCHED QUERIES
  if (locale === "tr") {
    return {
      text: `Ben hava durumu spikeri veya falcı değilim ki! 😅 Sadece Mert'in projeleri, yetenekleri, sertifikaları ve eğitimi hakkında bilgim var.\n\nDoğrudan Mert ile iletişime geçmek istersen: **${MERT_KNOWLEDGE.profile.email}**`,
      actionLinks: [
        { label: "Projeleri İncele 🚀", href: "#work", isAnchor: true },
        { label: "Ödüller & Dereceler 🏆", href: "#awards", isAnchor: true },
        { label: "GitHub Repoları 🐙", href: "#github", isAnchor: true },
        { label: "Sertifikalar (22) 📜", href: "#certificates", isAnchor: true },
        { label: "İletişime Geç ✉️", href: "#contact", isAnchor: true },
      ],
    };
  } else {
    return {
      text: `I can only assist with questions about Mert Ceren's projects, skills, certificates, and education!\n\nFeel free to contact Mert directly via email at **${MERT_KNOWLEDGE.profile.email}**:`,
      actionLinks: [
        { label: "Explore Projects 🚀", href: "#work", isAnchor: true },
        { label: "Awards 🏆", href: "#awards", isAnchor: true },
        { label: "GitHub Repos 🐙", href: "#github", isAnchor: true },
        { label: "Contact ✉️", href: "#contact", isAnchor: true },
      ],
    };
  }
}
