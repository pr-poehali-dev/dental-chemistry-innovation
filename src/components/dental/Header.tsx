import Icon from "@/components/ui/icon";
import { SECTIONS } from "./data";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeSection: string;
  showingSearch: boolean;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onSectionChange: (id: string) => void;
};

export default function Header({
  searchQuery,
  onSearchChange,
  activeSection,
  showingSearch,
  mobileMenuOpen,
  onMobileMenuToggle,
  onSectionChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
            <Icon name="FlaskConical" size={16} className="text-background" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-tight" style={{ fontFamily: "Cormorant, serif" }}>
              Дентальная химия
            </div>
            <div className="text-xs text-muted-foreground leading-tight">справочник</div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-auto relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по терминам, материалам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-secondary/60 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-teal/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        <button
          className="sm:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={onMobileMenuToggle}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/5 px-4 py-3 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectionChange(s.id)}
              className={`nav-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                activeSection === s.id && !showingSearch ? "active" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}