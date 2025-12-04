import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import CreateCourse from "../pages/CreateCourse/CreateCourse";
import Home from "../pages/Home/Home";
import ManageCourses from "../pages/ManageCourses/ManageCourses";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

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
  {
    path: "/signup",
    element: <SignUp />,
  },
  // PUT this ROute into Admin Panel
  {
    path: "/create-course",
    element: <CreateCourse />,
  },
  {
    path: "/manage-course",
    element: <ManageCourses />,
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
