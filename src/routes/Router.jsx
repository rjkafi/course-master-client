import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  //   Auth Route
  {
    path: "signIn",
    element: <SignIn />,
  },
  //   AdminRoute
  {
    path: "/dashboard",
    element: <AdminLayout />,
    // ToDo: seterror
    // errorElement: <>error</>,
    children: [
      //   {
      //     path: "/dashboard/profile",
      //     element: <Profile></Profile>,
      //   },
      //   // Admin Routes
      //   {
      //     path: "/dashboard/admin_dashboard",
      //     element: <AdminDashboard></AdminDashboard>,
      //   },
    ],
  },
]);
export default router;
