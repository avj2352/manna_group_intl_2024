import collaborationImg from "@/assets/images/landing/collaboration.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";

const CollaborationRD = () => {
  return (
    <section className="py-8 lg:py-24" id="how-it-works">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">
              <img
                alt="Mobile 2"
                className="h-[500px] rounded-xl"
                src={collaborationImg}
              />
            </div>
            <div className="absolute top-[70%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2 text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">Collaboration</p>
                    <p className="">Research &amp; Development</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-span">
            <p className="text-xl font-semibold lg:text-3xl">Collaboration</p>
            <p className="mt-3 text-base">
              In continuation to our quest of scientific understanding of
              diseases and to find out natural and safer alternative, we will
              continue to introduce clinically evaluated ground breaking
              therapies to give our patients a new beginning with Safer,
              Effective Yet Affordable alternative.
            </p>

            <p className="mt-4 text-base">
              MANNA Pharmaceuticals is working with Healthcare Research
              Organizations in USA and abroad to introduce clinically evaluated
              healthcare products.
            </p>

            <p className="mt-4 text-base">
              Clinically evaluated products like, CalcuNix Tablets (Kidney stone
              care supplement) and KoviFlu Tablets (Antiviral supplement) is an
              attempt in the same direction.
            </p>

            <p className="mt-4 text-base">
              Our emphasis is on to introduce more & more clinically evaluated
              products for assured better health of people. Products of interest
              are <br />
              <br />
              - Alzheimer's disease <br />
              - Diabetes <br />
              - HIV <br />
              - Sickle cell anaemia <br />
              - Wound Care <br />
              <br />
              Focus on collaboration and R&D on healthcare products reflects our
              futuristic approach for introducing improved newer products for
              better health care of people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationRD;
