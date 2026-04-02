import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { ARTICLES } from "@/components/dental/data";
import Header from "@/components/dental/Header";
import Sidebar from "@/components/dental/Sidebar";
import HomeView from "@/components/dental/HomeView";
import ArticlesView from "@/components/dental/ArticlesView";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        a.content.some((c) => c.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const showingSearch = searchQuery.trim().length > 0;
  const filteredArticles = showingSearch
    ? searchResults
    : ARTICLES.filter((a) => a.section === activeSection);

  function handleSectionChange(id: string) {
    setActiveSection(id);
    setSearchQuery("");
    setMobileMenuOpen(false);
  }

  function handleToggleArticle(id: string) {
    setExpandedArticle(expandedArticle === id ? null : id);
  }

  return (
    <div className="min-h-screen mesh-bg text-foreground">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSection={activeSection}
        showingSearch={showingSearch}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSectionChange={handleSectionChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 py-8">
        <Sidebar
          activeSection={activeSection}
          showingSearch={showingSearch}
          onSectionChange={handleSectionChange}
        />

        <main className="flex-1 min-w-0">
          {activeSection === "home" && !showingSearch && (
            <HomeView
              onSectionChange={handleSectionChange}
              onSearch={setSearchQuery}
            />
          )}

          {(showingSearch || activeSection !== "home") && (
            <ArticlesView
              activeSection={activeSection}
              searchQuery={searchQuery}
              showingSearch={showingSearch}
              filteredArticles={filteredArticles}
              searchResultsCount={searchResults.length}
              expandedArticle={expandedArticle}
              onToggleArticle={handleToggleArticle}
            />
          )}
        </main>
      </div>

      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="FlaskConical" size={14} className="text-teal" />
            Химия в стоматологии — научный справочник
          </div>
          <div className="text-xs text-muted-foreground">Основы · Материалы · Технологии · Инновации</div>
        </div>
      </footer>
    </div>
  );
}
