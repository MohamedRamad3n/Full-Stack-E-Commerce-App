import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import ProductsPage from "../Pages/Products";
import Product from "../Pages/Product";
import NavBar from "../layout/NavBar";
import NotFound from "../AppComponents/NotFound";
import LoginPage from "../Pages/LoginPage";
const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
