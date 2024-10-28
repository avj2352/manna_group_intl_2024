import { FC, Fragment } from "react";
import { Menu } from "react-daisyui";
import {
  ShoppingCart,
  CreditCard,
  Ribbon,
  LifeBuoy,
  LogOut,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/common/state/store";

type IMobileUserProfileDropdownProps = {
  onClose: (isDrawer: boolean) => void;
};

const MobileUserProfileDropdown: FC<IMobileUserProfileDropdownProps> = ({
  onClose,
}) => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
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
          <ShoppingCart className="w-4 h-4 mr-2" /> My Cart
        </a>
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
