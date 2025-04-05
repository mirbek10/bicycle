import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../pages/home/Home";
import WhishList from "../pages/whishList/WhishList";
import Cart from "../pages/Cart/Cart";

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
            

            
        ]
    }
])
