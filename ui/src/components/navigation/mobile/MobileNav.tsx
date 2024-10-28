import { FC, Fragment, useState } from "react";
import { Button, Drawer, Menu } from "react-daisyui";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
// ..custom
import MobileUserProfileDropdown from "./MobileUserProfileDropdown";
import { IMobileNavItem } from "@/common/interfaces";

type IMobileNavbarProps = {
  navItems: IMobileNavItem[];
};

const MobileNavbar: FC<IMobileNavbarProps> = ({navItems}) => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isUserDropdown, toggleUserDropdown] = useState<boolean>(false);

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
              {/* Dynamic Landing pages */}
              {navItems?.map((item: IMobileNavItem, idx: number) => (
                <Menu.Item key={idx+1}
                  className="font-medium">
                  <a href={item.link}>{item.icon} {item.label}</a>
              </Menu.Item>
              ))}
              
              {/* UserProfile */}
              {isAuthenticated ? (
                <Menu.Item
                  onClick={() => toggleUserDropdown(!isUserDropdown)}
                  className="font-medium dropdown">
                  <div>
                    <Avatar>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>
                        {user?.name?.substring(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex">{user?.name ?? ''}
                    <ChevronDown className="ml-4" /></span>
                  </div>
                </Menu.Item>
              ) : (
                <Menu.Item className="font-medium dropdown">
                  <Button
                    onClick={() => loginWithRedirect()}
                    size={"sm"}
                    color={"primary"}
                  >
                    Login
                  </Button>
                </Menu.Item>
              )}
              {/* User dropdown links */}
              {isUserDropdown && (
                <MobileUserProfileDropdown onClose={setDrawerOpened}/>
              )}
              {/* Logout */}
              {isAuthenticated && (
                <Menu.Item className="font-medium dropdown">
                  <Button
                    onClick={() => logout()}
                    size={"sm"}
                    color={"primary"}
                  >
                    Logout
                  </Button>
                </Menu.Item>
              )}
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
