import { BrowserRouter, Route, Routes } from "react-router";
import CartItems from "./pages/cartItems/CartItems";
import Home from "./pages/home/Home";
import Layout from "./ui/components/layout/Layout";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="cart-items" element={<CartItems />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
