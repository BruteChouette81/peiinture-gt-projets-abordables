import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import heroImg from "@/assets/hero-interior.jpg";
import beforeLiving from "@/assets/before-living.jpg";
import afterLiving from "@/assets/after-living.jpg";
import beforeExterior from "@/assets/before-exterior.jpg";
import afterExterior from "@/assets/after-exterior.jpg";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import pressureWashing from "@/assets/pressure-washing.jpg";
import toolsImg from "@/assets/tools.jpg";
import crewImg from "@/assets/crew.jpg";
import doorImg from "@/assets/door.jpg";
import stairsImg from "@/assets/stairs.jpg";
import accentWall from "@/assets/accent-wall.jpg";
import logoMark from "@/assets/logo-mark.png";
import logoFull from "@/assets/logo.png";

// TODO: remplacer par le lien exact de la page Facebook de Peinture GT
const FACEBOOK_URL = "https://www.facebook.com/";

const NAV = [
  { label: "Façon de faire", href: "#facon" },
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#apropos" },
  { label: "Facebook", href: "#facebook" },
];

const STEPS = [
  {
    title: "Soumission gratuite",
    text: "On passe chez vous, on évalue le projet et on vous donne un prix clair — sans engagement.",
  },
  {
    title: "Lavage à pression",
    text: "On nettoie les surfaces au jet haute pression pour que la peinture accroche et dure.",
  },
  {
    title: "Sablage",
    text: "On ponce et on prépare chaque surface pour un fini lisse, sans trace, sans bavure.",
  },
  {
    title: "Apprêt si nécessaire",
    text: "On applique le primer quand la surface l'exige, pour une vraie couverture uniforme.",
  },
  {
    title: "Deux couches de peinture",
    text: "Toujours deux couches complètes. On ne fait jamais les choses à moitié.",
  },
  {
    title: "Nettoyage du chantier",
    text: "On repart avec tout le matériel et on vous laisse un chantier impeccable.",
  },
];

const BEFORE_AFTER = [
  {
    before: beforeLiving,
    after: afterLiving,
    title: "Salon — intérieur",
    tag: "Crème chaud + mur vert sauge",
    aspect: "aspect-[5/6]",
  },
  {
    before: beforeExterior,
    after: afterExterior,
    title: "Façade — extérieur",
    tag: "Vert pin + trim blanc",
    aspect: "aspect-[4/3]",
  },
  {
    before: beforeKitchen,
    after: afterKitchen,
    title: "Cuisine — armoires",
    tag: "Armoires repeintes + vert sauge",
    aspect: "aspect-[5/6]",
  },
];

const FB_WALL = [doorImg, accentWall, stairsImg, heroImg];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Peinture GT | Peinture clé en main à prix abordables — Soumission gratuite",
      },
      {
        name: "description",
        content:
          "Peinture résidentielle intérieure et extérieure à prix abordables, fondée par des étudiants expérimentés. Soumission gratuite, tout le matériel fourni, chantier nettoyé.",
      },
      {
        property: "og:title",
        content: "Peinture GT | Peinture clé en main à prix abordables — Soumission gratuite",
      },
      {
        property: "og:description",
        content:
          "Peinture résidentielle intérieure et extérieure à prix abordables. Soumission gratuite, deux couches de peinture, matériel fourni et chantier nettoyé.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tape">{children}</p>
  );
}

function TapeStrip() {
  return <div className="h-1.5 w-full bg-tape/80" aria-hidden />;
}

function BeforeAfterCard({
  before,
  after,
  title,
  tag,
  aspect,
  delay,
}: {
  before: string;
  after: string;
  title: string;
  tag: string;
  aspect: string;
  delay: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        aria-pressed={active}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl text-left outline-1 -outline-offset-1 outline-border"
      >
        <div className={`relative ${aspect} overflow-hidden`}>
          <img
            src={before}
            alt={`${title} — avant la peinture`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={after}
            alt={`${title} — après la peinture`}
            loading="lazy"
            data-active={active}
            className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] data-[active=true]:[clip-path:inset(0_0_0_0)]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
            Avant
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-tape px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active]:opacity-0">
            Après
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 bg-card px-4 py-3">
          <p className="font-display text-base font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{tag}</p>
        </div>
      </button>
    </Reveal>
  );
}

