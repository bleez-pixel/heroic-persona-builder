import { useState, type FormEvent } from "react";
import {
  Bot,
  Workflow,
  Database,
  Cpu,
  Github,
  Linkedin,
  GraduationCap,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Send,
  Sparkles,
  Terminal,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function openBotpressChat() {
  const w = window as unknown as {
    botpress?: { open?: () => void; toggle?: () => void };
  };
  if (w.botpress?.open) {
    w.botpress.open();
    return;
  }
  if (w.botpress?.toggle) {
    w.botpress.toggle();
    return;
  }
  const fab = document.querySelector<HTMLElement>(
    ".bpFab, .bpw-floating-button, [class*='Fab']"
  );
  if (fab) fab.click();
  else toast.message("Chat is loading — please try again in a moment.");
}

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    icon: Sparkles,
    title: "AI & LLM Engineering",
    items: ["Azure OpenAI", "GPT-4o", "LLaMA 3 (Groq)", "LangChain", "Botpress", "HeyGen API", "Vapi"],
  },
  {
    icon: Workflow,
    title: "Automation & Orchestration",
    items: ["n8n", "Zapier", "Make.com", "Webhooks", "REST API Architecture"],
  },
  {
    icon: Terminal,
    title: "Programming & Frameworks",
    items: ["Python", "FastAPI", "Flask", "Selenium", "BeautifulSoup", "JavaScript", "Flutter"],
  },
  {
    icon: Database,
    title: "Databases & Cloud",
    items: ["PostgreSQL", "Supabase", "Microsoft Azure", "AZ-900 Certified", "Google Sheets"],
  },
  {
    icon: Bot,
    title: "CRM & Operations",
    items: ["GoHighLevel", "Airtable", "Notion", "ClickUp", "Trello", "Slack"],
  },
  {
    icon: Cpu,
    title: "Data & Analytics",
    items: ["Data Visualization", "Workflow Optimization", "Analytical Decision-Making"],
  },
];

