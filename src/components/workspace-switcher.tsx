"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";

type Brand = { id: string; name: string; initials: string; color: string };

const brands: Brand[] = [
  { id: "ncba", name: "NCBA", initials: "N", color: "bg-brand" },
  { id: "brookside", name: "Brookside", initials: "B", color: "bg-orange-500" },
  {
    id: "safaricom",
    name: "Safaricom",
    initials: "S",
    color: "bg-emerald-500",
  },
];

export default function WorkspaceSwitcher({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Brand>(brands[0]);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative px-3 pb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center gap-3 rounded-lg bg-canvas px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white ${active.color}`}
        >
          {active.initials}
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-[15px] font-medium text-zinc-700">
              {active.name}
            </span>
            <ChevronsUpDown size={16} className="shrink-0 text-zinc-400" />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full z-50 mt-1 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg ${
              collapsed ? "left-full ml-2 w-56" : "inset-x-3"
            }`}
          >
            <li className="px-2.5 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              Brands
            </li>
            {brands.map((b) => (
              <li key={b.id}>
                <button
                  role="option"
                  aria-selected={b.id === active.id}
                  onClick={() => {
                    setActive(b);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[15px] text-zinc-700 hover:bg-zinc-100"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold text-white ${b.color}`}
                  >
                    {b.initials}
                  </span>
                  <span className="flex-1 truncate">{b.name}</span>
                  {b.id === active.id && (
                    <Check size={16} className="text-brand" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
