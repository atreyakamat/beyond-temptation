// Single source of truth for business facts. Edit here, not in components.
export const site = {
  name: "Beyond Temptation",
  tagline: "Mapusa's meeting point.",
  motto: "Chocolate is just a beginning. It's more than chocolate.",
  description:
    "Beyond Temptation is a café in Mapusa, Goa. Burgers, pizza, loaded sandwiches, thick shakes and proper coffee. Open Mon–Sat, 10 am to 9 pm.",
  phone: "+919146452813",
  phoneDisplay: "+91 91464 52813",
  whatsapp: "919146452813",
  instagram: "beyondtemptationmapusa",
  facebook: "beyondtemptationmapusa",
  address: {
    line1: "Waman Residency, opp. St. Britto School",
    line2: "Dangui Colony, Alto, Mapusa, Goa 403507",
    landmark: "Near Saldanha Tower, next to Hill Crown Building",
    full: "Waman Residency, opp. St. Britto School, Dangui Colony, Alto, Mapusa, Goa 403507",
  },
  // From the Google Business listing.
  hours: [
    { days: "Mon – Sat", time: "10:00 am – 9:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  openDays: [1, 2, 3, 4, 5, 6], // JS getDay(): 0 = Sunday
  openHour: 10,
  closeHour: 21,
  hoursShort: "Mon–Sat, 10 am – 9 pm",
  ratings: [
    { source: "Google", score: "4.5", count: "73 reviews" },
    { source: "Justdial", score: "4.6", count: "61 ratings" },
    { source: "Zomato", score: "4.2", count: "78+ ratings" },
  ],
  placeId: "ChIJLUj9gPPrvzsRmB-fCAzzqGY",
  priceForTwo: "₹400",
  mapsQuery: "Beyond Temptation Mapusa, Waman Residency, Dangui Colony, Alto, Mapusa, Goa 403507",
  delivery: ["Swiggy", "Zomato"],
} as const;

export const links = {
  whatsapp: (text = "Hi! I'd like to order from Beyond Temptation.") =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
  instagram: `https://instagram.com/${site.instagram}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}&query_place_id=${site.placeId}`,
  review: `https://search.google.com/local/writereview?placeid=${site.placeId}`,
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
    name: "Beyond Special Burger",
    blurb: "Chicken burger + fries + dips. The full plate, the house signature.",
    price: "₹250",
    tag: "bestseller",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    accent: "#FF3B1F",
  },
  {
    name: "Chicken BBQ Pizza",
    blurb: "Smoky BBQ chicken, mozzarella, hand-stretched base.",
    price: "₹220",
    tag: "spicy",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    accent: "#FFD60A",
  },
  {
    name: "Oreo Mastani",
    blurb: "Crushed Oreo through and through, a whole one on top. Comes with a spoon.",
    price: "₹150",
    tag: "bestseller",
    category: "Shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    accent: "#FFFFFF",
  },
  {
    name: "Cold Coffee",
    blurb: "The Mapusa classic. Blended, frothy, properly cold. ₹70, no catch.",
    price: "₹70",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
    accent: "#FFD60A",
  },
  {
    name: "Bombay Grill Sandwich",
    blurb: "Beetroot, cucumber, green chutney, cheese. Street-style, toasted till it crackles.",
    price: "₹120",
    tag: "veg",
    category: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80",
    accent: "#FF3B1F",
  },
  {
    name: "Sizzler Brownie",
    blurb: "Hot plate, cold scoop, fudge poured at the table. Actual sizzle.",
    price: "₹200",
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

// Real reviews from the Google Business listing (lightly trimmed for length).
export const reviews = [
  { text: "The burgers here are to die for. It's my go-to place every time I crave a burger. I always order Beyond Special, but do try their other food. Especially the shakes.", who: "Google review" },
  { text: "Perfect place for a small celebration like a birthday or a casual get-together. We tried their pizza, peri peri fries and burger. The burger stood out with its super crispy patty.", who: "Google review" },
  { text: "A great budget-friendly spot to hang out. The food is really solid for the price. We tried the garlic bread, veg burger and coffee, and everything was flavourful and satisfying.", who: "Google review" },
  { text: "Cozy and peaceful, hidden away from the hustle-bustle of Mapusa town. Courteous servers, served with a smile. The café was packed.", who: "Google review" },
  { text: "Tasty bites. Chicken burger and chicken sandwich were good. Ample seating, you can go in a group of 10 too. Reasonable prices. Will come again.", who: "Google review" },
] as const;

// Instagram reels to feature. Paste full reel/post URLs (collabs included) — the
// section renders Instagram's own embed for each. Empty list = "tag us" tiles.
export const reels: string[] = [
  "https://www.instagram.com/reel/C5N7uSOyagy/",
];
