import { FC, Fragment } from "react";
import { Hero } from "@/pages/home/sections/Hero.tsx";
import { Feature } from "@/pages/home/sections/Feature.tsx";
import QuickContacts from "@/pages/home/sections/QuickContacts.tsx";
import { Works } from "@/pages/home/sections/Works.tsx";

const HomePage: FC = () => {
  return (
    <Fragment>
      <Hero />
      <Feature />
      <Works />
      <QuickContacts />
    </Fragment>
  );
};

export default HomePage;
