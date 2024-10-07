import { FC } from "react";
import researchImg from "@/assets/images/landing/research.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";

const Quality: FC = () => {
  return (
    <section className="py-8 lg:py-24" id="quality-affordability">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">
              Quality &amp; Affordability
            </p>
            <p className="mt-8 text-base">
              Quality is the core essence of our business. With MANNA, Quality
              comes @ Affordability. <br />
              <br />
              The quality of supplements or pharmaceuticals has been a concern
              for the manufacturer, marketing company and for the consumers as
              well. <br />
              <br />
              At MANNA, quality starts with sourcing of materials and its
              analysis to manufacturing process, analysis in lab., packaging
              labelling and storage conditions. With quality assurance, our
              focus remains at every steps of development of products so to
              provide products with 100% quality for assured outcome. <br />
              <br />
              At MANNA, we believe to deliver the quality products at a
              genuinely affordable price.
            </p>
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
                    <p className="font-semibold text-xl/none">Best in</p>
                    <p className="">Quality &amp; Affordability</p>
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

export default Quality;
