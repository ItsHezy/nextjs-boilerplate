import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

const offerings = [
  {
    name: "Basic",
    price: "\u20ac50",
    summary:
      "A crisp starter presence for small businesses that need to look cleaner immediately.",
    features: ["3-5 pages", "Mobile-friendly layout", "Contact form"],
    featured: false,
  },
  {
    name: "Standard",
    price: "\u20ac100",
    summary:
      "The most balanced package for businesses that want more polish, structure, and credibility.",
    features: ["Booking integration", "Gallery", "SEO basics"],
    featured: true,
  },
  {
    name: "Premium",
    price: "\u20ac200",
    summary:
      "A more cinematic presentation with custom visual treatment and refined finishing details.",
    features: [
      "Custom design",
      "Animations",
      "Google My Business setup",
    ],
    featured: false,
  },
] as const;

const sectionClass = "mx-auto w-full max-w-[88rem] px-6 sm:px-8 lg:px-12";
const cardClass =
  "rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl";
const inputClass =
  "w-full rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-[#f6f3ee] outline-none placeholder:text-white/28 focus:border-[#78bfff]/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#78bfff]/18";
const eyebrowClass =
  "text-[0.7rem] font-medium uppercase tracking-[0.36em] text-[#9cd0ff]";
const ruleClass = "section-rule mt-8 h-px w-full";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <section className={`${sectionClass} min-h-screen py-8 sm:py-10 lg:py-12`}>
        <Reveal className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5 text-[0.7rem] uppercase tracking-[0.32em] text-white/46">
            <span>Eric S. Atelier</span>
            <span>Issue 01</span>
            <span>Germany</span>
          </div>
          <div className="grid flex-1 gap-16 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-center">
            <div className="max-w-4xl">
              <p className={eyebrowClass}>Editorial Web Design</p>
              <h1 className="mt-8 max-w-4xl font-serif text-[4.4rem] leading-[0.88] tracking-[-0.06em] text-[#f6f3ee] sm:text-[5.8rem] lg:text-[8.6rem]">
                Eric S.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#ebe5dc]/72 sm:text-xl lg:text-[1.4rem] lg:leading-9">
                Web Designer {"\u2014"} I build modern websites for businesses
                that deserve better.
              </p>
              <p className="mt-6 max-w-xl text-sm uppercase tracking-[0.28em] text-white/38">
                Designed to feel more like a private publication than a mass-made template.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#78bfff]/40 bg-[#78bfff] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#07111d] shadow-[0_0_60px_rgba(120,191,255,0.18)] hover:-translate-y-0.5 hover:bg-[#9cd0ff] sm:w-auto"
                >
                  Let&apos;s Talk
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-white/62 hover:border-[#78bfff]/30 hover:text-white sm:w-auto"
                >
                  See Pricing
                </a>
              </div>
            </div>
            <div className={`${cardClass} relative overflow-hidden border-white/12`}>
              <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#78bfff]/55 to-transparent" />
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-white/42">
                Cover Story
              </p>
              <div className={ruleClass} />
              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-sm text-white/40">Positioning</p>
                  <p className="mt-3 font-serif text-4xl leading-tight tracking-[-0.04em] text-[#f6f3ee]">
                    Websites with the calm confidence of something expensive.
                  </p>
                </div>
                <div className="grid gap-5 border-t border-white/8 pt-6 sm:grid-cols-3 sm:gap-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/34">
                      Tone
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      Minimal, elegant, highly considered.
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/34">
                      Audience
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      Small businesses that want to look unmistakably premium.
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/34">
                      Outcome
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      Better trust, better first impressions, better inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="scroll-mt-20 py-20 sm:py-24">
        <div className={sectionClass}>
          <Reveal className={cardClass}>
            <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
              <div className="max-w-sm">
                <p className={eyebrowClass}>About Me</p>
                <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.05em] text-[#f6f3ee] sm:text-5xl">
                  Quiet luxury, built for the web.
                </h2>
                <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/36">
                  Small business websites with a magazine mind-set.
                </p>
              </div>
              <div className="space-y-8">
                <p className="max-w-3xl text-lg leading-9 text-[#ebe5dc]/72 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-[#f6f3ee]">
                  I&apos;m Eric, a web designer based in Germany creating modern,
                  clean websites for small businesses. I care about pacing,
                  composition, and visual restraint, so the final result feels
                  polished, expensive, and easy to trust without ever becoming
                  noisy or overdesigned.
                </p>
                <div className="grid gap-5 border-t border-white/8 pt-8 sm:grid-cols-3">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/34">
                      01
                    </p>
                    <p className="mt-3 font-serif text-2xl text-[#f6f3ee]">
                      Editorial hierarchy
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/34">
                      02
                    </p>
                    <p className="mt-3 font-serif text-2xl text-[#f6f3ee]">
                      Clean conversion paths
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/34">
                      03
                    </p>
                    <p className="mt-3 font-serif text-2xl text-[#f6f3ee]">
                      Premium visual finish
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-20 sm:py-24">
        <div className={sectionClass}>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
              <div className="max-w-3xl">
                <p className={eyebrowClass}>Services &amp; Pricing</p>
                <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.05em] text-[#f6f3ee] sm:text-5xl">
                  Three sharply cut editions, priced to keep things moving.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                  Each package is designed to stay simple, look refined, and
                  give small businesses a noticeably stronger digital presence
                  without layers of unnecessary complexity.
                </p>
              </div>
              <div className="border-l border-white/8 pl-0 text-sm leading-7 text-white/46 lg:pl-8">
                Think of these less like generic packages and more like curated
                editorial editions: focused, composed, and deliberately clean.
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {offerings.map((offering, index) => (
              <Reveal
                key={offering.name}
                delay={index * 120}
                className={`h-full ${offering.featured ? "lg:-translate-y-5" : ""}`}
              >
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border p-8 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl ${
                    offering.featured
                      ? "border-[#78bfff]/35 bg-[linear-gradient(180deg,rgba(120,191,255,0.15),rgba(255,255,255,0.04))]"
                      : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]"
                  }`}
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.34em] text-white/36">
                        Edition {index + 1}
                      </p>
                      <p className="mt-5 font-serif text-[2.35rem] leading-none tracking-[-0.05em] text-[#f6f3ee]">
                        {offering.name}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-white/58">
                        {offering.summary}
                      </p>
                    </div>
                    {offering.featured ? (
                      <span className="rounded-full border border-[#78bfff]/30 bg-[#78bfff]/12 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#b7deff]">
                        Most Popular
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-10 border-t border-white/8 pt-7">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                      Investment
                    </p>
                  </div>
                  <p className="mt-4 font-serif text-6xl tracking-[-0.07em] text-[#f6f3ee]">
                    {offering.price}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-white/66">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#78bfff]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
        <div className={sectionClass}>
          <Reveal className={cardClass}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div className="max-w-lg">
                <p className={eyebrowClass}>
                  Contact
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.05em] text-[#f6f3ee] sm:text-5xl">
                  Let&apos;s make your business look like the obvious choice.
                </h2>
                <p className="mt-6 text-base leading-8 text-white/60">
                  Send a quick message with your business, timeline, and what
                  kind of site you need. I&apos;ll come back with a clean,
                  practical next step instead of a wall of jargon.
                </p>
                <div className={ruleClass} />
                <p className="mt-8 text-sm uppercase tracking-[0.28em] text-white/34">
                  Minimal process. Premium finish. No clutter.
                </p>
              </div>
              <div>
                <ContactForm email="hezy.rne@gmail.com" inputClass={inputClass} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
