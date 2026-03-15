import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

const offerings = [
  {
    name: "Basic",
    price: "\u20ac300\u2013\u20ac600",
    summary: "A focused starter site for businesses that need a polished presence fast.",
    features: ["3-5 pages", "Mobile-friendly layout", "Contact form"],
    featured: false,
  },
  {
    name: "Standard",
    price: "\u20ac600\u2013\u20ac1,200",
    summary:
      "The most popular option for businesses that want stronger conversion and visibility.",
    features: ["Booking integration", "Gallery", "SEO basics"],
    featured: true,
  },
  {
    name: "Premium",
    price: "\u20ac1,200\u2013\u20ac2,000",
    summary:
      "A higher-touch package with custom visuals and setup support beyond the website itself.",
    features: [
      "Custom design",
      "Animations",
      "Google My Business setup",
    ],
    featured: false,
  },
] as const;

const sectionClass = "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12";
const cardClass =
  "rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur";
const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#4ea7ff]/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4ea7ff]/20";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <section className={`${sectionClass} flex min-h-screen items-center py-24 sm:py-28`}>
        <Reveal className="w-full">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#4ea7ff]/20 bg-[#4ea7ff]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#92c9ff]">
                Germany-based web designer
              </span>
              <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">
                Eric S.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Web Designer {"\u2014"} I build modern websites for businesses
                that deserve better.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#4ea7ff] px-6 py-3.5 text-sm font-medium text-[#04111f] shadow-[0_0_40px_rgba(78,167,255,0.25)] hover:-translate-y-0.5 hover:bg-[#78bbff] sm:w-auto"
                >
                  Let&apos;s Talk
                </a>
                <p className="text-sm text-white/42">
                  Minimal, conversion-focused websites for small businesses.
                </p>
              </div>
            </div>
            <div className={`${cardClass} border-white/8 lg:justify-self-end`}>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Focus
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-white/45">Built for</p>
                  <p className="mt-2 text-xl font-medium text-white">
                    Service businesses that need a stronger first impression.
                  </p>
                </div>
                <div className="h-px w-full bg-white/8" />
                <div className="grid gap-4 text-sm text-white/60 sm:grid-cols-2">
                  <div>
                    <p className="text-white">Modern presentation</p>
                    <p className="mt-1">Clear structure, clean hierarchy.</p>
                  </div>
                  <div>
                    <p className="text-white">Practical results</p>
                    <p className="mt-1">Mobile-ready and easy to contact.</p>
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
            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#92c9ff]">
                  About Me
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Clean design, clear messaging, and no wasted space.
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                I&apos;m Eric, a web designer based in Germany creating modern,
                clean websites for small businesses. I focus on sharp visuals,
                simple user journeys, and layouts that help businesses feel more
                credible online from the very first scroll.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-20 sm:py-24">
        <div className={sectionClass}>
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#92c9ff]">
                Services &amp; Pricing
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Straightforward packages for businesses at different stages.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">
                Every package is built to stay lean, polished, and easy to
                maintain, with enough flexibility to match the way your business
                actually works.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {offerings.map((offering, index) => (
              <Reveal
                key={offering.name}
                delay={index * 120}
                className={`h-full ${offering.featured ? "lg:-translate-y-4" : ""}`}
              >
                <article
                  className={`flex h-full flex-col rounded-[2rem] border p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur ${
                    offering.featured
                      ? "border-[#4ea7ff]/35 bg-[#4ea7ff]/10"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-medium text-white">
                        {offering.name}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/60">
                        {offering.summary}
                      </p>
                    </div>
                    {offering.featured ? (
                      <span className="rounded-full border border-[#4ea7ff]/30 bg-[#4ea7ff]/16 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9bd0ff]">
                        Most Popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-8 text-3xl font-semibold tracking-[-0.05em] text-white">
                    {offering.price}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-white/68">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4ea7ff]" />
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
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.28em] text-[#92c9ff]">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Let&apos;s build something clean, modern, and easy to trust.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/60">
                  Send a quick message with your business, timeline, and what
                  kind of site you need. I&apos;ll get back to you with the next
                  steps.
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
