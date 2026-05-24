// ─── The Mind — Full Menu Data ───────────────────────────────────────────────
// Source: real menu transcribed from The Mind's Instagram menu listing.
// Prices in IQD, comma-formatted for legibility.
// If an item or price is uncertain in the source, set todoVerify: true.
//
// Category names render in font-display → only letters, numbers, spaces allowed.
// Item names render in font-body — punctuation is technically safe, but the
// source uses no special characters so we keep it that way for consistency.

export interface MenuItem {
  name:         string;
  nameAr?:      string;   // Arabic translation from the real menu screenshots
  price:        string;   // IQD, comma-formatted (e.g. "10,000")
  todoVerify?:  boolean;  // mark unreadable / uncertain items from source
}

export interface MenuCategory {
  id:    string;
  name:  string;
  items: MenuItem[];
}

export const FULL_MENU: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    items: [
      { name: "Baghdadi Breakfast", nameAr: "فطور بغدادي", price: "10,000" },
      { name: "Western Breakfast",  nameAr: "فطور غربي",  price: "10,000" },
      { name: "Turkish Breakfast",  nameAr: "فطور تركي",  price: "10,000" },
      { name: "Diet Breakfast",     nameAr: "فطور دايت",  price: "10,000" },
    ],
  },
  {
    id: "salad",
    name: "Salad",
    items: [
      { name: "Caesar",                  nameAr: "سيزر",                price: "6,000" },
      { name: "Steak Salad",             nameAr: "سلطة ستيك",           price: "8,000" },
      { name: "Grilled Halloum",         nameAr: "حلوم مشوي",           price: "6,000" },
      { name: "Fattoush",                nameAr: "فتوش",                price: "5,000" },
      { name: "Chef Salad",              nameAr: "سلطة الشيف",          price: "7,000" },
      { name: "Hummus Fatteh With Oil",  nameAr: "فتة حمص بالزيت",      price: "6,000" },
      { name: "Hummus Fatteh With Meat", nameAr: "فتة حمص باللحمة",     price: "8,000" },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      { name: "Bolognese",          nameAr: "بولونيز",            price: "12,000" },
      { name: "Fettuccine Alfredo", nameAr: "فيتوتشيني الفريدو",  price: "11,000" },
      { name: "Pesto",              nameAr: "بيستو",              price: "10,000" },
      { name: "Carbonara",          nameAr: "كاربونارا",          price: "12,000" },
      { name: "The Mind",           nameAr: "ذا مايند",           price: "12,000" },
      { name: "Mac and Cheese",     nameAr: "ماك اند تشيز",       price: "9,000"  },
      { name: "Nagouz",             nameAr: "ناكوز",              price: "9,000"  },
      { name: "Meat Lasagna",       nameAr: "لازانيا لحم",        price: "12,000" },
      { name: "Chicken Lasagna",    nameAr: "لازانيا دجاج",       price: "10,000" },
    ],
  },
  {
    id: "burger",
    name: "Burger",
    items: [
      { name: "Classic Burger", nameAr: "كلاسك بركر",  price: "6,000" },
      { name: "Cheese Burger",  nameAr: "تشيز بركر",   price: "6,500" },
      { name: "Avalon Burger",  nameAr: "افالون بركر", price: "7,000" },
      { name: "Bang Burger",    nameAr: "بانك بركر",   price: "6,500" },
      { name: "Cowboy Burger",  nameAr: "كاوبوي بركر", price: "7,000" },
      { name: "Marvel Burger",  nameAr: "مارفل بركر",  price: "7,000" },
      { name: "Texas Burger",   nameAr: "تكساس بركر",  price: "7,500" },
      { name: "Mind Burger",    nameAr: "مايند بركر",  price: "9,500" },
    ],
  },
  {
    id: "fries",
    name: "Fries",
    items: [
      { name: "Fries",             nameAr: "فرايز",            price: "3,000" },
      { name: "Fries with Cheese", nameAr: "فرايز بالجبن",     price: "4,000" },
      { name: "Jalapeni Fries",    nameAr: "هالابينو فرايز",   price: "5,000" },
      { name: "Mexican Nachos",    nameAr: "ناتشوز مكسيكي",    price: "6,000" },
      { name: "Texas Fries",       nameAr: "تكساس فرايز",      price: "6,000" },
      { name: "Curly Fries",       nameAr: "كرلي",             price: "4,000" },
      { name: "Onion Rings",       nameAr: "حلقات بصل",        price: "3,000" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    items: [
      { name: "Meat",             nameAr: "لحم",                price: "14,000" },
      { name: "Alfredo",          nameAr: "الفريدو",            price: "12,000" },
      { name: "Pepperoni",        nameAr: "ببروني",             price: "12,000" },
      { name: "Margherita",       nameAr: "ماركريتا",           price: "10,000" },
      { name: "Vegetable",        nameAr: "خضار",               price: "10,000" },
      { name: "Four Seasons",     nameAr: "الفصول الاربعة",     price: "14,000" },
      { name: "Barbecue Meat",    nameAr: "باربيكيو لحم",       price: "14,000" },
      { name: "Barbecue Chicken", nameAr: "باربيكيو دجاج",      price: "12,000" },
      { name: "Mexican",          nameAr: "مكسيكي",             price: "13,000" },
    ],
  },
  {
    id: "mojito",
    name: "Mojito",
    items: [
      { name: "Strawberry",                nameAr: "فراولة",              price: "6,000" },
      { name: "Hawaii",                    nameAr: "هاواي",               price: "6,000" },
      { name: "Passion Fruit",             nameAr: "باشن فروت",           price: "6,000" },
      { name: "Blue Curacao",              nameAr: "بلو كورساو",          price: "6,000" },
      { name: "Energy Drink",              nameAr: "انرجي درنك",          price: "6,000" },
      { name: "Mango",                     nameAr: "مانجو",               price: "6,000" },
      { name: "Sunshine",                  nameAr: "سن شاين",             price: "6,000" },
      { name: "Caribbean",                 nameAr: "الكاريبي",            price: "6,000" },
      { name: "Blue Boom",                 nameAr: "بلو بوم",             price: "6,000" },
      { name: "Pineapple",                 nameAr: "اناناس",              price: "6,000" },
      { name: "Strawberry And Watermelon", nameAr: "فراولة وبطيخ",        price: "6,000" },
    ],
  },
  {
    id: "smoothies",
    name: "Smoothies",
    items: [
      { name: "Catan",        nameAr: "كاتان",        price: "6,000" },
      { name: "Lychee",       nameAr: "ليتشي",        price: "6,000" },
      { name: "Blueberry",    nameAr: "بلوبيري",      price: "6,000" },
      { name: "Coconut",      nameAr: "جوز الهند",    price: "6,000" },
      { name: "Peach",        nameAr: "خوخ",          price: "6,000" },
      { name: "Strawberry",   nameAr: "فراولة",       price: "6,000" },
      { name: "Pina Colada",  nameAr: "بينا كولادا",  price: "5,000" },
    ],
  },
  {
    id: "milk-shake",
    name: "Milk Shake",
    items: [
      { name: "Strawberry", nameAr: "فراولة",   price: "6,000" },
      { name: "Lotus",      nameAr: "لوتس",     price: "6,000" },
      { name: "Oreo",       nameAr: "اوريو",    price: "6,000" },
      { name: "Kinder",     nameAr: "كندر",     price: "6,000" },
      { name: "Chocolate",  nameAr: "جوكليت",   price: "6,000" },
    ],
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    items: [
      { name: "5 Scoops", nameAr: "٥ كرات", price: "5,000" },
      { name: "3 Scoops", nameAr: "٣ كرات", price: "3,000" },
    ],
  },
  {
    id: "cold-drinks-with-coffee",
    name: "Cold Drinks With Coffee",
    items: [
      { name: "Ice Caramel",        nameAr: "ايس كراميل",         price: "5,000" },
      { name: "Ice Mocha",          nameAr: "ايس موكا",           price: "5,000" },
      { name: "Ice Latte",          nameAr: "ايس لاتيه",          price: "5,000" },
      { name: "Ice Spanish Latte",  nameAr: "ايس سبانش لاتيه",    price: "5,000" },
      { name: "Ice Pistachio",      nameAr: "ايس بستاشيو",        price: "6,000" },
      { name: "Ice Mocha White",    nameAr: "ايس موكا وايت",      price: "5,000" },
      { name: "Cold Brew",          nameAr: "كولد برو",           price: "5,000" },
      { name: "Caramel Frappe",     nameAr: "كراميل فرابي",       price: "6,000" },
      { name: "Mocha Frappe",       nameAr: "موكا فرابي",         price: "6,000" },
    ],
  },
  {
    id: "cold-drinks-without-coffee",
    name: "Cold Drinks Without Coffee",
    items: [
      { name: "Ice Matcha",    nameAr: "ايس ماتشا",   price: "6,000" },
      { name: "Ice Chocolate", nameAr: "ايس جوكليت",  price: "5,000" },
      { name: "Mexican",       nameAr: "مكسيكي",      price: "5,000" },
      { name: "Bounty",        nameAr: "باونتي",      price: "6,000" },
    ],
  },
  {
    id: "espresso",
    name: "Espresso",
    items: [
      { name: "Espresso",            nameAr: "اسبريسو",         price: "3,000" },
      { name: "Lungo",               nameAr: "لونكو",           price: "3,000" },
      { name: "Cortado",             nameAr: "كورتادو",         price: "3,500" },
      { name: "Espresso Macchiato",  nameAr: "اسبريسو مكياتو",  price: "3,500" },
      { name: "Espresso Affogato",   nameAr: "افوكاتو",         price: "4,000" },
      { name: "Ristretto",           nameAr: "رستريتو",         price: "4,000" },
      { name: "Flat White",          nameAr: "فلات وايت",       price: "4,000" },
    ],
  },
  {
    id: "coffee",
    name: "Coffee",
    items: [
      { name: "French",   nameAr: "فرنسية",  price: "3,500" },
      { name: "Turkish",  nameAr: "تركية",   price: "3,500" },
      { name: "Hazelnut", nameAr: "بندق",    price: "3,500" },
      { name: "Caramel",  nameAr: "كراميل",  price: "3,500" },
      { name: "Nestle",   nameAr: "نسلة",    price: "3,500" },
      { name: "Coconut",  nameAr: "جوز هند", price: "3,500" },
    ],
  },
  {
    id: "hot-drinks-with-coffee",
    name: "Hot Drinks With Coffee",
    items: [
      { name: "Cappuccino",            nameAr: "كابتشينو",            price: "5,000" },
      { name: "Latte",                 nameAr: "لاتيه",               price: "4,500" },
      { name: "Mocaccino",             nameAr: "موكاشينو",            price: "5,000" },
      { name: "Caramel Macchiato",     nameAr: "كراميل مكياتو",       price: "5,000" },
      { name: "Spanish Latte",         nameAr: "سبانش لاتيه",         price: "5,000" },
      { name: "Salted Caramel Latte",  nameAr: "كراميل لاتيه مملح",   price: "5,500" },
      { name: "Americano",             nameAr: "امريكانو",            price: "5,000" },
      { name: "White Mocha",           nameAr: "موكا وايت",           price: "5,000" },
      { name: "Hot Pistachio",         nameAr: "هوت بستاشيو",         price: "5,000" },
      { name: "Mocha White",           nameAr: "موكا وايت",           price: "6,000" },
      { name: "Add Flavor",            nameAr: "اضافة نكهة",          price: "1,000" },
    ],
  },
  {
    id: "hot-drinks-without-coffee",
    name: "Hot Drinks Without Coffee",
    items: [
      { name: "Hot Chocolate", nameAr: "هوت جوكليت", price: "5,000" },
      { name: "Matcha Tea",    nameAr: "شاي ماتشا",  price: "6,000" },
      { name: "Krack Tea",     nameAr: "شاي كرك",    price: "3,500" },
      { name: "Green Tea",     nameAr: "شاي اخضر",   price: "2,000" },
      { name: "Tea",           nameAr: "چاي",        price: "1,000" },
    ],
  },
  {
    id: "cake",
    name: "Cake",
    items: [
      { name: "Brownies",       nameAr: "براونيز",        price: "5,000" },
      { name: "Red Velvet",     nameAr: "رد فلفت",        price: "5,000" },
      { name: "San Sebastian",  nameAr: "سان سباستيان",   price: "6,000" },
      { name: "Traumos",        nameAr: "تراموس",         price: "6,000" },
      { name: "Blueberry Cake", nameAr: "كيك بلوبيري",    price: "6,000" },
      { name: "Choco Orange",   nameAr: "جوكو اورانج",    price: "6,000" },
    ],
  },
  {
    id: "pastries",
    name: "Pastries",
    items: [
      { name: "Mini Pancake", nameAr: "ميني بان كيك", price: "6,000" },
      { name: "Pancake",      nameAr: "بان كيك",      price: "6,000" },
      { name: "Crepe",        nameAr: "كريب",         price: "6,000" },
      { name: "Waffle",       nameAr: "وافل",         price: "6,000" },
      { name: "Croissant",    nameAr: "كرواسون",      price: "3,500" },
    ],
  },
  {
    id: "meat",
    name: "Meat",
    items: [
      { name: "Barbecue Steak",  nameAr: "لحم مشوي",         price: "18,000" },
      { name: "Mushroom Steak",  nameAr: "استيك الفطر",      price: "18,000" },
      { name: "Pepper Steak",    nameAr: "استيك الفلفل",     price: "18,000" },
      { name: "Beef Stroganoff", nameAr: "بيف استروجانوف",  price: "18,000" },
      { name: "Beef Fajita",     nameAr: "بيف فاجيتا",       price: "18,000" },
      { name: "Diet Beef Steak", nameAr: "استيك بيف دايت",  price: "18,000" },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    items: [
      { name: "Garlic-Lime Steak",            nameAr: "استيك الثوم و الليمون", price: "16,000" },
      { name: "Mushroom Steak",               nameAr: "استيك الفطر",         price: "16,000" },
      { name: "Diet Chicken Steak",           nameAr: "استيك دجاج دايت",     price: "16,000" },
      { name: "Chicken Fajita",               nameAr: "فاجيتا دجاج",         price: "16,000" },
      { name: "Cordon Bleu",                  nameAr: "كوردون بلو",         price: "16,000" },
      { name: "Chicken Scallop with Cheddar", nameAr: "اسكالوب دجاج بالجبن", price: "16,000" },
      { name: "Chicken Stroganoff",           nameAr: "دجاج استروجانوف",    price: "16,000" },
    ],
  },
  {
    id: "meat-sandwiches",
    name: "Meat Sandwiches",
    items: [
      { name: "Special Beef",   nameAr: "بيف سبيشل",        price: "7,500" },
      { name: "Taco",           nameAr: "تاكو",            price: "8,000" },
      { name: "Philadelphia",   nameAr: "فيلاديلفيا",      price: "7,000" },
      { name: "Canadian Beef",  nameAr: "بيف كندي",        price: "8,000" },
    ],
  },
  {
    id: "chicken-sandwiches",
    name: "Chicken Sandwiches",
    items: [
      { name: "Zinger",           nameAr: "زينجر",           price: "6,000" },
      { name: "Twister",          nameAr: "تويستر",         price: "6,000" },
      { name: "Chicken Fajita",   nameAr: "فاجيتا دجاج",    price: "7,000" },
      { name: "Fillet Chicken",   nameAr: "فيليه دجاج",     price: "6,500" },
      { name: "Canadian Chicken", nameAr: "دجاج كندي",      price: "7,000" },
    ],
  },
  {
    id: "strips",
    name: "Strips",
    items: [
      { name: "Strips Ranch",         nameAr: "ستربس رانش",            price: "8,000" },
      { name: "Honey Mustard Strips", nameAr: "ستربس عسل خردل",        price: "8,000" },
      { name: "Smoked Strips",        nameAr: "ستربس مدخن",            price: "8,000" },
    ],
  },
  {
    id: "rizzo",
    name: "Rizzo",
    items: [
      { name: "Smoked Rizzo",  nameAr: "ريزو مدخن",         price: "6,000" },
      { name: "Herbal Rizzo",  nameAr: "ريزو عشبي",         price: "6,000" },
      { name: "Classic Rizzo", nameAr: "ريزو كلاسيكي",      price: "6,000" },
      { name: "Mind Rizzo",    nameAr: "ريزو مايند",        price: "6,000" },
    ],
  },
  {
    id: "made-in-the-mind",
    name: "Made in the Mind",
    items: [
      { name: "Jenga",                     nameAr: "جنكا",                     price: "6,000" },
      { name: "Splendor",                  nameAr: "سبلندر",                   price: "6,000" },
      { name: "Goblet",                    nameAr: "كوبلت",                    price: "7,000" },
      { name: "Veroff",                    nameAr: "ويرولف",                   price: "6,000" },
      { name: "Chicken Roll",              nameAr: "تشكن رول",                 price: "6,000" },
      { name: "Beef Roll",                 nameAr: "بيف رول",                  price: "7,000" },
      { name: "Ice Cheesecake Strawberry", nameAr: "ايس تشيز كيك فراولة",      price: "6,000" },
      { name: "Ice Cheesecake Blueberry",  nameAr: "ايس تشيز كيك بلوبيري",     price: "6,000" },
      { name: "Catamino",                  nameAr: "كاتامينو",                 price: "6,000" },
      { name: "Mojito Otm",                nameAr: "موهيتو اوتم",              price: "6,000" },
      { name: "Coffee Special",            nameAr: "قهوة سبيشل",               price: "6,000" },
      { name: "Mind Drink",                nameAr: "مايند درنك",               price: "6,000" },
      { name: "Blue Night",                nameAr: "بلو نايت",                 price: "6,000" },
      { name: "Desert",                    nameAr: "دزرت",                     price: "6,000" },
    ],
  },
];
