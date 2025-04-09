import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../pages/home/Home";
import WhishList from "../pages/whishList/WhishList";
import Cart from "../pages/Cart/Cart";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import PrivateRoute from "./PrivateRoter";
import Profile from "../pages/Profile/Profile";
import Catalog from "../pages/catalog/Catalog";
import ForgotPassword from "../pages/forgetPassword/ForgotPassword";
import EmailSent from "../pages/emailSend/EmailSent";
import ResetPassword from "../pages/ressetPassword/RessetPassword";
import EmailVerified from "../pages/register/verifyemailmessage/EmailVerified";
import VerifyEmailMessage from "../pages/register/verifyemailmessage/МerifyEmail";

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
                 path: "/cart",
                  element: <Cart/>
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
            {
                path: "/catalog",
                 element: <Catalog/>
            },            
            {
                 path: "/forgot-password",
                  element: <ForgotPassword />
             },
             {
                path: "/email-sent",
                 element: <EmailSent />
             },
             {
                path: "/reset-password",
                 element: <ResetPassword />
             },    
             {
                path: "/verify-email-message",
                element:<VerifyEmailMessage/>
             },
             {
                path: "/resend-verification",
                element:<EmailVerified/>
             }

        ]
    }
])
