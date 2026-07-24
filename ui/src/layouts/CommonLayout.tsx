

import {
  Fragment,
  FC,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

// Custom
import { useProductStore } from "@/common/state/features/products/product.slice";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";

type ICommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<ICommonLayoutProps> = ({ children }) => {
  const { fetchProductListAPI } = useProductStore();
  const { fetchAssetListAPI } = useAssetStore();

  const fetchProductListAPIHandler = useCallback(() => {
    fetchProductListAPI();
  }, [fetchProductListAPI]);

  const fetchAssetListAPIHandler = useCallback(() => {
    fetchAssetListAPI();
  }, [fetchAssetListAPI]);

  useEffect(() => {
    fetchAssetListAPIHandler();
    fetchProductListAPIHandler();

    console.log("Fetched assets and products");
  }, [fetchAssetListAPIHandler, fetchProductListAPIHandler]);

  return (
    <Fragment>
      <div className="pt-0 lg:pt-0">{children}</div>
    </Fragment>
  );
};

export default CommonLayout;