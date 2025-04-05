import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../pages/home/Home";
import WhishList from "../pages/whishList/WhishList";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import PrivateRoute from "./PrivateRoter";
import Profile from "../pages/Profile/Profile";


export const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { 
                path: "/", 
                element: <Home/> 
            },
            {
                 path: "/whishList",
                  element: <WhishList/>
             },
             {
                path: "/register",
                 element: <Register/>
            },
            {
                path: "/signIn",
                 element: <SignIn/>
            },
            {
                path: "/profile",
                element: (
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                ),
            },            
        ]
    }
])
