import { FC, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/common/state/store";

const UserProfileDropdownWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // ..states
  const { user, logout } = useAuth0();
  const authSate = useAppSelector(state => state.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent style={{marginTop: 20}}>
        <DropdownMenuLabel>{ user.name } { authSate.isAdmin ? "(Admin)" : ""}</DropdownMenuLabel>        
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}>Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdownWrapper;
