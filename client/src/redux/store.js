import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    createReviewReducer,
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer
} from './reducers/productsReducer';
import {
    cartReducer,
    whitelistReducer
} from './reducers/cartReducer';
import {
    activeUserReducer,
    facebookLoginReducer,
    googleLoginReducer,
    userDeleteReducer,
    userDetailsReducer,
    userForgotPasswordReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateAdminReducer,
    userUpdatePasswordReducer,
    userUpdateReducer
} from './reducers/userReducer';
import {
    myOrderListReducer,
    orderCreateReducer,
    orderDeleverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPayReducer
} from './reducers/orderReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    whitelist: whitelistReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    activeUser: activeUserReducer,
    googleLogin: googleLoginReducer,
    facebookLogin: facebookLoginReducer,
    userForgotPassword: userForgotPasswordReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList:orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateAdmin:userUpdateAdminReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderDelever:orderDeleverReducer,
    createReview:createReviewReducer
});

const cartItemsFromStorages = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorages = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorages = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null;
const whitelistProductFromStorages = localStorage.getItem('whitelist') ? JSON.parse(localStorage.getItem('whitelist')) : [];
const paymentMethodFromStorages = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '';

const initialState = {
    cart: {
        cartItems: cartItemsFromStorages,
        shippingAddress: shippingAddressFromStorages,
        paymentMethod: paymentMethodFromStorages
    },
    userLogin: { userInfo: userInfoFromStorages },
    whitelist: { whitelistProduct: whitelistProductFromStorages }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;