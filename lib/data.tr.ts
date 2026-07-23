/**
 * Turkish content — mirrors the exports of lib/data.ts field by field.
 * Slugs, hrefs, palettes and tech identifiers stay identical to the
 * English source so both locales share the same routes and visuals.
 */

import type { Certificate, ExperienceEntry, Post, Project, SkillTier, Ui } from "./data";

export const profile = {
  name: "Mert Ceren",
  monogram: "MC",
  wordmark: "mertceren",
  role: "Yapay Zekâ & Yazılım Mühendisliği Öğrencisi",
  tagline:
    "Yazılımın fiziksel dünyayla buluştuğu akıllı sistemler geliştiriyorum.",
  location: "İstanbul, Türkiye",
  timezone: "Europe/Istanbul",
  email: "mertceren.2003.mc@gmail.com",
  available: true,
  availabilityNote: "Staj ve freelance işlere açığım",
  image: "/portrait.png",
};

export const heroStatement = {
  lines: ["Mert", "Ceren", "Yazılım", "Öğrencisi"],
  sub: "Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisiyim. YOLO ve Python ile bilgisayarlı görü sistemleri geliştiriyor, React ve .NET Core ile web platformları inşa ediyorum.",
};

export const projects: Project[] = [
  {
    slug: "smart-road-safety",
    title: "Akıllı Yol Güvenliği",
    year: "2026",
    category: "TEKNOFEST · Yapay Zekâ & 5G",
    description:
      "5G bağlantısını gerçek zamanlı bilgisayarlı görüyle buluşturan akıllı bir yol güvenliği sistemi — destekli ve otonom sürüş senaryoları için Python'da eğitilen YOLO tabanlı tespit modelleri. TEKNOFEST 2026 için 5Genç takımıyla geliştiriliyor.",
    tags: ["Python", "YOLOv11", "Bilgisayarlı Görü", "5G"],
    href: "#",
    image: "/projects/road-safety.png",
    palette: { from: "#FF4D00", via: "#2952E3", to: "#0B1024" },
    caseStudy: {
      intro:
        "Trafik kazaları donanım probleminden önce bir veri problemidir. Hiç göz kırpmayan — ve hiç gecikmeyen — bir kameranın neleri önleyebileceğini sorduk.",
      facts: [
        { label: "Rol", value: "Takım Kaptanı, Proje Koordinatörü & AI/ML Mühendisi" },
        { label: "Takım", value: "5Genç" },
        { label: "Aşama", value: "Geliştirme Aşamasında (TEKNOFEST 2026)" },
      ],
      challenge:
        "Destekli ve otonom sürüş sistemlerinin tehlikeleri — araçları, yayaları, beklenmedik engelleri — gerçek zamanlı görmesi gerekir; geç gelen bir tespit, hiç gelmemiş bir tespittir. Sistem, düşük gecikmeli 5G iletimini yol hızında anlam taşıyacak kadar hızlı görü modelleriyle birleştirmek zorundaydı.",
      approach:
        "Algı katmanını YOLO ailesi modeller (önce YOLOv8, sonra YOLOv11) üzerine kurduk; senaryoya özel veri setleriyle Python'da eğitip yineledik. 5G ağ entegrasyonu tespitleri minimum gecikmeyle taşıyor; böylece uyarılar araçlara ve altyapıya hâlâ işe yarar durumdayken ulaşabiliyor. Takım kaptanı ve koordinatör olarak mimariyi uçtan uca ben üstleniyorum — model eğitim döngülerinden parçaların ağ üzerinde nasıl konuştuğuna kadar.",
      outcome:
        "Sistem üzerinde aktif geliştirme süreci devam etmekte olup, model eğitimleri ve 5G entegrasyonu aşamaları 5Genç takımıyla TEKNOFEST 2026 sezonu için hazırlanmaktadır. Gerçek zamanlı tespit başarım oranlarını artırmak için yeni senaryolar üzerinde çalışmaya devam ediyoruz.",
    },
  },
  {
    slug: "virtual-campus",
    title: "Sanal Kampüs",
    year: "2026",
    category: "Eğitim Teknolojisi · Web Platformu",
    description:
      "Envanter takip sistemiyle bütünleşik 360° panoramik kampüs deneyimi — önde React, Photo Sphere Viewer ve Leaflet, arkada PostgreSQL üzerinde Express ve Prisma. Kampüsü her yerden gez; içindekileri tek panelden yönet.",
    tags: ["React", "Photo Sphere Viewer", "Leaflet", "Express", "PostgreSQL"],
    href: "#",
    image: "/projects/virtual-campus.png",
    status: "Geliştirme aşamasında",
    palette: { from: "#2952E3", via: "#14224F", to: "#080B18" },
    caseStudy: {
      intro:
        "Kampüs, daha varmadan gezebilmen gereken bir yerdir — ve birinin dürüst tutmak zorunda olduğu bir demirbaş listesidir. Sanal Kampüs ikisini de aynı platformdan yapıyor.",
      facts: [
        { label: "Rol", value: "Yazılım Mühendisliği Öğrencisi" },
        { label: "Frontend", value: "React + Vite, Tailwind CSS" },
        { label: "360° & harita", value: "Photo Sphere Viewer + Leaflet" },
        { label: "Backend", value: "Node.js üzerinde Express + Prisma" },
        { label: "Veritabanı", value: "PostgreSQL 16 (Docker)" },
        { label: "Durum", value: "Geliştirme aşamasında" },
      ],
      challenge:
        "Aday öğrenciler kampüsü yerinde gezmeden görmek istiyor; idarenin ise aynı binalardaki envanteri takip etmesi gerekiyor — genellikle birbirinden kopuk iki araçla çözülen iki problem. Hedef tek platformdu: her cihazda akıcı 360° gezinme, arkasında yapılandırılmış, sorgulanabilir veri.",
      approach:
        "Photo Sphere Viewer panoramik sahneleri Vite ile kurulmuş React kabuğu içinde işliyor, Leaflet ise kampüs haritasını taşıyor; böylece ziyaretçi genel görünümle bir oda arasında bağı kaybetmeden gezinebiliyor. Prisma destekli Express API'si sahne ve envanter verisini PostgreSQL'den sunuyor — ziyaretçinin gezdiği oda, ekipman kayıtları veritabanında yaşayan odanın ta kendisi. Tek doğruluk kaynağı, birbirinden çok farklı iki kitle.",
      outcome:
        "Hâlâ geliştirme aşamasında. Temel mimari ayakta — panoramik sahneler, kampüs haritası ve Prisma destekli envanter API'si birbiriyle konuşuyor — şimdiki iş yeni kampüs konumlarını çekmek ve yönetim panelini detaylandırmak.",
    },
  },
  {
    slug: "rosso-lounge",
    title: "Rosso Lounge",
    year: "2025",
    category: "Yeme-İçme · Web Platformu",
    description:
      "Rosso Lounge Bistro için özel yönetim panelli web platformu — işletme menüsünü ve içeriğini koda dokunmadan kendisi yönetiyor. Yapay zekâ destekli geliştirme akışlarıyla tasarlanıp yayına alındı.",
    tags: ["Web Platformu", "Yönetim Paneli", "SQL", "AI destekli"],
    href: "#",
    image: "/projects/rosso-lounge.png",
    palette: { from: "#C1121F", via: "#6E0E14", to: "#170406" },
    caseStudy: {
      intro:
        "Bir restoranın sitesi, menü değiştiği ve kimsenin güncelleyemediği gün ölür. Rosso Lounge, ekibin kendi başına yönetebildiği bir site aldı.",
      facts: [
        { label: "Rol", value: "Yazılım Mühendisliği Öğrencisi" },
        { label: "Müşteri", value: "Rosso Lounge Bistro" },
        { label: "Öne çıkan", value: "Özel yönetim paneli" },
      ],
      challenge:
        "Küçük işletme sitelerinin çoğu statik broşürdür: açılışta doğru görünür, birkaç hafta içinde güncelliğini yitirir. Bistronun hem vitrine hem pratikliğe ihtiyacı vardı — markayı taşıyan herkese açık bir site ve teknik olmayan ekibin müşterinin gördüğünü yönettiği özel bir panel.",
      approach:
        "Platformu, merkezinde özel bir yönetim paneliyle uçtan uca geliştirdim: menü, içerik ve işletme bilgileri tek yerden düzenlenebiliyor, geliştirici gerekmiyor. Yapay zekâ destekli geliştirme akışları projeyi mimari taslaklardan uygulamaya kod kalitesinden ödün vermeden hızla taşıdı.",
      outcome:
        "Bistro web varlığını kendisi işletiyor — eskiden geliştirici gerektiren güncellemeler artık panelde bir dakika sürüyor. Proje aynı zamanda yapay zekâ destekli akışların gerçek müşteri teslimatına nasıl oturduğu konusunda şablonum hâline geldi.",
    },
  },
];

