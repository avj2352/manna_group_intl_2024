import { Fragment, FC } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Navbar as Nav } from "react-daisyui";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// ..custom
import { INavItem } from "@/components/navigation/navigation.list";
import MobileNavbar from "./mobile/MobileNav";

type INavbarProps = {
  navList: INavItem[];
};

export const Navbar: FC<INavbarProps> = ({ navList }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.pageYOffset < 30);
    };
    window.addEventListener("scroll", onWindowScroll);
    onWindowScroll();
  }, []);

  return (
    <Fragment>
      <div
        id="navbar-wrapper"
        className={`container fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500 ${
          !atTop
            ? "border top-0 xl:mt-4 mt-0 xl:rounded-full z-20 bg-base-100 lg:bg-opacity-95 border-base-content/10 "
            : "border-base-content/10"
        }`}
      >
        <div className="">
          <Nav className="px-0">
            <Nav.Start className="gap-2" style={{ width: "100%" }}>
              <MobileNavbar navItems={navList} />

              <a
                href="#"
                className="text-2xl font-bold tracking-tighter text-brand-gradient"
              >
                MANNA Group International
              </a>
            </Nav.Start>

            <Nav.End className="hidden w-full lg:flex">
              <Menu horizontal size="sm" className="items-center gap-2 px-1">
                <Menu.Item className="font-medium dropdown">
                  <details>
                    <summary tabIndex={0} role="button">
                      About
                    </summary>
                    <ul
                      tabIndex={0}
                      className="p-2 rounded-t-none bg-base-100 dropdown-content"
                      style={{ width: "200px" }}
                    >
                      {navList
                        .filter((item: INavItem) => item.category === "about")
                        .map((item: INavItem, idx: number) => (
                          <li key={idx + 1}>
                            <Link
                              className="text-base transition-all duration-500 hover:text-primary"
                              to={`${item.link}${
                                item.offSetYAxis ? "/" + item.offSetYAxis : "/0"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </Menu.Item>

                <Menu.Item className="font-medium dropdown">
                  <details>
                    <summary tabIndex={1} role="button">
                      Products
                    </summary>
                    <ul
                      tabIndex={1}
                      className="p-2 rounded-t-none bg-base-100 dropdown-content"
                      style={{ width: "200px" }}
                    >
                      {navList
                        .filter(
                          (item: INavItem) => item.category === "products",
                        )
                        .map((item: INavItem, idx: number) => (
                          <li key={idx + 1}>
                            <Link
                              className="text-base transition-all duration-500 hover:text-primary"
                              to={item.link}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </Menu.Item>

                <Menu.Item className="font-medium dropdown">
                  <details>
                    <summary tabIndex={2} role="button">
                      Company
                    </summary>
                    <ul
                      tabIndex={2}
                      className="p-2 rounded-t-none bg-base-100 dropdown-content"
                      style={{ width: "200px" }}
                    >
                      {navList
                        .filter((item: INavItem) => item.category === "company")
                        .map((item: INavItem, idx: number) => (
                          <li key={idx + 1}>
                            <Link
                              className="text-base transition-all duration-500 hover:text-primary"
                              to={`${item.link}${
                                item.offSetYAxis ? "/" + item.offSetYAxis : "/0"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </Menu.Item>

                <Menu.Item className="font-medium dropdown">
                  <details>
                    <summary tabIndex={3} role="button">
                      Contact
                    </summary>
                    <ul
                      tabIndex={3}
                      className="p-2 rounded-t-none bg-base-100 dropdown-content"
                      style={{ width: "200px" }}
                    >
                      {navList
                        .filter((item: INavItem) => item.category === "contact")
                        .map((item: INavItem, idx: number) => (
                          <li key={idx + 1}>
                            <Link
                              className="text-base transition-all duration-500 hover:text-primary"
                              to={item.link}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </Menu.Item>

                <a
                  href="https://daisyui.lemonsqueezy.com/checkout/buy/71f032e3-1a23-4b79-b74e-130ada4899f2"
                  target="_blank"
                >
                  { isAuthenticated ? (<Button
                    onClick={() => logout()}
                    size={"sm"} 
                    color={"primary"}>
                      Logout
                  </Button>): (<Button
                    onClick={() => loginWithRedirect()}
                    size={"sm"} 
                    color={"primary"}>
                      Login
                  </Button>)}                                    
                </a>
              </Menu>
            </Nav.End>
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
