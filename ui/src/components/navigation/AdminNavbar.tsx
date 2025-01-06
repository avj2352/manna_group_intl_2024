import { Fragment, FC } from "react";
import { Button, Menu, Navbar as Nav } from "react-daisyui";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// ..custom
import { INavItem } from "@/common/interfaces/index";
import UserProfileDropdownWrapper from "@/components/navigation/desktop/UserProfileDropdown";
import MobileNavbar from "@/components/navigation/mobile/MobileNav";
import NavbarDropdown from "@/components/navigation/desktop/NavbarDropdown";
import { adminMobileNavList } from "./mobile/mobile-nav.list";

type IAdminNavbarProps = {
  navList: INavItem[];
};

type FilterType = Pick<INavItem, "category">;

export const AdminNavbar: FC<IAdminNavbarProps> = ({ navList }) => {
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
              <MobileNavbar navItems={adminMobileNavList} />
              <a
                href="#/admin"
                className="text-2xl font-bold tracking-tighter text-brand-gradient">
                Admin Dashboard
              </a>
            </Nav.Start>

            <Nav.End className="hidden w-full lg:flex flex-2">
              <Menu horizontal size="sm" className="items-center gap-2 px-1">                
                {/* Assets */}
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown 
                    navList={navList}
                    label="Assets" filter={"assets" as unknown as FilterType}/>
                </Menu.Item>
                {/* Products */}
                <Menu.Item className="font-medium dropdown">
                 <NavbarDropdown 
                  navList={navList}
                  label="Products" filter={"products" as unknown as FilterType}/>
                </Menu.Item>                                
                {/* Promotions */}
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown 
                    navList={navList}
                    label="Promotions" filter={"promotions" as unknown as FilterType}/>
                </Menu.Item>
                {/* Purchases */}
                <Menu.Item className="font-medium dropdown">
                  <NavbarDropdown 
                    navList={navList}
                    label="Purchases" filter={"purchases" as unknown as FilterType}/>
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

export default AdminNavbar;
