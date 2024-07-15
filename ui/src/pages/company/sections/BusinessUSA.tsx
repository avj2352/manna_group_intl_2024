import NorthAmeraMapChart from "@/components/maps/NorthAmericaMapChart";
import { FC } from "react";

export const BusinessUSASection: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="home">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-5"></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-2">
            <NorthAmeraMapChart />
          </div>
          <div className="order-1">
            <h1 className="text-center text-3xl/tight font-bold leading-10 tracking-tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">MANNA</span> Business in USA
            </h1>
            <p className="mt-8 text-center text-base sm:text-start lg:text-lg">
              USA is the country of MANNA's origin. Our Head quarters is based
              in New Jersey, USA. <br />
              We at MANNA are poised to maintain a high standard of quality and
              ethics in manufacturing and marketing world class quality products
              sufficing the needs of our customer and patient. This enables us
              to develop innovative quality products at affordable price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
