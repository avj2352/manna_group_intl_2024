import { Fragment, FC, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
// ..custom
import AdminNavbar from "@/components/navigation/AdminNavbar";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { adminNavList } from "@/components/navigation/desktop/desktop-nav.list";

type IAdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout: FC<IAdminLayoutProps> = ({ children }) => {
  const { isAdmin } = useAuthStore();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated || !Boolean(isAdmin)) return <Navigate to="/restricted" replace />;

  return (
    <Fragment>
      <AdminNavbar navList={adminNavList} />
      <div className="pt-8 lg:pt-0">{children}</div>
    </Fragment>
  );
};

export default AdminLayout;
