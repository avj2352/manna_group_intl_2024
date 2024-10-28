import { Fragment, FC, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import { publicNavList } from "@/components/navigation/desktop/desktop-nav.list";

type IAuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {

  const { isAuthenticated } = useAuth0();  
  console.log('Is user authenticated: ', isAuthenticated);
  
  if (!isAuthenticated) return <Navigate to="/restricted" replace/>
  
  return (<Fragment>
            <Navbar navList={publicNavList} />
            {children}
  </Fragment>);

};

export default AuthLayout;