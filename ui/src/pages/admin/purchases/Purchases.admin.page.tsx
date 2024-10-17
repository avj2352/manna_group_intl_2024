import { FC } from "react";
// ..custom
import { Payment, columns } from "./purchase-data-table-columns";
import { PurchaseDataTable } from "./purchase-data-table";

const PurchaseAdminPage: FC = () => {
  function getData(): Payment[] {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ];
  }

  const data = getData();
  return (
    <section className="relative py-8 lg:py-24" id="purchases-admin-page">
      <div className="container relative z-10">
        <div className="flex flex-col text-base flex-start">
          <h3 className="mb-4 text-2xl">Product Purchase History</h3>
          <PurchaseDataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
};

export default PurchaseAdminPage;
