import { Fragment, FC, ReactNode } from "react";
// ..custom
import Navbar from "@/components/navigation/Navbar";
import { publicNavList } from "@/components/navigation/desktop/desktop-nav.list";

type ICommonLayoutProps = {
  children: ReactNode
}

const CommonLayout: FC<ICommonLayoutProps> = ({ children }) => {
    
    return (<Fragment>
        <Navbar navList={publicNavList} />
        <div className="pt-0 lg:pt-0">
              {children}
        </div>
    </Fragment>);
};

export default CommonLayout;