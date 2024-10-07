import { FC } from "react";

const GallerySection: FC = () => {
  return (
    <section className="py-8 lg:py-24" id="gallery-section">
      <div className="container">
        {/* get together */}
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">{/* Gallery Section */}</div>
          </div>
          <div className="col-span">
            <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
              Gallery
            </h1>
            <p className="mt-3 text-xl font-semibold text-brand-gradient">
              MANNA Get together 2022
            </p>
            <p className="mt-3 text-base">
              MANNA Get together event held on December 29th 2022
            </p>
          </div>
        </div>
        {/* mayor visit */}
        <div className="grid gap-16 mt-8 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">{/* Gallery Section */}</div>
          </div>
          <div className="col-span">
            <p className="mt-3 text-xl font-semibold text-brand-gradient">
              Press conference with Mayor of Trenton, NJ
            </p>
            <p className="mt-3 text-base">
              Mayor of Trenton, NJ, Press conference at MANNA Pharmaceuticals
              permise at Trenton dated 16th August 2022
            </p>
          </div>
        </div>
        {/* hotel ramada */}
        <div className="grid gap-16 mt-8 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">{/* Gallery Section */}</div>
          </div>
          <div className="col-span">
            <p className="mt-3 text-xl font-semibold text-brand-gradient">
              Launch Meeting at Hotel Ramada, East Orange, NJ
            </p>
            <p className="mt-3 text-base">
              Photos from our launch meeting event organized at Hotel Ramada,
              East Orange, NJ on May 21st 2022
            </p>
          </div>
        </div>
        {/* hotel rccg */}
        <div className="grid gap-16 mt-8 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">{/* Gallery Section */}</div>
          </div>
          <div className="col-span">
            <p className="mt-3 text-xl font-semibold text-brand-gradient">
              Launch Meeting at RCCG Dominion Cathedral Orange, NJ
            </p>
            <p className="mt-3 text-base">
              Photos from our launch meeting event organized at RCCG Dominion
              Cathedral Orange, NJ on May 21st 2022
            </p>
          </div>
        </div>
        {/* meeting with investors */}
        <div className="grid gap-16 mt-8 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">{/* Gallery Section */}</div>
          </div>
          <div className="col-span">
            <p className="mt-3 text-xl font-semibold text-brand-gradient">
              First Launch Meeting with Investors at Morris Avenue, Union
              office, NJ
            </p>
            <p className="mt-3 text-base">
              Photos from our first Launch Meeting with Investors at Morris
              Avenue, Union office, NJ on May 21st 2022
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
