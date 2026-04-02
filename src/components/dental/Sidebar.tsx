import Icon from "@/components/ui/icon";
import { SECTIONS, ARTICLES } from "./data";

type SidebarProps = {
  activeSection: string;
  showingSearch: boolean;
  onSectionChange: (id: string) => void;
};

export default function Sidebar({ activeSection, showingSearch, onSectionChange }: SidebarProps) {
  return (
    <aside className="hidden sm:flex flex-col gap-1 w-52 flex-shrink-0 sticky top-24 self-start">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-3">
        Разделы
      </div>
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => onSectionChange(s.id)}
          className={`nav-pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left ${
            activeSection === s.id && !showingSearch ? "active" : "text-muted-foreground"
          }`}
        >
          <Icon name={s.icon} size={16} />
          {s.label}
        </button>
      ))}

      <div className="divider-teal my-4" />

      <div className="px-3 py-3 bg-secondary/40 rounded-xl border border-white/5">
        <div className="text-xs font-semibold text-teal mb-1">Статей в базе</div>
        <div className="text-2xl font-bold" style={{ fontFamily: "Cormorant, serif" }}>
          {ARTICLES.length}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">по 4 разделам</div>
      </div>
    </aside>
  );
}
