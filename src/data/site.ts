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
      "/photos/beyond-special.webp",
    accent: "#FF3B1F",
  },
  {
    name: "Chicken BBQ Pizza",
    blurb: "Smoky BBQ chicken, mozzarella, hand-stretched base.",
    price: "₹220",
    tag: "spicy",
    category: "Pizza",
    image:
      "/photos/gallery-4.webp",
    accent: "#FFD60A",
  },
  {
    name: "Oreo Mastani",
    blurb: "Crushed Oreo through and through, a whole one on top. Comes with a spoon.",
    price: "₹150",
    tag: "bestseller",
    category: "Shakes",
    image:
      "/photos/gallery-6.webp",
    accent: "#FFFFFF",
  },
  {
    name: "Cold Coffee",
    blurb: "The Mapusa classic. Blended, frothy, properly cold. ₹70, no catch.",
    price: "₹70",
    category: "Coffee",
    image:
      "/photos/gallery-2.webp",
    accent: "#FFD60A",
  },
  {
    name: "Bombay Grill Sandwich",
    blurb: "Beetroot, cucumber, green chutney, cheese. Street-style, toasted till it crackles.",
    price: "₹120",
    tag: "veg",
    category: "Sandwiches",
    image:
      "/photos/vibe-3.webp",
    accent: "#FF3B1F",
  },
  {
    name: "Sizzler Brownie",
    blurb: "Hot plate, cold scoop, fudge poured at the table. Actual sizzle.",
    price: "₹200",
    tag: "new",
    category: "Desserts",
    image:
      "/photos/vibe-4.webp",
    accent: "#FFFFFF",
  },
];

export const vibeTiles = [
  { src: "/photos/vibe-1.webp", alt: "Full house on a birthday afternoon", span: "tall" },
  { src: "/photos/vibe-3.webp", alt: "Corn pizza, burger, cold coffee, peri peri fries", span: "wide" },
  { src: "/photos/vibe-4.webp", alt: "Sizzler brownie, fudge still bubbling", span: "" },
  { src: "/photos/vibe-2.webp", alt: "The hand-painted wall", span: "wide" },
  { src: "/photos/vibe-5.webp", alt: "Birthday setup with the neon heart", span: "" },
] as const;

export const galleryPhotos = [
  { src: "/photos/gallery-2.webp", alt: "Cold coffee, blue lagoon and loaded fries" },
  { src: "/photos/gallery-1.webp", alt: "Red and black party setup" },
  { src: "/photos/gallery-6.webp", alt: "Masala fries, mayo fries, two thick shakes" },
  { src: "/photos/gallery-3.webp", alt: "Gold birthday setup" },
  { src: "/photos/gallery-4.webp", alt: "Margherita, straight off the stone" },
  { src: "/photos/gallery-5.webp", alt: "Balloon arch and three cakes" },
  { src: "/photos/beyond-special.webp", alt: "The full spread" },
  { src: "/photos/gallery-7.webp", alt: "Find us at Waman Residency" },
  { src: "/photos/gallery-8.webp", alt: "Peach ice tea, 10am to 9pm" },
  { src: "/photos/vibe-2.webp", alt: "The floral mural" },
] as const;

export const videos = [
  { src: "/video/reel-1.mp4", poster: "/video/reel-1.webp", alt: "Inside Beyond Temptation", portrait: true },
  { src: "/video/reel-2.mp4", poster: "/video/reel-2.webp", alt: "At the counter", portrait: false },
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
  "https://www.instagram.com/reel/C_cslY4AUWS/",
  "https://www.instagram.com/reel/DHvWyULxkQX/",
  "https://www.instagram.com/reel/DLIHPEQorz3/",
  "https://www.instagram.com/reel/DOaoJ7cjPTj/",
  "https://www.instagram.com/reel/DeMSN39OPNN/",
];
