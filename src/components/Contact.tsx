import { useState } from "react";
import { AVAILABILITY, EMAIL, INSTAGRAM, IMG } from "../lib/data";
import { Eyebrow, GoldButton, MaskWords, Reveal } from "./common";
import Particles from "./Particles";
import Sculpture from "./Sculpture";

const COPY = [
  "We’re available 24/7, 365 days a year to answer your questions, discuss your event, and help bring your vision to life.",
  "Whether you’re planning a wedding, engagement, birthday, corporate event, or any special celebration, our team is always ready to assist you with prompt, friendly, and professional service.",
  "Get in touch today—let’s create unforgettable memories together with Zakiora Events!",
];

const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Corporate Event",
  "Cultural Function",
  "Private Party",
  "Other Special Occasion",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-2 block font-sans text-[9px] tracking-[0.36em] text-ivory/40 transition-colors duration-500 group-focus-within:text-gold">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full border-b border-ivory/15 bg-transparent py-3 font-sans text-[14px] font-light tracking-[0.04em] text-ivory outline-none transition-colors duration-500 placeholder:text-ivory/20 focus:border-gold";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({
    name: "",
    email: "",
    type: "",
    date: "",
    message: "",
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ivory/5 bg-ink py-24 sm:py-32 lg:py-44"
    >
      <img
        src={IMG.candles}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.09]"
      />
      <Particles density={30} />
      <Sculpture className="absolute -right-24 top-10 hidden h-[520px] w-[520px] opacity-70 lg:block" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Eyebrow>CONTACT</Eyebrow>

        <div className="mt-8 max-w-5xl sm:mt-14">
          <MaskWords
            text="LET'S CREATE"
            className="font-serif text-[15vw] leading-[0.88] text-ivory sm:text-[9.5vw] lg:text-[7.8vw]"
          />
          <MaskWords
            text="UNFORGETTABLE MEMORIES."
            delay={0.1}
            className="gold-text font-serif text-[10.5vw] leading-[0.95] sm:text-[7vw] lg:text-[5.6vw]"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {COPY.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="font-sans text-[13px] font-light leading-[2.1] tracking-[0.04em] text-ivory/60 sm:text-[14.5px]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 space-y-8">
              {[
                { k: "EMAIL", v: EMAIL, href: `mailto:${EMAIL}` },
                {
                  k: "INSTAGRAM",
                  v: INSTAGRAM,
                  href: "https://instagram.com/zakiora.events",
                },
                { k: "AVAILABILITY", v: AVAILABILITY },
              ].map((c, i) => (
                <Reveal key={c.k} delay={i * 0.08}>
                  <div className="border-t border-ivory/10 pt-5">
                    <span className="block font-sans text-[9px] tracking-[0.4em] text-gold/60">
                      {c.k}
                    </span>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        data-cursor="explore"
                        className="mt-2 inline-block font-serif text-2xl text-ivory transition-colors duration-500 hover:text-champagne sm:text-3xl"
                      >
                        {c.v}
                      </a>
                    ) : (
                      <span className="mt-2 block font-serif text-2xl text-ivory sm:text-3xl">
                        {c.v}
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-8 border border-ivory/10 bg-obsidian/50 p-6 backdrop-blur-[2px] sm:grid-cols-2 sm:p-10 lg:p-14"
              >
                <Field label="NAME">
                  <input
                    required
                    className={inputCls}
                    placeholder="Your full name"
                    value={f.name}
                    onChange={(e) => setF({ ...f, name: e.target.value })}
                  />
                </Field>
                <Field label="EMAIL">
                  <input
                    required
                    type="email"
                    className={inputCls}
                    placeholder="you@email.com"
                    value={f.email}
                    onChange={(e) => setF({ ...f, email: e.target.value })}
                  />
                </Field>
                <Field label="EVENT TYPE">
                  <select
                    className={inputCls + " appearance-none"}
                    value={f.type}
                    onChange={(e) => setF({ ...f, type: e.target.value })}
                  >
                    <option value="" className="bg-obsidian">
                      Select
                    </option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-obsidian">
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="EVENT DATE">
                  <input
                    type="date"
                    className={inputCls}
                    value={f.date}
                    onChange={(e) => setF({ ...f, date: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="MESSAGE">
                    <textarea
                      rows={4}
                      className={inputCls + " resize-none"}
                      placeholder="Tell us about your vision"
                      value={f.message}
                      onChange={(e) => setF({ ...f, message: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                  <GoldButton>Get In Touch</GoldButton>
                  {sent && (
                    <span className="font-sans text-[10px] tracking-[0.3em] text-champagne">
                      THANK YOU — YOUR MESSAGE IS READY TO SEND.
                    </span>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