const PROJECTS = [
  {
    title: "AI Lumen — Chatbot",
    description:
      "Multi-tenant conversational chatbot powered by Supabase and Botpress Cloud — context-aware answers, persistent memory, and per-client knowledge isolation.",
    stack: ["Supabase", "Botpress Cloud", "Multi-tenant"],
    bullets: [
      "Engineered a multi-tenant knowledge base synchronization system powered by Supabase and Botpress Cloud to streamline data retrieval and management.",
      "Isolated each client's knowledge base while sharing a single underlying architecture, keeping per-client data private and independently updatable.",
    ],
  },
  {
    title: "Autonomous Voice AI Agents",
    description:
      "Deployed autonomous AI voice calling agents that independently handle operational inbound and outbound calls end-to-end.",
    stack: ["Vapi", "API Integrations", "LLM"],
    bullets: [
      "Deployed autonomous AI voice calling agents designed to independently handle operational inbound and outbound calls.",
      "Integrated Vapi with backend APIs so the agent could act on real business data during live calls, without human handoff.",
    ],
  },
  {
    title: "AI-Powered WhatsApp E-Commerce Bot",
    description:
      "Autonomous conversational agent with persistent session memory — live inventory lookups and automated sale logging, zero human in the loop.",
    stack: ["n8n", "WhatsApp Cloud API", "Azure OpenAI"],
    bullets: [
      "Developed an autonomous conversational AI agent with persistent session memory to handle customer FAQs at scale.",
      "Integrated live inventory database lookups and automated sale logging, eliminating human intervention from the order process.",
    ],
  },
  {
    title: "Unified CRM Routing & Lead Scoring",
    description:
      "Lead management engine running custom Python to score by budget & urgency, routing prospects into targeted GHL pipelines with automated ticketing.",
    stack: ["GoHighLevel", "Zapier", "Python", "Airtable", "Twilio"],
    bullets: [
      "Architected a lead management system executing custom Python code to score leads by budget and urgency, routing prospects into targeted GHL pipelines.",
      "Integrated automated customer support ticketing and task assignment via Zapier and n8n.",
    ],
  },
  {
    title: "Newsletter-to-Video Pipeline",
    description:
      "Zero-touch pipeline that detects ready drafts, rewrites them into scripts via GPT-4o, and triggers HeyGen avatar video renders with async polling.",
    stack: ["n8n", "GPT-4o", "HeyGen API", "Google Sheets"],
    bullets: [
      "Architected a zero-touch pipeline that auto-detects 'ready' newsletter drafts, rewrites them into video scripts via GPT-4o, and triggers HeyGen to render AI avatar videos.",
      "Implemented asynchronous polling for video rendering status and auto-synced final MP4 Google Drive links back to the source database.",
    ],
  },
  {
    title: "AI Social Media Content Engine",
    description:
      "High-speed content repurposer parsing long-form docs into platform-specific posts via LLaMA 3 on Groq, with strict JSON & character-limit validation.",
    stack: ["n8n", "LangChain", "Groq", "Google Docs"],
    bullets: [
      "Built a high-speed content repurposing engine that parses long-form documents and generates platform-specific posts using LLaMA 3 via Groq.",
      "Implemented strict JSON validation and character-limit logic (e.g., 280-char limits) and automated content calendar output to Google Sheets.",
    ],
  },
  {
    title: "Full-Cycle Support Ticketing System",
    description:
      "Automated support desk — form submissions generate Notion tickets, send branded Gmail confirmations, and route high-priority issues via Slack DMs.",
    stack: ["Zapier", "Tally.so", "Notion", "Slack"],
    bullets: [
      "Designed a fully automated support desk: form submissions auto-generate Notion tickets, trigger branded Gmail confirmations, and route high-priority issues directly to senior staff via Slack DMs.",
    ],
  },
  {
    title: "Intern Onboarding & Task Allocation",
    description:
      "HR automation that auto-generates Trello onboarding tasks, sends personalized welcomes, and uses Zapier Paths to alert admins on missing data.",
    stack: ["Zapier", "Google Workspace", "Trello", "Slack"],
    bullets: [
      "Built an HR automation workflow that auto-generates Trello onboarding tasks and sends personalized welcome emails.",
      "Used advanced error handling (Zapier Paths) to alert admins whenever required onboarding data was missing.",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "AI Automation Engineer",
    company: "BitzSol — Software House",
    period: "Feb 2026 — Present",
    bullets: [
      "Designing AI automation workflows using n8n and conversational AI to streamline business processes.",
      "End-to-end AI chatbots & autonomous agents — conversation design, backend integration, orchestration.",
      "Applying context management, stateful conversations, and AI-driven decision workflows at scale.",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "Full Stack Zone — Software House",
    period: "Nov 2025 — Jan 2026",
    bullets: [
      "Built Python web scraping tools with Selenium and BeautifulSoup for data aggregation pipelines.",
      "Developed Flask APIs supporting internal data pipelines and automated reporting on PostgreSQL.",
    ],
  },
];

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/20 bg-background/50 backdrop-blur-2xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            M
          </span>
          <span className="hidden sm:inline">Mati Ur Rehman</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="font-semibold">
          <a href="#contact">Hire Me</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bat-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-bat)" }}
      />
      {/* Dynamic Background Orbs */}
      <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-10 right-1/4 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-primary/10 blur-[150px] mix-blend-screen" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl animate-float-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for AI automation projects
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-gradient-yellow">AI &amp; Automation</span>
              <br />
              engineer.
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              I'm <span className="text-foreground font-medium">Mati Ur Rehman</span> — an AI &
              Automation Engineer designing zero-touch pipelines with n8n, LangChain, Azure OpenAI
              and Supabase that ship to production.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="group h-12 px-7 font-semibold glow-yellow">
                <a href="#projects">
                  View My Work
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-primary/50 bg-transparent px-7 font-semibold text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a href="#contact">Contact Me</a>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={openBotpressChat}
                className="h-12 border-primary/50 bg-transparent px-7 font-semibold text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Bot className="h-4 w-4" />
                AI Assistant
              </Button>
            </div>

            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-border/60 pt-8">
              <Stat value="20+" label="Production AI systems" />
              <Stat value="AZ-900" label="Microsoft Certified" />
              <Stat value="Zero-touch" label="Automation pipelines" />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-xs animate-float-up lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-transparent blur-3xl" />
            <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-full border-4 border-primary/40 shadow-[0_0_70px_-10px_rgba(245,197,24,0.45)]">
              <img
                src="/mati-ur-rehman.jpg"
                alt="Mati Ur Rehman — AI & Automation Engineer"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="relative mx-auto -mt-6 w-fit rounded-2xl border border-border/60 bg-card/90 px-5 py-3 text-center shadow-xl backdrop-blur-xl">
              <div className="font-display text-sm font-semibold">Mati Ur Rehman</div>
              <div className="text-xs text-muted-foreground">AI & Automation Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-16">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {kicker}
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="About" title="Engineer by training. Operator by instinct." />
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Results-driven software engineer with hands-on experience designing and deploying
              <span className="text-foreground"> AI-powered automation pipelines</span>,
              LLM-integrated applications, and cloud-native solutions.
            </p>
            <p>
              Microsoft Azure AZ-900 certified, with demonstrated expertise in n8n, Zapier,
              Python, and REST API integrations. I build production-grade, zero-touch systems
              that <span className="text-foreground">remove manual workload</span> and accelerate
              business operations.
            </p>
            <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5">
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-semibold">BS Software Engineering (BSSE)</div>
                <div className="text-sm text-muted-foreground">Virtual University of Pakistan</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-transparent blur-md" />
            <div className="relative space-y-3 rounded-2xl border border-border/80 bg-card p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                Experience
              </div>
              {EXPERIENCE.map((e) => (
                <div
                  key={e.role}
                  className="border-l-2 border-primary/60 pl-4 py-2"
                >
                  <div className="text-xs text-muted-foreground">{e.period}</div>
                  <div className="mt-1 font-semibold text-foreground">{e.role}</div>
                  <div className="text-sm text-primary">{e.company}</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative border-t border-border/60 bg-secondary/20 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Toolbox" title="Stack I ship with." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-card/60 hover:shadow-[0_0_30px_-10px_rgba(245,197,24,0.25)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-4 font-display text-lg font-semibold">{g.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? PROJECTS[activeIndex] : null;

  return (
    <section id="projects" className="relative border-t border-border/60 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Selected Work" title="Systems that run themselves." />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              role="button"
              tabIndex={0}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-lg p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-card/50 hover:shadow-[0_0_40px_-15px_rgba(245,197,24,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-5 flex items-center justify-between">
                <span className="font-display text-xs font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold leading-tight">
                {p.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-xl border-border/60 bg-card/95 backdrop-blur-xl">
          {active && (
            <>
              <DialogHeader>
                <span className="font-display text-xs font-semibold text-primary">
                  {activeIndex !== null ? String(activeIndex + 1).padStart(2, "0") : ""}
                </span>
                <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {active.description}
                </DialogDescription>
              </DialogHeader>

              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {active.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message queued — I'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section id="contact" className="relative border-t border-border/60 bg-secondary/20 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader kicker="Contact" title="Let's build something autonomous." />
            <p className="mb-10 text-lg text-muted-foreground">
              Have an AI workflow, chatbot, or backend automation in mind? Drop a message — I
              reply within 24 hours.
            </p>
            <div className="space-y-4">
              <ContactLink
                icon={Mail}
                label="Email"
                value="matiurrehman1237@gmail.com"
                href="mailto:matiurrehman1237@gmail.com"
              />
              <ContactLink icon={Phone} label="Phone" value="0327 9747675" href="tel:03279747675" />
              <ContactLink
                icon={Github}
                label="GitHub"
                value="github.com/Mati-Ur-Rehman-1"
                href="https://github.com/Mati-Ur-Rehman-1"
              />
              <ContactLink
                icon={Linkedin}
                label="LinkedIn"
                value="linkedin.com/in/mati-ur-rehman-860a921b6"
                href="https://www.linkedin.com/in/mati-ur-rehman-860a921b6/"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative space-y-6 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-10 shadow-2xl transition-all duration-500 hover:border-primary/30"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 space-y-6">
              <Field name="name" label="Name" placeholder="Bruce Wayne" />
              <Field name="email" label="Email" type="email" placeholder="you@company.com" />
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the system you want to automate…"
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full h-12 font-semibold glow-yellow"
              >
                {sending ? "Sending…" : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/60 p-4 transition-all hover:border-primary/60 hover:bg-card"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </a>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Mati Ur Rehman.</div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/Mati-Ur-Rehman-1" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/mati-ur-rehman-860a921b6/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
