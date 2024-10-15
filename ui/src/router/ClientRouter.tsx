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
// ..admin
export const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboard.page")
);
export const AssetAdminPage = lazy(() => import("@/pages/admin/assets/Assets.admin.page"));
export const ProductAdminPage = lazy(() => import("@/pages/admin/products/Products.admin.page"));
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
        { element: <AboutPage />, path: "/about/:id" },
        { element: <CompanyPage />, path: "/company/:id" },
        { element: <ProductPage />, path: "/products/:id" },
        { element: <ContactPage />, path: "/contact/:id" },
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
        { element: <ProductAdminPage />, path: "/admin/products"},
        { element: <PromoAdminPage />, path: "/admin/promos"},
        { element: <PurchaseAdminPage />, path: "/admin/purchases"},
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default ClientRouter;
