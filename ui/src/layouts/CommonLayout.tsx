import { Fragment, FC, ReactNode, useCallback, useEffect } from "react";
// ..custom
import Navbar from "@/components/navigation/Navbar";
import { publicNavList } from "@/components/navigation/desktop/desktop-nav.list";
import { useAppDispatch } from "@/common/state/store";
import { fetchProductListAPI } from "@/common/state/features/products/product.slice";
import { fetchAssetListAPI } from "@/common/state/features/assets/asset.slice";
import { useToast } from "@/hooks/use-toast";

type ICommonLayoutProps = {
  children: ReactNode
}

const CommonLayout: FC<ICommonLayoutProps> = ({ children }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const fetchProductListAPIHandler = useCallback(() => {
    dispatch(fetchProductListAPI());
  }, []);

  const fetchAssetListAPIHandler = useCallback(()=>{      
    dispatch(fetchAssetListAPI());
  },[]);  

  // when common layout loads
  useEffect(()=>{
    fetchAssetListAPIHandler();
    fetchProductListAPIHandler();
    console.log('App: Fetched assets & products....');
    toast({
      variant: "default",
      title: "Success",
      description: `Fetched assets & products!`,
    });
  },[]);
    
    return (<Fragment>
        <Navbar navList={publicNavList} />
        <div className="pt-0 lg:pt-0">
              {children}
        </div>
    </Fragment>);
};

export default CommonLayout;