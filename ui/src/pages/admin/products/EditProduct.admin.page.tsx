import { FC, useEffect } from "react";
// ..custom
import { useToast } from "@/hooks/use-toast";
import AddEditProductForm from "@/components/forms/products/AddEditProduct.form";
import Loader from "@/components/loaders/Loader";
import { IProductRequestPayload, IProductRequestForm } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchProductPostFormAPI, resetPost } from "@/common/state/features/products/product.slice";
import { useNavigate } from "react-router-dom";

const EditProductAdminPage: FC = () => {
    // ..states
    const { toast } = useToast();
    const navigate = useNavigate();
    const productState = useAppSelector(state => state.products);
    const authState = useAppSelector(state => state.auth);
    
    // ..actions
    const dispatch = useAppDispatch();
    
    const handleFormSubmit = (data: IProductRequestForm) => {
        dispatch(fetchProductPostFormAPI({
            token: authState.token, 
            payload: data as IProductRequestPayload 
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
            <AddEditProductForm />                
        </div>
        </section>
    );
};

export default EditProductAdminPage;
