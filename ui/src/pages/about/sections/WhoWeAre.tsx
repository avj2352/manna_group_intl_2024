import businessShakeImg from "@/assets/images/landing/business_shake.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";

const WhoWeAre = () => {
  return (
    <section className="py-8 lg:py-24" id="how-it-works">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">
              <img
                alt="Mobile 2"
                className="h-[500px] rounded-xl"
                src={businessShakeImg}
              />
            </div>
            <div className="absolute top-[70%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2 text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">30+ yrs</p>
                    <p className="">Experience</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-span">
            <p className="text-xl font-semibold lg:text-3xl">Who we are?</p>
            <p className="mt-3 font-semibold text-xl">
              Aiming To Serve People With Healthcare Products For Their Overall
              Day-to-day Good Health
            </p>
            <p className="mt-3 text-base">
              MANNA Group International is a New Jersey, USA based up-coming
              group of business divisions. MANNA Group International with one of
              its US FDA registered business unit ‘MANNA International Corp.’ is
              engaged in manufacturing and marketing of products related to
              day-to-day overall health care of people. <br />
              <br />
              MANNA International Corp. is introducing products in healthcare
              areas like Nutraceutical Supplements, OTC pharmaceuticals &amp;
              Essential Oils. <br />
              <br />
              MANNA International Corp. is planning to introduce many clinically
              evaluated healthcare products targeted to specific health
              conditions / therapeutic areas. MANNA International Corp. is
              committed to offer quality products and maintaining ethical
              approach towards its customers to ensure Win-Win Association.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
