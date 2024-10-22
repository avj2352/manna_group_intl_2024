import { FC, Fragment, useCallback, useEffect } from "react";
import Loader from "@/components/loaders/Loader";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchAssetListAPI } from "@/common/state/features/assets/asset.slice";
import { AssetAdminDataTable } from "@/components/tables/assets/AssetAdmin.table";
import { columns } from "@/components/tables/assets/manage-assets-table-column";


const AssetTableSection: FC = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const assetState = useAppSelector((state) => state.asset);
  
    const fetchAssetListAPIHandler = useCallback(()=>{
      if (!Boolean(authState.token) || authState.token === "") return;
      dispatch(fetchAssetListAPI({token:authState.token}));
    },[authState.token]);
  
    useEffect(()=>{
      fetchAssetListAPIHandler();
    },[]);
  
    useEffect(()=>{
      if (assetState.asset_list.length === 0) return;      
    },[assetState.asset_list]);
  
    const isLoading = assetState.asset_list_status === "initial" ||
                      assetState.asset_list_status === "pending";
  
    return (<Fragment>
        <div className="flex flex-col text-base flex-start">
          <Loader display={isLoading} text="loading assets"/>
          {!isLoading && <h3 className="mb-4 text-2xl">Your Assets</h3>}
          {!isLoading && <p className="mb-4">Contains list of Assets that can be mapped to Products or Gallery</p>}
          <AssetAdminDataTable columns={columns} data={assetState.asset_list}/>
        </div>
    </Fragment>);
}; 
export default AssetTableSection;