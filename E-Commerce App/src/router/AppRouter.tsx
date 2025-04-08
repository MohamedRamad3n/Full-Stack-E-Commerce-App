import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import ProductsPage from "../Pages/Products";
import Product from "../Pages/Product";
import NotFound from "../AppComponents/NotFound";
import LoginPage from "../Pages/LoginPage";
import AppLayout from "../layout/AppLayout";
import CookieServices from "../services/CookieServices";
const AppRouter = () => {
  const token = CookieServices.getCookie("jwt") ;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<LoginPage isAuthenticated = {token} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
