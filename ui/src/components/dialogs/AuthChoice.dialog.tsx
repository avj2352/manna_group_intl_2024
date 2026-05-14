import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import { LogIn, UserCheck } from "lucide-react";
import CommonAppDialog from "@/components/dialogs/CommonApp.dialog";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";

interface IAuthChoiceDialogProps {
  open: boolean;
  onClose: () => void;
  /** When true, "Continue as Guest" navigates to /shipping-address; otherwise just sets isGuest and closes */
  redirectToCheckout?: boolean;
}

const AuthChoiceDialog: FC<IAuthChoiceDialogProps> = ({ open, onClose, redirectToCheckout = false }) => {
  const { loginWithRedirect } = useAuth0();
  const { setIsGuest } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    setIsGuest(false);
    loginWithRedirect();
  };

  const handleGuest = () => {
    onClose();
    setIsGuest(true);
    if (redirectToCheckout) {
      navigate("/shipping-address");
    }
  };

  return (
    <CommonAppDialog
      title="How would you like to continue?"
      open={open}
      onClose={onClose}
    >
      <section className="flex flex-col gap-3">
        <p className="text-sm text-gray-600">
          Sign in to track your orders, or browse and check out as a guest.
        </p>
        <Button
          onClick={handleLogin}
          color="primary"
          className="w-full flex items-center gap-2 justify-center"
        >
          <LogIn className="w-4 h-4" /> Sign in with SSO
        </Button>
        <div className="divider text-xs text-gray-400 my-0">or</div>
        <Button
          onClick={handleGuest}
          color="ghost"
          className="w-full flex items-center gap-2 justify-center border border-base-300"
        >
          <UserCheck className="w-4 h-4" /> Continue as Guest
        </Button>
        <p className="text-xs text-gray-400 text-center">
          Guest orders cannot be tracked via "My Orders".
        </p>
      </section>
    </CommonAppDialog>
  );
};

export default AuthChoiceDialog;
