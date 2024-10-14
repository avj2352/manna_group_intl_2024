import { FC, Fragment } from "react";
import { Hero } from "@/pages/home/sections/Hero";
import { Feature } from "@/pages/home/sections/Feature";
import QuickContacts from "@/pages/home/sections/QuickContacts";
import { Works } from "@/pages/home/sections/Works";

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
