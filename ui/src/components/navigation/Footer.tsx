import { FC } from "react";
import { Link } from "react-router-dom";
import {
  DribbbleIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import { INavItem } from "@/components/navigation/navigation.list";

type IFooterProps = {
  navList: INavItem[];
};

export const Footer: FC<IFooterProps> = ({ navList }) => {
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
            <h2 className="text-xl font-medium">About</h2>
            <div className="space-y-2">
              {/* loop */}
              {navList
                .filter((item: INavItem) => item.category === "about")
                .map((item: INavItem, idx: number) => (
                  <div key={idx + 1}>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to={`${item.link}${
                        item.offSetYAxis ? "/" + item.offSetYAxis : "/0"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              {/* endloop */}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Products</h2>
            <div className="space-y-2">
              {/* loop */}
              {navList
                .filter((item: INavItem) => item.category === "products")
                .map((item: INavItem, idx: number) => (
                  <div key={idx + 1}>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to={item.link}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              {/* endloop */}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Company</h2>
            <div className="space-y-2">
              {/* loop */}
              {navList
                .filter((item: INavItem) => item.category === "company")
                .map((item: INavItem, idx: number) => (
                  <div key={idx + 1}>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to={item.link}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              {/* endloop */}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Quick Links</h2>
            <div className="space-y-2">
              {/* loop */}
              {navList
                .filter((item: INavItem) => item.category === "contact")
                .map((item: INavItem, idx: number) => (
                  <div key={idx + 1}>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to={item.link}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              {/* endloop */}
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
