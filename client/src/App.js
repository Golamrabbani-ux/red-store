import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import SignupScreen from './screens/SignupScreen'
import LoginScreen from "./screens/LoginScreen";
import ActiveUserScreen from "./screens/ActiveUserScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import ProfileScreen from './screens/ProfileScreen'
import UserInfoScreen from "./screens/UserInfoScreen";
import AddressScreen from "./screens/AddressScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ShippingScreen from "./screens/ShippingScreen";
import WhitelistScreen from "./screens/WhitelistScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import AllOrderListScreen from "./screens/AllOrderListScreen";


function App() {

  return (
    <Router>
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path='cart' element={<CartScreen />}>
            <Route path='/:id' element={<CartScreen />} />
          </Route>
          <Route path='/whitelist' element={<WhitelistScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="verify/:token" element={<ActiveUserScreen />} />
          <Route path="forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="update-password" element={<UpdatePasswordScreen />} />
          <Route path="shipping" element={<ShippingScreen />} />
          {/* Profile // Dashboard */}
          <Route path="profile" element={<ProfileScreen />}>
            <Route path="/" element={<UserInfoScreen />} />
            <Route path="/address" element={<AddressScreen />} />
            <Route path="/my-order" element={<OrderListScreen />} />
            <Route path="/change-password" element={<ChangePasswordScreen />} />
          </Route>

          <Route path="payment" element={<PaymentScreen />} />
          <Route path="place-order" element={<PlaceOrderScreen />} />
          <Route path="order/:id" element={<OrderScreen />} />

          {/* Admin Routes */}
          <Route path="admin/userlist" element={<UserListScreen />} />
          <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="admin/productlist" element={<ProductListScreen />} />
          <Route path="admin/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="admin/orderlist" element={<AllOrderListScreen />} />

        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
