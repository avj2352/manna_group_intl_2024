import { FC, Fragment, useEffect } from "react";
import AssetTableSection from "@/pages/admin/assets/sections/Assets.table.section";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import AssetPreviewSection from "./sections/Asset.preview.section";
import { resetDetails } from "@/common/state/features/assets/asset.slice";

const AssetsAdminPage: FC = () => {
  const assetState = useAppSelector(state => state.asset);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    console.log('Selected Asset detail: ', assetState.asset_detail_record);
  },[assetState.asset_detail_record]);

  useEffect(()=>{
    return () => {
      dispatch(resetDetails({}));
    }
  },[]);
  
  return (
    <section className="relative py-8 lg:py-24" id="asset-admin-page">
      <div className="container relative z-10">        
        <AssetTableSection/>
        {Boolean(assetState.asset_detail_record) ? <AssetPreviewSection 
          imageSource={assetState.asset_detail_record.url}
          imageDescription={assetState.asset_detail_record.description}/> : <Fragment/>}
      </div>
    </section>
  );
};

export default AssetsAdminPage;
