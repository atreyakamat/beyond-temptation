export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    indulgenceSection: { title: string; description: string };
    totalFrames: number;
    imageExtension: string;
    buyNowSection: {
        price: string;
        unit: string;
        preparation: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "pizza",
        name: "Molten Pizza",
        subName: "Cheese that pulls forever.",
        price: "₹299",
        description: "Stone baked · Stretchy cheese · Loaded toppings",
        folderPath: "/images/pizza",
        themeColor: "#F4A261",
        gradient: "linear-gradient(135deg, #F4A261 0%, #E76F51 100%)",
        features: ["Stone Baked", "Mozzarella Pull", "Crispy Crust"],
        stats: [
            { label: "Cheese Pull", val: "∞" },
            { label: "Heat", val: "Perfect" },
            { label: "Satisfaction", val: "100%" }
        ],
        section1: { title: "Molten Pizza.", subtitle: "Cheese that pulls forever." },
        section2: { title: "Stretch the moment.", subtitle: "Every slice fights gravity." },
        section3: { title: "Baked to obsession.", subtitle: "Crunch, melt, repeat." },
        section4: { title: "Temptation served hot.", subtitle: "" },
        detailsSection: {
            title: "Engineered for Craving",
            description: "Our pizza is crafted with high-moisture mozzarella, slow-fermented dough, and high-heat stone baking. The result is extreme elasticity, blistered crust, and cinematic cheese pulls.",
            imageAlt: "Pizza Cheese Pull"
        },
        indulgenceSection: {
            title: "When Control Slips",
            description: "You don’t eat it neatly. You surrender to it."
        },
        totalFrames: 200,
        imageExtension: "jpg",
        buyNowSection: {
            price: "₹299",
            unit: "per pizza",
            preparation: ["Stone Baked", "High Heat", "Fresh Dough"],
            deliveryPromise: "Delivered hot with insulated packaging.",
            returnPolicy: "Not irresistible? We’ll replace it."
        }
    },

    {
        id: "fries",
        name: "Golden Fries",
        subName: "Crunch perfected.",
        price: "₹149",
        description: "Double fried · Sea salt · Crisp outside",
        folderPath: "/images/fries",
        themeColor: "#E9C46A",
        gradient: "linear-gradient(135deg, #E9C46A 0%, #F4A261 100%)",
        features: ["Double Fried", "Sea Salted", "Ultra Crisp"],
        stats: [
            { label: "Crunch", val: "Max" },
            { label: "Oil", val: "Balanced" },
            { label: "Addiction", val: "High" }
        ],
        section1: { title: "Golden Fries.", subtitle: "Crunch perfected." },
        section2: { title: "Hear the bite.", subtitle: "That sound says everything." },
        section3: { title: "Salted just right.", subtitle: "No distractions. Just crunch." },
        section4: { title: "Snack turned obsession.", subtitle: "" },
        detailsSection: {
            title: "Precision Fried",
            description: "Cut thick, soaked cold, fried twice. The science behind the crunch is intentional.",
            imageAlt: "Crispy Fries"
        },
        indulgenceSection: {
            title: "One More Isn’t Optional",
            description: "You never stop at one."
        },
        totalFrames: 120,
        imageExtension: "webp",
        buyNowSection: {
            price: "₹149",
            unit: "per serving",
            preparation: ["Double Fried", "Sea Salted", "Fresh Cut"],
            deliveryPromise: "Delivered crisp, never soggy.",
            returnPolicy: "Replace if not crunchy."
        }
    },

    {
        id: "shake",
        name: "Velvet Shake",
        subName: "Drink the indulgence.",
        price: "₹199",
        description: "Thick · Cold · Decadent",
        folderPath: "/images/shake",
        themeColor: "#8D6E63",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
        features: ["Ultra Thick", "Cold Blended", "Dessert Grade"],
        stats: [
            { label: "Thickness", val: "Heavy" },
            { label: "Cold", val: "Ice-Smooth" },
            { label: "Mood", val: "Elevated" }
        ],
        section1: { title: "Velvet Shake.", subtitle: "Drink the indulgence." },
        section2: { title: "Slow pours.", subtitle: "Heavy on the tongue." },
        section3: { title: "Sip the craving.", subtitle: "Every drop counts." },
        section4: { title: "Finish strong.", subtitle: "" },
        detailsSection: {
            title: "Designed to Linger",
            description: "Blended thick so it pours slow, hits cold, and finishes rich.",
            imageAlt: "Chocolate Shake Splash"
        },
        indulgenceSection: {
            title: "No Guilt. Just Flavor.",
            description: "You chose this moment."
        },
        totalFrames: 120,
        imageExtension: "webp",
        buyNowSection: {
            price: "₹199",
            unit: "per glass",
            preparation: ["Cold Blended", "Thick Texture", "Slow Pour"],
            deliveryPromise: "Delivered chilled.",
            returnPolicy: "If it melts, we replace."
        }
    }
];
