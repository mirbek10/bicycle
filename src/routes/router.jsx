import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../pages/home/Home";
import WhishList from "../pages/whishList/WhishList";
import Cart from "../pages/Cart/Cart";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import PrivateRoute from "./PrivateRoter";
import Profile from "../pages/Profile/Profile";
import About from "../pages/about/About";
import Catalog from "../pages/catalog/Catalog";
import ForgotPassword from "../pages/forgetPassword/ForgotPassword";
import EmailSent from "../pages/emailSend/EmailSent";
import ResetPassword from "../pages/ressetPassword/RessetPassword";
import EmailVerified from "../pages/register/verifyemailmessage/EmailVerified";
import VerifyEmailMessage from "../pages/register/verifyemailmessage/МerifyEmail";
import ProductList from "../pages/productList/ProductList";
import ProductDetail from "../pages/productDetail/ProductDetail";
import Contact from "../pages/contact/Contact";
import Workshop from "../pages/workshop/Workshop";
import Agreement from "../pages/agreement/Agreement";
import DetailBike from "../pages/BikeDetails/BikeDetails";
import ReviewPage from "../pages/review/ReviewPage";



import Chat from "../pages/Chat/Chat";
import Grant from "../pages/grant/Grant";
import Delivery from "../pages/delivery/Delivery";
import BikeFilm from "../pages/FilmBike/FilmBike";



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
                path: "/ProductList",
                 element: <ProductList/>
            },
            {
                path: "/product/:id",
                 element: < ProductDetail/>
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
             },
             {
                path: "/about",
                element:<About/>
             },
             {
                path: "/contact",
                element:<Contact/>
             },
             {
                path: "/workshop",
                element:<Workshop/>
             },
             {
                path: "/userAgreement",
                element:<Agreement/>
             },
            {
                path: "/product-details",
                 element: <DetailBike/>
             },
             {
                path: "/chat",
                 element: <Chat/>
             },
             {
                path: "/guarantees",
                 element: <Grant/>
             },
             {
                path:"/deliveryAndPayment",
                element:<Delivery/>
             },
             {

                path:"/bikeFilm",
                element:<BikeFilm/>
             },
             {
                path: "/review",
                 element: <ReviewPage/>
            },


        ]
    }
])
