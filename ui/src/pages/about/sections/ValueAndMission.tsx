import { FC } from "react";
import ourGoalsImg from "@/assets/images/landing/our_goals.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";

const ValueAndMission: FC = () => {
  return (
    <section className="py-8 lg:py-24" id="vision-mission">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">
              Our Vision &amp; Mission
            </p>
            <p className="mt-8 text-base lg:text-xl">
              &quot;Our vision is to be a well familiar healthcare products
              provider and a part of day-to-day good health &amp; wellness to
              our customers by 2025.&quot;
            </p>
            <p className="mt-8 text-base lg:text-xl">
              &quot;Our Mission is to provide a meaningful &amp; focused
              products to our customers, helping them to have day-to-day good
              health &amp; wellness.&quot;
            </p>
            <p className="mt-8 text-base">
              MANNA International Corp. is committed to delivering exceptional
              value through innovative products. By 2025, the company aims to
              reach 1,000 customers, focusing on personalized medicine, advanced
              drug delivery systems, and cutting-edge research and development.{" "}
              <br />
              <br />
              Our dedication to quality, efficiency, and accessibility positions
              us as a leader in the industry, driving our growth and customer
              satisfaction to new heights.
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img
                alt="Mobile 3"
                className="h-[500px] rounded-xl"
                src={ourGoalsImg}
              />
            </div>
            <div className="absolute end-10 top-[70%]">
              <Card className="transition-all shadow bg-base-100 hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center p-2 rounded-full bg-primary">
                    <ComponentIcon className="size-6 text-primary-content" />
                  </div>
                  <div>
                    <p className="font-semibold text-xl/none">2025</p>
                    <p className="">Health &amp; Wellness</p>
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

export default ValueAndMission;
