import { FC } from "react";

export const PromoVideoSection: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="video-section">
      <div className="absolute inset-0 bg-center bg-no-repeat bg-cover dark:opacity-5"></div>
      <div className="container relative z-10">
        <div className="grid items-center gap-12 mt-16 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            {/* video iframe */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/8PV9ToQ0AoI?rel=0"
              title="MANNA promotional video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="rounded-xl"
              allowFullScreen
            ></iframe>

            {/* end:video iframe */}
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">MANNA</span> Promotional
              Video
            </h1>
            <p className="mt-8 text-base text-center sm:text-start">
              Watch our promotional video for the overview of all products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
