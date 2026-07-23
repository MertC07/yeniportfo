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
    "Siber Güvenlik Sertifikası",
    "Toplam 23+ Doğrulanmış Sertifika",
  ],
};

/**
 * Fast Local Response Engine with comprehensive phrase matching
 */
export function getLocalAiResponse(query: string, locale: "tr" | "en" = "tr"): { text: string; actionLinks?: ActionLink[] } {
  const q = query.toLowerCase().trim();

  // Greetings / Selamlama
  if (q.includes("merhaba") || q.includes("selam") || q.includes("sa") || q.includes("hey") || q.includes("günaydın") || q.includes("iyi günler")) {
    if (locale === "tr") {
      return {
        text: "Merhaba! 👋 Size Mert Ceren'in **5Genç** takımıyla geliştirdiği TEKNOFEST 2026 projesi, 23 onaylı sertifikası, yetenekleri veya üniversite eğitimi hakkında nasıl yardımcı olabilirim?",
        actionLinks: [
          { label: "TEKNOFEST Projesi 🚀", href: "/work/smart-road-safety" },
          { label: "Sertifikaları Gör 📜", href: "#certificates", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Hello! 👋 How can I help you regarding Mert Ceren's TEKNOFEST 2026 project with Team 5Genç, his 23 certifications, skills, or education?",
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
        text: "Mert Ceren, **Bandırma Onyedi Eylül Üniversitesi (BANÜ) Yazılım Mühendisliği** öğrencisidir.\n\nTEKNOFEST 2026 'Akıllı Ulaşım & Yol Güvenliği' yarışmasında **5Genç** takımının **Takım Kaptanı** olup, Python ve YOLOv11 ile gerçek zamanlı bilgisayarlı görü ve yapay zekâ sistemleri geliştirmektedir.",
        actionLinks: [
          { label: "Hakkımda & Zaman Çizelgesi ↗", href: "#about", isAnchor: true },
          { label: "TEKNOFEST Projesi 🚀", href: "/work/smart-road-safety" },
        ],
      };
    } else {
      return {
        text: "Mert Ceren is a B.Sc. **Software Engineering Student at Bandırma Onyedi Eylül University** and Team Captain of **5Genç** for TEKNOFEST 2026.",
        actionLinks: [
          { label: "About & Timeline ↗", href: "#about", isAnchor: true },
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
        text: "Mert Ceren ile doğrudan e-posta adresi (**mertceren.2003.mc@gmail.com**) üzerinden veya LinkedIn hesabı üzerinden iletişime geçebilirsiniz.\n\nAyrıca sitedeki **İletişim** bölümüne giderek e-postayı tek tıkla kopyalayabilir veya Özgeçmişini (CV) önizleyip PDF olarak indirebilirsiniz.",
        actionLinks: [
          { label: "Özgeçmişi İncele & İndir (PDF) 📄", href: "#contact", isAnchor: true },
          { label: "İletişim Bölümüne Git ✉️", href: "#contact", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "You can get in touch with Mert Ceren via email at **mertceren.2003.mc@gmail.com** or through LinkedIn.\n\nYou can also preview and download his resume (PDF) in the Contact section.",
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
        text: "TEKNOFEST 2026 'Akıllı Ulaşım & Yol Güvenliği' yarışmasında Mert Ceren, **5Genç** takımının **Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisidir**.\n\nTakımıyla birlikte 5G haberleşme altyapısıyla entegre çalışan, Python ve YOLOv11 tabanlı gerçek zamanlı nesne tespit modelleri geliştirmektedirler.",
        actionLinks: [
          { label: "TEKNOFEST Projesini İncele ↗", href: "/work/smart-road-safety" },
          { label: "Seçilmiş Projeler Bölümüne Git ↗", href: "#work", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "In TEKNOFEST 2026 Smart Road Safety, Mert Ceren is the **Team Captain, Project Coordinator & AI/ML Engineer** of Team **5Genç**.\n\nThey are developing real-time YOLOv11 object detection models integrated with 5G edge communication.",
        actionLinks: [
          { label: "View TEKNOFEST Project ↗", href: "/work/smart-road-safety" },
          { label: "Jump to Projects ↗", href: "#work", isAnchor: true },
        ],
      };
    }
  }

  // Sertifikalar / Certificates / BTK / edX / Udemy
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
        text: "Mert Ceren'in öne çıkan projeleri:\n\n1. 🚦 **Akıllı Yol Güvenliği (TEKNOFEST 2026)** — 5G & YOLOv11 (5Genç Takım Kaptanı)\n2. 🏫 **Sanal Kampüs** — 360° Panoramik Tur & İdare Envanter Yönetimi\n3. 🍷 **Rosso Lounge Bistro** — Özel Yönetim Panelli Web Platformu\n4. 🤖 **bwai İK Karar Motoru** — Açık kaynak yapay zekâ İK karar destek sistemi",
        actionLinks: [
          { label: "Seçilmiş Projeleri İncele ↗", href: "#work", isAnchor: true },
          { label: "GitHub Repolarına Bak ↗", href: "#github", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren's featured projects:\n\n1. 🚦 **Smart Road Safety (TEKNOFEST 2026)** — 5G & YOLOv11 (Team 5Genç Captain)\n2. 🏫 **Virtual Campus** — 360° Panoramic Tour & Inventory Platform\n3. 🍷 **Rosso Lounge Bistro** — Web platform & custom management panel",
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
        text: "Mert Ceren, **Bandırma Onyedi Eylül Üniversitesi (BANÜ) Yazılım Mühendisliği** lisans öğrencisidir (2024 - 2028).\n\nÖncesinde isteğe bağlı 1 yıllık İngilizce Hazırlık Programını tamamlamıştır.",
        actionLinks: [
          { label: "Zaman Çizelgesini İncele ↗", href: "#about", isAnchor: true },
        ],
      };
    } else {
      return {
        text: "Mert Ceren is a B.Sc. **Software Engineering student at Bandırma Onyedi Eylül University (BANÜ)** (2024 - 2028).",
        actionLinks: [
          { label: "View Timeline ↗", href: "#about", isAnchor: true },
        ],
      };
    }
  }

  // Intelligent General Response Fallback (No repeating welcome text!)
  if (locale === "tr") {
    return {
      text: "Bu konu hakkında Mert Ceren ile doğrudan e-posta (**mertceren.2003.mc@gmail.com**) üzerinden iletişime geçebilir veya aşağıdaki bağlantılardan detayları inceleyebilirsiniz:",
      actionLinks: [
        { label: "Projeleri Gör 🚀", href: "#work", isAnchor: true },
        { label: "Sertifikaları Gör 📜", href: "#certificates", isAnchor: true },
        { label: "İletişime Geç ✉️", href: "#contact", isAnchor: true },
      ],
    };
  } else {
    return {
      text: "For this question, you can contact Mert Ceren directly via email at **mertceren.2003.mc@gmail.com** or explore the links below:",
      actionLinks: [
        { label: "View Projects 🚀", href: "#work", isAnchor: true },
        { label: "View Certificates 📜", href: "#certificates", isAnchor: true },
        { label: "Contact ✉️", href: "#contact", isAnchor: true },
      ],
    };
  }
}
