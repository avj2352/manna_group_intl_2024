import { ReactNode, FC, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
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
import { useAppSelector } from "@/common/state/store";

const UserProfileDropdownWrapper: FC<{ children: ReactNode }> =({children}) => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const authSate = useAppSelector(state => state.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.name} {authSate?.isAdmin ? `(Admin)` : ''}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        {authSate?.isAdmin && <DropdownMenuItem disabled>
          <Ribbon className="w-4 h-4 mr-2" />
          <span>Role: Admin*</span>
        </DropdownMenuItem>}
          <DropdownMenuItem>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>My Cart</span>            
          </DropdownMenuItem>
          <DropdownMenuItem>
              <CreditCard className="w-4 h-4 mr-2" />
            <span>My Orders</span>            
          </DropdownMenuItem>                    
        </DropdownMenuGroup>
        {authSate.isAdmin && (<Fragment>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>                  
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="w-4 h-4 mr-2" />
              <span>Switch Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => navigate('/admin')}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span>Admin Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate('/')}>
                  <User className="w-4 h-4 mr-2" />
                  <span>Customer</span>
                </DropdownMenuItem>                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>          
        </DropdownMenuGroup>
        </Fragment>)
        }
        <DropdownMenuSeparator />        
        <DropdownMenuItem>
          <LifeBuoy className="w-4 h-4 mr-2" />
          <span>Support</span>
        </DropdownMenuItem>        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default UserProfileDropdownWrapper;
