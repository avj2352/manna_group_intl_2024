import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-daisyui";
import {
  ArrowRightIcon,
  Syringe,
  HeartHandshake,
  CheckIcon,
  UserRoundCogIcon,
} from "lucide-react";

export const Feature = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8 lg:py-24" id="features">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-5 xl:gap-24">
          <div className="lg:col-span-2">
            <p className="text-xl font-semibold lg:text-3xl">
              Why choose MANNA Group International?
            </p>
            <p className="mt-4 text-base">
              MANNA International Corp. is introducing products in healthcare
              areas like Nutraceutical Supplements, OTC pharmaceuticals &amp;
              Essential Oils.
              <br />
              <br />
              MANNA International Corp. is planning to introduce many clinically
              evaluated healthcare products targeted to specific health
              conditions / therapeutic areas.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Founders with 30+ Years Experience Of Healthcare Industry
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Clinically evaluated Healthcare products
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Honesty, Integrity &amp; Transparency with our customers &amp;
                  stakeholders
                </p>
              </div>
            </div>
          </div>
          {/* Feature cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            <Card className="border border-base-content/10">
              <div className="p-6">
                <Syringe className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">Supplements</p>
                <p className="mt-2 text-base-content/90">
                  Check out our supplements product list
                </p>
                <Button
                  onClick={() => navigate("/products")}
                  color={"ghost"}
                  size={"sm"}
                  className="mt-8"
                >
                  Shop Now!
                  <ArrowRightIcon size={16} />
                </Button>
              </div>
            </Card>
            <Card className="border border-base-content/10">
              <div className="p-6">
                <HeartHandshake className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">
                  Contract Manufacturing
                </p>
                <p className="mt-2 text-base-content/80">
                  We also specialize in contract manufacturing services.
                </p>
                <Button
                  onClick={() => navigate("/company/900")}
                  color={"ghost"}
                  size={"sm"}
                  className="mt-8"
                >
                  Read More
                  <ArrowRightIcon size={16} />
                </Button>
              </div>
            </Card>
            <Card className="border border-base-content/10">
              <div className="p-6">
                <UserRoundCogIcon className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">Health Counselling</p>
                <p className="mt-2 text-base-content/80">
                  Personalized counselling that learns from you, tailoring
                  content and courses unique to you.
                </p>
                <Button
                  onClick={() => navigate("/contact")}
                  color={"ghost"}
                  size={"sm"}
                  className="mt-8"
                >
                  Reach out
                  <ArrowRightIcon size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
