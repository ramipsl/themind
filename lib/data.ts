// ─── Static site content ─────────────────────────────────────────────────────
// All placeholder text lives here — easy to hand off to the client for editing.
// TODO items call out every field that needs real data.

// ─── Games ───────────────────────────────────────────────────────────────────
// Thumbnails live in /public/games/{image}.png — cropped from the source collage.
export const GAMES = [
  { id: 1, name: "Monopoly",          tag: "Classic",   players: "2–6",  image: "/games/monopoly.png"         },
  { id: 2, name: "Poker",             tag: "Card Game", players: "2–10", image: "/games/poker.png"            },
  { id: 3, name: "Uno",               tag: "Card Game", players: "2–10", image: "/games/uno.png"              },
  { id: 4, name: "Chess",             tag: "Classic",   players: "2",    image: "/games/chess.png"            },
  { id: 5, name: "Azul",              tag: "Strategy",  players: "2–4",  image: "/games/azul.png"             },
  { id: 6, name: "What Do You Meme?", tag: "Party",     players: "3–20", image: "/games/what-do-you-meme.png" },
  { id: 7, name: "Dominoes",          tag: "Classic",   players: "2–4",  image: "/games/dominoes.png"         },
  { id: 8, name: "Splendor",          tag: "Strategy",  players: "2–4",  image: "/games/splendor.png"         },
];

// ─── Menu ─────────────────────────────────────────────────────────────────────
// Real menu items. Prices in IQD.
// Note: item names render in font-display — use only letters, numbers, spaces.

export const MENU_DRINKS = [
  { id: 1, name: "Spanish Latte",       desc: "Espresso, steamed milk, sugar syrup",        price: "5,000" },
  { id: 2, name: "Ice Pistachio",       desc: "Pistachio sauce, cold milk, ice",             price: "6,000" },
  { id: 3, name: "Cold Brew",           desc: "Slow-steeped 18 hours, bold and smooth",      price: "5,000" },
  { id: 4, name: "Strawberry Smoothie", desc: "Fresh strawberry blend, chilled",             price: "6,000" },
  { id: 5, name: "Flat White",          desc: "Double ristretto, velvety microfoam",         price: "4,000" },
];

export const MENU_FOOD = [
  { id: 1, name: "Marvel Burger",       desc: "Beef patty, cheese, house sauce",             price: "7,000"  },
  { id: 2, name: "Mind Burger",         desc: "Double patty, caramelised onions, signature sauce", price: "9,500" },
  { id: 3, name: "Fettuccine Alfredo",  desc: "Creamy parmesan sauce, fresh pasta",          price: "11,000" },
  { id: 4, name: "The Mind Pasta",      desc: "House signature pasta, seasonal",             price: "12,000" },
  { id: 5, name: "Chicken Fajita",      desc: "Grilled chicken, peppers, warm tortilla",     price: "7,000"  },
];

export const MENU_SWEETS = [
  { id: 1, name: "Mini Pancake",        desc: "Stack of fluffy minis with honey drizzle",   price: "6,000" },
  { id: 2, name: "Waffle",              desc: "Belgian-style, served with cream",            price: "6,000" },
  { id: 3, name: "Brownies",            desc: "Rich chocolate, chewy centre",                price: "5,000" },
  { id: 4, name: "San Sebastian",       desc: "Basque-style cheesecake, burnt top",          price: "6,000" },
  { id: 5, name: "Ice Cream 5 Scoops",  desc: "Five scoops, mix and match",                 price: "5,000" },
];

// ─── Navigation ──────────────────────────────────────────────────────────────
// Hrefs are absolute (with leading "/") so the nav works from /menu too.
// "Menu" goes to the dedicated full-menu page; other links jump to homepage anchors.
// "Menu" links to the dedicated full-menu page; others jump to homepage anchors.
export const NAV_LINKS = [
  { label: "Home",      href: "/#home"      },
  { label: "Games",     href: "/#games"     },
  { label: "Community", href: "/#community" },
  { label: "See More",  href: "/#gallery"   },
];

// ─── Contact and Hours ───────────────────────────────────────────────────────
// TODO: Replace every value below with real info before showing to the client
export const CONTACT = {
  // WhatsApp: include country code, no + or spaces (e.g. "9647001234567")
  whatsappNumber:  "9647XXXXXXXXX",
  whatsappMessage: "Hi! I'd like to reserve a table at The Mind Cafe.",

  // Instagram
  instagramHandle: "themind_iraq",
  instagramUrl:    "https://instagram.com/themind_iraq",

  // Google Maps — replace with real pin
  mapsUrl: "https://maps.google.com/?q=The+Mind+Cafe+Baghdad",

  // Address shown in footer
  address: "Baghdad, Iraq",

  // Opening hours
  hours: [
    { days: "Every Day", time: "9:00 AM — 1:30 AM" },
  ],

  // Branch map links
  branches: [
    { name: "Zayouna",   mapsUrl: "https://maps.app.goo.gl/tfTZuupYPgCLjZ2g7" },
    { name: "Adhamiya",  mapsUrl: "https://maps.app.goo.gl/7LXDzpR2nMUHZiQNA" },
  ],
};