function Index() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ===== En-tête ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#" className="flex items-center gap-3" aria-label="Peinture GT — accueil">
            <img
              src={logoMark}
              alt="Logo Peinture GT"
              className="h-11 w-auto"
              width={969}
              height={614}
            />
            <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
              Peinture GT
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/75 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-foreground/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/85 transition-colors hover:border-tape hover:text-tape sm:inline-flex"
            >
              Facebook
            </a>
            <a
              href="#soumission"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Soumission gratuite
            </a>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Peintre roulant une peinture vert sauge sur un mur dans une salle de séjour"
          width={1920}
          height={1088}
          className="h-[78vh] min-h-[560px] w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
          aria-hidden
        />
        <div className="absolute inset-0 grid place-items-center px-5 pt-16">
          <div className="glass-strong rise max-w-2xl rounded-3xl p-8 text-center shadow-2xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tape">
              Peinture résidentielle · Intérieur & extérieur
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl">
              Peinture clé en main, à prix abordables.
            </h1>
            <p className="mx-auto mt-5 max-w-[48ch] text-pretty text-base text-foreground/85">
              Fondée par des étudiants avec beaucoup d'expérience en peinture, Peinture GT rend tous
              vos projets possibles — soumission gratuite, tout le matériel fourni, chantier nettoyé
              à la fin.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#soumission"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Demander une soumission
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
              >
                Suivre nos chantiers sur Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <TapeStrip />

      {/* ===== Façon de faire ===== */}
      <section id="facon" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>Notre façon de faire</Eyebrow>
          <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold text-balance sm:text-4xl">
            Un projet clé en main, du début à la fin.
          </h2>
          <p className="mt-4 max-w-[56ch] text-pretty text-muted-foreground">
            On s'occupe de tout : de la soumission gratuite jusqu'au nettoyage du chantier, on
            fournit tout le matériel. Vous n'avez qu'à nous montrer le mur.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <li className="glass flex h-full gap-4 rounded-2xl p-6">
                <span className="font-display text-2xl font-semibold text-tape">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-pretty text-muted-foreground">{step.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal delay={80}>
            <figure className="group overflow-hidden rounded-2xl outline-1 -outline-offset-1 outline-border">
              <img
                src={pressureWashing}
                alt="Lavage à pression du revêtement extérieur d'une maison"
                loading="lazy"
                width={1408}
                height={1008}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Lavage à pression</span> — on prépare
                la façade avant de peindre.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={160}>
            <figure className="group overflow-hidden rounded-2xl outline-1 -outline-offset-1 outline-border">
              <img
                src={toolsImg}
                alt="Matériel de peinture fourni : rouleau, pinceau, bac et bloc de ponçage"
                loading="lazy"
                width={1408}
                height={1008}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Tout le matériel fourni</span> —
                peinture, rouleaux, bâches, ruban.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <TapeStrip />

      {/* ===== Projets ===== */}
      <section id="projets" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>Projets & accomplissements</Eyebrow>
          <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold text-balance sm:text-4xl">
            Avant / après, sans tricher.
          </h2>
          <p className="mt-4 max-w-[56ch] text-pretty text-muted-foreground">
            Survolez une photo (ou touchez-la) pour voir le résultat après notre passage.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE_AFTER.map((project, i) => (
            <BeforeAfterCard key={project.title} {...project} delay={i * 100} />
          ))}
        </div>

        <Reveal delay={120}>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tape transition-colors hover:text-primary"
          >
            Plus de projets et de photos sur notre page Facebook →
          </a>
        </Reveal>
      </section>

      <TapeStrip />

      {/* ===== À propos ===== */}
      <section id="apropos" className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>À propos</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
              Des étudiants le jour, des peintres de métier.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Peinture GT a été fondée par des étudiants qui ont accumulé beaucoup d'expérience dans
              le domaine de la peinture. On a commencé avec deux pinceaux et un char — aujourd'hui,
              on a des centaines de murs derrière nous.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Et on garde les prix abordables, justement : notre mission, c'est de rendre tous les
              projets possibles, pas juste ceux avec un gros budget.
            </p>
            <ul className="mt-7 grid gap-3 text-sm">
              {[
                "Soumission gratuite et sans engagement",
                "Tout le matériel fourni",
                "Deux couches de peinture, toujours",
                "Chantier nettoyé à la fin",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-tape" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <figure className="overflow-hidden rounded-3xl outline-1 -outline-offset-1 outline-border">
              <img
                src={crewImg}
                alt="Deux jeunes peintres souriants marchant sur le terrain avec une échelle et un rouleau"
                loading="lazy"
                width={1408}
                height={1200}
                className="h-[460px] w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ===== Facebook ===== */}
      <section id="facebook" className="bg-navy">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Le cœur de notre marketing</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Nos chantiers se passent sur Facebook.
              </h2>
              <p className="mt-5 max-w-[48ch] text-pretty leading-relaxed text-foreground/75">
                C'est là qu'on publie nos avant/après, nos offres du moment et où on répond le plus
                vite. Suivez-nous pour voir le vrai travail, sans filtre.
              </p>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-foreground hover:text-navy"
              >
                Suivre Peinture GT sur Facebook →
              </a>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {FB_WALL.map((src, i) => (
                <Reveal key={src + i} delay={i * 80}>
                  <div className="overflow-hidden rounded-2xl outline-1 -outline-offset-1 outline-foreground/15">
                    <img
                      src={src}
                      alt="Photo de chantier publiée sur la page Facebook de Peinture GT"
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Soumission ===== */}
      <section id="soumission" className="mx-auto max-w-6xl px-5 pb-28 pt-24">
        <Reveal>
          <div className="glass-strong grid gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Soumission gratuite</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Parlez-nous de votre projet.
              </h2>
              <p className="mt-4 max-w-[44ch] text-pretty text-muted-foreground">
                Pas de frais, pas de pression. Remplissez le formulaire et on vous répond rapidement
                avec un vrai prix pour votre projet.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-foreground/85">
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-tape" aria-hidden /> Réponse sous 24 h
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-tape" aria-hidden /> Visite et soumission
                  gratuites
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-tape" aria-hidden /> Matériel et nettoyage
                  inclus
                </li>
              </ul>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex text-sm font-semibold text-tape transition-colors hover:text-primary"
              >
                Pour une réponse encore plus vite : Facebook Messenger →
              </a>
            </div>

            {sent ? (
              <div className="glass flex flex-col items-center justify-center rounded-2xl p-10 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-tape text-xl font-bold text-primary-foreground">
                  ✓
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">Merci !</h3>
                <p className="mt-2 max-w-[36ch] text-sm text-muted-foreground">
                  Votre demande est partie. On vous répond dans les 24 h avec un prix clair et sans
                  engagement.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-tape hover:text-primary"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input
                  type="text"
                  name="nom"
                  required
                  placeholder="Votre nom"
                  className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-tape focus:outline-none"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    name="courriel"
                    required
                    placeholder="Courriel"
                    className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-tape focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone (optionnel)"
                    className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-tape focus:outline-none"
                  />
                </div>
                <select
                  name="type"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground focus:border-tape focus:outline-none"
                >
                  <option value="" disabled>
                    Type de projet
                  </option>
                  <option className="bg-background">Intérieur</option>
                  <option className="bg-background">Extérieur</option>
                  <option className="bg-background">Intérieur et extérieur</option>
                  <option className="bg-background">Armoires / mobilier</option>
                  <option className="bg-background">Autre</option>
                </select>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Décrivez votre projet : quelle pièce, quelle couleur, quand…"
                  className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-tape focus:outline-none"
                />
                <button
                  type="submit"
                  className="justify-self-start rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      {/* ===== Pied de page ===== */}
      <footer className="border-t border-foreground/10 bg-deep">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="rise">
              <img
                src={logoFull}
                alt="Peinture Grand Tronc — Qualité, fiabilité, fini impeccable"
                loading="lazy"
                width={1024}
                height={1088}
                className="h-40 w-auto"
              />
              <p className="mt-5 max-w-[52ch] text-sm text-pretty text-foreground/70">
                Entreprise de peinture résidentielle intérieure et extérieure, fondée par des
                étudiants expérimentés. Tous les projets possibles, à prix abordables.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/75">
                {NAV.map((item) => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                ))}
                <a href="#soumission" className="transition-colors hover:text-foreground">
                  Soumission
                </a>
              </nav>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Suivez-nous sur Facebook
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-foreground/10 pt-6 text-xs text-foreground/50 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Peinture GT · Peinture résidentielle intérieur & extérieur</p>
            <p>Soumission gratuite · Matériel fourni · Chantier nettoyé</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
