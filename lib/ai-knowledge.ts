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
    location: "İstanbul / Bandırma, Türkiye",
    email: "mertceren.2003.mc@gmail.com",
    github: "https://github.com/MertC07",
    linkedin: "https://linkedin.com/in/mertceren",
    status: "Staj ve freelance işlere açık",
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
      role: "Yazılım Mühendisliği Öğrencisi & Proje Geliştiricisi",
      category: "Eğitim Teknolojisi & 360° Web Platformu",
      tech: ["React", "Photo Sphere Viewer", "Leaflet", "Express", "PostgreSQL"],
      summary:
        "Ziyaretçiler için 360° panoramik sanal kampüs turu ve üniversite idaresi için oda tabanlı envanter yönetim sistemi. İki bağımsız ihtiyacı PostgreSQL üzerinde tek bir veri şemasında birleştiren platform.",
      href: "/work/virtual-campus",
    },
    {
      title: "Rosso Lounge Bistro Web Platformu",
      role: "Yazılım Mühendisliği Öğrencisi & Web Geliştirici",
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
  certificates: [
    "Google & BTK Akademi Uygulamalı Yapay Zekâ Eğitimi",
    "BTK Akademi Bilgisayarlı Görü ve Nesne Tespiti (YOLO)",
    "edX HP AI & Data Science Professional Certificate",
    "Udemy C# & .NET Core Yazılım Uzmanlık Sertifikası",
    "Udemy ChatGPT Prompt Mühendisliği, İçerik ve Görsel Üretme",
    "Siber Güvenlik Sertifikası",
    "Toplam 22 Onaylı Sertifika",
  ],
};

/**
 * Fast Local Response Engine providing detailed summary answers first, plus optional jump buttons
 */
