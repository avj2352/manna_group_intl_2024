import { FC, Fragment } from "react";
import { Hero } from "@/pages/home/sections/Hero.tsx";
import { Feature } from "@/pages/home/sections/Feature.tsx";
import QuickContacts from "@/pages/home/sections/QuickContacts.tsx";
import { FAQ } from "@/pages/home/sections/FAQ.tsx";
import { Works } from "@/pages/home/sections/Works.tsx";
import { Testimonial } from "@/pages/home/sections/Testimonial.tsx";

const HomePage: FC = () => {
  return (
    <Fragment>
      <Hero />
      <Feature />
      <Works />
      <QuickContacts />
      <Testimonial />
      <FAQ />
    </Fragment>
  );
};

export default HomePage;
