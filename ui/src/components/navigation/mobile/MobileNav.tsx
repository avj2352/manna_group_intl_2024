import { FC, Fragment, useState } from "react";
import { Button, Drawer, Menu } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import { INavItem } from "@/components/navigation/navigation.list";

type IMobileNavbarProps = {
  navItems: INavItem[];
};

const MobileNavbar: FC<IMobileNavbarProps> = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <Fragment>
      <div className="flex-none lg:hidden">
        <Drawer
          open={drawerOpened}
          onClickOverlay={() => setDrawerOpened(!drawerOpened)}
          side={
            <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
              <Menu.Item className="font-medium">
                <a
                  href="index.html"
                  className="text-brand-gradient text-xl font-bold tracking-tighter"
                >
                  MANNA Group International
                </a>
              </Menu.Item>

              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/">Home</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/about/10">About</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/products">Products</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/company/10">Company</a>
              </Menu.Item>
              <Menu.Item
                className="font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <a href="#/contact">Contact Us</a>
              </Menu.Item>
              <a href="#download" onClick={() => setDrawerOpened(false)}>
                <Button size={"sm"} color={"primary"}>
                  Download Now
                </Button>
              </a>
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
