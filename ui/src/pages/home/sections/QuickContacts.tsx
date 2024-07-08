import { FC } from "react";
import mobile3Img from "@/assets/images/landing/mobile-3.png";
import { Globe, Factory, PhoneIcon, MonitorSmartphoneIcon } from "lucide-react";
import { Card } from "react-daisyui";

const QuickContacts: FC = () => {
  return (
    <section className="py-8 lg:py-24" id="organize">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">Quick Contacts</p>
            <p className="mt-8 text-base">
              Have questions ? We're here to help!
            </p>
            <div className="mt-8 space-y-8">
              <div className="flex items-start gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-base font-medium">Corporate Office</p>
                  <p className="mt-1 text-base-content/80">
                    2386, Morris Avenue, Union, New Jersey 07083, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <Factory size={24} />
                </div>
                <div>
                  <p className="text-base font-medium">Manufacturing</p>
                  <p className="mt-1 text-base-content/80">
                    301-325 Brunswick Avenue, Trenton, New Jersey 08618, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <PhoneIcon size={24} />
                </div>
                <div>
                  <p className="text-base font-medium">Contact Us online</p>
                  <p className="mt-1 text-base-content/80">
                    <strong>Email:</strong> <br />
                    info@mannagroupintl.com, <br />
                    customercare@mannagroupintl.com, <br />
                    sales@mannagroupintl.com <br />
                    <strong>Call:</strong> +1 (877) 638 1437
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img alt="Mobile 3" className="h-[500px]" src={mobile3Img} />
            </div>
            <div className="absolute end-10 top-[30%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2">
                    <MonitorSmartphoneIcon className="size-6 text-primary-content" />
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">Contact us</p>
                    <p className="">We're here to help !!</p>
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

export default QuickContacts;
