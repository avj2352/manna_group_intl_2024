import { FC, Fragment, useCallback, useEffect } from "react";
import { fetchPromoListAPI, resetDelete } from "@/common/state/features/promotions/promo.slice";
import { PromoAdminDataTable } from "@/components/tables/promos/PromoAdmin.table";
import { columns } from "@/components/tables/promos/manage-promo-table-column";
import { useToast } from "@/hooks/use-toast";
// ..custom
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import Loader from "@/components/loaders/Loader";


const PromotionTableSection: FC = () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const promoState = useAppSelector((state) => state.promos);
  
    const fetchPromoListAPIHandler = useCallback(()=>{    
        if (!Boolean(authState.token) && authState.token === "") return; 
        dispatch(fetchPromoListAPI({token: authState.token}));
    },[authState.token]);
  
    useEffect(()=>{
      fetchPromoListAPIHandler();
    },[]);    

    useEffect(()=>{
      if (promoState.promo_delete_status === "fulfilled") {
        toast({
          variant: "default",
          title: "Success",
          description: `Asset record has been deleted!`,
        });
        dispatch(resetDelete({}));
        fetchPromoListAPIHandler();         
      }
      if (promoState.promo_delete_status === "rejected") {
        toast({
          variant: "danger",
          title: "Error",
          description: `Error deleting asset record!`,
        });
        dispatch(resetDelete({}));
      }
    },[promoState.promo_delete_status]);
  
    const isLoading = promoState.promo_list_status === "initial" ||
                      promoState.promo_list_status === "pending" ||
                      promoState.promo_delete_status === "pending";
  
    if (promoState.promo_list.length > 0) {
        return (<Fragment>
            <div className="flex flex-col text-base flex-start">
              <Loader display={isLoading} text="loading assets"/>
              {!isLoading && <h3 className="mb-4 text-2xl">List of Promotions</h3>}
              {!isLoading && <p className="mb-4">Create a Promotion / offer and announce it to customers. Below is a table list of promotions available</p>}
              {!isLoading && <PromoAdminDataTable columns={columns} data={promoState.promo_list}/>}
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
