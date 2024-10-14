import { FC } from "react";

const AdminDashboardPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="home">    
      <div className="container relative z-10">
        <div className="grid gap-2 mt-16 lg:grid-cols-2 xl:gap-36">
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
                Admin Dashboard
            </div>            
          </div>
        </div>        
      </div>
    </section>
  );
};

export default AdminDashboardPage;
