import { createBrowserRouter } from "react-router-dom";
import Main from "../../../layout/Main/Main";
import AddCar from "../../../pages/AddCar/AddCar";
import Category from "../../../pages/Category/Category";
import Home from "../../../pages/Home/Home/Home";
import Login from "../../../pages/Login/Login";
import Register from "../../../pages/Login/Register";
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
            {
                path: '/addCar',
                element: <AddCar></AddCar>
            }
        ]
    }
])

export default router;