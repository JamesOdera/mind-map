import { Search, Bell } from "lucide-react";

export default function Header({ collapsed }: { collapsed: boolean }) {
  return (
    <header
      className={`fixed right-0 top-0 z-20 flex h-16 items-center justify-between bg-white px-6 transition-[left] duration-300 ${
        collapsed ? "left-20" : "left-64"
      }`}
    >
      <div className="flex w-80 items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-zinc-400">
        <Search size={16} />
        <input
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100">
          <Bell size={18} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-medium text-white">
          J
        </div>
      </div>
    </header>
  );
}
