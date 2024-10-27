import { FC, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ..custom
import { useToast } from "@/hooks/use-toast";
import AddEditAssetForm from "@/components/forms/assets/AddEditAsset.form";
import Loader from "@/components/loaders/Loader";
import { IAssetRecord, IAssetRequestForm, IAssetRequestPayload } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchAssetDetailsByIdAPI, fetchAssetUpdateFormAPI, resetUpdate } from "@/common/state/features/assets/asset.slice";
import { useNavigate } from "react-router-dom";

const EditAssetAdminPage: FC = () => {
    // ..states
    const params = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const assetState = useAppSelector(state => state.asset);
    const authState = useAppSelector(state => state.auth);
    
    // ..actions
    const dispatch = useAppDispatch();
    
    const handleFormSubmit = (data: IAssetRequestForm) => {
        console.log('Data to update: ', data);
        dispatch(fetchAssetUpdateFormAPI({
            id: params.id,
            token: authState.token, 
            payload: data as IAssetRequestPayload 
        }));
    };
    
    useEffect(() => {
        if (assetState.asset_update_status === "initial" || assetState.asset_update_status === "pending") return;
        if (assetState.asset_update_status === "rejected") {
            toast({
                variant: "default",
                title: "Error",
                description: `Error updating Asset record!`,
            });  
        } else {
            toast({
                variant: "success",
                title: "Success",
                description: `Asset record updated!`,
            }); 
            dispatch(resetUpdate({}));
            navigate("/admin/assets")           
        }
    },[assetState.asset_update_status]);

    useEffect(()=>{
        const {id} = params;
        if (!Boolean(id)) return;
        dispatch(fetchAssetDetailsByIdAPI({
            id: params.id,
            token: authState.token, 
        }));
    },[params]);
    
    const isLoading = assetState.asset_update_status === "pending" || assetState.asset_details_status === "pending";
    
    return (
        <section className="relative py-8 lg:py-24" id="asset-admin-page">
        <div className="container relative z-10">
            <h3 className="mb-4 text-2xl">Update Asset</h3>
            <Loader display={isLoading} text="submitting form" />
            {!isLoading && (
            <p className="mb-4">
                Fill the form below to update asset record
            </p>
            )}
            <AddEditAssetForm
                formType="edit"
                data={assetState.asset_detail_record}
                onFormSubmit={handleFormSubmit}/>
        </div>
        </section>
    );
};

export default EditAssetAdminPage;
