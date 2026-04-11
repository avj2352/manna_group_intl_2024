import { FC, Fragment, useCallback, useEffect } from "react";
// ..custom
import { useFileStore, MANNA_IMAGES_BUCKET } from "@/common/state/features/assets/file.slice";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import AssetTableSection from "@/pages/admin/assets/sections/Assets.table.section";
import AssetPreviewSection from "@/pages/admin/assets/sections/Asset.preview.section";

const AdminDashboardPage: FC = () => {

    const { token } = useAuthStore();
    const { files_list, fetchFilesAPI } = useFileStore();
    const { asset_detail_record, resetDetails } = useAssetStore();

    const fetchFilesListAPIHandler = useCallback(()=>{
      if (!Boolean(token) || token === "") return;
      fetchFilesAPI({token, bucket:MANNA_IMAGES_BUCKET});
    },[token]);

    useEffect(()=>{
      if (files_list.length === 0) fetchFilesListAPIHandler();
    },[files_list]);

    useEffect(()=>{
      return () => {
        resetDetails();
      }
    },[]);

  return (
    <section className="relative py-8 mt-12 lg:mt-2 lg:py-24" id="admin-dashboard">
      <div className="container relative z-10">        
        <AssetTableSection/>
        {Boolean(asset_detail_record) ? <AssetPreviewSection
          imageSource={asset_detail_record.url}
          imageDescription={asset_detail_record.description}/> : <Fragment/>}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
