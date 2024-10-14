import { Fragment, FC, ReactNode } from "react";
// ..custom
import Navbar from "@/components/navigation/public/Navbar";
import { navList } from "@/components/navigation/public/navigation.list";

type ICommonLayoutProps = {
  children: ReactNode
}

const CommonLayout: FC<ICommonLayoutProps> = ({ children }) => {
    
    return (<Fragment>
        <Navbar navList={navList} />
        {children}
    </Fragment>);
};

export default CommonLayout;