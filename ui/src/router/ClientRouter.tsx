import { lazy, Suspense, FC } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
// ..layouts
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import CommonLayout from "@/layouts/CommonLayout";
// ..pages
export const HomePage = lazy(() => import("@/pages/home/Home.page"));
export const AboutPage = lazy(() => import("@/pages/about/About.page"));
export const CompanyPage = lazy(() => import("@/pages/company/Company.page"));
export const ProductPage = lazy(() => import("@/pages/products/Products.page"));
export const ContactPage = lazy(() => import("@/pages/contact/Contact.page"));
export const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboard.page")
);

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
      children: [{ element: <AdminDashboardPage />, index: true }],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default ClientRouter;
