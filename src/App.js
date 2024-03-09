import Nav from "./components/nav/Nav";
import './App.css';
import Home from "./pages/home/home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CustomUserInfoProvider from "./userInfoContext";
import CartModal from "./pages/cartModal/CartModal";
import Orders from "./pages/orders/Orders";


function App() {

  const browserRouter=createBrowserRouter([
    {path:'/',
    element:<Nav/>,
    children:[
      {index:true,element:<Home/>},
      {path:'/sign-in',element:<SignIn/>},
      {path:'/sign-up',element:<SignUp/>},
      {path:'/cart', element:<CartModal/>},
      {path:'/orders',element:<Orders/>}
    ]}
  ])
  
  return (
    <>
    <CustomUserInfoProvider>
    <RouterProvider router={browserRouter} />
    </CustomUserInfoProvider>

    </>
  
  )
}

export default App;
