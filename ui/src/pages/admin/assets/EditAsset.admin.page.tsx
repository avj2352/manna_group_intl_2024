import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
// ..custom
import { useToast } from "@/hooks/use-toast";
import AddEditAssetForm from "@/components/forms/assets/AddEditAsset.form";
import Loader from "@/components/loaders/Loader";
import { IAssetRequestForm, IAssetRequestPayload } from "@/common/interfaces";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const EditAssetAdminPage: FC = () => {
    // ..states
    const params = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { asset_detail_record, asset_update_status, asset_details_status, fetchAssetDetailsByIdAPI, fetchAssetUpdateFormAPI, resetUpdate } = useAssetStore();
    const { token } = useAuthStore();

    const handleFormSubmit = (data: IAssetRequestForm) => {
        console.log('Data to update: ', data);
        fetchAssetUpdateFormAPI({
            id: params.id,
            token,
            payload: data as IAssetRequestPayload
        });
    };

    useEffect(() => {
        if (asset_update_status === "initial" || asset_update_status === "pending") return;
        if (asset_update_status === "rejected") {
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
            resetUpdate();
            navigate("/admin/assets");
        }
    },[asset_update_status]);

    useEffect(()=>{
        const {id} = params;
        if (!Boolean(id)) return;
        fetchAssetDetailsByIdAPI({
            id: params.id,
            token,
        });
    },[params]);

    const isLoading = asset_update_status === "pending" || asset_details_status === "pending";
    
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
                data={asset_detail_record}
                onFormSubmit={handleFormSubmit}/>
        </div>
        </section>
    );
};

export default EditAssetAdminPage;
