import Icon from "@/components/ui/icon";
import { SECTIONS, type Article } from "./data";
import { highlight } from "./highlight";

type ArticlesViewProps = {
  activeSection: string;
  searchQuery: string;
  showingSearch: boolean;
  filteredArticles: Article[];
  searchResultsCount: number;
  expandedArticle: string | null;
  onToggleArticle: (id: string) => void;
};

export default function ArticlesView({
  activeSection,
  searchQuery,
  showingSearch,
  filteredArticles,
  searchResultsCount,
  expandedArticle,
  onToggleArticle,
}: ArticlesViewProps) {
  return (
    <div>
      <div className="mb-6">
        {showingSearch ? (
          <div className="flex items-center gap-3">
            <Icon name="Search" size={20} className="text-teal" />
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "Cormorant, serif" }}>
                Результаты поиска
              </h2>
              <p className="text-sm text-muted-foreground">
                По запросу «{searchQuery}» найдено {searchResultsCount} статей
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
              <Icon
                name={SECTIONS.find((s) => s.id === activeSection)?.icon || "BookOpen"}
                size={18}
                className="text-teal"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "Cormorant, serif" }}>
                {SECTIONS.find((s) => s.id === activeSection)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">{filteredArticles.length} статей</p>
            </div>
          </div>
        )}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg" style={{ fontFamily: "Cormorant, serif" }}>
            Ничего не найдено
          </p>
          <p className="text-sm mt-1">Попробуйте другой запрос</p>
        </div>
      )}

      <div className="space-y-4">
        {filteredArticles.map((article, i) => (
          <div
            key={article.id}
            className="bg-card border border-white/5 rounded-2xl overflow-hidden card-hover animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              className="w-full text-left p-6"
              onClick={() => onToggleArticle(article.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`tag ${article.tagColor}`}>{article.tag}</span>
                  </div>
                  <h3
                    className="text-lg font-semibold leading-snug mb-2"
                    style={{ fontFamily: "Cormorant, serif" }}
                  >
                    {highlight(article.title, searchQuery)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight(article.summary, searchQuery)}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                      expandedArticle === article.id
                        ? "bg-teal border-teal text-background"
                        : "border-white/10 text-muted-foreground"
                    }`}
                  >
                    <Icon
                      name={expandedArticle === article.id ? "ChevronUp" : "ChevronDown"}
                      size={16}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.keywords.map((k) => (
                  <span key={k} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                    {k}
                  </span>
                ))}
              </div>
            </button>

            {expandedArticle === article.id && (
              <div className="border-t border-white/5 px-6 py-5 space-y-4">
                <div className="divider-teal" />
                {article.content.map((para, j) => (
                  <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                    {highlight(para, searchQuery)}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
