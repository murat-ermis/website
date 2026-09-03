/**
 * Single source of truth for every piece of copy on the site.
 * Every visible string carries both a Turkish and an English version.
 */

import type { Localized } from "./i18n";

export const profile = {
  name: "Murat Ermiş",
  role: {
    tr: "Kıdemli Yazılım Geliştirici",
    en: "Senior Software Developer",
  },
  headline: {
    tr: "E-ticaret · Ödeme sistemleri · Backend",
    en: "E-commerce · Payment gateways · Backend",
  },
  tagline: {
    tr: "E-ticaret ve ödeme sistemleri üzerine çalışan, yüksek trafikli servisleri ayakta tutan bir yazılım geliştiriciyim.",
    en: "I am a software developer working on e-commerce and payment systems, keeping high-traffic services running.",
  },
  location: {
    tr: "Trabzon, Türkiye",
    en: "Trabzon, Türkiye",
  },
  email: "mrtrms61@gmail.com",
  availability: {
    tr: "Yeni projelere açık",
    en: "Open to new projects",
  },
  summary: {
    tr: "2012'den beri yazılım geliştiriyorum. Yolun büyük bölümü e-ticaret ve ödeme sistemlerinde geçti: yüksek trafikli servisler, ödeme sağlayıcı entegrasyonları ve bunların arkasındaki veri modelleri. PHP ve Go tarafında backend yazıyor, Vue ve Nuxt ile önyüzünü kuruyorum; React, Next.js, Java, Spring ve masaüstü tarafında Rust ile Tauri de kullandığım araçlar arasında. Kod yazmadığım zamanlarda ise -tıpkı yukarıdaki karakter gibi- masadan kalkıp biraz hareket etmeye çalışıyorum.",
    en: "I have been building software since 2012. Most of that road runs through e-commerce and payment systems: high-traffic services, payment provider integrations and the data models behind them. I write backends in PHP and Go and build their front ends with Vue and Nuxt; React, Next.js, Java, Spring, and Rust with Tauri on the desktop are also part of my toolbox. When I am not writing code I try to get up from the desk and move a little — much like the character above.",
  },
} as const;

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/murat-ermis",
    handle: "@murat-ermis",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/murat-ermis/",
    handle: "/in/murat-ermis",
  },
  {
    label: { tr: "E-posta", en: "Email" },
    href: "mailto:mrtrms61@gmail.com",
    handle: "mrtrms61@gmail.com",
  },
] as const;

/** A skill label is either the same in both languages, or translated. */
export type SkillLabel = string | Localized;

export type SkillGroup = {
  group: Localized;
  items: readonly SkillLabel[];
};

export const skills: readonly SkillGroup[] = [
  {
    group: { tr: "Diller", en: "Languages" },
    items: ["PHP", "Go", "JavaScript", "TypeScript", "Java", "Rust", "SQL"],
  },
  {
    group: { tr: "Backend", en: "Backend" },
    items: ["Laravel", "Symfony", "Spring Boot", "REST", "gRPC", "Redis"],
  },
  {
    group: { tr: "Önyüz", en: "Frontend" },
    items: ["Vue", "Nuxt", "React", "Next.js", "Three.js", "Tailwind CSS"],
  },
  {
    group: { tr: "Veri", en: "Data" },
    items: ["PostgreSQL", "MySQL", "Elasticsearch", "RabbitMQ"],
  },
  {
    group: { tr: "Masaüstü", en: "Desktop" },
    items: ["Rust", "Tauri"],
  },
  {
    group: { tr: "Altyapı", en: "Infrastructure" },
    items: ["Docker", "Kubernetes", "Git", "CI/CD", "Linux"],
  },
  {
    group: { tr: "Alan bilgisi", en: "Domain" },
    items: [
      { tr: "E-ticaret", en: "E-commerce" },
      { tr: "Ödeme sistemleri", en: "Payment gateways" },
      { tr: "Yüksek trafik", en: "High traffic" },
    ],
  },
];

