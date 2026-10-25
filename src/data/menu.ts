// Transcribed from the café's printed menu (src/images/menu1.png, menu2.png).
// Prices in INR. nonVeg = red dot on the printed menu. Blurbs are soft copy — edit freely.

export type Dish = {
  name: string;
  price: number | "APS"; // APS = as per season
  blurb?: string;
  nonVeg?: boolean;
  star?: boolean; // highlighted on the site
};

export type MenuSection = {
  id: string;
  title: string;
  group: "Drinks" | "Shakes" | "Food" | "Desserts";
  note?: string;
  items: Dish[];
};

export const menu: MenuSection[] = [
  // ---------- SHAKES ----------
  {
    id: "chocolate-shakes",
    title: "Chocolate Shakes",
    group: "Shakes",
    items: [
      { name: "Chocolate", price: 100, blurb: "The one that started it all." },
      { name: "Cad B", price: 110, blurb: "Cadbury-rich, blended thick.", star: true },
      { name: "White Cad B", price: 120, blurb: "White chocolate, cold and creamy." },
      { name: "Almond", price: 140, blurb: "Chocolate with toasted almond crunch." },
    ],
  },
  {
    id: "thick-shakes",
    title: "Thick Shakes",
    group: "Shakes",
    items: [
      { name: "Vanilla", price: 90 },
      { name: "Mango", price: 100, blurb: "Proper Goan mango when it's in season." },
      { name: "Strawberry", price: 100 },
      { name: "Black Currant", price: 100 },
      { name: "Butterscotch", price: 100 },
      { name: "Kaaju Badam", price: 140, blurb: "Cashew and almond, nutty and rich." },
      { name: "Brownie Shake", price: 150, blurb: "A whole brownie blended in.", star: true },
      { name: "Dry Fruit", price: 170 },
    ],
  },
  {
    id: "mastani-shakes",
    title: "Mastani Shakes",
    group: "Shakes",
    note: "Loaded. Comes with a spoon for a reason.",
    items: [
      { name: "Oreo", price: 150, blurb: "Crushed Oreo through and through, whole one on top.", star: true },
      { name: "Kit-Kat", price: 150 },
      { name: "Snickers", price: 150, blurb: "Caramel, peanuts, chocolate. Dessert in a glass." },
      { name: "Ferrero", price: 170, blurb: "Hazelnut chocolate, the fancy one.", star: true },
    ],
  },
  {
    id: "fruit-shakes",
    title: "Fruit Shakes",
    group: "Shakes",
    items: [
      { name: "Banana", price: 60 },
      { name: "Papaya", price: 60 },
      { name: "Chikoo", price: 70 },
      { name: "Avocado", price: "APS", blurb: "As per season." },
    ],
  },

  // ---------- DRINKS ----------
  {
    id: "hot-beverages",
    title: "Hot Beverages",
    group: "Drinks",
    items: [
      { name: "Special Tea", price: 20 },
      { name: "Hot Coffee", price: 40 },
      { name: "Hot Chocolate", price: 70, blurb: "Thick, not watery." },
    ],
  },
  {
    id: "cold-coffee",
    title: "Cold Coffee",
    group: "Drinks",
    items: [
      { name: "Cold Coffee", price: 70, blurb: "The Mapusa classic. Blended, frothy, properly cold.", star: true },
      { name: "Nirvana Coffee", price: 80 },
      { name: "Irish Cold Coffee", price: 100 },
      { name: "Glacier Cold Coffee", price: 100 },
      { name: "Cold Bournvita", price: 70 },
    ],
  },
  {
    id: "coolers",
    title: "Coolers",
    group: "Drinks",
    items: [
      { name: "Lime Soda", price: 40 },
      { name: "Kokum", price: 50, blurb: "Goan kokum, sour-sweet and cold." },
      { name: "Ice Tea", price: 80 },
      { name: "Mojito", price: 100, blurb: "Mint, lime, soda. No alcohol." },
      { name: "Green Apple", price: 100 },
      { name: "Blue Lagoon", price: 100 },
      { name: "Kala Khatta", price: 120 },
      { name: "Kaccha Aam", price: 120, blurb: "Raw mango, salty-tangy." },
    ],
  },

  // ---------- FOOD ----------
  {
    id: "french-fries",
    title: "French Fries & Bites",
    group: "Food",
    items: [
      { name: "Masala Fries", price: 90 },
      { name: "Cheese Fries", price: 100 },
      { name: "Peri Peri Fries", price: 120, star: true },
      { name: "Peri Peri w/ Cheese", price: 140 },
      { name: "Chilli Cheese Fries", price: 150 },
      { name: "BBQ Chilli Cheese Fries", price: 160 },
      { name: "Veg Nuggets (15 pcs)", price: 150 },
      { name: "Chicken Nuggets", price: 150, nonVeg: true },
      { name: "Chicken Fingers", price: 200, nonVeg: true },
      { name: "Chicken Wings", price: 220, nonVeg: true, star: true },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    group: "Food",
    items: [
      { name: "Veg Cheese", price: 100 },
      { name: "Veg Corn Cheese", price: 130 },
      { name: "Veg Schezwan", price: 140 },
      { name: "Veg Double", price: 170, blurb: "Two patties, no apologies." },
      { name: "Paneer Cheese", price: 150, star: true },
      { name: "Chicken Cheese", price: 130, nonVeg: true },
      { name: "Chicken Schezwan", price: 150, nonVeg: true },
      { name: "Chicken Classic", price: 200, nonVeg: true, star: true },
      {
        name: "Beyond Special",
        price: 250,
        nonVeg: true,
        star: true,
        blurb: "Chicken burger + fries + dips. The full plate.",
      },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    group: "Food",
    items: [
      { name: "Plain Cheese", price: 120 },
      { name: "Margarita", price: 130 },
      { name: "Corn", price: 150 },
      { name: "Mix Veggie", price: 170 },
      { name: "Paneer", price: 200, star: true },
      { name: "Chicken", price: 200, nonVeg: true },
      { name: "Chicken BBQ", price: 220, nonVeg: true, star: true },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    group: "Food",
    items: [
      { name: "Toast Butter", price: 40 },
      { name: "Garlic Bread", price: 80 },
      { name: "Veg Grill", price: 70 },
      { name: "Veg Cheese Grill", price: 90 },
      { name: "Corn Cheese Grill", price: 100 },
      { name: "Bombay Grill", price: 120, blurb: "Beetroot, cucumber, chutney, cheese. Street-style.", star: true },
      { name: "Paneer Grill", price: 140 },
      { name: "Omelette", price: 50, nonVeg: true },
      { name: "Cheese Omelette", price: 80, nonVeg: true },
      { name: "Chicken Grill", price: 100, nonVeg: true },
      { name: "Chicken Schezwan", price: 110, nonVeg: true },
      { name: "Chicken Cheese Grill", price: 120, nonVeg: true, star: true },
    ],
  },

  // ---------- DESSERTS ----------
  {
    id: "beyond-special",
    title: "Beyond Special",
    group: "Desserts",
    items: [
      { name: "Falooda", price: 120 },
      { name: "Gadbad", price: 200, blurb: "Layers of ice cream, jelly, fruit and nuts.", star: true },
      { name: "Chocolate Feast", price: 150 },
      { name: "Fruit & Nut Feast", price: 170 },
    ],
  },
  {
    id: "brownies",
    title: "Brownies",
    group: "Desserts",
    items: [
      { name: "Brownie w/ Ice Cream", price: 150 },
      { name: "Sizzler Brownie", price: 200, blurb: "Hot plate, cold scoop, fudge poured at the table.", star: true },
    ],
  },
];

export const groups = ["All", "Shakes", "Drinks", "Food", "Desserts"] as const;

export const formatPrice = (p: Dish["price"]) => (p === "APS" ? "Seasonal" : `₹${p}`);
