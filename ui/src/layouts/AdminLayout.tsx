import { Fragment, FC, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
// ..custom
import AdminNavbar from "@/components/navigation/admin/AdminNavbar";
import { useAppSelector } from "@/common/state/store";
import { navList } from "@/components/navigation/admin/admin-nav.list";

type IAdminLayoutProps = {
  children: ReactNode
}

const AdminLayout: FC<IAdminLayoutProps> = ({ children }) => {
    // ..states
    const authState = useAppSelector(state => state.auth);
    const { isAuthenticated } = useAuth0();       
  
    // check if admin
    if (!isAuthenticated || !Boolean(authState.isAdmin)) return <Navigate to="/restricted" replace/>
  
  return (<Fragment>
            <AdminNavbar navList={navList} />
            {children}
  </Fragment>);

};

export default AdminLayout;