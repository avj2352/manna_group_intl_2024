import { Fragment, FC } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Navbar as Nav } from "react-daisyui";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// ..custom
import { INavItem } from "@/common/interfaces/index";
import UserProfileDropdownWrapper from "./desktop/UserProfileDropdown";
import MobileNavbar from "./MobileNav";
import NavbarDropdown from "./desktop/NavbarDropdown";

type INavbarProps = {
  navList: INavItem[];
};

export const Navbar: FC<INavbarProps> = ({ navList }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.scrollY < 30);
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
        <div className="navbar-container">
          <Nav className="flex px-0">
            <Nav.Start className="gap-2 flex-1 min-w-[300px]" style={{ width: "100%" }}>
              <MobileNavbar navItems={navList} />
              <a
                href="#"
                className="text-2xl font-bold tracking-tighter text-brand-gradient">
                MANNA Group International
              </a>
            </Nav.Start>

            <Nav.End className="hidden w-full lg:flex flex-2">
              <Menu horizontal size="sm" className="items-center gap-2 px-1">
                {/* About us */}
                <Menu.Item className="font-medium dropdown">
                 <NavbarDropdown
                    navList={navList}
                    label="About" filter={"about" as unknown as Pick<INavItem, "category">}/>
                </Menu.Item>
                {/* Products */}
                <Menu.Item className="font-medium dropdown">
                 <NavbarDropdown
                    navList={navList}
                    label="Products" filter={"products" as unknown as Pick<INavItem, "category">}/>
                </Menu.Item>                
                {/* Company */}
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                      navList={navList}
                      label="Company" filter={"company" as unknown as Pick<INavItem, "category">}/>
                </Menu.Item>
                {/* Contact */}
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                      navList={navList}
                      label="Contact Us" filter={"contact" as unknown as Pick<INavItem, "category">}/>
                </Menu.Item>
                {/* UserProfile */}
                <Menu.Item className="font-medium dropdown">
                  {isAuthenticated ? (
                    <UserProfileDropdownWrapper>
                      <Fragment>
                      <Avatar>
                        <AvatarImage src={user?.picture} />
                        <AvatarFallback>{user?.name?.substring(0,1).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <ChevronDown />
                      </Fragment>
                    </UserProfileDropdownWrapper>
                  ) : (
                    <Button
                      onClick={() => loginWithRedirect()}
                      size={"sm"}
                      color={"primary"}
                    >
                      Login
                    </Button>
                  )}
                </Menu.Item>
              </Menu>
            </Nav.End>
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