export type Project = {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  year: string;
  stack: readonly string[];
  href?: string;
  repo?: string;
  highlight?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "website",
    title: { tr: "Kişisel Web Sitesi", en: "Personal Website" },
    summary: {
      tr: "Three.js ile canlandırılmış, tamamen statik bir tanıtım sitesi.",
      en: "A fully static portfolio site brought to life with Three.js.",
    },
    description: {
      tr: "Next.js App Router üzerine kurulu, GitHub Pages'e statik olarak dağıtılan kişisel site. Sahnedeki karakter prosedürel olarak modellendi; iskelet animasyonu yerine poz harmanlama ve ters kinematik kullanıldı, harici bir 3B model dosyası yüklenmiyor.",
      en: "A personal site built on the Next.js App Router and deployed statically to GitHub Pages. The character is modelled procedurally and animated with pose blending and inverse kinematics instead of a skeletal rig, so no external 3D model is ever downloaded.",
    },
    year: "2026",
    stack: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "GitHub Actions"],
    repo: "https://github.com/murat-ermis/website",
    highlight: true,
  },
  {
    slug: "odeme-entegrasyonlari",
    title: {
      tr: "Ödeme Sağlayıcı Entegrasyonları",
      en: "Payment Gateway Integrations",
    },
    summary: {
      tr: "Birden fazla ödeme sağlayıcısını tek bir sözleşme arkasında toplayan servis katmanı.",
      en: "A service layer that puts several payment providers behind one contract.",
    },
    description: {
      tr: "3D Secure akışları, taksitlendirme, iade ve kısmi iade gibi işlemleri sağlayıcıdan bağımsız tek bir arayüz arkasında toplayan katman. Idempotent istekler, yeniden deneme ve sağlayıcı bazlı hata eşlemesi ile ödeme akışının kesintiye uğramaması hedeflendi.",
      en: "A layer that unifies 3D Secure flows, instalments, refunds and partial refunds behind one provider-independent interface. Idempotent requests, retries and per-provider error mapping keep the payment flow from breaking.",
    },
    year: "2021 — 2025",
    stack: ["PHP", "Go", "PostgreSQL", "Redis"],
    highlight: true,
  },
  {
    slug: "eticaret-onyuz",
    title: {
      tr: "E-ticaret Önyüzü",
      en: "E-commerce Storefront",
    },
    summary: {
      tr: "Yüksek trafik altında hızlı kalan Vue ve Nuxt tabanlı mağaza arayüzü.",
      en: "A Vue and Nuxt storefront that stays fast under heavy traffic.",
    },
    description: {
      tr: "Sunucu tarafında oluşturulan sayfalar, ürün listelerinde sanallaştırma ve dikkatli önbellek stratejisiyle kampanya dönemlerindeki yük artışını karşılayan mağaza arayüzü.",
      en: "A storefront that absorbs campaign-period traffic spikes through server-rendered pages, virtualised product listings and a careful caching strategy.",
    },
    year: "2021 — 2025",
    stack: ["Vue", "Nuxt", "TypeScript", "Elasticsearch"],
  },
  {
    slug: "tauri-masaustu",
    title: {
      tr: "Tauri Masaüstü Uygulaması",
      en: "Tauri Desktop Application",
    },
    summary: {
      tr: "Rust çekirdeği ve web arayüzüyle çalışan çapraz platform masaüstü uygulaması.",
      en: "A cross-platform desktop app with a Rust core and a web interface.",
    },
    description: {
      tr: "Ağır işleri Rust tarafında yapan, arayüzü web teknolojileriyle yazılmış bir Tauri uygulaması. Electron'a göre çok daha küçük paket boyutu ve düşük bellek kullanımı sağlıyor; dosya sistemi ve yerel veritabanı erişimi Rust komutları üzerinden yönetiliyor.",
      en: "A Tauri application that does the heavy lifting in Rust and renders its interface with web technologies. It ships a far smaller bundle and uses less memory than an Electron equivalent, with file system and local database access handled through Rust commands.",
    },
    year: "2025",
    stack: ["Rust", "Tauri", "TypeScript"],
  },
];

export type TimelineEntry = {
  period: Localized;
  title: Localized;
  org: string;
  place: Localized;
  description: Localized;
};

