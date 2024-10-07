import handAppleImg from "@/assets/images/landing/our_value.jpg";
import { ComponentIcon } from "lucide-react";
import { Card } from "react-daisyui";

const OurValue = () => {
  return (
    <section className="py-8 lg:py-24" id="our-value">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">
              <img
                alt="Mobile 2"
                className="h-[500px] rounded-xl"
                src={handAppleImg}
              />
            </div>
            <div className="absolute top-[70%]">
              <Card className="transition-all shadow bg-base-100 hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center p-2 rounded-full bg-primary text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-xl/none">Core</p>
                    <p className="">Values</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-span">
            <p className="text-xl font-semibold lg:text-3xl">Our Value</p>
            <p className="mt-3 text-base">
              We trust and practice in maintaining honesty, integrity and
              transparency with our customers and stakeholders and try to enjoy
              a Win-Win Relationship. In our business we believe and practice -
            </p>
            <p className="mt-3 text-base font-semibold">
              &quot;Customer is the King&quot;
              <br />
              &quot;El cliente es el rey&quot;
              <br />
              &quot;Le client est le roi&quot;
              <br />
              &quot;Клиент – король&quot;
              <br />
              &quot;O cliente é o rei &quot;
              <br />
              &quot; الزبون هو الملك &quot;
              <br />
              &quot;客户为王&quot;
              <br />
              &quot;ग्राहक राजा है&quot;
              <br />
              &quot;গ্রাহক রাজা&quot;
              <br />
              &quot;Il cliente è il re&quot;
              <br />
              &quot;Kunde ist der König&quot;
              <br />
            </p>
            <p className="mt-4 text-base">
              In Sanskrit, the most scientific, one of the oldest and mother of
              all languages, we address our customers as, “Eko Twam Dwitiyo
              Naasty”. It means “Hey our customers, in our business “it is only
              you no one else”.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValue;
