import { FC, Fragment, useEffect, useState } from "react";
// ..custom
import { useToast } from "@/hooks/use-toast";
import AddEditAssetForm from "@/components/forms/assets/AddEditAsset.form";
import Loader from "@/components/loaders/Loader";
import { IAssetRequestForm, IAssetRequestPayload } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchAssetPostFormAPI, resetPost } from "@/common/state/features/assets/asset.slice";
import { useNavigate } from "react-router-dom";

const AddAssetAdminPage: FC = () => {
    // ..states
    const { toast } = useToast();
    const navigate = useNavigate();
    const assetState = useAppSelector(state => state.asset);
    const authState = useAppSelector(state => state.auth);
    
    // ..actions
    const dispatch = useAppDispatch();
    
    const handleFormSubmit = (data: IAssetRequestForm) => {
        dispatch(fetchAssetPostFormAPI({
            token: authState.token, 
            payload: data as IAssetRequestPayload 
        }));
    };
    
    useEffect(() => {
        if (assetState.asset_post_status === "initial" || assetState.asset_post_status === "pending") return;
        if (assetState.asset_post_status === "rejected") {
            toast({
                variant: "default",
                title: "Error",
                description: `Error creating Asset record!`,
            });  
        } else {
            toast({
                variant: "success",
                title: "Success",
                description: `New Asset record created!`,
            }); 
            dispatch(resetPost({}));
            navigate("/admin/assets");
        }
    },[assetState.asset_post_status]);
    
    const isLoading = assetState.asset_post_status === "pending";
    
    return (
        <section className="relative py-8 lg:py-24" id="asset-admin-page">
        <div className="container relative z-10">
            <h3 className="mb-4 text-2xl">Add a new Asset</h3>
            <Loader display={isLoading} text="submitting form" />
            {!isLoading && (
            <p className="mb-4">
                Fill the form below to create a new asset record
            </p>
            )}
            <AddEditAssetForm
                formType="add"
                data={undefined}
                onFormSubmit={handleFormSubmit}/>
        </div>
        </section>
    );
};

export default AddAssetAdminPage;
