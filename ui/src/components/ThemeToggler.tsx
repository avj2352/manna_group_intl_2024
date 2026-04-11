import { Fragment } from "react";
import { Dropdown, Menu, useTheme } from "react-daisyui";
import { Airplay, ChevronUpIcon, Moon, Sun, Copy, Info, BookOpenText } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import { VITE_APP_VERSION, VITE_SWAGGER_DOCS } from "@/util/envConfig";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { copyToClipboard } from "@/util/helper";

export const ThemeToggler = () => {
  const { setTheme } = useTheme();
  const { isAuthenticated } = useAuth0();
  const { token } = useAuthStore();

  //..evt handlers
  const handleCopyToClipboard = (text: string) => {
    Promise.resolve(copyToClipboard(text));
  };

  const handleSwaggerNavigate = () => {
    window.open(VITE_SWAGGER_DOCS);
  };

  return (
    <div className="fixed z-10 flex flex-col items-center bottom-5 end-5">
      <Dropdown className="dropdown-end dropdown-top">
        <Dropdown.Toggle>
          Theme
          <ChevronUpIcon size={12} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-52">
          <Menu size={"xs"}>
            <Menu.Item onClick={() => handleCopyToClipboard(`v${VITE_APP_VERSION}`)}>
              <div className="flex gap-3 text-sm">
                <Info className="h-5" />
                v{VITE_APP_VERSION}
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme("system")}>
              <div className="flex gap-3 text-sm">
                <Airplay className="h-5" />
                System
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme("light")}>
              <div className="flex gap-3 text-sm">
                <Sun className="h-5" />
                Light
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme("dark")}>
              <div className="flex gap-3 text-sm">
                <Moon className="h-5" />
                Dark
              </div>
            </Menu.Item>
            <Menu.Item onClick={handleSwaggerNavigate}>
              <div className="flex gap-3 text-sm">
                <BookOpenText className="h-5" />
                Swagger Docs
              </div>
            </Menu.Item>
            {/* TODO: Remove / Comment these menu-items below when going LIVE */}
            {isAuthenticated ? (
              <Menu.Item onClick={() => handleCopyToClipboard(token)}>
                <div className="flex gap-3 text-sm">
                  <Copy className="h-5" />
                  Session Token
                </div>
              </Menu.Item>
            ) : (
              <Fragment />
            )}
          </Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
