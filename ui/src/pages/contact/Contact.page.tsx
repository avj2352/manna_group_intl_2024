import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Globe, Factory, PhoneIcon, MonitorSmartphoneIcon } from "lucide-react";
import { Card } from "react-daisyui";
// ..custom
import mobile3Img from "@/assets/images/landing/mobile-3.png";

const ContactPage: FC = () => {
  const { id } = useParams();
  
  useEffect(()=>{
    if (Boolean(id) && id !== "") {      
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });    
    }
  },[id]);

  return (
    <section className="py-8 lg:py-24" id="contact-us-section">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">Quick Contacts</p>
            <p className="mt-8 text-base">
              Have questions ? We're here to help!
            </p>
            <div className="mt-8 space-y-8">
              <div className="flex items-start gap-5">
                <div className="inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary">
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
                <div className="inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary">
                  <Factory size={24} />
                </div>
                <div>
                  <p className="text-base font-medium">Manufacturing</p>
                  <p className="mt-1 text-base-content/80">
                    301-325 Brunswick Avenue, Trenton, New Jersey 08618, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5" id="send-inquiry">
                <div className="inline-flex items-center justify-center p-2 font-medium rounded bg-primary/20 text-primary">
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
              <Card className="transition-all shadow bg-base-100 hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center p-2 rounded-full bg-primary">
                    <MonitorSmartphoneIcon className="size-6 text-primary-content" />
                  </div>
                  <div>
                    <p className="font-semibold text-xl/none">Contact us</p>
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

export default ContactPage;