export const about = {
  manifesto:
    "Gerçek problemleri çözen, temiz, yüksek performanslı ve güvenilir çalışan yazılımlar geliştirmeye odaklanıyorum.",
  paragraphs: [
    "Projeler üreterek öğrenen bir yazılım mühendisliği öğrencisiyim. Otonom sürüş için bilgisayarlı görü tabanlı yol güvenliği sistemi, geliştirmekte olduğum envanter takip entegrasyonlu 360° sanal tur platformu ve yerel işletmeler için özel yönetim panelleri üzerinde çalışıyorum.",
    "Ağırlık merkezim yapay zekânın canlı sistemlerle buluştuğu alanlar — bir tarafta Python ve YOLO modelleri, diğer tarafta ASP.NET Core ve React platformları. Şu sıralar İSKİ Yazılım Şube Müdürlüğü'nde 20 günlük zorunlu stajımı gerçekleştiriyorum.",
  ],
};

export const experience: ExperienceEntry[] = [
  {
    period: "Haz 2026 — Şu an",
    title: "Yazılım Mühendisliği Stajyeri",
    place: "İSKİ (Yazılım Şube Müdürlüğü)",
    summary: "20 günlük zorunlu yazılım mühendisliği stajı.",
    detail:
      "İSKİ Bilgi İşlem Dairesi Başkanlığı Yazılım Şube Müdürlüğü bünyesinde 20 günlük zorunlu yazılım mühendisliği stajımı gerçekleştiriyorum.",
    logo: "/logos/iski.png",
  },
  {
    period: "Ara 2025 — Haz 2026",
    title: "Bilgi İşlem Öğrenci Asistanı",
    place: "Bandırma Onyedi Eylül Üniversitesi (Yarı Zamanlı)",
    summary: "Teknik destek, envanter takibi ve donanım kurulumu.",
    detail:
      "İŞKUR destekli kısmi zamanlı öğrenci programı kapsamında üniversitenin Bilgi İşlem Daire Başkanlığı bünyesinde teknik destek, kullanıcı desteği, bilgisayar/yazıcı kurulumu ve envanter takibi süreçlerinde görev aldım.",
    logo: "/logos/banu.jpg",
  },
  {
    period: "Kas 2024 — Mar 2025",
    title: "Kampüs Temsilcisi",
    place: "Etkin Kampüs (Yarı Zamanlı)",
    summary: "Bir platformla kampüsü arasındaki köprü.",
    detail:
      "Etkin Kampüs'ü BANÜ'de temsil ettim — topluluk kurma, iletişim ve ulusal bir öğrenci platformunun yereldeki yüzü olmak.",
    logo: "/logos/etkin-kampus.png",
  },
  {
    period: "2024 — 2028",
    title: "Yazılım Mühendisliği Lisansı",
    place: "Bandırma Onyedi Eylül Üniversitesi",
    summary: "Temellerin oturduğu yer.",
    detail:
      "Algoritmalar, yazılım mimarisi, sistemler ve mühendislik prensipleri. Teorik bilgileri gerçek projeler üreterek pratiğe döküyorum.",
    logo: "/logos/banu.jpg",
  },
  {
    period: "2024 — Şu an",
    title: "Sınıf Temsilcisi",
    place: "BANÜ Yazılım Mühendisliği",
    summary: "Akademisyenler ve öğrenciler arası iletişim köprüsü.",
    detail:
      "Akademisyenlerimiz ile öğrenci arkadaşlarım arasındaki iletişimi, bilgi akışını ve ders/bölüm süreçlerindeki koordinasyonu sağlıyorum.",
    logo: "/logos/banu.jpg",
  },
  {
    period: "2023 — 2024",
    title: "İngilizce Hazırlık Eğitimi (İsteğe Bağlı)",
    place: "Bandırma Onyedi Eylül Üniversitesi",
    summary: "İsteğe bağlı 1 yıllık İngilizce hazırlık programı.",
    detail:
      "Yazılım mühendisliği lisans eğitimi öncesinde 1 yıllık isteğe bağlı İngilizce hazırlık eğitimini başarıyla tamamladım.",
    logo: "/logos/banu.jpg",
  },
  {
    period: "Eyl 2018 — Haz 2022",
    title: "Lise Eğitimi",
    place: "Eyüpsultan Anadolu Lisesi",
    summary: "Sayısal ağırlıklı lise eğitimi.",
    detail: "Lise öğrenimi döneminde sayısal ve fen bilimleri odaklı eğitim aldım.",
    logo: "/logos/eyupsultan.png",
  },
];

