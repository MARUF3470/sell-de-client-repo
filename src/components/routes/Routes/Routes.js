import { createBrowserRouter } from "react-router-dom";
import Main from "../../../layout/Main/Main";
import AddCar from "../../../pages/AddCar/AddCar";
import Category from "../../../pages/Category/Category";
import Home from "../../../pages/Home/Home/Home";
import Login from "../../../pages/Login/Login";
import Register from "../../../pages/Login/Register";
import ErrorPage from "../../../pages/shared/ErrorPage/ErrorPage";

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
                element: <Category></Category>
            },
            {
                path: '/addCar',
                element: <AddCar></AddCar>
            }
        ]
    }
])

export default router;