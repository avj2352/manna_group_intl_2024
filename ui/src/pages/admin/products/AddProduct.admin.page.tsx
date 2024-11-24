import { FC, useEffect } from "react";
// ..custom
import { useToast } from "@/hooks/use-toast";
import AddEditProductForm from "@/components/forms/products/AddEditProduct.form";
import Loader from "@/components/loaders/Loader";
import { IProductRequestPayload, IProductRequestForm, IAssetRecord } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchProductPostFormAPI, resetPost } from "@/common/state/features/products/product.slice";
import { useNavigate } from "react-router-dom";

const AddProductAdminPage: FC = () => {
    // ..states
    const { toast } = useToast();
    const navigate = useNavigate();
    const productState = useAppSelector(state => state.products);
    const authState = useAppSelector(state => state.auth);
    
    // ..actions
    const dispatch = useAppDispatch();
    
    const handleFormSubmit = (data: any) => {
        console.log('Add Product form details: ', data);
        const record:IProductRequestForm = {
            'name': data?.product_name ?? '', 
            'description': data?.product_description ?? '', 
            'content': data?.product_content ?? '', 
            'assets': data?.asset_key?.map((item: IAssetRecord) => item.asset_id), 
            'currency': data?.product_currency ?? 'usd', 
            'price': data?.product_price ?? 0, 
            'quantity': data?.product_quantity ?? 0
        };
        dispatch(fetchProductPostFormAPI({
            token: authState.token, 
            payload: record
        }));
    };
    
    useEffect(() => {
        if (productState.product_post_status === "initial" || productState.product_post_status === "pending") return;
        if (productState.product_post_status === "rejected") {
            toast({
                variant: "default",
                title: "Error",
                description: `Error creating Product record!`,
            });  
        } else {
            toast({
                variant: "success",
                title: "Success",
                description: `New Product created!`,
            }); 
            dispatch(resetPost({}));
            navigate("/admin/assets");
        }
    },[productState.product_post_status]);
    
    const isLoading = productState.product_post_status === "pending";
    
    return (
        <section className="relative py-8 lg:py-24" id="add-product-admin-page">
        <div className="container relative z-10">
            <h3 className="mb-4 text-2xl">Add a new Product</h3>
            <Loader display={isLoading} text="submitting form" />
            {!isLoading && (
            <p className="mb-4">
                Fill the form below to create a new product record
            </p>
            )}
            <AddEditProductForm onSubmitForm={(data: unknown) => handleFormSubmit(data)}/>                
        </div>
        </section>
    );
};

export default AddProductAdminPage;
