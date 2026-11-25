"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <Header collapsed={collapsed} />
      {/* Only this area scrolls */}
      <main
        className={`mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-canvas p-6 transition-[margin] duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </main>
    </>
  );
}
