"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, GraduationCap, LayoutDashboard, Shapes } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Panoramica", icon: LayoutDashboard },
  { href: "/studenti", label: "Studenti", icon: GraduationCap },
  { href: "/lezioni", label: "Lezioni", icon: BookOpen },
  { href: "/competenze", label: "Competenze", icon: Shapes },
  { href: "/preparazione", label: "Preparazione", icon: Compass },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigazione principale" className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3 lg:flex lg:flex-col lg:p-0">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon size={18} aria-hidden="true" className="shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
