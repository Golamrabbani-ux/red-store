import axios from 'axios';
import { toast } from 'react-hot-toast';
import { backendApi } from '../../api';
import { CART_RESET, RESET_PAYMENT_METHOD } from '../constants/cartConstants';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    ORDER_DELEVER_REQUEST,
    ORDER_DELEVER_FAIL,
    ORDER_DELEVER_RESET
} from "../constants/orderConstants"

export const orderCreate = (order, navigate) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: ORDER_CREATE_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.post(`${backendApi}/api/create-order`, order, config);
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })
            dispatch({ type: CART_RESET });
            dispatch({ type: RESET_PAYMENT_METHOD });
            localStorage.removeItem("cartItems");
            localStorage.removeItem("paymentMethod");
            navigate(`/order/${data._id}`)

        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const getOrderById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST })

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.get(`${backendApi}/api/orders/${id}`, config);
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error?.response ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response ? error?.response?.data?.message : error?.message)
        }
    }
}

export const orderPay = (orderId, paymentResult) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_PAY_REQUEST })

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.put(`${backendApi}/api/orders/${orderId}/pay`, paymentResult, config);
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: error?.response ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response ? error?.response?.data?.message : error?.message)
        }
    }
}

export const myOrderList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MY_ORDER_LIST_REQUEST })

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.get(`${backendApi}/api/orders/my-order`, config);
            dispatch({
                type: MY_ORDER_LIST_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: MY_ORDER_LIST_FAIL,
                payload: error?.response ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response ? error?.response?.data?.message : error?.message)
        }
    }
}

export const orderList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: GET_ORDER_REQUEST })

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.get(`${backendApi}/api/allorders`, config);
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: GET_ORDER_FAIL,
                payload: error?.response ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response ? error?.response?.data?.message : error?.message)
        }
    }
}

export const orderDelever = (orderId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_DELEVER_REQUEST })

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            await axios.put(`${backendApi}/api/orders/${orderId}/delever`,{}, config);
            dispatch({ type: ORDER_DELEVER_REQUEST });
            dispatch(getOrderById(orderId));
            dispatch({ type: ORDER_DELEVER_RESET });

        } catch (error) {
            dispatch({
                type: ORDER_DELEVER_FAIL,
                payload: error?.response ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response ? error?.response?.data?.message : error?.message)
        }
    }
}