export const timeline: readonly TimelineEntry[] = [
  {
    period: { tr: "Eki 2025 — günümüz", en: "Oct 2025 — present" },
    title: { tr: "Kıdemli Backend Geliştirici", en: "Sr. Backend Developer" },
    org: "Zenarmor",
    place: { tr: "Uzaktan", en: "Remote" },
    description: {
      tr: "Ağ güvenliği ürünlerinin arkasındaki backend servislerini geliştiriyorum.",
      en: "Building the backend services behind network security products.",
    },
  },
  {
    period: { tr: "Tem 2021 — May 2025", en: "Jul 2021 — May 2025" },
    title: { tr: "Full Stack Geliştirici", en: "Full Stack Developer" },
    org: "Modanisa",
    place: { tr: "İstanbul · Uzaktan", en: "İstanbul · Remote" },
    description: {
      tr: "Yüksek trafikli bir e-ticaret platformunda PHP ve Go ile servisler, Vue ve Nuxt ile arayüzler geliştirdim; ödeme sağlayıcı entegrasyonları üzerinde çalıştım.",
      en: "Built services in PHP and Go and interfaces in Vue and Nuxt on a high-traffic e-commerce platform, and worked on payment provider integrations.",
    },
  },
  {
    period: { tr: "Mar 2017 — Eki 2019", en: "Mar 2017 — Oct 2019" },
    title: {
      tr: "Full Stack Geliştirici · Genel Müdür",
      en: "Full Stack Developer · General Manager",
    },
    org: "Faydata Bilgi Teknolojileri",
    place: { tr: "Trabzon", en: "Trabzon" },
    description: {
      tr: "Laravel ve PostgreSQL ile müşteri projeleri geliştirdim; aynı dönemde şirketin genel müdürlüğünü yürüttüm.",
      en: "Developed client projects with Laravel and PostgreSQL while also running the company as its general manager.",
    },
  },
  {
    period: { tr: "Mar 2012 — Mar 2015", en: "Mar 2012 — Mar 2015" },
    title: { tr: "Yazılım Uzmanı", en: "Software Specialist" },
    org: "YD Yazılım",
    place: { tr: "Ankara", en: "Ankara" },
    description: {
      tr: "Teknokent Bilgi Sistemi ve Tesmer Otomasyon Sistemi'nin geliştirilmesinde, ayrıca T.C. Kütüphaneler ve Yayınlar Genel Müdürlüğü'ne ait sistemin geliştirilip yayına alınmasında görev aldım.",
      en: "Worked on the Teknokent Information System and the Tesmer Automation System, and on developing and releasing the system for the Turkish Directorate General of Libraries and Publications.",
    },
  },
];

export type SectionId =
  | "tanitim"
  | "hakkimda"
  | "teknolojiler"
  | "deneyim"
  | "projeler"
  | "iletisim";

export const sections: readonly { id: SectionId; label: Localized }[] = [
  { id: "tanitim", label: { tr: "Tanıtım", en: "Intro" } },
  { id: "hakkimda", label: { tr: "Hakkımda", en: "About" } },
  { id: "teknolojiler", label: { tr: "Teknolojiler", en: "Tech" } },
  { id: "deneyim", label: { tr: "Deneyim", en: "Experience" } },
  { id: "projeler", label: { tr: "Yaptıklarım", en: "Work" } },
  { id: "iletisim", label: { tr: "İletişim", en: "Contact" } },
];

