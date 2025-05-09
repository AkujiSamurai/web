import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Home } from "../pages/Home/Home";
import { Basket } from "../pages/Basket/Basket";
import { Profile } from "../pages/Profile/Profile";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { Login } from "../pages/Profile/components/Login/Login";
import { Register } from "../pages/Profile/components/Register/Register";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="basket" element={<Basket />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/login" element={<Login />} />
      <Route path="profile/register" element={<Register />} />
      <Route path="product/:id" element={<ProductDetails />} />
    </Route>
  )
);
