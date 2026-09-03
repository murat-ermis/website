/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to update the site — no component changes needed.
 */

export const profile = {
  name: "Murat Ermiş",
  role: "Yazılım Geliştirici",
  tagline: "Ölçeklenebilir backend sistemleri ve modern web arayüzleri tasarlıyorum.",
  location: "İstanbul, Türkiye",
  email: "mrtrms61@gmail.com",
  summary:
    "Dağıtık sistemler, bulut altyapısı ve kullanıcı deneyimi arasındaki dengeyi kurmayı seven bir yazılım geliştiriciyim. Kod yazmadığım zamanlarda ise -tıpkı ana sayfadaki karakter gibi- masadan kalkıp biraz hareket etmeye çalışıyorum.",
  availability: "Yeni projelere açık",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/murat-ermis", handle: "@murat-ermis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/murat-ermis", handle: "/in/murat-ermis" },
  { label: "E-posta", href: "mailto:mrtrms61@gmail.com", handle: "mrtrms61@gmail.com" },
] as const;

export const skills = [
  {
    group: "Diller",
    items: ["TypeScript", "Java", "Go", "Python", "SQL"],
  },
  {
    group: "Backend",
    items: ["Spring Boot", "Node.js", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Three.js", "Tailwind CSS"],
  },
  {
    group: "Altyapı",
    items: ["Docker", "Kubernetes", "Helm", "GitHub Actions", "Terraform"],
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  stack: readonly string[];
  href?: string;
  repo?: string;
  highlight?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "personal-website-threejs",
    title: "Kişisel Web Sitesi",
    summary: "Three.js ile canlandırılmış, tamamen statik bir tanıtım sitesi.",
    description:
      "Next.js App Router üzerine kurulu, GitHub Pages'e statik olarak dağıtılan kişisel site. Ana sayfadaki karakter prosedürel olarak modellendi ve iskelet animasyonu yerine poz harmanlama tekniğiyle canlandırıldı; harici bir 3B model dosyası yüklenmiyor.",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "GitHub Actions"],
    repo: "https://github.com/murat-ermis/personal-website-threejs",
    highlight: true,
  },
  {
    slug: "dagitik-gorev-kuyrugu",
    title: "Dağıtık Görev Kuyruğu",
    summary: "Yüksek hacimli iş yüklerini yöneten, yeniden deneme destekli kuyruk servisi.",
    description:
      "Kafka tabanlı, idempotent tüketicilerle çalışan bir görev kuyruğu. Ölü mektup kuyruğu, üstel geri çekilme ve iş bazlı öncelik desteği içeriyor. Prometheus metrikleriyle izleniyor.",
    year: "2025",
    stack: ["Go", "Kafka", "PostgreSQL", "Prometheus"],
    highlight: true,
  },
  {
    slug: "kubernetes-platform",
    title: "İç Geliştirici Platformu",
    summary: "Ekiplerin servislerini tek komutla dağıtabildiği Kubernetes tabanlı platform.",
    description:
      "Helm şablonları ve GitOps akışıyla, yeni bir servisin üretime çıkma süresini günlerden dakikalara indiren bir iç platform. Ortam bazlı yapılandırma, otomatik TLS ve merkezî günlükleme sağlıyor.",
    year: "2025",
    stack: ["Kubernetes", "Helm", "ArgoCD", "Terraform"],
  },
  {
    slug: "gercek-zamanli-panel",
    title: "Gerçek Zamanlı İzleme Paneli",
    summary: "WebSocket üzerinden saniyede binlerce olayı görselleştiren kontrol paneli.",
    description:
      "Sunucu tarafında toplulaştırılan olayları WebSocket ile aktaran, sanallaştırılmış tablolar ve canvas tabanlı grafiklerle akıcı kalan bir izleme arayüzü.",
    year: "2024",
    stack: ["React", "TypeScript", "WebSocket", "Redis"],
  },
] as const;

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
};

export const timeline: readonly TimelineEntry[] = [
  {
    period: "2023 — günümüz",
    title: "Kıdemli Yazılım Geliştirici",
    org: "Şirket Adı",
    description:
      "Dağıtık servislerin tasarımı ve bakımı, dağıtım hattının modernleştirilmesi ve genç geliştiricilere mentorluk.",
  },
  {
    period: "2021 — 2023",
    title: "Yazılım Geliştirici",
    org: "Şirket Adı",
    description:
      "Müşteriye dönük ürünlerin backend servislerini geliştirdim; veritabanı şemalarını ve API sözleşmelerini tasarladım.",
  },
  {
    period: "2017 — 2021",
    title: "Bilgisayar Mühendisliği",
    org: "Üniversite Adı",
    description:
      "Lisans eğitimi. Bitirme projesi kapsamında dağıtık sistemler üzerine çalıştım.",
  },
] as const;

export const nav = [
  { href: "/", label: "Tanıtım" },
  { href: "/projeler", label: "Yaptıklarım" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/iletisim", label: "İletişim" },
] as const;
