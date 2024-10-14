import { FC, Fragment, useState } from "react";
import { Button, Drawer, Menu } from "react-daisyui";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
// ..custom
import { INavItem } from "@/common/interfaces/index";
import UserProfileDropdownWrapper from "@/components/navigation/public/desktop/UserProfileDropdown";

type IMobileNavbarProps = {
  navItems: INavItem[];
};

const MobileNavbar: FC<IMobileNavbarProps> = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <Fragment>
      <div className="flex-none lg:hidden">
        <Drawer
          open={drawerOpened}
          onClickOverlay={() => setDrawerOpened(!drawerOpened)}
          side={
            <Menu className="min-h-full gap-2 p-4 w-80 bg-base-100 text-base-content">
              <Menu.Item className="font-medium">
                <a
                  href="#"
                  className="text-xl font-bold tracking-tighter text-brand-gradient"
                >
                  MANNA Group International
                </a>
              </Menu.Item>

              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/about/who-we-are">About</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/products/shop-products">SHOP Products!</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/company/gallery-section">Company</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/contact/contact-us-section">Contact Us</a>
              </Menu.Item>
              {/* UserProfile */}
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
                    onClick={() => loginWithRedirect()}
                    size={"sm"}
                    color={"primary"}
                  >
                    Login
                  </Button>
                )}
              </Menu.Item>
              {/* Logout */}
              { isAuthenticated && <Menu.Item className="font-medium dropdown">
                <Button
                  onClick={() => logout()}
                  size={"sm"}
                  color={"primary"}
                >
                  Logout
                </Button>
              </Menu.Item>
              }
            </Menu>
          }
        >
          <Button
            shape="square"
            color="ghost"
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon className="inline-block text-xl" />
          </Button>
        </Drawer>
      </div>
    </Fragment>
  );
};

export default MobileNavbar;