export const skillTiers: SkillTier[] = [
  {
    tier: "Ana Yetenekler & Uzmanlık",
    blurb: "Projelerimde aktif olarak geliştirdiğim temel programlama dilleri ve yapay zekâ mimarileri.",
    skills: [
      { name: "Python", discipline: "AI / ML", note: "Bilgisayarlı görü & model eğitimi" },
      { name: "YOLOv8 / v11", discipline: "AI / ML", note: "Gerçek zamanlı nesne tespiti" },
      { name: "C# / .NET Core", discipline: "Backend", note: "ASP.NET Core servisleri & API" },
      { name: "React / Next.js", discipline: "Frontend", note: "Modern web uygulamaları" },
      { name: "PostgreSQL / SQL", discipline: "Backend", note: "Veritabanı tasarımı ve sorgular" },
    ],
  },
  {
    tier: "Framework & Kütüphaneler",
    blurb: "Uygulamalarımın backend, frontend ve yapay zekâ altyapısında kullandığım araçlar.",
    skills: [
      { name: "Node.js / Express", discipline: "Backend", note: "Prisma ORM ile REST API'ler" },
      { name: "SignalR", discipline: "Backend", note: "Gerçek zamanlı veri akışı & bildirimler" },
      { name: "Bilgisayarlı Görü", discipline: "AI / ML", note: "OpenCV & canlı görüntü analizi" },
      { name: "Sistem Mimarisi", discipline: "Tooling", note: "Modüler ve ölçeklenebilir tasarım" },
      { name: "Prompt Mühendisliği", discipline: "Tooling", note: "AI destekli geliştirme süreçleri" },
    ],
  },
  {
    tier: "Geliştirme Araçları & Teknolojiler",
    blurb: "Kodlama, versiyon kontrolü ve yayına alma süreçlerinde yararlandığım ekosistem.",
    skills: [
      { name: "5G & Edge Computing", discipline: "Tooling", note: "TEKNOFEST akıllı ulaşım altyapısı" },
      { name: "Photo Sphere Viewer / 360°", discipline: "Frontend", note: "Panoramik sanal tur deneyimleri" },
      { name: "Model Optimizasyonu", discipline: "AI / ML", note: "Düşük gecikmeli nesne tespiti" },
      { name: "Git & GitHub", discipline: "Tooling", note: "Versiyon kontrolü & proje yönetimi" },
      { name: "Docker & Linux", discipline: "Tooling", note: "Konteynerleştirme ve sunucu ortamı" },
    ],
  },
];

