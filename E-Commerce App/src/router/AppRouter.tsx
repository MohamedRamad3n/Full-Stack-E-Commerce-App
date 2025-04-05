import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import ProductsPage from "../Pages/Products";
import Product from "../Pages/Product";
import NavBar from "../AppComponents/NavBar";
const AppRouter = () => {
    return (
        <Router>
             <NavBar /> 
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default AppRouter