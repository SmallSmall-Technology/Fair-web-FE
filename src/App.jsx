import Home from "./Pages/home/Home";
import Layout from "./ui/components/layout/Layout";
import CartItems from "./pages/cartItems/CartItems";
import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import CategoryPage from "./Pages/productCategories/CategoryPage";
import SignUp from "./pages/signUp/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="cart-items" element={<CartItems />} />
          <Route path="category/:categoryName" element={<CategoryPage />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
