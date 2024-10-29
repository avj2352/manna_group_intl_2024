import { FC, Fragment, useCallback, useEffect } from "react";
// ..custom
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchFilesAPI, MANNA_IMAGES_BUCKET } from "@/common/state/features/assets/file.slice";
import AssetTableSection from "@/pages/admin/assets/sections/Assets.table.section";
import AssetPreviewSection from "@/pages/admin/assets/sections/Asset.preview.section";
import { resetDetails } from "@/common/state/features/assets/asset.slice";

const AdminDashboardPage: FC = () => {

  const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const fileState = useAppSelector((state) => state.files);
    const assetState = useAppSelector(state => state.asset);
  
    const fetchFilesListAPIHandler = useCallback(()=>{
      if (!Boolean(authState.token) || authState.token === "") return;
      dispatch(fetchFilesAPI({token:authState.token, bucket:MANNA_IMAGES_BUCKET}));
    },[authState.token]);    
  
    useEffect(()=>{
      if (fileState.files_list.length === 0) fetchFilesListAPIHandler();
    },[fileState.files_list]);

    useEffect(()=>{
      return () => {
        dispatch(resetDetails({}));
      }
    },[]);

  return (
    <section className="relative py-8 mt-12 lg:mt-2 lg:py-24" id="admin-dashboard">
      <div className="container relative z-10">        
        <AssetTableSection/>
        {Boolean(assetState.asset_detail_record) ? <AssetPreviewSection 
          imageSource={assetState.asset_detail_record.url}
          imageDescription={assetState.asset_detail_record.description}/> : <Fragment/>}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
