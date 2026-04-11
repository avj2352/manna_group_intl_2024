import { FC, Fragment, useEffect } from "react";
import AssetTableSection from "@/pages/admin/assets/sections/Assets.table.section";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import AssetPreviewSection from "./sections/Asset.preview.section";

const AssetsAdminPage: FC = () => {
  const { asset_detail_record, resetDetails } = useAssetStore();

  useEffect(()=>{
    return () => {
      resetDetails();
    }
  },[]);

  return (
    <section className="relative py-8 lg:py-24" id="asset-admin-page">
      <div className="container relative z-10">
        <AssetTableSection/>
        {Boolean(asset_detail_record) ? <AssetPreviewSection
          imageSource={asset_detail_record.url}
          imageDescription={asset_detail_record.description}/> : <Fragment/>}
      </div>
    </section>
  );
};

export default AssetsAdminPage;
