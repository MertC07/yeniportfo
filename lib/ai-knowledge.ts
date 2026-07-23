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
      role: "Full-Stack Geliştirici",
      category: "Eğitim Teknolojisi & 360° Web Platformu",
      tech: ["React", "Photo Sphere Viewer", "Leaflet", "Express", "PostgreSQL"],
      summary:
        "Ziyaretçiler için 360° panoramik sanal kampüs turu ve üniversite idaresi için oda tabanlı envanter yönetim sistemi. İki bağımsız ihtiyacı PostgreSQL üzerinde tek bir veri şemasında birleştiren platform.",
      href: "/work/virtual-campus",
    },
    {
      title: "Rosso Lounge Bistro Web Platformu",
      role: "Full-Stack Geliştirici",
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
    "Siber Güvenlik Sertifikası",
    "Toplam 23+ Doğrulanmış Sertifika",
  ],
};

/**
 * Fast Local Fallback Engine when Gemini API is unavailable or quota is exceeded
 */
export function getLocalAiResponse(query: string, locale: "tr" | "en" = "tr"): { text: string; actionLinks?: ActionLink[] } {
  const q = query.toLowerCase().trim();

  // TEKNOFEST / Yol Güvenliği / 5Genç / YOLO
  if (q.includes("teknofest") || q.includes("yol güvenliği") || q.includes("5genç") || q.includes("yolo") || q.includes("kaptan")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren, TEKNOFEST 2026 'Akıllı Ulaşım & Yol Güvenliği' kategorisinde **5Genç** takımının **Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisidir**.\n\nProjede 5G haberleşme altyapısıyla entegre çalışan, Python ve YOLOv11 tabanlı gerçek zamanlı nesne tespit modelleri geliştirilmektedir.",
        actionLinks: [
          { label: "TEKNOFEST Projesini İncele ↗", href: "/work/smart-road-safety" },
          { label: "Seçilmiş Projeler Bölümüne Git ↗", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren is the **Team Captain, Project Coordinator & AI/ML Engineer** of Team **5Genç** for TEKNOFEST 2026 Smart Road Safety competition.\n\nHe is training real-time YOLOv11 object detection models integrated with low-latency 5G edge communication.",
        actionLinks: [
          { label: "View TEKNOFEST Project ↗", href: "/work/smart-road-safety" },
          { label: "Jump to Projects ↗", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // Sertifikalar / Certificates
  if (q.includes("sertifika") || q.includes("certificate") || q.includes("btk") || q.includes("edx") || q.includes("udemy") || q.includes("belge")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren'in yapay zekâ, bilgisayarlı görü ve yazılım alanında **23 adet onaylı sertifikası** bulunmaktadır.\n\nÖne çıkan sertifikalar arasında **Google & BTK Akademi Uygulamalı Yapay Zekâ**, **BTK YOLO Bilgisayarlı Görü**, **edX HP AI & Data Science** ve **Udemy C#/.NET Uzmanlığı** yer almaktadır.",
        actionLinks: [
          { label: "Tüm Sertifikaları Gör (23) 📜", href: "#certificates", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren holds **23 verified professional certificates** in AI, Computer Vision, and Software Engineering.\n\nKey certifications include **Google & BTK Applied AI**, **BTK YOLO Computer Vision**, and **edX HP AI & Data Science**.",
        actionLinks: [
          { label: "View All Certificates (23) 📜", href: "#certificates", isAnchor: true },
        ],
      };
    }
  }

  // Projeler / Projects / Sanal Kampüs / Rosso Lounge
  if (q.includes("proje") || q.includes("project") || q.includes("sanal kampüs") || q.includes("rosso") || q.includes("ik karar")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren'in öne çıkan ana projeleri:\n\n1. 🚦 **Akıllı Yol Güvenliği (TEKNOFEST 2026)** — 5G & YOLOv11 ile Otonom Sürüş Desteği (Takım Kaptanı)\n2. 🏫 **Sanal Kampüs** — 360° Panoramik Tur & İdare Envanter Yönetimi\n3. 🍷 **Rosso Lounge Bistro** — Özel Yönetim Panelli Web Platformu\n4. 🤖 **bwai İK Karar Motoru** — Açık kaynak yapay zekâ İK karar destek sistemi",
        actionLinks: [
          { label: "Seçilmiş Projeleri İncele ↗", href: "#work", isAnchor: true },
          { label: "GitHub Repolarına Bak ↗", href: "#github", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren's featured projects:\n\n1. 🚦 **Smart Road Safety (TEKNOFEST 2026)** — 5G & YOLOv11 Computer Vision (Team Captain)\n2. 🏫 **Virtual Campus** — 360° Panoramic Tour & Inventory Platform\n3. 🍷 **Rosso Lounge Bistro** — Web platform & custom management panel",
        actionLinks: [
          { label: "Explore Projects ↗", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // Yetenekler / Diller / Tech Stack / Python / C# / React
  if (q.includes("yetenek") || q.includes("skill") || q.includes("dil") || q.includes("tech") || q.includes("python") || q.includes("c#") || q.includes("react") || q.includes("stack")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren'in kullandığı ana teknoloji yığını:\n\n• **Yapay Zekâ & Görü**: Python, YOLOv8/v11, OpenCV, PyTorch, Model Optimizasyonu\n• **Backend**: C# / .NET Core, Node.js / Express, PostgreSQL, SignalR\n• **Frontend**: React, Next.js, TypeScript, TailwindCSS, Photo Sphere Viewer (360°)\n• **Araçlar**: Git, Docker, Linux, 5G & Edge Computing",
        actionLinks: [
          { label: "Yetenekler & Stack Bölümüne Git ↗", href: "#skills", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren's core tech stack:\n\n• **AI & Computer Vision**: Python, YOLOv8/v11, OpenCV, PyTorch\n• **Backend**: C# / .NET Core, Node.js / Express, PostgreSQL, SignalR\n• **Frontend**: React, Next.js, TypeScript, TailwindCSS\n• **Tools**: Git, Docker, Linux, 5G & Edge",
        actionLinks: [
          { label: "Jump to Skills Section ↗", href: "#skills", isAnchor: true },
        ],
      };
    }
  }

  // Okul / Eğitim / BANÜ / Üniversite / Öğrenci
  if (q.includes("okul") || q.includes("üniversite") || q.includes("öğrenci") || q.includes("banü") || q.includes("bandırma") || q.includes("lise") || q.includes("hazırlık")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren, **Bandırma Onyedi Eylül Üniversitesi (BANÜ) Yazılım Mühendisliği** lisans öğrencisidir (2024 - 2028).\n\nÖncesinde isteğe bağlı 1 yıllık İngilizce Hazırlık Programını tamamlamıştır. Liseyi Eyüpsultan Anadolu Lisesi sayısal ağırlıklı bölümde bitirmiştir.",
        actionLinks: [
          { label: "Zaman Çizelgesini İncele ↗", href: "#about", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren is a B.Sc. **Software Engineering student at Bandırma Onyedi Eylül University (BANÜ)** (2024 - 2028).\n\nHe also completed an optional 1-year intensive English preparatory program.",
        actionLinks: [
          { label: "View Timeline ↗", href: "#about", isAnchor: true },
        ],
      };
    }
  }

  // İletişim / E-posta / CV / Özgeçmiş / Staj
  if (q.includes("iletişim") || q.includes("contact") || q.includes("email") || q.includes("eposta") || q.includes("cv") || q.includes("özgeçmiş") || q.includes("staj") || q.includes("iş")) {
    if (locale === "tr") {
      return {
        text: "Mert Ceren ile iletişim kurmak veya staj/freelance teklifinde bulunmak için:\n\n• **E-posta**: `mertceren.2003.mc@gmail.com`\n• **Konum**: İstanbul / Bandırma, Türkiye\n• **Durum**: Staj ve freelance iş birliklerine açık!",
        actionLinks: [
          { label: "Özgeçmişi İncele & İndir (PDF) 📄", href: "#contact", isAnchor: true },
          { label: "İletişim Bölümüne Git ✉️", href: "#contact", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "To get in touch or offer internship/freelance work:\n\n• **Email**: `mertceren.2003.mc@gmail.com`\n• **Status**: Open for internships & freelance opportunities!",
        actionLinks: [
          { label: "Preview & Download Resume (PDF) 📄", href: "#contact", isAnchor: true },
        ],
      };
    }
  }

  // Default General Response
  if (locale === "tr") {
    return {
      text: "Merhaba! Ben Mert Ceren'in portfolyo yapay zekâ asistanıyım. 🤖\n\nMert Ceren; Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisi, TEKNOFEST 2026 5Genç Takım Kaptanı ve bilgisayarlı görü/full-stack geliştiricidir.\n\nAşağıdaki hazır sorulardan birine tıklayabilir veya merak ettiğiniz konuyu sorabilirsiniz!",
      actionLinks: [
        { label: "Projeleri Gör 🚀", href: "#work", isAnchor: true },
        { label: "Sertifikaları Gör 📜", href: "#certificates", isAnchor: true },
        { label: "İletişim ✉️", href: "#contact", isAnchor: true },
      ],
    };
  } else {
    return {
      text: "Hello! I am Mert Ceren's AI Portfolio Assistant. 🤖\n\nMert Ceren is a Software Engineering Student at BANÜ, Team Captain for TEKNOFEST 2026, and an AI/computer vision developer.\n\nFeel free to ask any question or click a quick option below!",
      actionLinks: [
        { label: "View Projects 🚀", href: "#work", isAnchor: true },
        { label: "View Certificates 📜", href: "#certificates", isAnchor: true },
      ],
    };
  }
}
