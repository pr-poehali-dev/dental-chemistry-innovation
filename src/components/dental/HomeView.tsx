import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMAGE, SECTIONS, ARTICLES, FACTS } from "./data";

type HomeViewProps = {
  onSectionChange: (id: string) => void;
  onSearch: (term: string) => void;
};

export default function HomeView({ onSectionChange, onSearch }: HomeViewProps) {
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * FACTS.length));
  const [animating, setAnimating] = useState(false);

  const randomFact = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setFactIndex((prev) => {
        let next = prev;
        while (next === prev) next = Math.floor(Math.random() * FACTS.length);
        return next;
      });
      setAnimating(false);
    }, 250);
  }, []);

  const fact = FACTS[factIndex];

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
            Дентальная
            <br />
            <span className="text-teal italic">химия</span>
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
              className="card-hover bg-card border border-white/5 rounded-2xl overflow-hidden text-left group"
            >
              {s.image && (
                <div className="relative h-36 overflow-hidden">
                  <img src={s.image} alt={s.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Icon name={s.icon} size={16} className="text-teal" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Icon name="ArrowRight" size={15} className="text-white/50 group-hover:text-teal transition-colors" />
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "Cormorant, serif" }}>
                  {s.label}
                </h3>
                <p className="text-sm text-muted-foreground">{count} статей</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Random fact block */}
      <div className={`relative mb-6 rounded-2xl border p-6 overflow-hidden transition-opacity duration-250 ${fact.color} ${animating ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={randomFact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-xs font-medium text-foreground/70 hover:text-foreground transition-all"
          >
            <Icon name="Shuffle" size={13} />
            Другой факт
          </button>
        </div>
        <div className="flex items-start gap-4 pr-28">
          <span className="text-3xl flex-shrink-0">{fact.emoji}</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Знаете ли вы?
            </div>
            <h3
              className="text-lg font-semibold mb-2 leading-snug"
              style={{ fontFamily: "Cormorant, serif" }}
            >
              {fact.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{fact.text}</p>
            <button
              onClick={() => onSectionChange("facts")}
              className="mt-3 flex items-center gap-1 text-xs text-teal hover:underline"
            >
              Все факты <Icon name="ArrowRight" size={12} />
            </button>
          </div>
        </div>
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