/** Section headings and the rest of the page furniture. */
export const ui = {
  skipToContent: { tr: "İçeriğe geç", en: "Skip to content" },
  menu: { tr: "Menü", en: "Menu" },
  close: { tr: "Kapat", en: "Close" },
  greeting: { tr: "Merhaba, ben", en: "Hi, I'm" },
  seeWork: { tr: "Yaptıklarıma göz at", en: "See my work" },
  getInTouch: { tr: "İletişime geç", en: "Get in touch" },

  aboutEyebrow: { tr: "Hakkımda", en: "About" },
  aboutTitle: { tr: "Kısaca ben", en: "A short introduction" },
  aboutBody2: {
    tr: "İşimin en sevdiğim tarafı, karmaşık bir problemi anlaşılır parçalara bölmek. Bir servisin neden yavaşladığını bulmak da, bir arayüzün neden hantal hissettirdiğini çözmek de aynı merakla başlıyor.",
    en: "The part of the job I enjoy most is breaking a complex problem into understandable pieces. Finding out why a service slowed down and working out why an interface feels sluggish both start from the same curiosity.",
  },
  aboutBody3: {
    tr: "Kod incelemelerine, teknik dokümantasyona ve ekip içi bilgi paylaşımına vakit ayırmayı önemsiyorum. Uzun vadede bir ürünü ayakta tutan şeyin tek tek satırlar değil, ekibin ortak alışkanlıkları olduğunu düşünüyorum.",
    en: "I care about spending time on code review, technical documentation and sharing knowledge within the team. What keeps a product alive over the long run is not the individual lines but the habits a team shares.",
  },

  techEyebrow: { tr: "Araç kutusu", en: "Toolbox" },
  techTitle: { tr: "Günlük olarak kullandıklarım", en: "What I work with" },
  techLead: {
    tr: "Backend'den masaüstüne, arayüzden dağıtım hattına kadar uzanan bir yelpaze.",
    en: "A range that runs from the backend to the desktop, and from the interface to the delivery pipeline.",
  },

  experienceEyebrow: { tr: "Yolculuk", en: "Journey" },
  experienceTitle: { tr: "Deneyim", en: "Experience" },

  projectsEyebrow: { tr: "Yaptıklarım", en: "Work" },
  projectsTitle: { tr: "Projeler", en: "Projects" },
  projectsLead: {
    tr: "Hem üretimde çalışan sistemler hem de öğrenmek için kurduğum yan projeler.",
    en: "Systems running in production alongside side projects I built to learn.",
  },
  sourceCode: { tr: "Kaynak kodu", en: "Source code" },
  liveDemo: { tr: "Canlı demo", en: "Live demo" },

  contactEyebrow: { tr: "İletişim", en: "Contact" },
  contactTitle: { tr: "Bir fikriniz mi var?", en: "Have an idea?" },
  contactLead: {
    tr: "Yeni projeler, iş birlikleri veya sadece merhaba demek için yazabilirsiniz.",
    en: "Write to me about new projects, collaborations, or just to say hello.",
  },
  open: { tr: "Aç", en: "Open" },

  whatIDoEyebrow: { tr: "Ne yapıyorum", en: "What I do" },
  whatIDoTitle: {
    tr: "Fikirden üretime kadar tüm yolculuk",
    en: "The whole way from idea to production",
  },
  cards: [
    {
      title: { tr: "Backend ve ödeme akışları", en: "Backend and payment flows" },
      body: {
        tr: "PHP ve Go ile servisler, ödeme sağlayıcı entegrasyonları ve yüksek trafiğe dayanan veri modelleri kuruyorum.",
        en: "I build services in PHP and Go, payment provider integrations, and data models that hold up under heavy traffic.",
      },
    },
    {
      title: { tr: "Modern arayüzler", en: "Modern interfaces" },
      body: {
        tr: "Vue, Nuxt, React ve Next.js ile hızlı, erişilebilir ve akıcı arayüzler geliştiriyorum.",
        en: "I build fast, accessible and fluid interfaces with Vue, Nuxt, React and Next.js.",
      },
    },
    {
      title: { tr: "Masaüstü uygulamaları", en: "Desktop applications" },
      body: {
        tr: "Rust ve Tauri ile küçük paket boyutlu, hızlı açılan çapraz platform masaüstü uygulamaları yazıyorum.",
        en: "I write cross-platform desktop apps with Rust and Tauri that ship small and start fast.",
      },
    },
  ],

  footerPages: { tr: "Bölümler", en: "Sections" },
  footerLinks: { tr: "Bağlantılar", en: "Links" },
  builtWith: {
    tr: "Next.js ve Three.js ile yapıldı.",
    en: "Built with Next.js and Three.js.",
  },

  scenePaused: { tr: "Devam et", en: "Resume" },
  scenePlaying: { tr: "Duraklat", en: "Pause" },
  sceneSkip: { tr: "Jimnastiğe atla", en: "Skip to workout" },
  sceneDrag: {
    tr: "Sahneyi döndürmek için sürükleyin",
    en: "Drag to rotate the scene",
  },
  sceneLoading: { tr: "Sahne yükleniyor…", en: "Loading scene…" },
  sceneDescription: {
    tr: "Bir yazılımcı bilgisayarında kod yazıyor; yaklaşık on üç saniye sonra masadan kalkıp jumping jack, esneme, öne eğilme, squat ve kol çevirme hareketleri yapıyor, ardından masasına dönüyor.",
    en: "A developer is typing code at their computer; after about thirteen seconds they get up and do jumping jacks, side stretches, forward folds, squats and arm circles, then return to the desk.",
  },

  notFoundTitle: { tr: "Bu sayfayı bulamadım", en: "Page not found" },
  notFoundLead: {
    tr: "Aradığınız adres taşınmış ya da hiç var olmamış olabilir.",
    en: "The address you were looking for may have moved, or may never have existed.",
  },
  backHome: { tr: "Ana sayfaya dön", en: "Back to home" },
} as const;

/** Phase captions for the hero animation, kept next to the rest of the copy. */
export const phaseLabels = {
  coding: { tr: "Kod yazıyor", en: "Writing code" },
  standUp: { tr: "Mola veriyor", en: "Taking a break" },
  jacks: { tr: "Jumping jack", en: "Jumping jacks" },
  twist: { tr: "Yana esneme", en: "Side stretch" },
  toeTouch: { tr: "Öne eğilme", en: "Forward fold" },
  squat: { tr: "Squat", en: "Squats" },
  armCircles: { tr: "Kol çevirme", en: "Arm circles" },
  sitDown: { tr: "Masaya dönüyor", en: "Back to the desk" },
} as const;