export const posts: Post[] = [
  {
    slug: "the-last-10-percent",
    title: "Son %10 ürünün ta kendisidir",
    date: "Haz 2026",
    readingTime: "6 dk",
    tag: "Zanaat",
    excerpt:
      "Cila neden süsleme değildir — insanların kullandığı yazılımla hatırladığı yazılım arasındaki fark budur.",
    body: [
      "Her projenin teknik olarak çalıştığı bir an vardır. Veri yüklenir, düğmeler etiketlerinin vaat ettiğini yapar, testler yeşildir. Çoğu ekip burada yayına alır. Oysa asıl ürün işinin başladığı an da tam olarak budur.",
      "Son %10 görsel süsleme değildir. Bir paneli ışınlanmış değil fiziksel hissettiren 80 milisaniyelik yumuşatmadır. Özür dilemek yerine açıklayan boş durumdur. Denetim zorlamadan önce birinin klavye kullanıcısını hayal ettiğini kanıtlayan odak halkasıdır.",
      "Kullanıcılar bu detayları adlandıramaz — mesele de bu. Kimse yorumda interpolasyon eğrini övmez. Ama birikimi hissederler ve bunu 'sağlam', 'hızlı', 'hoş' gibi kelimelerle anlatırlar — ürünleri tavsiye ettiren kelimeler de bunlardır.",
      "Rahatsız edici çıkarım: cila, yol haritasının sonunda bir faz olamaz; çünkü boya katmanı değil, taşıyıcı kolondur. En çok gurur duyduğum projeler son %10'un bütçesini ilk haftadan ayırdı. Pişman olduklarım ise onu, teslim tarihi bağırmaya başlayınca geri alınacak bir pay gibi gördü.",
      "Artık kuralım basit. Biri ne kaldı diye sorduğunda 'çalışıyor, bir cila kaldı' demiyorum. Ürün henüz bitmedi diyorum. Çünkü eksik olan kısım, insanların gerçekten hatırlayacağı kısım.",
    ],
  },
  {
    slug: "detection-is-a-latency-budget",
    title: "Tespit bir gecikme bütçesidir",
    date: "Nis 2026",
    readingTime: "7 dk",
    tag: "AI / ML",
    excerpt:
      "Geç gelen kusursuz bir tespit, hiç olmayan tespitten farksızdır — gerçek zamanlı bilgisayarlı görü geliştirmekten dersler.",
    body: [
      "Not defterinde bir bilgisayarlı görü modeli mAP skoruyla yargılanır. Yolda ise kronometreyle. Gerçek zamanlı görü projelerinin çoğu, bu iki yargı arasındaki boşlukta sessizce başarısız olur.",
      "Yol güvenliği tespiti üzerinde çalışmak bana gecikmeyi kalemleri olan bir bütçe gibi görmeyi öğretti: yakalama, ön işleme, çıkarım, iletim, karar. Her kalem payından fazlasını ister. Model daha büyük girdi çözünürlüğü ister. Ağ bir yeniden deneme ister. Hat bir filtre geçişi daha ister.",
      "Disiplin, daha hiçbir şey eğitmeden toplam bütçenin ne olduğuna karar vermektir — bir tehlikenin belirmesiyle uyarının işe yarar olması arasındaki süre — ve sonra her bileşene dilimini gerekçelendirtmektir. İki puan düşük skorlayan ama iki kat hızlı çalışan bir YOLO varyantı taviz değildir; yol hızında o, daha iyi modeldir.",
      "5G bütçenin şeklini değiştirir, varlığını değil. Daha düşük iletim gecikmesi yavaş bir hattı mazur göstermez — ifşa eder. Ağ darboğazın olmaktan çıktığında, herkesin gözünü diktiği şey senin ön işlemen olur.",
      "Artık başladığım her görü projesi aynı soruyla açılıyor ve bu soru 'hangi model?' değil. Şu: gerçekte kaç milisaniyemiz var — ve onları kim harcıyor?",
    ],
  },
  {
    slug: "one-platform-two-audiences",
    title: "Tek platform, iki kitle",
    date: "Şub 2026",
    readingTime: "5 dk",
    tag: "Sistemler",
    excerpt:
      "Ziyaretçiler için 360° kampüs turu, idare için envanter sistemi — ikisini tek backend üzerinde kurmanın veri tasarımı üzerine öğrettikleri.",
    body: [
      "Sanal Kampüs ayrı ayrı gelen iki taleple başladı: aday öğrenciler kampüsü evden görmek istiyordu, idare ise ekipmanı tablolarda takip etmeyi bırakmak. Bariz hamle iki araçtı. Daha iyi hamle tek şemaydı.",
      "Panoramik tur ile envanter sistemi, ortak bir omurgaları olduğunu fark edene kadar alakasız görünür: odalar. Her 360° sahne bir odadır; takip edilen her demirbaş bir odada yaşar. Odayı bir kez düzgün modelle — PostgreSQL'de, önünde FastAPI ile — iki ürün de aynı doğrunun üzerinde birer görünüm hâline gelir.",
      "Kazanç, tasarruf edilen emekten fazlası. Tur ile envanter bir oda hakkında anlaşamadığında ikisinden biri yanlıştır ve sistem artık bunu bilir. Kopuk araçlar bu tartışmayı yapamaz; sessizce birbirinden uzaklaşırlar ve veri böyle ölür.",
      "Aklımda tuttuğum ders: iki proje bir ismi paylaşıyorsa muhtemelen bir şemayı da paylaşıyordur. Önce ismi inşa et. Alttaki veri yalan söylemeyi reddettikten sonra ön yüzler — bir kitle için React ve Pannellum, diğeri için yönetim paneli — işin kolay kısmı.",
    ],
  },
];

