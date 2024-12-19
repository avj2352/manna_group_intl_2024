import { FC, Fragment, useEffect } from "react";
// ..custom
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { resetDetails } from "@/common/state/features/assets/asset.slice";
import PromotionTableSection from "@/pages/admin/promos/sections/Promos.table.section";

const AssetsAdminPage: FC = () => {
  const promoState = useAppSelector(state => state.promos);
  const dispatch = useAppDispatch();  

  useEffect(()=>{
    return () => {
      dispatch(resetDetails({}));
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
