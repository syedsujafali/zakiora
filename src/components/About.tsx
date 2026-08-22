import { Eyebrow, MaskWords, Reveal } from "./common";

const INTRO =
  "Welcome to Zakiora Events, where elegance meets perfection. We specialize in luxury weddings, birthdays, corporate events, premium décor, world-class catering, photography, entertainment, and complete event planning. From intimate gatherings to grand celebrations, we create unforgettable experiences with exceptional service, creativity, and attention to every detail.";

const P1 =
  "Zakiora Events is a trusted event management company with over 35 years of excellence in creating unforgettable celebrations. We specialize in planning and managing weddings, engagements, birthdays, corporate events, cultural functions, private parties, and every type of special occasion with creativity, elegance, and precision.";
const P2 =
  "Our services include premium event planning, stunning decorations, venue management, photography, videography, entertainment, hospitality, and complete event coordination—all tailored to your unique vision.";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-ivory/5 bg-obsidian py-24 sm:py-32 lg:py-44"
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-burgundy/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Header Section */}
        <div className="mb-16 lg:mb-24">
          <Eyebrow>ABOUT US</Eyebrow>
          <div className="mt-6 sm:mt-8">
            <MaskWords
              text="35+ YEARS"
              className="font-serif text-[16vw] leading-[0.85] tracking-[0.02em] text-ivory sm:text-[12vw] lg:text-[8.5vw]"
            />
            <MaskWords
              text="OF EXCELLENCE"
              delay={0.1}
              className="font-serif text-[16vw] leading-[0.85] tracking-[0.02em] text-gold sm:text-[12vw] lg:text-[8.5vw]"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 xl:gap-28">

          {/* Left Column: Text Content */}
          <div className="flex flex-col">
            <Reveal>
              <div className="relative mb-12 border-l-2 border-gold/40 pl-6 sm:pl-8 lg:mb-16 lg:pl-10">
                <p className="font-serif text-[clamp(1.5rem,2.2vw,2.5rem)] leading-[1.25] tracking-[-0.02em] text-ivory/95">
                  {INTRO}
                </p>
              </div>
            </Reveal>

            <div className="space-y-8 sm:space-y-10">
              <Reveal delay={0.1}>
                <p className="font-sans text-[17px] font-light leading-[1.9] text-ivory/85 sm:text-[20px] lg:text-[22px]">
                  {P1}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                {/* Elegant horizontal divider */}
                <div className="h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
              </Reveal>

              <Reveal delay={0.3}>
                <p className="max-w-3xl font-sans text-[15px] font-light leading-[2] tracking-[0.03em] text-ivory/60 sm:text-[17px] lg:text-[18px]">
                  {P2}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Image Content */}
          <Reveal delay={0.4}>
            <div className="relative mx-auto mt-8 w-full max-w-[460px] lg:mt-0 lg:ml-auto">

              {/* Luxury Frame Accents */}
              <div className="absolute -inset-4 rounded-[2rem] border border-ivory/5 lg:-inset-6" />
              <div className="absolute -inset-2 rounded-[1.8rem] border border-gold/20 lg:-inset-3" />

              {/* Image Container */}
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-obsidian shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <img
                  src="/about.png"
                  alt="Zakiora Events luxury ceremony and venue"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette overlay to integrate the image with the dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-ivory/10" />
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}