export function getLocalAiResponse(query: string, locale: "tr" | "en" = "tr"): { text: string; actionLinks?: ActionLink[] } {
  const q = query.toLowerCase().trim();

  // Greetings / Selamlama
  if (q.includes("merhaba") || q.includes("selam") || q.includes("sa") || q.includes("hey") || q.includes("günaydın") || q.includes("iyi günler")) {
    if (locale === "tr") {
      return {
        text: "Merhaba! 👋 Ben Mert Ceren'in yapay zekâ asistanıyım.\n\nMert Ceren; Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisi, TEKNOFEST 2026 **5Genç** Takım Kaptanı ve yapay zekâ geliştiricisidir.\n\nSize projeleri, yetenekleri, 22 onaylı sertifikası veya iletişimi hakkında özet bilgi verebilirim. Ne öğrenmek istersiniz?",
        actionLinks: [
          { label: "TEKNOFEST Projesi 🚀", href: "/work/smart-road-safety" },
          { label: "Sertifikaları Gör 📜", href: "#certificates", isAnchor: true },
          { label: "İletişime Geç ✉️", href: "#contact", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Hello! 👋 I am Mert Ceren's AI assistant.\n\nMert is a Software Engineering Student at BANÜ, Team Captain for TEKNOFEST 2026 (Team 5Genç), and an AI developer.\n\nHow can I help you regarding his projects, skills, certifications, or contact details?",
        actionLinks: [
          { label: "TEKNOFEST Project 🚀", href: "/work/smart-road-safety" },
          { label: "Certificates 📜", href: "#certificates", isAnchor: true },
        ],
      };
    }
  }

  // Who is Mert / Kimdir
  if (q.includes("kimdir") || q.includes("kim") || q.includes("hakkında") || q.includes("tanıt") || q.includes("biyografi")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren, **Bandırma Onyedi Eylül Üniversitesi (BANÜ) Yazılım Mühendisliği** lisans öğrencisidir (2024 - 2028).\n\nTEKNOFEST 2026 'Akıllı Ulaşım & Yol Güvenliği' kategorisinde **5Genç** takımının **Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisidir**.\n\nYapay zekâ, bilgisayarlı görü (YOLOv11), C#/.NET Core ve modern web platformları üzerine odaklanmaktadır.",
        actionLinks: [
          { label: "Zaman Çizelgesinde Detaylı Gör ↗", href: "#about", isAnchor: true },
          { label: "TEKNOFEST Projesini İncele 🚀", href: "/work/smart-road-safety" },
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

  // Contact / Ulaşım / Konuşurum / İletişim / Mail / Mesaj / Görüşme
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
    q.includes("freelance")
  ) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren ile doğrudan iletişime geçmek için:\n\n• **E-posta**: `mertceren.2003.mc@gmail.com`\n• **Konum**: İstanbul / Bandırma, Türkiye\n• **İş Birlikleri**: Staj ve freelance proje davetlerine açık!\n\nAşağıdaki butonlara tıklayarak sayfadaki İletişim bölümünden e-postayı tek tıkla kopyalayabilir veya Özgeçmişini (CV) önizleyip PDF olarak indirebilirsiniz.",
        actionLinks: [
          { label: "Özgeçmişi İncele & İndir (PDF) 📄", href: "#contact", isAnchor: true },
          { label: "Sayfadaki İletişim Bölümüne Git ✉️", href: "#contact", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "You can reach out to Mert Ceren via email at **mertceren.2003.mc@gmail.com** or through LinkedIn.\n\nHe is open for internships and freelance opportunities. Click below to preview and download his CV (PDF).",
        actionLinks: [
          { label: "Preview & Download Resume (PDF) 📄", href: "#contact", isAnchor: true },
        ],
      };
    }
  }

  // TEKNOFEST / Yol Güvenliği / 5Genç / YOLO / Kaptan
  if (q.includes("teknofest") || q.includes("yol güvenliği") || q.includes("5genç") || q.includes("yolo") || q.includes("kaptan")) {
    if (locale === "tr") {
      return {
        text: "🚀 **TEKNOFEST 2026 Akıllı Yol Güvenliği Projesi Özet Bilgisi**:\n\n• **Takım**: 5Genç\n• **Mert'in Rolü**: Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisi\n• **Kategori**: Yapay Zekâ & 5G Haberleşme\n• **Teknolojiler**: Python, YOLOv11, OpenCV, 5G Edge Computing\n\nProjede 5G haberleşme altyapısıyla entegre çalışan, otonom ve destekli sürüş senaryoları için Python'da eğitilen YOLO tabanlı gerçek zamanlı nesne tespit modelleri geliştirilmektedir.",
        actionLinks: [
          { label: "Detaylı Vaka İncelemesini Oku ↗", href: "/work/smart-road-safety" },
          { label: "Seçilmiş Projeler Bölümüne Git ↗", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "🚀 **TEKNOFEST 2026 Smart Road Safety Project Summary**:\n\n• **Team**: 5Genç\n• **Mert's Role**: Team Captain, Project Coordinator & AI/ML Engineer\n• **Tech**: Python, YOLOv11, Computer Vision, 5G Edge\n\nDeveloping real-time YOLOv11 object detection models integrated with 5G edge communication for assisted and autonomous driving scenarios.",
        actionLinks: [
          { label: "Read Case Study ↗", href: "/work/smart-road-safety" },
          { label: "Jump to Projects ↗", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // Sertifikalar / Certificates / BTK / edX / Udemy
  if (q.includes("sertifika") || q.includes("certificate") || q.includes("btk") || q.includes("edx") || q.includes("udemy") || q.includes("belge")) {
    if (locale === "tr") {
      return {
        text: "📜 **Sertifikalar & Belgeler Özeti**:\n\nMert Ceren'in yapay zekâ, bilgisayarlı görü ve yazılım alanında **22 adet onaylı sertifikası** bulunmaktadır.\n\nÖne çıkan bazı sertifikaları:\n• **Google & BTK Akademi**: Uygulamalı Yapay Zekâ Eğitimi\n• **BTK Akademi**: Bilgisayarlı Görü ve Nesne Tespiti (YOLO)\n• **edX & HP**: Generative AI for Games Development\n• **Udemy**: C#/.NET Uzmanlığı & ChatGPT Prompt Mühendisliği",
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

  // Projeler / Projects / Sanal Kampüs / Rosso Lounge
  if (q.includes("proje") || q.includes("project") || q.includes("sanal kampüs") || q.includes("rosso") || q.includes("ik karar")) {
    if (locale === "tr") {
      return {
        text: "💻 **Mert Ceren'in Öne Çıkan Projeleri Özet Bilgisi**:\n\n1. 🚦 **Akıllı Yol Güvenliği (TEKNOFEST 2026)** — 5G & YOLOv11 ile Otonom Sürüş Desteği (5Genç Takım Kaptanı)\n2. 🏫 **Sanal Kampüs** — 360° Panoramik Sanal Tur & İdare Envanter Yönetim Platformu\n3. 🍷 **Rosso Lounge Bistro** — Özel Yönetim Panelli Web Platformu & Menü Sistemi\n4. 🤖 **bwai İK Karar Motoru** — Açık kaynak yapay zekâ İK karar motoru",
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

  // Yetenekler / Diller / Tech Stack / Python / C# / React
  if (q.includes("yetenek") || q.includes("skill") || q.includes("dil") || q.includes("tech") || q.includes("python") || q.includes("c#") || q.includes("react") || q.includes("stack")) {
    if (locale === "tr") {
      return {
        text: "🛠️ **Teknoloji & Stack Özeti**:\n\n• **Yapay Zekâ & Görü**: Python, YOLOv8/v11, OpenCV, PyTorch, Model Optimizasyonu\n• **Backend Servisleri**: C# / .NET Core, Node.js / Express, PostgreSQL, SignalR\n• **Frontend & Web**: React, Next.js, TypeScript, TailwindCSS, Photo Sphere Viewer (360°)\n• **Geliştirme Araçları**: Git & GitHub, Docker, Linux, 5G & Edge Computing",
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

  // Okul / Eğitim / BANÜ / Üniversite / Öğrenci
  if (q.includes("okul") || q.includes("üniversite") || q.includes("öğrenci") || q.includes("banü") || q.includes("bandırma") || q.includes("lise") || q.includes("hazırlık")) {
    if (locale === "tr") {
      return {
        text: "🎓 **Eğitim Özeti**:\n\n• **Lisans**: Bandırma Onyedi Eylül Üniversitesi (BANÜ) — Yazılım Mühendisliği (2024 - 2028)\n• **Hazırlık**: BANÜ İsteğe Bağlı 1 Yıllık İngilizce Hazırlık Programı (2023 - 2024)\n• **Lise**: Eyüpsultan Anadolu Lisesi — Sayısal Bölüm (2018 - 2022)",
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

  // Intelligent Response Fallback for Unrecognized Questions
  if (locale === "tr") {
    return {
      text: `Sorduğunuz konuda Mert Ceren ile doğrudan e-posta (**${MERT_KNOWLEDGE.profile.email}**) üzerinden iletişime geçebilir veya aşağıdaki öne çıkan bölümleri inceleyebilirsiniz:`,
      actionLinks: [
        { label: "Projeleri İncele 🚀", href: "#work", isAnchor: true },
        { label: "Sertifikaları Gör (22) 📜", href: "#certificates", isAnchor: true },
        { label: "İletişime Geç ✉️", href: "#contact", isAnchor: true },
      ],
    };
  } else {
    return {
      text: `Regarding your question, feel free to contact Mert Ceren directly via email at **${MERT_KNOWLEDGE.profile.email}** or check out the sections below:`,
      actionLinks: [
        { label: "Explore Projects 🚀", href: "#work", isAnchor: true },
        { label: "View Certificates (22) 📜", href: "#certificates", isAnchor: true },
        { label: "Contact ✉️", href: "#contact", isAnchor: true },
      ],
    };
  }
}
