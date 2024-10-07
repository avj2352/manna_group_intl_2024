import { FC } from "react";
import researchImg from "@/assets/images/landing/hand_shake.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";
import ManagementCarousel from "@/components/carousels/management/ManagementCarousel";

const Management: FC = () => {
  return (
    <section className="py-8 lg:py-24" id="management-team">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">Management</p>
            <p className="mt-8 text-base">
              At MANNA, we are driven by a fundamental commitment: improving
              lives through the power of innovative medicines. We believe that
              access to effective healthcare is a right, not a privilege, and we
              are dedicated to developing and delivering life-changing
              treatments to patients around the world.
            </p>
            <div>
              <ManagementCarousel />
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img
                alt="Mobile 3"
                className="h-[500px] rounded-xl"
                src={researchImg}
              />
            </div>
            <div className="absolute end-10 top-[70%]">
              <Card className="transition-all shadow bg-base-100 hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center p-2 rounded-full bg-primary">
                    <ComponentIcon className="size-6 text-primary-content" />
                  </div>
                  <div>
                    <p className="font-semibold text-xl/none">Driven by</p>
                    <p className="">Improving Lives</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Management;
