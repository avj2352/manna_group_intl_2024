import { FC } from "react";
// ..custom
import medicineImg from "@/assets/images/landing/medicine.jpg";

export const ContractManufacturingSection: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="home">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-5"></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-1 lg:order-2">
            <img
              alt="medicine-manufacture"
              className="h-[500px] rounded-xl"
              src={medicineImg}
            />
          </div>
          <div className="order-2 lg:order-1">
            <h1 className="text-center text-3xl/tight font-bold leading-10 tracking-tight sm:text-start lg:text-4xl/tight">
              Contract Manufacturing
            </h1>
            <p className="mt-8 text-center text-base sm:text-start">
              MANNA International Corp. offers contract manufacturing services
              in oral solid dosage form for Supplements and OTC pharmaceuticals.
              <br />
              The 1st step towards international business is with a prime focus
              on following countries- <br />
              MANNA International Corp. assures -
              <br />
              <br />
              - Quality Products <br />
              - Competitive cost of products &amp; <br />
              - In Time Delivery
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
