import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import familyImg from "@/assets/images/landing/family.jpg";
import logoImg from "@/assets/images/logo-img.png";
import { StarIcon } from "lucide-react";
import { Card } from "react-daisyui";

export const Hero = () => {
  return (
    <section className="relative py-8 lg:py-24" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${bgGradientImg})` }}
      ></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <img src={logoImg} className="rounded-xl" />
            <h1 className="text-center text-3xl/tight font-bold leading-10 tracking-tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">
                MANNA Group International
              </span>{" "}
              on a journey to help people improve their day-to-day health
            </h1>
            <h5 className="mt-8 text-center text-base sm:text-start lg:text-lg">
              MANNA Group International is a New Jersey, USA based up-coming
              group of business divisions. MANNA Group International with one of
              its US FDA registered business unit ‘MANNA International Corp.’ is
              engaged in manufacturing and marketing of products related to
              day-to-day overall health care of people.
            </h5>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img
                alt="family-image"
                className="bounce-animation h-[320px] md:h-[450px] rounded-lg"
                src={familyImg}
              />
            </div>
            {/* Ratings card */}
            <div className="absolute bottom-[20%] end-0">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="w-64 gap-0 p-3">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center gap-1">
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] font-medium">
                    We trust and practice in maintaining honesty, integrity and
                    transparency with our customers and stakeholders.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
