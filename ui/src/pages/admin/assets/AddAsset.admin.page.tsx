import { FC, Fragment } from "react";
// ..custom
import AddEditAssetForm from "@/components/forms/assets/AddEditAsset.form";

const AddAssetAdminPage: FC = () => {
    return (<section className="relative py-8 lg:py-24" id="asset-admin-page">
        <div className="container relative z-10">        
            <h3 className="mb-4 text-2xl">Add a new Asset</h3>
            <p className="mb-4">Fill the form below to create a new asset record</p>
            <AddEditAssetForm
                data={undefined} 
                onFormSubmit={(data) => console.log("New Form data to be added: ", data)}
            />
        </div>
        </section>);
};

export default AddAssetAdminPage;