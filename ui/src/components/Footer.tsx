import {
  DribbbleIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer
      className="rounded-t-xl bg-neutral text-neutral-content"
      data-theme="dark"
    >
      <div className="container py-12">
        <p className="text-2xl font-bold">MANNA Group International</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div className="inline-flex gap-3">
            <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
              <FacebookIcon size={16} />
            </div>

            <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
              <InstagramIcon size={16} />
            </div>
            <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
              <DribbbleIcon size={16} />
            </div>
            <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
              <LinkedinIcon size={16} />
            </div>
            <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
              <MailIcon size={16} />
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Solutions</h2>
            <div className="space-y-2">
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Our Products
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Dietory Supplements
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">About</h2>
            <div className="space-y-2">
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Our Mission
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Our Vision
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Our Values
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Company</h2>
            <div className="space-y-2">
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Gallery
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Management Team
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Collaboration and R&amp;D
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Business Division
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Quick Links</h2>
            <div className="space-y-2">
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Contact Us
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Send Inquiry
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Careers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-8 py-4 text-center lg:px-40">
        2024 &copy; made by{" "}
        <a
          className="link-hover link"
          href="https://powerministry.us"
          target="_blank"
        >
          Powerministry US
        </a>
      </div>
    </footer>
  );
};
