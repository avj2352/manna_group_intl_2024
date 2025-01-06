import { FC, Fragment } from "react";
import { Menu } from "react-daisyui";
import {  
  CreditCard,
  Ribbon,
  LifeBuoy,  
  User,
  UserPlus,  
} from "lucide-react";
import { useAppSelector } from "@/common/state/store";

type IMobileUserProfileDropdownProps = {
  onClose: (isDrawer: boolean) => void;
};

const MobileUserProfileDropdown: FC<IMobileUserProfileDropdownProps> = ({
  onClose,
}) => {  
  const authSate = useAppSelector((state) => state.auth);

  return (
    <Fragment>
      <Menu.Item className="pl-4 font-medium">
        <p className="text-base">
          <Ribbon className="w-4 h-4 mr-2" />
          {authSate?.isAdmin ? `(Admin)*` : "(User)"}
        </p>
      </Menu.Item>      
      <Menu.Item className="pl-4" onClick={() => onClose(false)}>
        <a href="#/company/gallery-section">
          <CreditCard className="w-4 h-4 mr-2"  /> My Orders
        </a>
      </Menu.Item>
      {authSate.isAdmin && (
        <Fragment>
          <Menu.Item className="pl-4" onClick={() => onClose(false)}>
            <a href="#/admin">
              <UserPlus className="w-4 h-4 mr-2"  /> Switch: Admin Dashboard
            </a>
          </Menu.Item>
          <Menu.Item className="pl-4" onClick={() => onClose(false)}>
            <a href="#/">
              <User className="w-4 h-4 mr-2"  /> Switch: Customer Page
            </a>
          </Menu.Item>
        </Fragment>
      )}
      <Menu.Item className="pl-4" onClick={() => onClose(false)}>
        <a href="#/company/gallery-section">
          <LifeBuoy className="w-4 h-4 mr-2"  /> Support
        </a>
      </Menu.Item>
    </Fragment>
  );
};

export default MobileUserProfileDropdown;
