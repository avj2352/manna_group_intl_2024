import { FC, Fragment, useCallback, useEffect } from "react";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import { AssetAdminDataTable } from "@/components/tables/assets/AssetAdmin.table";
import { columns } from "@/components/tables/assets/manage-assets-table-column";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loaders/Loader";
import { IAssetRecord } from "@/common/interfaces";


const AssetTableSection: FC = () => {
    const { toast } = useToast();
    const { asset_list, asset_list_status, asset_delete_status, fetchAssetListAPI, resetDelete } = useAssetStore();

    const fetchAssetListAPIHandler = useCallback(()=>{
      fetchAssetListAPI();
    },[]);

    useEffect(()=>{
      fetchAssetListAPIHandler();
    },[]);

    useEffect(()=>{
      if (asset_delete_status === "fulfilled") {
        toast({
          variant: "default",
          title: "Success",
          description: `Asset record has been deleted!`,
        });
        resetDelete();
        fetchAssetListAPIHandler();
      }
      if (asset_delete_status === "rejected") {
        toast({
          variant: "danger",
          title: "Error",
          description: `Error deleting asset record!`,
        });
        resetDelete();
      }
    },[asset_delete_status]);

    const isLoading = asset_list_status === "initial" ||
                      asset_list_status === "pending" ||
                      asset_delete_status === "pending";

    const sortedList: IAssetRecord[] = [...asset_list].sort((a, b) => a.position - b.position);
    
    return (<Fragment>
        <div className="flex flex-col text-base flex-start">
          <Loader display={isLoading} text="loading assets"/>
          {!isLoading && <h3 className="mb-4 text-2xl">Your Assets</h3>}
          {!isLoading && <p className="mb-4">Contains list of Assets that can be mapped to Products or Gallery</p>}
          {!isLoading && <AssetAdminDataTable columns={columns} data={sortedList}/>}
        </div>
    </Fragment>);
}; 
export default AssetTableSection;
