"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// ─── Language types ──────────────────────────────────────────────────────────
export type Lang = "en" | "ar";

// ─── Translation dictionary ──────────────────────────────────────────────────
// Flat dot-notation keys. Brand names (The Mind, talabat, Instagram, WhatsApp,
// IQD) are kept untranslated since they are proper nouns / wordmarks.
export const dict = {
  en: {
    // Navbar
    "nav.home":      "Home",
    "nav.games":     "Games",
    "nav.community": "Community",
    "nav.seeMore":   "See More",
    "nav.menu":      "Menu",
    "nav.openMenu":  "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.switchToArabic": "Switch to Arabic",
    "nav.switchToEnglish": "Switch to English",

    // Hero
    "hero.eyebrow":   "Board Games and Coffee in Baghdad",
    "hero.title":     "Free Your Mind",
    "hero.body":      "Order something good. Pick a game from the shelf. Put the phone down. The conversations tend to handle themselves.",
    "hero.viewMenu":  "View Menu",
    "hero.scroll":    "Scroll",

    // Experience
    "experience.eyebrow":              "The Experience",
    "experience.title":                "Everything in one place",
    "experience.coffee.title":         "Coffee",
    "experience.coffee.desc":          "Pour-overs, cold brews, matcha, and proper Turkish coffee. Made carefully, exactly the way you like it.",
    "experience.boardGames.title":     "Board Games",
    "experience.boardGames.desc":      "500+ titles spanning strategy, party games, and classics. Not sure where to start? Our staff genuinely love helping.",
    "experience.community.title":      "Community",
    "experience.community.desc":       "Regulars and first-timers feel equally at home here. Open tables, friendly faces, and always one more round to play.",

    // NoWifi section
    "noWifi.eyebrow":       "The whole point",
    "noWifi.title.no":      "No",
    "noWifi.title.wifi":    "Wi-Fi",
    "noWifi.title.needed":  "Needed",
    "noWifi.body1":         "The Mind is made for moments that screens usually interrupt. A table, a game, something to drink, and people actually looking at each other.",
    "noWifi.body2.before":  "Put the phone ",
    "noWifi.body2.faceDown":"face down",
    "noWifi.body2.after":   ". Order something good. Let the game do the rest.",

    // Featured Games
    "games.eyebrow":              "500+ Titles",
    "games.title":                "Fan Favourites",
    "games.body":                 "Our most-played titles.",
    "games.ask.before":           "Ask a staff member,",
    "games.ask.beforeInline":     "Ask a staff member, ",
    "games.ask.highlight":        "they always have a recommendation.",
    "games.footer":               "...and 250+ more on the shelves, waiting to be discovered.",
    "games.players":              "p",

    // Choose Your Mind
    "choose.eyebrow":                  "At The Mind",
    "choose.title":                    "Choose Your Mind",
    "choose.body":                     "Different spaces for different moods. One place to free your mind.",
    "choose.boardGames.title":         "Board Games",
    "choose.boardGames.desc":          "500 plus titles across every mood and group size. Staff always have a recommendation.",
    "choose.vip.title":                "VIP Room",
    "choose.vip.desc":                 "A private space for groups who want their own table and their own pace.",
    "choose.monobowling.title":        "Monobowling",
    "choose.monobowling.desc":         "A different kind of game night. Roll a few rounds between the food and the coffee.",
    "choose.monobowling.branch":       "* Zayouna Branch Only",
    "choose.rooftop.title":            "Rooftop",
    "choose.rooftop.desc":             "Open air evenings with good food, games, and people actually looking at each other.",
    "choose.rooftop.branch":           "* Adhamiyah Branch Only",
    "choose.foodCoffee.title":         "Food and Coffee",
    "choose.foodCoffee.desc":          "Burgers, pasta, cold brews, and sweets. Made to stay a while.",

    // Why People Come Back
    "why.eyebrow":             "Why people come back",
    "why.title":               "Made for Every Kind of Hangout",
    "why.body":                "Whether it's a group outing, a casual catch-up, or just somewhere good to be — there's a table for you.",
    "why.memory.title":        "Memory Makers",
    "why.memory.desc":         "A place for groups to laugh play and make the kind of memories that stay.",
    "why.noWifi.title":        "No Wi-Fi Needed",
    "why.noWifi.desc":         "The whole point is to look up from the screen and connect with the people at your table.",
    "why.games.title":         "Games For Everyone",
    "why.games.desc":          "From quick games to longer rounds the staff can help you choose what fits the mood.",
    "why.foodDrinks.title":    "Food, Drinks, Games",
    "why.foodDrinks.desc":     "Burgers pasta coffee smoothies desserts and games all in one place.",
    "why.footer":              "Based on what our customers actually say about us.",

    // Gallery (Instagram CTA)
    "gallery.eyebrow":         "Follow Along",
    "gallery.title":           "See more on Instagram",
    "gallery.body1":           "New games, new dishes, and moments from The Mind.",
    "gallery.body2":           "Tag us when you visit, we love seeing it.",
    "gallery.visit":           "Visit Instagram",

    // Footer
    "footer.tagline":      "Board games, coffee, food, and good company.",
    "footer.hoursTitle":   "Opening Hours",
    "footer.findUs":       "Find Us",
    "footer.everyDay":     "Every Day",
    "footer.whatsapp":     "WhatsApp",
    "footer.copyright":    "The Mind Café and Board Games. All rights reserved.",
    "footer.address":      "Baghdad, Iraq",

    // Menu page
    "menu.backToHome":     "Back to home",
    "menu.eyebrow":        "The Menu",
    "menu.title":          "Menu",
    "menu.body":           "Everything we serve, all in one place. Food, coffee, drinks, shisha, and the boxes worth sharing.",
    "menu.allPricesIn":    "All prices in",
    "menu.iqd":            "IQD",
    "menu.orderFrom":      "Order from",
    "menu.searchPlaceholder": "Search the menu",
    "menu.searchAria":     "Search menu",
    "menu.clearSearch":    "Clear search",
    "menu.empty.title":    "No menu items found.",
    "menu.empty.body":     "Try a different search or clear the filter.",
    "menu.closingNote":    "Prices and availability may vary by branch.",
    "menu.todoVerify":     "TODO VERIFY",
    "menu.primaryAria":    "Primary category filters",
    "menu.secondaryAria":  "Secondary category filters",

    // Filter labels (primary)
    "filter.all":              "All",
    "filter.breakfast":        "Breakfast",
    "filter.salad":            "Salad",
    "filter.pasta":            "Pasta",
    "filter.meat":             "Meat",
    "filter.chicken":          "Chicken",
    "filter.sandwiches":       "Sandwiches",
    "filter.pizza":            "Pizza",
    "filter.burger":           "Burger",
    "filter.fries":            "Fries",
    "filter.drinks":           "Drinks",
    "filter.desserts":         "Desserts",
    "filter.madeInTheMind":    "Made In The Mind",

    // Filter labels (secondary)
    "filter.espresso":         "Espresso",
    "filter.coffee":           "Coffee",
    "filter.coldDrinks":       "Cold Drinks",
    "filter.smoothies":        "Smoothie",
    "filter.milkShake":        "Milk Shake",
    "filter.iceCream":         "Ice Cream",
    "filter.hotDrinks":        "Hot Drinks",
    "filter.pastries":         "Pasteries",
    "filter.cake":             "Cake",
    "filter.meatSandwiches":   "Meat Sandwiches",
    "filter.chickenSandwiches":"Chicken Sandwiches",

    // Menu category headings (rendered from category.name)
    "category.breakfast":                  "Breakfast",
    "category.salad":                      "Salad",
    "category.pasta":                      "Pasta",
    "category.burger":                     "Burger",
    "category.fries":                      "Fries",
    "category.pizza":                      "Pizza",
    "category.mojito":                     "Mojito",
    "category.smoothies":                  "Smoothies",
    "category.milk-shake":                 "Milk Shake",
    "category.ice-cream":                  "Ice Cream",
    "category.cold-drinks-with-coffee":    "Cold Drinks With Coffee",
    "category.cold-drinks-without-coffee": "Cold Drinks Without Coffee",
    "category.espresso":                   "Espresso",
    "category.coffee":                     "Coffee",
    "category.hot-drinks-with-coffee":     "Hot Drinks With Coffee",
    "category.hot-drinks-without-coffee":  "Hot Drinks Without Coffee",
    "category.cake":                       "Cake",
    "category.pastries":                   "Pastries",
    "category.meat":                       "Meat",
    "category.chicken":                    "Chicken",
    "category.meat-sandwiches":            "Meat Sandwiches",
    "category.chicken-sandwiches":         "Chicken Sandwiches",
    "category.strips":                     "Strips",
    "category.rizzo":                      "Rizzo",
    "category.made-in-the-mind":           "Made in the Mind",
  },

  ar: {
    // Navbar
    "nav.home":      "الرئيسية",
    "nav.games":     "الألعاب",
    "nav.community": "المجتمع",
    "nav.seeMore":   "المزيد",
    "nav.menu":      "المينيو",
    "nav.openMenu":  "فتح المينيو",
    "nav.closeMenu": "إغلاق المينيو",
    "nav.switchToArabic":  "التبديل إلى العربية",
    "nav.switchToEnglish": "التبديل إلى الإنجليزية",

    // Hero
    // "Free Your Mind" and the hero eyebrow are intentionally kept in English
    // in Arabic mode per brand direction.
    "hero.eyebrow":   "Board Games and Coffee in Baghdad",
    "hero.title":     "Free Your Mind",
    "hero.body":      "اطلب شيء لذيذ. اختر لعبة من الرف. حط الهاتف جانب. والسوالف تجي لحالها",
    "hero.viewMenu":  "عرض المينيو",
    "hero.scroll":    "Scroll",

    // Experience
    "experience.eyebrow":              "التجربة",
    "experience.title":                "كل شيء بمكان واحد",
    "experience.coffee.title":         "قهوة",
    "experience.coffee.desc":          "قهوة مقطّرة، باردة، ماتشا، وتركية أصيلة. مسوّية بعناية، وكل واحد على مزاجه",
    "experience.boardGames.title":     "ألعاب طاولة",
    "experience.boardGames.desc":      "أكثر من 500 لعبة، بين استراتيجية وحفلات وكلاسيكيات. ما تعرف تبدأ منين؟ الموظفين عندنا يساعدونك بكل خير",
    "experience.community.title":      "مجتمع",
    "experience.community.desc":       "الزبون الجديد والدايمي يحسون ببيتهم بنفس المقدار. طاولات مفتوحة، وجوه حلوة، ودايمًا جولة زيادة",

    // NoWifi section
    // Eyebrow stays English per brand direction; "Wi-Fi" stays in English letters.
    "noWifi.eyebrow":        "The whole point",
    "noWifi.title.no":       "بدون",
    "noWifi.title.wifi":     "Wi-Fi",
    "noWifi.title.needed":   "",
    "noWifi.body1":          "ذا مايند مسوّي للحظات اللي الشاشات تقطعها. طاولة، لعبة، مشروب، وناس يشوفون بعض فعلًا",
    "noWifi.body2.before":   "حط الهاتف ",
    "noWifi.body2.faceDown": "مقلوبًا",
    "noWifi.body2.after":    ". اطلب شيء لذيذ. وخلّ اللعبة تكمل الباقي",

    // Featured Games
    "games.eyebrow":          "أكثر من 500 لعبة",
    "games.title":            "المفضّلة",
    "games.body":             "أكثر الألعاب لعبًا عندنا",
    "games.ask.before":       "اسأل أحد الموظفين،",
    "games.ask.beforeInline": "اسأل أحد الموظفين، ",
    "games.ask.highlight":    "دائمًا عندهم اقتراح",
    "games.footer":           "... وأكثر من 250 لعبة ثانية على الرفوف، بس محتاجة حد يكتشفها",
    "games.players":          "ل",

    // Choose Your Mind
    "choose.eyebrow":                  "في ذا مايند",
    "choose.title":                    "اختر مزاجك",
    "choose.body":                     "مساحات مختلفة لكل مزاج. مكان واحد تريّح فيه دماغك",
    "choose.boardGames.title":         "ألعاب طاولة",
    "choose.boardGames.desc":          "أكثر من 500 لعبة لكل مزاج وحجم مجموعة. دايمًا عند الموظفين اقتراح",
    "choose.vip.title":                "غرفة VIP",
    "choose.vip.desc":                 "غرفة خاصة لمن يبي طاولته وجوّه لحاله",
    "choose.monobowling.title":        "مونوبولينغ",
    "choose.monobowling.desc":         "نوع مختلف من ليالي الألعاب. ارمي شوية جولات بين الأكل والقهوة",
    "choose.monobowling.branch":       "* فرع زيونة فقط",
    "choose.rooftop.title":            "السطح",
    "choose.rooftop.desc":             "أمسيات بالهوا الطلق، أكل زين، ألعاب، وناس يسولفون فعلًا",
    "choose.rooftop.branch":           "* فرع الاعظمية فقط",
    "choose.foodCoffee.title":         "طعام وقهوة",
    "choose.foodCoffee.desc":          "برغر، باستا، قهوة باردة، وحلويات. الأشياء اللي تخليك تتأخر بالمقصود",

    // Why People Come Back
    "why.eyebrow":             "ليش الناس يرجعون",
    "why.title":               "يصلح لكل نوع لقاء",
    "why.body":                "سواء خرجة جماعية، لقاء عابر، أو بس مكان تريح فيه — دايمًا في طاولة تنطرك",
    "why.memory.title":        "صنّاع الذكريات",
    "why.memory.desc":         "مكان تضحكون فيه وتلعبون وتسوون ذكريات ما تنسى",
    "why.noWifi.title":        "بدون واي-فاي",
    "why.noWifi.desc":         "الفكرة كلها إنك ترفع عينك من الشاشة وتشوف الناس اللي قدامك",
    "why.games.title":         "ألعاب للجميع",
    "why.games.desc":          "من ألعاب سريعة لجولات طويلة، الموظفين يساعدونك تختار على حسب مزاجك",
    "why.foodDrinks.title":    "اكل، مشروبات، العاب",
    "why.foodDrinks.desc":     "برغر، باستا، قهوة، عصائر، حلويات، والعاب كلها بمكان واحد",
    "why.footer":              "هذا اللي يقوله زبائننا عنا فعلًا",

    // Gallery (Instagram CTA)
    "gallery.eyebrow":         "تابعنا",
    "gallery.title":           "المزيد على Instagram",
    "gallery.body1":           "العاب جديدة، اطباق جديدة، ولحظات من ذا مايند",
    "gallery.body2":           "سوولنا تاگ من تزورون، نحب نشوف ونستكم",
    "gallery.visit":           "زيارة Instagram",

    // Footer
    "footer.tagline":      "ألعاب طاولة، قهوة، طعام، وصحبة جيدة",
    "footer.hoursTitle":   "ساعات العمل",
    "footer.findUs":       "وين نحن",
    "footer.everyDay":     "كل يوم",
    "footer.whatsapp":     "واتساب",
    "footer.copyright":    "The Mind Café and Board Games. جميع الحقوق محفوظة",
    "footer.address":      "بغداد، العراق",

    // Menu page
    "menu.backToHome":     "العودة للرئيسية",
    "menu.eyebrow":        "المينيو",
    "menu.title":          "المينيو",
    "menu.body":           "كل اللي نقدمه، بمكان واحد. أكل، قهوة، مشروبات، شيشة، والصناديق اللي تستاهل تشاركها",
    "menu.allPricesIn":    "كل الأسعار بـ",
    "menu.iqd":            "د.ع",
    "menu.orderFrom":      "اطلب من",
    "menu.searchPlaceholder": "ابحث في المينيو",
    "menu.searchAria":     "ابحث في المينيو",
    "menu.clearSearch":    "مسح البحث",
    "menu.empty.title":    "ما لقينا شيء",
    "menu.empty.body":     "جرّب بحث ثاني أو امسح الفلتر",
    "menu.closingNote":    "الأسعار والتوفّر قد تختلف حسب الفرع",
    "menu.todoVerify":     "للتحقق",
    "menu.primaryAria":    "فلاتر الفئة الرئيسية",
    "menu.secondaryAria":  "فلاتر الفئة الثانوية",

    // Filter labels (primary)
    "filter.all":              "الكل",
    "filter.breakfast":        "فطور",
    "filter.salad":            "سلطة",
    "filter.pasta":            "باستا",
    "filter.meat":             "لحم",
    "filter.chicken":          "دجاج",
    "filter.sandwiches":       "ساندويتشات",
    "filter.pizza":            "بيتزا",
    "filter.burger":           "برغر",
    "filter.fries":            "بطاطا",
    "filter.drinks":           "مشروبات",
    "filter.desserts":         "حلويات",
    "filter.madeInTheMind":    "صنع في ذا مايند",

    // Filter labels (secondary)
    "filter.espresso":         "إسبريسو",
    "filter.coffee":           "قهوة",
    "filter.coldDrinks":       "مشروبات باردة",
    "filter.smoothies":        "سموثي",
    "filter.milkShake":        "ميلك شيك",
    "filter.iceCream":         "آيس كريم",
    "filter.hotDrinks":        "مشروبات ساخنة",
    "filter.pastries":         "معجنات",
    "filter.cake":             "كيك",
    "filter.meatSandwiches":   "ساندويتشات لحم",
    "filter.chickenSandwiches":"ساندويتشات دجاج",

    // Menu category headings
    "category.breakfast":                  "فطور",
    "category.salad":                      "سلطة",
    "category.pasta":                      "باستا",
    "category.burger":                     "برغر",
    "category.fries":                      "بطاطا",
    "category.pizza":                      "بيتزا",
    "category.mojito":                     "موهيتو",
    "category.smoothies":                  "سموثي",
    "category.milk-shake":                 "ميلك شيك",
    "category.ice-cream":                  "آيس كريم",
    "category.cold-drinks-with-coffee":    "مشروبات باردة بالقهوة",
    "category.cold-drinks-without-coffee": "مشروبات باردة بدون قهوة",
    "category.espresso":                   "إسبريسو",
    "category.coffee":                     "قهوة",
    "category.hot-drinks-with-coffee":     "مشروبات ساخنة بالقهوة",
    "category.hot-drinks-without-coffee":  "مشروبات ساخنة بدون قهوة",
    "category.cake":                       "كيك",
    "category.pastries":                   "معجنات",
    "category.meat":                       "لحم",
    "category.chicken":                    "دجاج",
    "category.meat-sandwiches":            "ساندويتشات لحم",
    "category.chicken-sandwiches":         "ساندويتشات دجاج",
    "category.strips":                     "ستربس",
    "category.rizzo":                      "ريزو",
    "category.made-in-the-mind":           "صنع في ذا مايند",
  },
} as const;

export type TranslationKey = keyof typeof dict["en"];

// ─── Context ─────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang:       Lang;
  dir:        "ltr" | "rtl";
  setLang:    (lang: Lang) => void;
  toggleLang: () => void;
  t:          (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "tmc.lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") setLangState(saved);
    } catch {
      // localStorage unavailable — keep default
    }
  }, []);

  // Sync html lang for accessibility/font selection. Do NOT touch
  // document.documentElement.dir — the page layout stays LTR globally so the
  // navbar (logo / nav / CTAs) keeps the same visual order in both languages.
  // RTL flow is applied per text element via the `dir` context value.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try { window.localStorage.setItem(STORAGE_KEY, newLang); } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (key: TranslationKey): string => dict[lang][key] ?? dict.en[key] ?? key,
    [lang],
  );

  const value: LanguageContextValue = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    setLang,
    toggleLang,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

// Convenience hook for just the translate function
export function useT() {
  return useLanguage().t;
}
