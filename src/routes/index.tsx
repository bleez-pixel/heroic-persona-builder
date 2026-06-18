import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mati Ur Rehman — Backend Developer & AI Automation Engineer" },
      { name: "description", content: "Portfolio of Mati Ur Rehman — designing LLM-powered, zero-touch automation pipelines with n8n, Zapier, LangChain, Azure OpenAI and Supabase." },
      { property: "og:title", content: "Mati Ur Rehman — AI & Automation Engineer" },
      { property: "og:description", content: "Backend Developer & AI Automation Engineer building production-grade autonomous systems." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
