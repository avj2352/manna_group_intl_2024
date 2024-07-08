import mobile2Img from "@/assets/images/landing/mobile-2.png";
import {
  PhoneCall,
  ShoppingCart,
  CircleDollarSign,
  ArrowDownToLineIcon,
  ArrowRightIcon,
  ComponentIcon,
  PackagePlusIcon,
  RefreshCcwDotIcon,
  ScanFaceIcon,
} from "lucide-react";
import { Button, Card } from "react-daisyui";

export const Works = () => {
  return (
    <section className="py-8 lg:py-24" id="how-it-works">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">
              <img alt="Mobile 2" className="h-[500px]" src={mobile2Img} />
            </div>
            <div className="absolute left-20 top-[30%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2 text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">20+</p>
                    <p className="">Products</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-span">
            <p className="text-xl font-semibold lg:text-3xl">How it works?</p>
            <p className="mt-3 text-base">
              When you purchase our product on MANNA website, you also can sign
              up to be a continued valued customer with us, keeping upto date
              with our products &amp; new offers!
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <ShoppingCart size={20} />
                </div>
                <p className="text-base">Purchase one of our products</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <ScanFaceIcon size={20} />
                </div>
                <p className="text-base">
                  Login with your account or create a new one
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <RefreshCcwDotIcon size={20} />
                </div>
                <p className="text-base">
                  Keep upto date info on our features &amp; products
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <PhoneCall size={20} />
                </div>
                <p className="text-base">Reach out for assistance!</p>
              </div>
            </div>
            <Button color={"ghost"} size={"sm"} className="mt-8">
              Read More
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
