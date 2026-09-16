"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { contact, person } from "@/lib/content";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal, PageEnter } from "@/components/ui/motion";

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socials: { label: string; href: string; icon: (props: { className?: string }) => ReactNode }[] = [
  { label: "LinkedIn", href: person.linkedin, icon: IconLinkedIn },
  { label: "GitHub", href: person.github, icon: IconGitHub },
  { label: "WhatsApp", href: person.whatsapp, icon: IconWhatsApp },
];

const fieldClass =
  "w-full rounded-[14px] border border-line bg-surface-muted px-4 text-[14.5px] text-ink placeholder:text-ink-muted focus:border-line-strong focus:bg-surface focus:shadow-[0_0_0_4px_rgba(20,22,26,0.06)] focus:outline-none";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio inquiry from ${name || "visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${person.email}?subject=${mailSubject}&body=${body}`;
  };

  return (
    <PageEnter>
      <section className="pb-24 pt-16 md:pb-32 md:pt-20">
        <ContentContainer>
          {/* Title sits above — dark card aligns with description, not headline */}
          <MotionReveal>
            <div className="lg:max-w-[calc(50%-1.5rem)] xl:max-w-[calc(50%-1.75rem)]">
              <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Contact
              </p>
              <h1 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                Tell me what you&rsquo;re building.
              </h1>
            </div>
          </MotionReveal>

          <div className="mt-6 grid items-stretch gap-10 lg:mt-7 lg:grid-cols-2 lg:gap-12 xl:gap-14">
            {/* Left — description + form (starts level with dark card) */}
            <MotionReveal className="h-full">
              <div className="flex h-full flex-col">
                <p className="max-w-[34rem] text-[16.5px] leading-relaxed text-ink-secondary">
                  {contact.supporting}
                </p>

                <form
                  onSubmit={onSubmit}
                  className="mt-8 flex flex-1 flex-col gap-3.5"
                >
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="c-name">
                        Name
                      </label>
                      <input
                        id="c-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name *"
                        className={`h-12 ${fieldClass}`}
                      />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="c-email">
                        Email
                      </label>
                      <input
                        id="c-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email *"
                        className={`h-12 ${fieldClass}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="c-subject">
                      Subject
                    </label>
                    <input
                      id="c-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      className={`h-12 ${fieldClass}`}
                    />
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col">
                    <label className="sr-only" htmlFor="c-message">
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message *"
                      className={`min-h-[9.5rem] flex-1 resize-none py-3.5 ${fieldClass}`}
                    />
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="group inline-flex h-12 items-center gap-3 rounded-full bg-showcase pl-6 pr-1.5 text-[14.5px] font-medium text-showcase-text transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      Send message
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-[var(--duration-fast)] group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </span>
                    </button>
                    <p className="text-[12.5px] text-ink-faint">
                      Opens your email client with the details filled in.
                    </p>
                  </div>
                </form>
              </div>
            </MotionReveal>

            {/* Right — info card stretches to match form column */}
            <MotionReveal delay={0.08} className="h-full">
              <div className="relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-showcase px-7 py-8 text-showcase-text shadow-[var(--shadow-md)] sm:px-8 sm:py-9">
                <div className="relative flex flex-1 flex-col justify-between gap-10">
                  <div className="flex flex-col gap-8">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12.5px] text-white/80">
                        <span
                          className="dc-pulse h-1.5 w-1.5 rounded-full bg-status shadow-[0_0_0_3px_rgba(34,170,99,0.25)]"
                          aria-hidden
                        />
                        Open to roles · {person.workMode.join(" or ")}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        Location
                      </h2>
                      <p className="mt-2.5 flex items-start gap-2.5 text-[16px] leading-snug text-white">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-white/45"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        {person.location}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        Contact
                      </h2>
                      <a
                        href={`mailto:${person.email}`}
                        className="mt-2.5 flex items-center gap-2.5 text-[16px] text-white transition-colors hover:text-white/75"
                      >
                        <Mail
                          className="h-4 w-4 shrink-0 text-white/45"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="break-all">{person.email}</span>
                      </a>
                    </div>

                    <div>
                      <h2 className="text-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        Reply time
                      </h2>
                      <p className="mt-2.5 text-[16px] leading-snug text-white">
                        Usually within a day
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-7">
                    <h2 className="text-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                      Stay connected
                    </h2>
                    <ul className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
                      {socials.map((s, i) => (
                        <li key={s.label} className="flex items-center">
                          {i > 0 ? (
                            <span className="mx-3 h-3.5 w-px bg-white/15" aria-hidden />
                          ) : null}
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white"
                          >
                            <s.icon className="h-4 w-4 shrink-0" />
                            <span className="text-[13.5px] leading-none">{s.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </ContentContainer>
      </section>
    </PageEnter>
  );
}
