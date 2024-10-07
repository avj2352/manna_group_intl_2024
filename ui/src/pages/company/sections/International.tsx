import { FC } from "react";
// ..custom
import WorldMapChart from "@/components/maps/WorldMapChart";

export const InternationalSection: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="usa-international">
      <div className="absolute inset-0 bg-center bg-no-repeat bg-cover dark:opacity-5"></div>
      <div className="container relative z-10">
        <div className="grid items-center gap-12 mt-16 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <WorldMapChart />
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">MANNA</span> International
            </h1>
            <p className="mt-8 text-base text-center sm:text-start">
              We at MANNA are planning to globalize the products developed by us
              for the benefit of our customers and patients world over. We aim
              to be a globally recognized entity, through strategic alliances in
              different regions across the globe. <br />
              The 1st step towards international business is with a prime focus
              on following countries- <br />
              <br />
              - United States of America <br />
              - Costa Rica <br />
              - Guyana <br />
              - Peru <br />
              - Phillipines <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
