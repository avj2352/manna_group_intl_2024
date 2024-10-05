import { Fragment } from 'react';
import { Dropdown, Menu, useTheme } from 'react-daisyui'
import { Airplay, ChevronUpIcon, Moon, Sun, Copy, Info } from 'lucide-react'
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import { APP_VERSION } from '@/common/state/store'; 
import { useAppSelector } from "@/common/state/store";
import { copyToClipboard } from '@/util/helper';

export const ThemeToggler = () => {
  const { setTheme } = useTheme();
  const { isAuthenticated } = useAuth0();
  const authSate = useAppSelector(state => state.auth);

  
  //..evt handlers
  const handleCopyToClipboard = (text: string) => {
    Promise.resolve(copyToClipboard(text));
  };

  return (
    <div className="fixed bottom-5 end-5 z-10 flex flex-col items-center">
      <Dropdown className="dropdown-end dropdown-top">
        <Dropdown.Toggle>
          Theme
          <ChevronUpIcon size={12}/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-52">
          <Menu size={'xs'}>
            <Menu.Item onClick={() => handleCopyToClipboard(`v${APP_VERSION}`)}>
              <div className="flex gap-3 text-sm">
                <Info className="h-5" />
                  v{APP_VERSION}
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('system')}>
              <div className="flex gap-3 text-sm">
                <Airplay className="h-5" />
                System
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('light')}>
              <div className="flex gap-3 text-sm">
                <Sun className="h-5" />
                Light
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('dark')}>
              <div className="flex gap-3 text-sm">
                <Moon className="h-5" />
                Dark
              </div>
            </Menu.Item>
            { isAuthenticated ? <Menu.Item 
                onClick={() => handleCopyToClipboard(authSate.token)}>
                  <div className="flex gap-3 text-sm">
                    <Copy className="h-5" />
                      Session Token
                  </div>
            </Menu.Item> : <Fragment/>}
          </Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
