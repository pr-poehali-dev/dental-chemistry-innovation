import Icon from "@/components/ui/icon";
import { SECTIONS, ARTICLES } from "./data";

type SidebarProps = {
  activeSection: string;
  showingSearch: boolean;
  onSectionChange: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export default function Sidebar({ activeSection, showingSearch, onSectionChange, isOpen, onToggle }: SidebarProps) {
  return (
    <div className="hidden sm:block flex-shrink-0 relative">
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`sticky top-24 flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-card hover:border-teal/40 hover:text-teal text-muted-foreground transition-all duration-200 ${isOpen ? "mb-0" : ""}`}
        title={isOpen ? "Скрыть меню" : "Показать меню"}
      >
        <Icon name={isOpen ? "PanelLeftClose" : "PanelLeft"} size={16} />
      </button>

      {/* Sidebar panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "w-52 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <aside className="w-52 sticky top-24 self-start flex flex-col gap-1 pt-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-3">
            Разделы
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectionChange(s.id)}
              className={`nav-pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left whitespace-nowrap ${
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
      </div>
    </div>
  );
}
