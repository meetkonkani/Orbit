// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const PRODUCTS = [ 

  {
    id: "66fb4a22c1d9a5b3e8f10001",
    title: "NIGHT OPS // V1",
    category: "OUTERWEAR",
    price: 180,
    description: "Stealth-oriented outer shell. Features radar-absorbent materials.",
    image: "https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=800",
    details: ["Gore-Tex Pro Shell", "IR-Masking Fabric", "Made in Sector 7"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10002",
    title: "URBAN DRIFTER",
    category: "BASE-LAYER",
    price: 120,
    description: "The ultimate concrete camouflage. Oversized silhouette.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
    details: ["Heavyweight Cotton", "Reinforced Elbows", "Drop Shoulder Fit"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10003",
    title: "CARBON CORE VEST",
    category: "OUTERWEAR",
    price: 250,
    description: "Modular tactical vest. Compatible with all Orbit accessory pouches.",
    image: "https://images.unsplash.com/photo-1552160793-cbaf95f20685?q=80&w=800",
    details: ["Ballistic Nylon", "MOLLE Webbing System", "Breathable Mesh Back"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10004",
    title: "NEO TOKYO RUNNER",
    category: "BASE-LAYER",
    price: 95,
    description: "Performance athletic wear for the neon streets.",
    image: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=800",
    details: ["Reflective 3M Strips", "Aerogel Insulation", "Slim Fit"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10005",
    title: "SYSTEM SHOCK PARKA",
    category: "OUTERWEAR",
    price: 320,
    description: "Full weather protection with deployable face shield.",
    image: "https://images.unsplash.com/photo-1605908502724-9093a79a1b39?q=80&w=800",
    details: ["Internal Heating Grid", "Waterproof Zippers", "Extended Hem"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10006",
    title: "VOID SLING BAG",
    category: "ACCESSORIES",
    price: 85,
    description: "Zero-gravity ergonomics. Quick-access magnetic buckle system.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800",
    details: ["X-Pac Waterproof Fabric", "Fidlock V-Buckle", "Ambidentrous Strap"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10007",
    title: "KINETIC GLOVES",
    category: "ACCESSORIES",
    price: 65,
    description: "Conductive fingertips for interface interaction in sub-zero sectors.",
    image: "https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=800",
    details: ["Touchscreen Compatible", "Kevlar Knuckle Guard", "Grip-Tech Palm"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10008",
    title: "OZONE BREAKER",
    category: "OUTERWEAR",
    price: 450,
    description: "Atmospheric re-entry grade insulation.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
    details: ["Liquid Crystal Polymer Shell", "Vacuum Sealed Pockets"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10009",
    title: "PHANTOM HOODIE",
    category: "BASE-LAYER",
    price: 140,
    description: "Contour-mapped compression hoodie.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
    details: ["Scuba Neck Construction", "Moisture-Wicking Tech"],
  },
  {
    id: "66fb4a22c1d9a5b3e8f10010",
    title: "DATA-LINK WATCHBAND",
    category: "ACCESSORIES",
    price: 45,
    description: "Paracord-based wearable with integrated micro-tools.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
    details: ["550 lb Tensile Strength", "Signal Whistle Buckle"],
  }
];
async function main() {
  console.log("Start seeding...");
  
  // Optional: Clear existing products to avoid duplicates during testing
  await prisma.product.deleteMany();

  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        title: p.title,
        category: p.category,
        price: p.price, // Converting to cents
        description: p.description,
        // FIX: Changed 'image' to 'images' and wrapped in an array
        images: [p.image], 
        stock: 10, // Added explicit stock value
      },
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())