import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mati Ur Rehman — AI & Automation Engineer" },
      { name: "description", content: "Portfolio of Mati Ur Rehman — Backend Developer and AI Automation Engineer building LLM-powered, zero-touch systems." },
      { name: "author", content: "Mati Ur Rehman" },
      { property: "og:title", content: "Mati Ur Rehman — AI & Automation Engineer" },
      { property: "og:description", content: "Portfolio of Mati Ur Rehman — Backend Developer and AI Automation Engineer building LLM-powered, zero-touch systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Mati Ur Rehman — AI & Automation Engineer" },
      { name: "twitter:description", content: "Portfolio of Mati Ur Rehman — Backend Developer and AI Automation Engineer building LLM-powered, zero-touch systems." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d1da26e4-a978-494b-9fff-f91c512701ab/id-preview-db43b53e--e1e52edc-65bd-43bd-ac4b-c1701e3abfe6.lovable.app-1781762803212.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d1da26e4-a978-494b-9fff-f91c512701ab/id-preview-db43b53e--e1e52edc-65bd-43bd-ac4b-c1701e3abfe6.lovable.app-1781762803212.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// The Botpress free plan doesn't allow removing the "Powered by Botpress"
// branding from the dashboard (that's a paid-plan feature). Since the widget
// renders as plain DOM (not an iframe), we can hide just the branding row.
// The text "by Botpress" can be split across a few nested spans (with an
// icon), so instead of requiring one leaf node to hold the exact string, we
// look at each element's full aggregated text (including descendants) and
// pick the smallest one whose text is short and matches "by Botpress". This
// never matches longer sentences elsewhere on the page (e.g. the Skills or
// Projects sections), since those mention "Botpress" without "by" directly
// before it, or as part of a much longer sentence/tag.
function hideBotpressBranding() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("body *"))
    .filter((el) => {
      const text = (el.textContent || "").replace(/\s+/g, " ").trim();
      return text.length > 0 && text.length <= 30 && /by\s*botpress/i.test(text);
    })
    .sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length);

  if (candidates.length > 0) {
    candidates[0].style.display = "none";
  }
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Only inject if not already present
    if (document.getElementById("botpress-inject")) return;

    const injectScript = document.createElement("script");
    injectScript.id = "botpress-inject";
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = true;

    injectScript.onload = () => {
      const configScript = document.createElement("script");
      configScript.src = "https://files.bpcontent.cloud/2026/05/20/16/20260520160613-8M7SSMAX.js";
      configScript.defer = true;
      configScript.onload = () => {
        // Hide the branding as soon as the widget mounts, and keep watching
        // since the widget re-renders its DOM when opened/closed.
        hideBotpressBranding();
        const observer = new MutationObserver(hideBotpressBranding);
        observer.observe(document.body, { childList: true, subtree: true });
      };
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
