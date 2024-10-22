import { FC } from "react";
import FileTableSection from "@/pages/admin/assets/sections/Files.table.section";

const ManageFilesAdminPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="asset-admin-page">
      <div className="container relative z-10">                
        <FileTableSection/>
      </div>      
    </section>
  );
};

export default ManageFilesAdminPage;