export const navItems = [
  { label: "Projeler", href: "#work" },
  { label: "Hakkımda", href: "#about" },
  { label: "Yetenekler", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Sertifikalar", href: "#certificates" },
  { label: "Ödüller", href: "#awards" },
  { label: "İletişim", href: "#contact" },
] as const;

export const site = {
  url: "https://mertceren.com",
  title: "Mert Ceren — Yapay Zekâ & Yazılım Mühendisliği Öğrencisi",
  description:
    "Mert Ceren'in kişisel portfolyosu — Bandırma Onyedi Eylül Üniversitesi Yazılım Mühendisliği öğrencisi. YOLO tabanlı bilgisayarlı görü, 5G akıllı yol güvenliği ve web platformları geliştiriyor.",
};

export const ui: Ui = {
  skipToContent: "İçeriğe atla",
  backToTopAria: "başa dön",
  menu: { open: "Menüyü aç", close: "Menüyü kapat" },
  theme: {
    light: "Açık",
    dark: "Koyu",
    fallback: "Tema",
    switchToLight: "Açık temaya geç",
    switchToDark: "Koyu temaya geç",
    toggle: "Temayı değiştir",
  },
  langToggle: { label: "EN", aria: "Switch to English" },
  hero: { scroll: "Kaydır", localSuffix: "yerel" },
  sections: {
    work: { label: "Seçilmiş Projeler", metaSuffix: "proje — 2025 / 2026" },
    about: {
      label: "Hakkımda & Deneyim",
      timeline: "Zaman çizelgesi",
      portrait: "Portre — d. 2003",
    },
    skills: { label: "Yetenekler & Stack", meta: "Hiçbir ilerleme çubuğu zarar görmedi" },
    testimonials: {
      label: "Referanslar",
      meta: "İş birlikçilerden sinyaller",
    },
    awards: {
      label: "Ödüller & Başarılar",
      meta: "Dış onaylar",
    },
    certificates: {
      label: "Sertifikalar",
      meta: "Kurslar & belgeler",
      view: "Sertifikayı gör ↗",
      showMore: "Daha fazla göster",
      showLess: "Daha az göster",
    },
    github: {
      label: "GitHub & Kod Aktivitesi",
      meta: "@MertC07 hesabından canlı veriler",
      viewProfile: "GitHub Profilini Gör ↗",
      reposTitle: "Aktif Depolar & Projeler",
      commitsNote: "Düzenli commit'ler ve aktif kod geliştirme süreci",
    },
    journal: {
      label: "Günlük",
      meta: "Zanaat üzerine notlar",
      readSuffix: "okuma",
      readCta: "Oku ↗",
    },
    contact: {
      label: "İletişim",
      meta: "24 saat içinde yanıt",
      lines: ["Birlikte", "çalışalım."],
      orWrite: "ya da doğrudan yaz ↗",
    },
  },
  projectCard: { cta: "Projeyi incele", ctaAria: "Vaka incelemesini gör:" },
  caseStudy: {
    back: "← Seçilmiş Projeler",
    live: "Canlı",
    visit: "Siteye git ↗",
    next: "Sıradaki proje",
    blocks: { challenge: "Zorluk", approach: "Yaklaşım", outcome: "Sonuç" },
  },
  post: { back: "← Günlük", readSuffix: "okuma", next: "Sıradaki yazı" },
  copyEmail: {
    copy: "Kopyala",
    copied: "Kopyalandı ✓",
    srCopied: "E-posta panoya kopyalandı",
    srCopy: "E-postayı kopyala",
  },
  footer: { built: "Sıfırdan yazıldı, şablon yok", backToTop: "Başa dön ↑" },
  preloader: "Portfolyo",
  notFound: {
    kicker: "Kayıp makara",
    titleA: "Bu sahne",
    titleB: "kesildi",
    body: "Aradığın sayfa final kurgusuna hiç giremedi — ya da daha sakin bir yere taşındı.",
    cta: "Açılış sahnesine dön",
  },
};

export const testimonials = [
  {
    quote: "Mert, sadece kod yazmakla kalmayıp sistem mimarisini de çok iyi anlayan, hızlı, temiz ve güvenilir çözümler üreten nadir öğrenci mühendislerden biridir.",
    name: "Dr. Kadir C.",
    role: "BANÜ Yazılım Mühendisliği Öğretim Üyesi",
  },
  {
    quote: "Rosso Lounge Bistro platformu için Mert ile çalışmak olağanüstüydü. İhtiyaçlarimizi yönetimi kolaylaştıran özel bir panele dönüştürerek bize saatlerce zaman kazandırdı.",
    name: "Hasan K.",
    role: "İşletme Sahibi, Rosso Lounge Bistro",
  },
];

export const awards = [
  {
    year: "2026",
    title: "TEKNOFEST 2026 Finalisti",
    issuer: "T3 Vakfı & Sanayi ve Teknoloji Bakanlığı",
    project: "5G & Yapay Zeka ile Akıllı Yol Güvenliği",
  },
];

// EDIT: örnek satırlar — canlıya almadan gerçek sertifikalarınla değiştir.
export const certificates: Certificate[] = [
  {
    title: "Generative AI for Games Development",
    issuer: "HP & edX",
    issued: "Tem 2026",
    href: "https://courses.edx.org/certificates/9716406a25684da384f57cea96bdfeee",
    image: "/certificates/edx-hp-hpgg04-en-sertifikasi.jpg",
  },
  {
    title: "Araştırmada Üretken Yapay Zekâ Kullanımı",
    issuer: "BTK Akademi",
    issued: "Haz 2026",
    image: "/certificates/arastirmada-uretken-yapay-zek-kullanimi-sertifika.jpg",
  },
  {
    title: "Anthropic Claude Uygulamalı Yapay Zekâ Eğitimi",
    issuer: "BTK Akademi",
    issued: "Haz 2026",
    image: "/certificates/anthropic-claude-sertifika-1.jpg",
  },
  {
    title: "Sosyal Medyada Yapay Zeka ile Dijital Pazarlama",
    issuer: "BTK Akademi & ASBÜ",
    issued: "Haz 2026",
    image: "/certificates/sosyal-medyada-yapay-zeka-ile-dijital-pazarlama-sertifika.jpg",
  },
  {
    title: "ChatGPT Prompt Mühendisliği, İçerik ve Görsel Üretme",
    issuer: "Udemy",
    issued: "Oca 2026",
    image: "/certificates/chatgpt-2026-prompt-muhendisligi-icerik-ve-gorsel-uretme.jpg",
  },
  {
    title: "C# Programlama Sertifikası",
    issuer: "BTK Akademi",
    issued: "Eyl 2025",
    image: "/certificates/c-programlama-sertifika.jpg",
  },
  {
    title: "Yapay Zeka ve Algoritmalarına Giriş",
    issuer: "BTK Akademi",
    issued: "Eki 2024",
    image: "/certificates/yapay-zeka-ve-algoritmalarina-giris-sertifika.jpg",
  },
  {
    title: "C# ile Derinlemesine Kodlama 101 ve Yazılımda Kariyer Eğitimi",
    issuer: "Bahçeşehir Wissen Akademie",
    issued: "Eki 2024",
    image: "/certificates/c-ile-derinlemesine-kodlama-101-ve-yazilimda-kariyer-egitimi.jpg",
  },
  {
    title: "PESNERGY Kariyer Zirvesi",
    issuer: "IEEE BANÜ Öğrenci Kolu",
    issued: "Haz 2024",
    image: "/certificates/pesnergy-kariyer-zirvesi-1-haziran-2024.png",
  },
  {
    title: "MII (Management Informatics Innovation) Zirvesi",
    issuer: "BANÜ Yönetim Bilişim Sistemleri Topluluğu",
    issued: "May 2024",
    image: "/certificates/mii-management-informatics-innovation.jpg",
  },
  {
    title: "Başarılı Bir Mühendisin Kariyer Ufukları",
    issuer: "BANÜ Bilişim ve Teknoloji Topluluğu",
    issued: "Nis 2024",
    image: "/certificates/basarili-bir-muhendisin-kariyer-ufuklari-1-nisan-2024.png",
  },
  {
    title: "Web ve Mobil Uygulama Geliştirmede React'ın Katkıları",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Mar 2024",
    image: "/certificates/web-ve-mobil-uygulama-gelistirmede-react-in-katkilari-30-mart-2024.jpg",
  },
  {
    title: "İş Hayatında En Çok Kullanılan Excel Fonksiyonları",
    issuer: "BANÜ Yönetim Bilişim Sistemleri Topluluğu",
    issued: "Mar 2024",
    image: "/certificates/is-hayatinda-en-cok-kullanilan-excel-fonksiyonlari-25-mart-2024.jpg",
  },
  {
    title: "Okul Bitti Ya Sonra?",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Mar 2024",
    image: "/certificates/okul-bitti-ya-sonra-7-mart-2024.jpg",
  },
  {
    title: "Temel Network Eğitimi",
    issuer: "BANÜ Cyber",
    issued: "Ara 2023",
    image: "/certificates/temel-network-egitimi.png",
  },
  {
    title: "Yeni Başlayanlar için Python Programlama",
    issuer: "BTK Akademi",
    issued: "Ara 2023",
    image: "/certificates/yeni-baslayanlar-icin-python-programlama-sertifika-1.png",
  },
  {
    title: "Sağlıklı Yaşam ve Ek Gıdaların Önemi",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Ara 2023",
    image: "/certificates/saglikli-yasam-ve-ek-gidalarin-onemi.jpg",
  },
  {
    title: "Mülakat 101 (kariyer.net)",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Ara 2023",
    image: "/certificates/mulakat-101-kariyer-net-11-aralik-2023.png",
  },
  {
    title: "Yazılım Zirvesi Katılım Sertifikası",
    issuer: "BANÜ Bilişim ve Teknoloji Topluluğu",
    issued: "Ara 2023",
    image: "/certificates/yazilimzirvesi.png",
  },
  {
    title: "Kariyer.net İş Hayatına İlk Adım",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Ara 2023",
    image: "/certificates/kariyer-net-is-hayatina-ilk-adim-4-aralik-2023-1.png",
  },
  {
    title: "Yazılımda Kariyer Yolu 5",
    issuer: "BANÜ Yazılım Mühendisliği Topluluğu",
    issued: "Kas 2023",
    image: "/certificates/yazilimda-kariyer-yolu-5-6-kasim-2023.jpg",
  },
  {
    title: "Siber Güvenlik Eğitimi",
    issuer: "BTK Akademi",
    issued: "Kas 2023",
    image: "/certificates/siber-guvenlik-5-kasim-2023.png",
  },
];

