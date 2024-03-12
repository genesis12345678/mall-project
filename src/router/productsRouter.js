import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={"bg-red-600"}>Loading....</div>;
const PrdouctList = lazy(() => import("../pages/products/ListPage"));
const PrdouctAdd = lazy(() => import("../pages/products/AddPage"));
const PrdouctRead = lazy(() => import("../pages/products/ReadPage"));

const productsRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <PrdouctList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <PrdouctAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={Loading}>
          <PrdouctRead />
        </Suspense>
      ),
    },
  ];
};

export default productsRouter;
