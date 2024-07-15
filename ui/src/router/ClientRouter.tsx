import { lazy, Suspense, FC } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
export const HomePage = lazy(() => import("@/pages/home/Home.page"));
export const AboutPage = lazy(() => import("@/pages/about/About.page"));
export const CompanyPage = lazy(() => import("@/pages/company/Company.page"));

const ClientRouter: FC = () => {
  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [
        { element: <HomePage />, index: true },
        { element: <AboutPage />, path: "/about/:offset" },
        { element: <CompanyPage />, path: "/company/:offset" },
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
