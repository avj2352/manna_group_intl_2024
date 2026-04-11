import { FC, Fragment, useCallback, useEffect } from "react";
import { usePromoStore } from "@/common/state/features/promotions/promo.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { PromoAdminDataTable } from "@/components/tables/promos/PromoAdmin.table";
import { columns } from "@/components/tables/promos/manage-promo-table-column";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loaders/Loader";


const PromotionTableSection: FC = () => {
    const { toast } = useToast();
    const { token } = useAuthStore();
    const { promo_list, promo_list_status, promo_delete_status, fetchPromoListAPI, resetDelete } = usePromoStore();

    const fetchPromoListAPIHandler = useCallback(()=>{
        if (!Boolean(token) && token === "") return;
        fetchPromoListAPI({token});
    },[token]);

    useEffect(()=>{
      fetchPromoListAPIHandler();
    },[]);

    useEffect(()=>{
      if (promo_delete_status === "fulfilled") {
        toast({
          variant: "default",
          title: "Success",
          description: `Asset record has been deleted!`,
        });
        resetDelete();
        fetchPromoListAPIHandler();
      }
      if (promo_delete_status === "rejected") {
        toast({
          variant: "danger",
          title: "Error",
          description: `Error deleting asset record!`,
        });
        resetDelete();
      }
    },[promo_delete_status]);

    const isLoading = promo_list_status === "initial" ||
                      promo_list_status === "pending" ||
                      promo_delete_status === "pending";

    if (promo_list.length > 0) {
        return (<Fragment>
            <div className="flex flex-col text-base flex-start">
              <Loader display={isLoading} text="loading assets"/>
              {!isLoading && <h3 className="mb-4 text-2xl">List of Promotions</h3>}
              {!isLoading && <p className="mb-4">Create a Promotion / offer and announce it to customers. Below is a table list of promotions available</p>}
              {!isLoading && <PromoAdminDataTable columns={columns} data={promo_list}/>}
            </div>
        </Fragment>);
    } else {
        return (<Fragment>
            <div className="flex flex-col text-base flex-start">
              <Loader display={isLoading} text="loading promotions"/>
              {!isLoading && <h3 className="mb-4 text-2xl">List of Promotions</h3>}
              {!isLoading && <p className="mb-4">No promotions available</p>}
            </div>
        </Fragment>);
    }
    
    
}; 
export default PromotionTableSection;
