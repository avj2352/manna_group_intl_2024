import businessShakeImg from "@/assets/images/landing/business_shake.jpg";
import { BriefcaseIcon, CalendarIcon, ComponentIcon, MailIcon } from "lucide-react";
import { Card } from "react-daisyui";

const CareersPage = () => {
  return (
    <section id="careers" className="py-8 lg:py-24">
      <div className="container">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xl font-semibold lg:text-3xl">Careers</p>
          <p className="mt-3 text-base text-base-content/70">
            Join the MANNA Group International team and help us improve day-to-day health for people worldwide.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">

          {/* Image column — same as WhoWeAre */}
          <div className="relative">
            <div className="flex justify-center">
              <img
                alt="MANNA careers"
                className="h-[500px] rounded-xl object-cover"
                src={businessShakeImg}
              />
            </div>
            <div className="absolute top-[70%]">
              <Card className="transition-all shadow bg-base-100 hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center p-2 rounded-full bg-primary text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-xl/none">Now Hiring</p>
                    <p>Open Positions</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Job listings column */}
          <div id="careers-section" className="flex flex-col gap-8">

            {/* Job card */}
            <div className="rounded-xl border border-base-content/10 bg-base-100 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center p-2 rounded-full bg-primary/10">
                  <BriefcaseIcon className="size-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">Clinical Marketing and Training Manager</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-outline text-xs">Full-Time</span>
                <span className="badge badge-outline text-xs">Union, NJ</span>
                <span className="badge badge-outline text-xs">$182,300 – $200,000 / yr</span>
              </div>

              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                <CalendarIcon className="size-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-primary">
                  This job ad is valid from May 27th, 2026 – June 27th, 2026
                </span>
              </div>

              <p className="text-sm text-base-content/80 leading-relaxed">
                MANNA Pharmaceuticals, dba of MANNA Int'l Corp, Union, NJ seeks an experienced Clinical
                Marketing and Training Manager to educate and train MANNA's current and upcoming product
                associates, customers and distributors; market MANNA products and outsourcing raw materials
                for manufacturing; provide hospital assistance hands-on training; attend and provide product
                evaluations and competitive analysis from the attendance of related symposiums, seminars,
                trade shows, conferences and so on.
              </p>

              <ul className="mt-4 space-y-1 text-sm text-base-content/80 list-disc list-inside">
                <li>Requires extensive local and international travel.</li>
                <li>Languages required: English, Arabic, Hindi, Urdu, Malayalam, Tamil, etc.</li>
                <li>Minimum BSc. in Nursing or Hospital Administration.</li>
              </ul>

              <div className="mt-6">
                <a
                  href="mailto:femiaade2@gmail.com?subject=Application: Clinical Marketing and Training Manager"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <MailIcon size={14} />
                  Apply via Email
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;
