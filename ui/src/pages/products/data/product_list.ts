export type IProduct = {
  name: string;
  title: string;
  price: string;
  description: string;
  imageLink: string;
  category: "supplement" | "others";
};

export const productList: IProduct[] = [
  {
    name: "Calcunix",
    title: "Supplement for Kidney Care",
    price: "109.00",
    description: `In ayurveda treatment for Kidney disorders including kidney
  stones is available which not only breaks the stones and flushes
  out of system through urine but also helps preventing relapse as
  well. CalcuNix is one such supplement which supports Kidney
  Health and overall wellness of Urinary Tract.`,
    imageLink:
      "https://mannagroupintl.com/images/productss/supplements/Calcunix-bottle.jpg",
    category: "supplement",
  },
  {
    name: "ManaLiv",
    title: "Supplement for Liver Care",
    price: "59.00",
    description: `It removes toxins from the body's blood supply,
    maintains healthy blood sugar levels, regulates
    blood clotting, and performs hundreds of other vital
    functions.`,
    imageLink:
      "https://mannagroupintl.com/images/productss/supplements/Manaliv-bottle.jpg",
    category: "supplement",
  },
  {
    name: "MenoSeg",
    title: "Supplement for Menopause Care",
    price: "49.00",
    description: `Menopause is the natural cessation, or stopping, of
    a woman's menstrual cycle, and marks the end of
    fertility. Most women experience menopause by the
    age of 50, but pelvic or ovarian damage may cause
    sudden menopause earlier in life.`,
    imageLink:
      "https://mannagroupintl.com/images/productss/supplements/MenoSeg-bottle.jpg",
    category: "supplement",
  },
  {
    name: "ProSante Plus",
    title: "Supplement for Prostate Care",
    price: "49.00",
    description: `Nutraceutical supplement helps to maintain
    prostate in good health condition. In other words,
    supplements help keeping the Reproductive System
    healthy in Natural Way.`,
    imageLink:
      "https://mannagroupintl.com/images/productss/supplements/Prosante-bottle.jpg",
    category: "supplement",
  },
];
