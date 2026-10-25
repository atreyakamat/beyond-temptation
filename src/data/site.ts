// Single source of truth for business facts. Edit here, not in components.
export const site = {
  name: "Beyond Temptation",
  tagline: "Mapusa's meeting point.",
  description:
    "Beyond Temptation is a café in Mapusa, Goa. Burgers, pizza, loaded sandwiches, thick shakes and proper coffee. Open daily.",
  phone: "+919146452813",
  phoneDisplay: "+91 91464 52813",
  whatsapp: "919146452813",
  instagram: "beyondtemptationmapusa",
  facebook: "beyondtemptationmapusa",
  address: {
    line1: "Waman Residency",
    line2: "Mapusa, Goa 403507",
    full: "Waman Residency, Mapusa, Goa 403507",
  },
  // TODO(verify): listings disagree (Zomato says 11am, magicpin 10am, late open Tue/Sun).
  hours: [
    { days: "Mon – Sat", time: "10:00 am – 9:00 pm" },
    { days: "Sunday", time: "2:30 pm – 9:30 pm" },
  ],
  hoursShort: "Open daily till 9 pm",
  ratings: [
    { source: "Zomato", score: "4.2", count: "78+ ratings" },
    { source: "Justdial", score: "4.6", count: "61 ratings" },
    { source: "Google", score: "4.5", count: "verify" }, // TODO(verify)
  ],
  priceForTwo: "₹400",
  mapsQuery: "Beyond Temptation, Waman Residency, Mapusa, Goa 403507",
} as const;

export const links = {
  whatsapp: (text = "Hi! I'd like to order from Beyond Temptation.") =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
  instagram: `https://instagram.com/${site.instagram}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`,
  tel: `tel:${site.phone}`,
};

export type MenuItem = {
  name: string;
  blurb: string;
  price: string;
  tag?: "bestseller" | "new" | "spicy" | "veg";
  category: "Burgers" | "Pizza" | "Sandwiches" | "Shakes" | "Coffee" | "Desserts";
  image: string; // TODO: replace with real photos from the café's Instagram
  accent: string;
};

export const bestsellers: MenuItem[] = [
  {
    name: "Smash Chicken Burger",
    blurb: "Double smashed patty, cheddar, house sauce, soft potato bun.",
    price: "₹180",
    tag: "bestseller",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    accent: "#FF3B1F",
  },
  {
    name: "Peri Peri Paneer Pizza",
    blurb: "Hand-stretched base, peri peri paneer, bell peppers, mozzarella.",
    price: "₹220",
    tag: "veg",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    accent: "#FFD60A",
  },
  {
    name: "Oreo Thick Shake",
    blurb: "Spoon-thick. Whipped cream on top, whole Oreo on the rim.",
    price: "₹140",
    tag: "bestseller",
    category: "Shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    accent: "#FFFFFF",
  },
  {
    name: "Cold Coffee",
    blurb: "The Mapusa classic. Blended, frothy, properly cold.",
    price: "₹110",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
    accent: "#FFD60A",
  },
  {
    name: "Loaded Chicken Sandwich",
    blurb: "Grilled chicken, jalapeños, cheese, toasted till the edges crackle.",
    price: "₹150",
    tag: "spicy",
    category: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80",
    accent: "#FF3B1F",
  },
  {
    name: "Chocolate Brownie Sizzler",
    blurb: "Warm brownie, vanilla scoop, hot fudge, actual sizzle.",
    price: "₹160",
    tag: "new",
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
    accent: "#FFFFFF",
  },
];

export const vibeTiles = [
  // TODO: swap for real shots from @beyondtemptationmapusa
  { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80", alt: "Inside the café", span: "wide" },
  { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80", alt: "Friends at a table", span: "tall" },
  { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80", alt: "Counter and coffee machine", span: "" },
  { src: "https://images.unsplash.com/photo-1600093463592-2e8d28d7f1f6?auto=format&fit=crop&w=900&q=80", alt: "Evening lights", span: "" },
  { src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80", alt: "Late evening crowd", span: "wide" },
] as const;
