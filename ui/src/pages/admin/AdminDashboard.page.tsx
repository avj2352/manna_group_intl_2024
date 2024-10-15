import { FC } from "react";
// ..custom
import Loader from "@/components/loaders/Loader";

const AdminDashboardPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="admin-dashboard">
      <div className="container relative z-10">        
          <Loader display={true}/>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
