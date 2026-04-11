import { FC, useEffect } from "react";
// ..custom
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import PromotionTableSection from "@/pages/admin/promos/sections/Promos.table.section";

const AssetsAdminPage: FC = () => {
  const { resetDetails } = useAssetStore();

  useEffect(()=>{
    return () => {
      resetDetails();
    }
  },[]);
  
  return (
    <section className="relative py-8 lg:py-24" id="asset-admin-page">
      <div className="container relative z-10">        
        <PromotionTableSection/>
      </div>
    </section>
  );
};

export default AssetsAdminPage;
