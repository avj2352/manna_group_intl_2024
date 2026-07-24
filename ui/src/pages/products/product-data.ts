export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  tag: string;
  color: string;
  img: string;
  lede: string;
  benefits: string[];
  benefitsLong: string;
  usage: string;
}

export const PRODUCTS: Record<string, ProductDetail> = {
  calcunix: {
    id: "calcunix",
    name: "CalcuNix",
    price: 89.99,
    tag: "Kidney Care",
    color: "blue",
    img: "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_53_18-PM.png",
    lede:
      "A premium kidney health supplement designed to support your body's natural filtration and cleansing every day.",
    benefits: [
      "Maintaining healthy kidney functions",
      "Kidney cleansing & detox",
      "Promoting urinary tract wellness",
    ],
    benefitsLong:
      "CalcuNix is formulated to support healthy kidney function, assist the body's natural cleansing and detox processes, and promote overall urinary tract wellness — developed by specialized doctors and manufactured in the USA.",
    usage:
      "Take as directed on the product label, or as advised by your healthcare professional. Do not exceed the recommended dose. Consult your doctor before use if you are pregnant, nursing, or taking medication.",
  },

  menoseg: {
    id: "menoseg",
    name: "MenoSeg Plus",
    price: 49.99,
    tag: "Women's Health",
    color: "cream",
    img: "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_57_01-PM.png",
    lede:
      "Comprehensive menopause support that helps women feel balanced, comfortable, and confident through every stage.",
    benefits: [
      "Relief from multiple menopausal symptoms",
      "Hot flashes & night sweats",
      "Irritability & mood swings",
      "Supports bone health",
      "Supports skin & vaginal health",
    ],
    benefitsLong:
      "MenoSeg Plus supports relief from multiple menopausal symptoms including hot flashes, night sweats, irritability, and mood swings, while also supporting bone, skin, and vaginal health.",
    usage:
      "Take as directed on the product label, or as advised by your healthcare professional. Do not exceed the recommended dose. Consult your doctor before use if you are pregnant, nursing, or taking medication.",
  },

  prosante: {
    id: "prosante",
    name: "ProSante Plus",
    price: 49.99,
    tag: "Prostate Health",
    color: "green",
    img: "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_56_13-PM.png",
    lede:
      "A broad-ranging prostate health supplement developed by specialized doctors to help men maintain optimum prostate health.",
    benefits: [
      "Helps maintain optimum prostate health",
      "Broad-ranging prostate health formula",
      "Developed by specialized doctors",
      "Manufactured in USA",
    ],
    benefitsLong:
      "ProSante Plus is a broad-ranging prostate health supplement that helps maintain optimum prostate health — developed by specialized doctors and manufactured in the USA.",
    usage:
      "Take as directed on the product label, or as advised by your healthcare professional. Do not exceed the recommended dose. Consult your doctor before use if you are taking medication.",
  },

  manaliv: {
    id: "manaliv",
    name: "ManaLiv",
    price: 59.99,
    tag: "Liver Health",
    color: "peach",
    img: "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_59_21-PM.png",
    lede:
      "A premium liver health care supplement that supports your liver and digestive system for day-to-day wellness.",
    benefits: [
      "Helps maintain liver health",
      "Supports the digestive system",
      "Premium liver health care supplement",
      "Developed by specialized doctors",
      "Manufactured in USA",
    ],
    benefitsLong:
      "ManaLiv helps maintain liver health and supports the digestive system. A premium liver health care supplement developed by specialized doctors and manufactured in the USA.",
    usage:
      "Take as directed on the product label, or as advised by your healthcare professional. Do not exceed the recommended dose. Consult your doctor before use if you are pregnant, nursing, or taking medication.",
  },
};