"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/config/navigation.config";

import { isNavigationItemActive } from "./navigation.utils";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-1 md:flex lg:gap-2"
      aria-label="Navegación principal"
    >
      {navigationItems.map((item) => {
        const isActive = isNavigationItemActive(
          pathname,
          item.href,
        );

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg border-b-2 px-2.5 py-2 text-sm transition-colors lg:px-4 lg:text-base ${
              isActive
                ? "border-primary font-semibold text-primary"
                : "border-transparent font-medium text-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
