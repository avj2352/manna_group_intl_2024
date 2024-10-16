import { FC } from "react";
// ..custom
import PurchaseAdminTable from "@/components/tables/PurchaseAdmin.table";

const PurchaseAdminPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="purchases-admin-page">
      <div className="container relative z-10">
        <div className="flex flex-col text-base flex-start">
          <h3 className="mb-4 text-2xl">Product Purchase History</h3>
          <PurchaseAdminTable/>
        </div>
      </div>
    </section>
  );
};

export default PurchaseAdminPage;
