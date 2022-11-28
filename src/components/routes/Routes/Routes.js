import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../../layout/dashboardLayout/DashBoardLayout";
import Main from "../../../layout/Main/Main";
import AddCar from "../../../pages/AddCar/AddCar";
import AllBuyers from "../../../pages/AllBuyers/AllBuyers";
import AllSellers from "../../../pages/AllSellers/AllSellers";
import AllUsers from "../../../pages/AllUsers/AllUsers";
import Blog from "../../../pages/Blog/Blog";
import Category from "../../../pages/Category/Category";
import MyOrders from "../../../pages/dashboard/MyOrders/MyOrders";
import Home from "../../../pages/Home/Home/Home";
import Login from "../../../pages/Login/Login";
import Register from "../../../pages/Login/Register";
import MyCars from "../../../pages/MyCars/MyCars";
import ErrorPage from "../../../pages/shared/ErrorPage/ErrorPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`),
                element: <PrivateRoute><Category></Category></PrivateRoute>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addCar',
                element: <AddCar></AddCar>
            },
            {
                path: '/dashboard/myCars',
                element: <MyCars></MyCars>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
        ]
    }
])

export default router;