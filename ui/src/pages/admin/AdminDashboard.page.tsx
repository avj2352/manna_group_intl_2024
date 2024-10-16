import { FC } from "react";
import AssetTableSection from "./assets/sections/Assets.table.section";

const AdminDashboardPage: FC = () => {  

  return (
    <section className="relative py-8 mt-12 lg:mt-2 lg:py-24" id="admin-dashboard">
      <div className="container relative z-10">
        <AssetTableSection/>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
