import { Fragment, FC, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/navigation/public/Navbar";
import { navList } from "@/components/navigation/public/navigation.list";

type IAuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {

  const { isAuthenticated } = useAuth0();  
  console.log('Is user authenticated: ', isAuthenticated);
  
  if (!isAuthenticated) return <Navigate to="/restricted" replace/>
  
  return (<Fragment>
            <Navbar navList={navList} />
            {children}
  </Fragment>);

};

export default AuthLayout;