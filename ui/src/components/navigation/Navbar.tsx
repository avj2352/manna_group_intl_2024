import { Fragment, FC, useEffect, useState } from "react";
import { Button, Menu, Navbar as Nav } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ..custom
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { INavItem } from "@/common/interfaces/index";
import { IProductRecord } from "@/common/interfaces";
import UserProfileDropdownWrapper from "@/components/navigation/desktop/UserProfileDropdown";
import NavbarDropdown from "@/components/navigation/desktop/NavbarDropdown";
import MobileNavbar from "@/components/navigation/mobile/MobileNav";
import { publicMobileNavList } from "@/components/navigation/mobile/mobile-nav.list";
import useLocalStorage from "@/hooks/use-localstorage";
import ShoppingCartBadge from "@/components/badges/ShoppingCartBadge";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import AuthChoiceDialog from "@/components/dialogs/AuthChoice.dialog";

type INavbarProps = {
  navList: INavItem[];
};

export const Navbar: FC<INavbarProps> = ({ navList }) => {
  const { storedValue } = useLocalStorage<IProductRecord[]>("products", []);
  const { is_cart_displayed, setCheckoutCount } = useCheckoutStore();
  const { isAuthenticated, user } = useAuth0();
  const [atTop, setAtTop] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCheckoutCount(storedValue.length);
  }, [storedValue]);

  //..evt handlers
  const handleCartPageRoute = () => {
    navigate("/my-cart");
  };

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.scrollY < 30);
    };
    window.addEventListener("scroll", onWindowScroll);
    onWindowScroll();
  }, []);

  return (
    <Fragment>
      <AuthChoiceDialog
        open={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
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
            <Nav.Start className="gap-2 flex-1 min-w-[250px]" style={{ width: "100%" }}>
              <MobileNavbar navItems={publicMobileNavList} />
              <a href="#" className="text-2xl font-bold tracking-tighter text-brand-gradient">
                MGI
              </a>
            </Nav.Start>

            <Nav.End className="hidden w-full lg:flex flex-2">
              <Menu horizontal size="sm" className="items-center gap-2 px-1">
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                    navList={navList}
                    label="About"
                    filter={"about" as unknown as Pick<INavItem, "category">}
                  />
                </Menu.Item>
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                    navList={navList}
                    label="Products"
                    filter={"products" as unknown as Pick<INavItem, "category">}
                  />
                </Menu.Item>
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                    navList={navList}
                    label="Company"
                    filter={"company" as unknown as Pick<INavItem, "category">}
                  />
                </Menu.Item>
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown
                    navList={navList}
                    label="Contact Us"
                    filter={"contact" as unknown as Pick<INavItem, "category">}
                  />
                </Menu.Item>
                <Menu.Item className="font-medium">
                  {Boolean(is_cart_displayed) ? (
                    <ShoppingCartBadge onBadgeClick={handleCartPageRoute} />
                  ) : (
                    <Fragment />
                  )}
                </Menu.Item>
                <Menu.Item className="font-medium dropdown">
                  {isAuthenticated ? (
                    <UserProfileDropdownWrapper>
                      <Fragment>
                        <Avatar>
                          <AvatarImage src={user?.picture} />
                          <AvatarFallback>
                            {user?.name?.substring(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown />
                      </Fragment>
                    </UserProfileDropdownWrapper>
                  ) : (
                    <Button
                      onClick={() => setIsAuthDialogOpen(true)}
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
