import { FULL_MENU, type MenuCategory } from "./menu-data";

// ─── Filter taxonomy ─────────────────────────────────────────────────────────
// Two-level navigation:
//   PRIMARY_FILTERS    → top-row pills, always visible
//   SECONDARY_FILTERS  → contextual pills shown only when an applicable primary
//                        is active (Drinks, Desserts, Sandwiches)
//   FILTER_EXPANSIONS  → for any filter id that maps to multiple real
//                        categories (i.e. a "virtual" group), the list of real
//                        MenuCategory ids it includes. IDs not present here are
//                        treated as a single real category id.

export interface FilterPill {
  id:   string;
  name: string;
}

export const PRIMARY_FILTERS: FilterPill[] = [
  { id: "all",              name: "All" },
  { id: "breakfast",        name: "Breakfast" },
  { id: "salad",            name: "Salad" },
  { id: "pasta",            name: "Pasta" },
  { id: "meat",             name: "Meat" },
  { id: "chicken",          name: "Chicken" },
  { id: "sandwiches",       name: "Sandwiches" },
  { id: "pizza",            name: "Pizza" },
  { id: "burger",           name: "Burger" },
  { id: "fries",            name: "Fries" },
  { id: "drinks",           name: "Drinks" },
  { id: "desserts",         name: "Desserts" },
  { id: "made-in-the-mind", name: "Made In The Mind" },
];

export const SECONDARY_FILTERS: Record<string, FilterPill[]> = {
  drinks: [
    { id: "espresso",    name: "Espresso" },
    { id: "coffee",      name: "Coffee" },
    { id: "cold-drinks", name: "Cold Drinks" },
    { id: "smoothies",   name: "Smoothie" },
    { id: "milk-shake",  name: "Milk Shake" },
    { id: "ice-cream",   name: "Ice Cream" },
    { id: "hot-drinks",  name: "Hot Drinks" },
  ],
  desserts: [
    { id: "pastries", name: "Pasteries" },
    { id: "cake",     name: "Cake" },
  ],
  sandwiches: [
    { id: "meat-sandwiches",    name: "Meat Sandwiches" },
    { id: "chicken-sandwiches", name: "Chicken Sandwiches" },
  ],
};

const FILTER_EXPANSIONS: Record<string, string[]> = {
  drinks: [
    "espresso", "coffee",
    "cold-drinks-with-coffee", "cold-drinks-without-coffee",
    "smoothies", "milk-shake", "ice-cream",
    "hot-drinks-with-coffee", "hot-drinks-without-coffee",
  ],
  desserts:      ["pastries", "cake"],
  sandwiches:    ["meat-sandwiches", "chicken-sandwiches"],
  "cold-drinks": ["cold-drinks-with-coffee", "cold-drinks-without-coffee"],
  "hot-drinks":  ["hot-drinks-with-coffee", "hot-drinks-without-coffee"],
};

export function hasSecondaryFilters(primaryId: string): boolean {
  return primaryId in SECONDARY_FILTERS;
}

// Resolve a filter id (primary or secondary) to the visible MenuCategory list.
export function getCategoriesForFilter(filter: string): MenuCategory[] {
  if (filter === "all") return FULL_MENU;
  const ids = FILTER_EXPANSIONS[filter] ?? [filter];
  return FULL_MENU.filter((c) => ids.includes(c.id));
}
