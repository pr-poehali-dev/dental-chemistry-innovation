import { FACTS } from "./data";

export default function FactsView() {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
          <span className="text-lg">💡</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Cormorant, serif" }}>
            Интересные факты
          </h2>
          <p className="text-sm text-muted-foreground">{FACTS.length} фактов о дентальной химии</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FACTS.map((fact, i) => (
          <div
            key={fact.id}
            className={`rounded-2xl border p-5 animate-fade-up ${fact.color}`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{fact.emoji}</span>
              <div>
                <h3
                  className="text-base font-semibold mb-2 leading-snug"
                  style={{ fontFamily: "Cormorant, serif" }}
                >
                  {fact.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fact.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
