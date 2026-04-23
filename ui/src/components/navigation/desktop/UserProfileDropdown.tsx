import { ReactNode, FC, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Ribbon,
  LifeBuoy,
  LogOut,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// ..custom
import { useAuthStore } from "@/common/state/features/auth/auth.slice";

const UserProfileDropdownWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.name} {isAdmin ? "(Admin)" : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem disabled>
              <Ribbon className="w-4 h-4 mr-2" />
              <span>Role: Admin*</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate("/my-cart")}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>My Cart</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/my-profile")}>
            <User className="w-4 h-4 mr-2" />
            <span>My Orders</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {isAdmin && (
          <Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Users className="w-4 h-4 mr-2" />
                  <span>Switch Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/")}>
                      <User className="w-4 h-4 mr-2" />
                      <span>Customer</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </Fragment>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="w-4 h-4 mr-2" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdownWrapper;
