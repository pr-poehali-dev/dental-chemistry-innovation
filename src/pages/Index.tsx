import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/6e7a0d60-5827-4527-a62d-7b727380c592/files/b18ddf9c-d024-4c38-998b-02748ee078c9.jpg";

const SECTIONS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "basics", label: "Основы", icon: "BookOpen" },
  { id: "materials", label: "Материалы", icon: "Layers" },
  { id: "technologies", label: "Технологии", icon: "Cpu" },
  { id: "innovations", label: "Инновации", icon: "Sparkles" },
];

type Article = {
  id: string;
  section: string;
  title: string;
  tag: string;
  tagColor: string;
  summary: string;
  content: string[];
  keywords: string[];
};

const ARTICLES: Article[] = [
  {
    id: "a1",
    section: "basics",
    title: "Химическая природа эмали и дентина",
    tag: "Основы",
    tagColor: "bg-teal/20 text-teal",
    summary: "Эмаль — наиболее минерализованная ткань человеческого тела, состоящая на 96% из гидроксиапатита.",
    keywords: ["эмаль", "дентин", "гидроксиапатит", "минерализация", "кальций"],
    content: [
      "Эмаль зуба состоит примерно на 96% из неорганических веществ, главным образом из кристаллического гидроксиапатита Ca₁₀(PO₄)₆(OH)₂. Кристаллы гидроксиапатита в эмали имеют гексагональную структуру и являются крупнейшими биологическими кристаллами в организме человека.",
      "Дентин содержит около 70% неорганических веществ (в основном гидроксиапатит), 20% органических (преимущественно коллаген I типа) и 10% воды. Высокое содержание органики делает дентин значительно эластичнее эмали.",
      "Замещение ионов OH⁻ на F⁻ в кристаллической решётке приводит к образованию фторапатита Ca₁₀(PO₄)₆F₂, который обладает меньшей растворимостью в кислотах, что объясняет кариесзащитное действие фторидов.",
    ],
  },
  {
    id: "a2",
    section: "basics",
    title: "Кислотно-основные реакции в полости рта",
    tag: "Основы",
    tagColor: "bg-teal/20 text-teal",
    summary: "pH-динамика в полости рта определяет скорость деминерализации эмали.",
    keywords: ["pH", "деминерализация", "реминерализация", "кислота", "зубной налёт"],
    content: [
      "Кривая Стефана описывает изменение pH зубного налёта после приёма углеводов. В норме pH слюны составляет 6,2–7,6. При снижении до «критического» значения (5,5) начинается растворение гидроксиапатита.",
      "Основной источник кислот — метаболическая активность Streptococcus mutans, который сбраживает сахарозу до молочной кислоты. Скорость деминерализации пропорциональна концентрации протонов и обратно пропорциональна насыщению слюны кальцием и фосфатами.",
      "Буферные системы слюны (бикарбонатная, фосфатная, белковая) обеспечивают нейтрализацию кислот. При нормальной слюноотделительной функции реминерализация уравновешивает деминерализацию.",
    ],
  },
  {
    id: "a3",
    section: "basics",
    title: "Адгезия в стоматологии: принципы химической связи",
    tag: "Адгезия",
    tagColor: "bg-amber/20 text-amber",
    summary: "Молекулярные механизмы сцепления реставрационных материалов с тканями зуба.",
    keywords: ["адгезия", "бондинг", "адгезивная система", "протравливание", "дентинные канальцы"],
    content: [
      "Адгезия стоматологических материалов осуществляется за счёт трёх механизмов: механического сцепления (микроретенция), химической связи (ионные, ковалентные, водородные взаимодействия) и физической адсорбции (ван-дер-ваальсовые силы).",
      "Тотальное травление фосфорной кислотой (30–40%) деминерализует поверхностный слой эмали на 10–15 мкм и открывает дентинные канальцы. Это создаёт пористую поверхность с развитой микроструктурой для инфильтрации смолы.",
      "Молекулы праймера (HEMA, 4-META) содержат гидрофильные группы для связи с коллагеном и гидрофобные для совместимости со смолой. Амфифильная природа обеспечивает переходный слой между гидрофильным дентином и гидрофобным адгезивом.",
    ],
  },
  {
    id: "a4",
    section: "materials",
    title: "Металлы и сплавы в стоматологии",
    tag: "Металлы",
    tagColor: "bg-blue-500/20 text-blue-400",
    summary: "От амальгамы до кобальт-хромовых сплавов: химия металлических конструкций.",
    keywords: ["амальгама", "золото", "кобальт-хром", "никель-хром", "титан", "сплав"],
    content: [
      "Стоматологическая амальгама — сплав ртути (45–50%) с серебром, оловом, медью и цинком. Реакция амальгамирования: Ag₃Sn + Hg → Ag₂Hg₃ + Sn₇Hg (γ-фаза). Коррозионная стойкость повышается при увеличении содержания меди до «высокомедных» сплавов (>13%).",
      "Кобальт-хромовые сплавы (65% Co, 25–30% Cr, 5% Mo) используются в каркасных протезах. Хром обеспечивает коррозионную стойкость за счёт оксидной пассивирующей плёнки Cr₂O₃. Модуль упругости (200 ГПа) вдвое выше, чем у золотых сплавов.",
      "Титан (Grade 4 и Grade 5 Ti-6Al-4V) превосходит другие металлы по биосовместимости. На поверхности самопроизвольно формируется TiO₂-плёнка толщиной 2–10 нм, обеспечивающая оссеоинтеграцию имплантов.",
    ],
  },
  {
    id: "a5",
    section: "materials",
    title: "Полимерные композиты: химия и структура",
    tag: "Композиты",
    tagColor: "bg-purple-500/20 text-purple-400",
    summary: "Матрица, наполнитель, силан: трёхкомпонентная система, определяющая свойства.",
    keywords: ["композит", "бисфенол", "TEGDMA", "наполнитель", "силан", "фотополимеризация"],
    content: [
      "Современные композиты состоят из органической матрицы (Bis-GMA, UDMA, TEGDMA), неорганического наполнителя (стекло, кварц, ZrO₂; 60–80 вес%) и силанового связующего агента (γ-МПС). Степень конверсии мономера при фотополимеризации достигает 55–75%.",
      "Механизм фотополимеризации: камфорохинон (λmax = 468 нм) поглощает фотон, образует синглетное возбуждённое состояние, переходит в триплет и генерирует радикалы при взаимодействии с третичным амином (DMAEMA). Радикалы инициируют цепную полимеризацию.",
      "Полимеризационная усадка (1,5–3,5%) остаётся ключевой проблемой. Объёмные нанокомпозиты с частицами 5–100 нм демонстрируют меньшую усадку и превосходную полируемость. Добавки нанодиоксида циркония повышают трещиностойкость.",
    ],
  },
  {
    id: "a6",
    section: "materials",
    title: "Керамика и стеклокерамика в стоматологии",
    tag: "Керамика",
    tagColor: "bg-orange-500/20 text-orange-400",
    summary: "Диоксид циркония и литиевая стеклокерамика — материалы эпохи CAD/CAM.",
    keywords: ["керамика", "диоксид циркония", "IPS e.max", "стеклокерамика", "CAD/CAM", "цирконий"],
    content: [
      "Диоксид циркония (ZrO₂) существует в трёх кристаллических модификациях. Тетрагональная (t) стабилизируется Y₂O₃ (3 mol%). При распространении трещины тетрагональные кристаллы переходят в моноклинную (m) фазу с увеличением объёма на 3–5% — механизм трансформационного упрочнения.",
      "Литиевая дисиликатная стеклокерамика (IPS e.max CAD): кристаллы Li₂Si₂O₅ размером 0,5–1,5 мкм в стеклянной матрице. Прочность на изгиб 360–400 МПа при отличной прозрачности. Протравливание плавиковой кислотой (5–10%) и силанизация обеспечивают адгезивную фиксацию.",
      "Полупрозрачный цирконий 5Y-PSZ содержит 5 mol% Y₂O₃, стабилизирующего кубическую фазу. Светопропускание 48% (против 20% у 3Y-TZP) при незначительном снижении прочности до 500–700 МПа.",
    ],
  },
  {
    id: "a7",
    section: "technologies",
    title: "Фторсодержащие соединения: механизм защиты",
    tag: "Профилактика",
    tagColor: "bg-green-500/20 text-green-400",
    summary: "Молекулярные механизмы кариесзащитного действия фторидов.",
    keywords: ["фтор", "фторид", "фторапатит", "фторид натрия", "профилактика", "кариес"],
    content: [
      "Фторид-ион встраивается в кристаллическую решётку гидроксиапатита, замещая OH⁻: Ca₁₀(PO₄)₆(OH)₂ + 2F⁻ → Ca₁₀(PO₄)₆F₂ + 2OH⁻. Произведение растворимости фторапатита (Ksp = 10⁻¹²⁰) значительно ниже, чем у гидроксиапатита (Ksp = 10⁻¹¹⁷).",
      "Топические фториды (фторид натрия 0,2–2%, аминофторид, SnF₂) действуют локально. Аминофторид образует гидрофобную плёнку на поверхности зуба, тормозя адгезию бактерий. SnF₂ осаждает труднорастворимые SnF₂ и Sn-фосфаты, блокируя дентинные канальцы.",
      "Системные фториды (фторирование воды до 0,7–1 мг/л) обеспечивают включение фторидов в эмаль в период её минерализации. Оптимальная концентрация определяется балансом между кариеспрофилактическим эффектом и риском флюороза.",
    ],
  },
  {
    id: "a8",
    section: "technologies",
    title: "Отбеливание зубов: химия и безопасность",
    tag: "Технологии",
    tagColor: "bg-teal/20 text-teal",
    summary: "Перекись водорода, свободные радикалы и молекулы хромофоров.",
    keywords: ["отбеливание", "перекись водорода", "карбамид", "хромофоры", "безопасность"],
    content: [
      "Активное вещество — H₂O₂ (10–40% в профессиональных системах) или карбамида пероксид CO(NH₂)₂·H₂O₂ (10–22%), высвобождающий ~35% H₂O₂. В щелочной среде H₂O₂ диссоциирует: H₂O₂ → HO₂⁻ + H⁺. Гидропероксид-анион HO₂⁻ — ключевой агент отбеливания.",
      "Механизм: свободные радикалы (OH•, HO₂•) расщепляют ненасыщенные двойные связи C=C в пигментных молекулах (меланоидины, каротиноиды) и полиеновые хромофоры органической матрицы дентина. Разрыв конъюгированных систем смещает поглощение из видимой области в УФ-диапазон.",
      "Побочные эффекты: повышенная чувствительность связана с диффузией H₂O₂ в пульпу (подтверждена в 100% образцов при профессиональных концентрациях). Снижение микротвёрдости эмали обратимо — восстановление за 2 недели в слюне. Применение нитрата калия (5%) снижает дентинную гиперчувствительность.",
    ],
  },
  {
    id: "a9",
    section: "innovations",
    title: "Наногидроксиапатит в регенеративной стоматологии",
    tag: "Инновации",
    tagColor: "bg-pink-500/20 text-pink-400",
    summary: "Биомиметический материал будущего для реминерализации и тканевой инженерии.",
    keywords: ["наногидроксиапатит", "наночастицы", "биомиметика", "реминерализация", "нано"],
    content: [
      "Наногидроксиапатит (nHAp) с размером частиц 20–100 нм и соотношением Ca/P = 1,67 имитирует биологический минерал зуба. Высокое отношение поверхности к объёму (до 100 м²/г) обеспечивает быстрое взаимодействие с белками и клетками.",
      "В зубных пастах концентрация 5–10% nHAp эффективно реминерализует начальные кариозные поражения (white spot lesions). Механизм: наночастицы вступают в ионный обмен с поверхностью эмали, встраиваясь в дефектные участки кристаллов. Эффективность сопоставима с фторсодержащими аналогами.",
      "В тканевой инженерии nHAp используется как компонент каркасных систем (scaffold) для регенерации кости. Покрытия nHAp на имплантах (плазменное напыление, гидротермальное осаждение) улучшают оссеоинтеграцию и ускоряют формирование новой костной ткани.",
    ],
  },
  {
    id: "a10",
    section: "innovations",
    title: "Биоактивное стекло: ионный обмен и регенерация",
    tag: "Инновации",
    tagColor: "bg-pink-500/20 text-pink-400",
    summary: "45S5 и его потомки: от Хенча до современных мезопористых стёкол.",
    keywords: ["биоактивное стекло", "45S5", "силикат", "биоактивность", "костная ткань"],
    content: [
      "Классическое биоактивное стекло 45S5 (SiO₂ 45%, Na₂O 24,5%, CaO 24,5%, P₂O₅ 6%) изобретено Ларри Хенчем в 1969 г. В контакте с биологической жидкостью протекает 5-стадийный ионный обмен: Na⁺ и Ca²⁺ замещаются H⁺, создаётся обогащённый SiO₂-гель-слой, затем осаждается карбонатгидроксиапатит.",
      "Ионы кремния (Si(OH)₄) и ионы кальция, высвобождаемые из биостекла, активируют остеогенные гены в клетках: VEGF, FGF-2, повышают экспрессию костного морфогенетического белка BMP-2. Это отличает биостекло от биоинертных материалов — оно не просто совместимо, а активирует регенерацию.",
      "Мезопористые биостёкла (MBG) с упорядоченной пористостью 2–50 нм обладают площадью поверхности 300–500 м²/г и могут служить носителями для локальной доставки антибиотиков, факторов роста и противоопухолевых препаратов.",
    ],
  },
  {
    id: "a11",
    section: "innovations",
    title: "Антибактериальные покрытия и наноматериалы",
    tag: "Новые горизонты",
    tagColor: "bg-indigo-500/20 text-indigo-400",
    summary: "Наносеребро, диоксид титана и полимеры с четвертичным аммонием против биоплёнок.",
    keywords: ["антибактериальное покрытие", "наносеребро", "хлоргексидин", "биоплёнка", "антимикробный"],
    content: [
      "Наночастицы серебра (AgNP, 1–100 нм) высвобождают Ag⁺-ионы, которые нарушают цитоплазматическую мембрану бактерий, подавляют дыхательные ферменты и вызывают окислительный стресс. Минимальная ингибирующая концентрация для S. mutans составляет 0,5–1 мкг/мл.",
      "Диоксид титана (TiO₂) при УФ-облучении генерирует активные формы кислорода (OH•, O₂•⁻), уничтожающие микроорганизмы. Фотокаталитические TiO₂-покрытия на имплантах снижают адгезию P. gingivalis на 95%. Легирование азотом (N-TiO₂) расширяет активацию в видимый диапазон.",
      "Полимеры с четвертичными аммониевыми группами (QAC) встраиваются необратимо в мембрану бактерий, нарушая её целостность. Ковалентно привитые QAC-покрытия на поверхности композитов сохраняют антибактериальную активность до 3 лет без высвобождения биоцида в окружающую среду.",
    ],
  },
  {
    id: "a12",
    section: "innovations",
    title: "Перспективы: умные материалы и биомиметика",
    tag: "Будущее",
    tagColor: "bg-amber/20 text-amber",
    summary: "pH-чувствительные системы, самозалечивающиеся полимеры и белковые матрицы.",
    keywords: ["умные материалы", "самозалечивание", "pH-чувствительный", "биомиметика", "перспективы"],
    content: [
      "pH-чувствительные реставрационные материалы выделяют антибактериальные агенты или ионы фтора только при снижении pH (кариогенная среда). Инкапсулированные в pH-responsive полимерные микрочастицы (PLGA, полиакриловая кислота) фториды высвобождаются при pH < 5,5.",
      "Самозалечивающиеся дентальные полимеры содержат микрокапсулы с незаполимеризованным мономером. При появлении микротрещины капсулы разрушаются, мономер пропитывает трещину и полимеризуется при контакте с инициатором, восстанавливая структуру материала.",
      "Амелогенин-вдохновлённые пептиды (например, P11-4) самоорганизуются в β-листовые фибриллы в полости рта, создавая матрицу для минерализации. Клинические исследования показывают регрессию начальных кариозных поражений без препарирования.",
    ],
  },
];

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

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

  return (
    <div className="min-h-screen mesh-bg text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
              <Icon name="FlaskConical" size={16} className="text-background" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight" style={{ fontFamily: "Cormorant, serif" }}>
                Химия в стоматологии
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/60 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-teal/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          <button
            className="sm:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/5 px-4 py-3 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  setSearchQuery("");
                  setMobileMenuOpen(false);
                }}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 py-8">
        {/* SIDEBAR */}
        <aside className="hidden sm:flex flex-col gap-1 w-52 flex-shrink-0 sticky top-24 self-start">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-3">
            Разделы
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSection(s.id);
                setSearchQuery("");
              }}
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

        {/* MAIN */}
        <main className="flex-1 min-w-0">
          {/* HOME */}
          {activeSection === "home" && !showingSearch && (
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
                      onClick={() => setActiveSection(s.id)}
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
                      onClick={() => setSearchQuery(term)}
                      className="tag bg-secondary text-secondary-foreground hover:bg-teal/20 hover:text-teal transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ARTICLES */}
          {(showingSearch || activeSection !== "home") && (
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
                        По запросу «{searchQuery}» найдено {searchResults.length} статей
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
                      onClick={() =>
                        setExpandedArticle(expandedArticle === article.id ? null : article.id)
                      }
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