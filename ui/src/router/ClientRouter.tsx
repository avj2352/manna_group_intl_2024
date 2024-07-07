import { lazy, Suspense, FC } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
export const HomePage = lazy(() => import("@/pages/home/Home.page"));

const ClientRouter: FC = () => {
  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [{ element: <HomePage />, index: true }],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default ClientRouter;
