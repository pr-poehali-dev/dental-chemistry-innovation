import Icon from "@/components/ui/icon";
import { HERO_IMAGE, SECTIONS, ARTICLES } from "./data";

type HomeViewProps = {
  onSectionChange: (id: string) => void;
  onSearch: (term: string) => void;
};

export default function HomeView({ onSectionChange, onSearch }: HomeViewProps) {
  return (
    <div className="animate-fade-up">
      <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: 340 }}>
        <img src={HERO_IMAGE} alt="Химия в стоматологии" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-10">
          <div className="tag bg-teal/20 text-teal mb-4 w-fit">Научный справочник</div>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight text-foreground mb-3"
            style={{ fontFamily: "Cormorant, serif" }}
          >
            Химия
            <br />
            <span className="text-teal italic">в стоматологии</span>
          </h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Исследование химических принципов, лежащих в основе современных стоматологических материалов и технологий
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {SECTIONS.filter((s) => s.id !== "home").map((s) => {
          const count = ARTICLES.filter((a) => a.section === s.id).length;
          return (
            <button
              key={s.id}
              onClick={() => onSectionChange(s.id)}
              className="card-hover bg-card border border-white/5 rounded-2xl p-6 text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
                  <Icon name={s.icon} size={20} className="text-teal" />
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-teal transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "Cormorant, serif" }}>
                {s.label}
              </h3>
              <p className="text-sm text-muted-foreground">{count} статей</p>
            </button>
          );
        })}
      </div>

      <div className="p-6 bg-card border border-white/5 rounded-2xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Популярные термины
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Гидроксиапатит", "Адгезия", "Композит", "Диоксид циркония",
            "Фторид", "Наночастицы", "Биоактивное стекло", "Амальгама",
            "pH", "Перекись водорода", "Титан", "Реминерализация",
          ].map((term) => (
            <button
              key={term}
              onClick={() => onSearch(term)}
              className="tag bg-secondary text-secondary-foreground hover:bg-teal/20 hover:text-teal transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
