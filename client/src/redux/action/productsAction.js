import axios from 'axios';
import { toast } from 'react-hot-toast';
import { backendApi } from '../../api';
import {
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_RESET,
    CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} from '../constants/productsConstants';

export const listProducts = (keyword= '') => {
    console.log("EACT_APP_SERVER_API",backendApi);
    return async dispatch => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${backendApi}/api/products?keyword=${keyword}`);
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
        }
    }
}

export const productDetails = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });
            const { data } = await axios.get(`${backendApi}/api/products/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
        }
    }
}

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_DELETE_REQUEST });

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.delete(`${backendApi}/api/products/${id}`, config);
            dispatch({ type: PRODUCT_DELETE_SUCCESS })
            dispatch(listProducts())
            toast.success(data?.message)

        } catch (error) {
            dispatch({
                type: PRODUCT_DELETE_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const createProduct = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REQUEST });

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.post(`${backendApi}/api/products`, {}, config);
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data
            })
            dispatch(listProducts())
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const updateProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_UPDATE_REQUEST });

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            await axios.put(`${backendApi}/api/products/${data?.id}`, data, config);
            dispatch({ type: PRODUCT_UPDATE_SUCCESS })
            dispatch(listProducts())
        } catch (error) {
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const createReview = (productId, payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CREATE_REVIEW_REQUEST });

            const { userInfo } = getState()?.userLogin;

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }

            const { data } = await axios.post(`${backendApi}/api/products/${productId}/reviews`, payload, config);
            toast.success(data?.message)
            dispatch({ type: CREATE_REVIEW_SUCCESS });
            dispatch({type: CREATE_REVIEW_RESET})

        } catch (error) {
            dispatch({
                type: CREATE_REVIEW_FAIL,
                payload: error?.response && error?.response?.data?.message ?
                    error?.response?.data?.message : error?.message
            });
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}