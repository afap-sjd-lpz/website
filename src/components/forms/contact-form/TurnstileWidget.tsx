"use client";

import Script from "next/script";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const turnstileScriptUrl =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileRenderOptions {
  sitekey: string;
  action: "contact_form";
  appearance: "interaction-only";
  size: "flexible";
  theme: "auto";
  language: "es";
  callback: (token: string) => void;
  "before-interactive-callback": () => void;
  "after-interactive-callback": () => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "timeout-callback": () => void;
  "unsupported-callback": () => void;
  "response-field": false;
}

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileStatus =
  | "loading"
  | "interactive"
  | "verified"
  | "error";

export interface TurnstileWidgetHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string | null) => void;
  siteKey?: string;
}

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget({ onTokenChange, siteKey }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>(undefined);
  const hasTokenRef = useRef(false);
  const onTokenChangeRef = useRef(onTokenChange);
  const [status, setStatus] =
    useState<TurnstileStatus>("loading");

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  const resetWidget = useCallback(() => {
    hasTokenRef.current = false;
    onTokenChangeRef.current(null);
    setStatus("loading");

    const widgetId = widgetIdRef.current;

    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  }, []);

  const retryWidget = useCallback(() => {
    hasTokenRef.current = false;
    onTokenChangeRef.current(null);
    setStatus("error");

    const widgetId = widgetIdRef.current;

    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  }, []);

  const renderWidget = useCallback(() => {
    if (
      !siteKey ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      if (!siteKey) {
        setStatus("error");
      }

      return;
    }

    widgetIdRef.current = window.turnstile.render(
      containerRef.current,
      {
        sitekey: siteKey,
        action: "contact_form",
        appearance: "interaction-only",
        size: "flexible",
        theme: "auto",
        language: "es",
        callback: (token) => {
          hasTokenRef.current = true;
          setStatus("verified");
          onTokenChangeRef.current(token);
        },
        "before-interactive-callback": () => {
          setStatus("interactive");
        },
        "after-interactive-callback": () => {
          if (!hasTokenRef.current) {
            setStatus("loading");
          }
        },
        "expired-callback": resetWidget,
        "error-callback": retryWidget,
        "timeout-callback": retryWidget,
        "unsupported-callback": retryWidget,
        "response-field": false,
      },
    );
  }, [resetWidget, retryWidget, siteKey]);

  useImperativeHandle(
    ref,
    () => ({
      reset: resetWidget,
    }),
    [resetWidget],
  );

  useEffect(() => {
    return () => {
      const widgetId = widgetIdRef.current;

      if (!widgetId) {
        return;
      }

      widgetIdRef.current = undefined;

      if (window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, []);

  return (
    <div className="grid gap-2">
      <Script
        id="cloudflare-turnstile"
        src={turnstileScriptUrl}
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={retryWidget}
      />

      <div
        ref={containerRef}
        className="w-full max-w-md"
      />

      {status === "error" ? (
        <p role="alert" className="text-sm leading-6 text-muted">
          No pudimos completar la verificación anti-spam. Inténtalo
          nuevamente.
        </p>
      ) : (
        <p role="status" className="sr-only">
          {status === "verified"
            ? "Verificación anti-spam completada."
            : status === "interactive"
              ? "Se requiere completar la verificación anti-spam."
              : "Completando la verificación anti-spam..."}
        </p>
      )}
    </div>
  );
});
