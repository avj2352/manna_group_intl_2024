import { lazy, Suspense, FC } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
// ..layouts
import AdminLayout from "@/layouts/AdminLayout";
import CommonLayout from "@/layouts/CommonLayout";

// ..pages
export const HomePage = lazy(() => import("@/pages/home/Home.page"));
export const AboutPage = lazy(() => import("@/pages/about/About.page"));
export const CompanyPage = lazy(() => import("@/pages/company/Company.page"));
export const ProductPage = lazy(() => import("@/pages/products/Products.page"));
export const ContactPage = lazy(() => import("@/pages/contact/Contact.page"));
export const NotFoundPage = lazy(() => import("@/pages/400/NotFound.page"));
export const ShoppingCartPage = lazy(() => import("@/pages/checkout/ShoppingCart.page"));
export const AddressShippingPage = lazy(() => import("@/pages/checkout/AddressShipping.page"));
export const OrderSuccessPage = lazy(() => import("@/pages/checkout/OrderSuccess.page"));
export const OrderFailurePage = lazy(() => import("@/pages/checkout/OrderFailure.page"));
export const UserProfilePage = lazy(() => import("@/pages/profile/UserProfile.page"));
export const CareersPage = lazy(() => import("@/pages/careers/Careers.page"));

// ..admin
export const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboard.page")
);
export const AssetAdminPage = lazy(() => import("@/pages/admin/assets/Assets.admin.page"));
export const AddAssetAdminPage = lazy(() => import("@/pages/admin/assets/AddAsset.admin.page"));
export const EditAssetAdminPage = lazy(() => import("@/pages/admin/assets/EditAsset.admin.page"));
export const ManageFilesAdminPage = lazy(() => import("@/pages/admin/assets/ManageFiles.page"));
export const ProductAdminPage = lazy(() => import("@/pages/admin/products/Products.admin.page"));
export const AddProductAdminPage = lazy(() => import("@/pages/admin/products/AddProduct.admin.page"));
export const PromoAdminPage = lazy(() => import("@/pages/admin/promos/Promos.admin.page"));
export const PurchaseAdminPage = lazy(() => import("@/pages/admin/purchases/Purchases.admin.page"));



const ClientRouter: FC = () => {
  const routes = useRoutes([
    {
      element: (
        <CommonLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </CommonLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { element: <AboutPage />, path: "/about" },
{ element: <AboutPage />, path: "/about/:id" },
        { element: <CompanyPage />, path: "/company/:id" },
        { element: <ProductPage />, path: "/products/:id" },
        { element: <ContactPage />, path: "/contact/:id" },
        { element: <ShoppingCartPage/>, path: "/my-cart" },
        { element: <AddressShippingPage/>, path: '/shipping-address'},
        { element: <OrderSuccessPage/>, path: '/order-success'},
        { element: <OrderFailurePage/>, path: '/order-failure'},
        { element: <UserProfilePage/>, path: '/my-profile'},
        { element: <CareersPage />, path: "/career" },
{ element: <CareersPage />, path: "/careers" },
      ],
    },
    {
      element: (
        <AdminLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AdminLayout>      
      ), 
      path: "/admin",
      children: [
        { element: <AdminDashboardPage />, index: true },
        { element: <AssetAdminPage />, path: "/admin/assets" },
        { element: <AddAssetAdminPage/>, path: "/admin/assets/add"},
        { element: <EditAssetAdminPage/>, path: "/admin/assets/edit/:id"},
        { element: <ManageFilesAdminPage />, path: "/admin/manage-files" },
        { element: <ProductAdminPage />, path: "/admin/products"},
        { element: <AddProductAdminPage />, path: "/admin/products/add"},
        { element: <PromoAdminPage />, path: "/admin/promos"},
        { element: <PurchaseAdminPage />, path: "/admin/purchases"},
      ],
    },
    {
      path: "/404",
      element: <NotFoundPage />,    
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default ClientRouter;
