import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../pages/home/Home";
import WhishList from "../pages/whishList/WhishList";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import PrivateRoute from "./PrivateRoter";
import Profile from "../pages/Profile/Profile";
import About from "../pages/about/About";


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
                path: "/about",
                 element: <About/>
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
