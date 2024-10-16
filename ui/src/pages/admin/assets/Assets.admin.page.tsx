import { FC } from "react";
import AssetTableSection from "@/pages/admin/assets/sections/Assets.table.section";

const AssetsAdminPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="asset-admin-page">
      <div className="container relative z-10">        
        <AssetTableSection/>
      </div>
    </section>
  );
};

export default AssetsAdminPage;
