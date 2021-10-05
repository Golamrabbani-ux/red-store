import axios from 'axios';
import { backendApi } from '../../api';
import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM, USER_SHIPPING_ADDRESS, WHITELIST_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`${backendApi}/api/products/${id}`);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data?._id,
                name: data?.name,
                price: data?.price,
                image: data?.image,
                countInStock: data?.countInStock,
                brand: data?.brand,
                category: data?.category,
                qty: qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState()?.cart?.cartItems))
    }
}

export const removeFromCart = (id) => {
    return async (dispatch, getState) => {
        const { cartItems } = getState().cart;
        const newCartItems = cartItems?.filter(item => item?.product !== id);
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: newCartItems
        })
        localStorage.setItem('cartItems', JSON.stringify(getState()?.cart?.cartItems))
    }
}

export const shippingAddressSave = (address) => {
    return async (dispatch, getState) => {
        dispatch({
            type: USER_SHIPPING_ADDRESS,
            payload: address
        })
        localStorage.setItem('shippingAddress', JSON.stringify(getState()?.cart?.shippingAddress));
    }
}

export const cartPaymentMethod = (payment) => {
    return async (dispatch) => {
        dispatch({
            type: CART_PAYMENT_METHOD,
            payload: payment
        })
        localStorage.setItem('paymentMethod', JSON.stringify(payment))
    }
}

export const whitelistToCart = (product) => {
    return async (dispatch, getState) => {
        dispatch({
            type: WHITELIST_ADD_ITEM,
            payload: {
                _id: product?._id,
                name: product?.name,
                price: product?.price,
                image: product?.image,
                countInStock: product?.countInStock,
                brand: product?.brand,
                category: product?.category,
            }
        })
        localStorage.setItem('whitelist', JSON.stringify(getState()?.whitelist?.whitelistProduct))
    }
}

