import axios from 'axios';
import toast from 'react-hot-toast';
import { MY_ORDER_LIST_RESET } from '../constants/orderConstants';
import {
    ACTIVE_USER_FAIL,
    ACTIVE_USER_REQUEST,
    ACTIVE_USER_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_REQUEST,
    FACEBOOK_LOGIN_SUCCESS,
    GET_USER_DETAILS_FAIL,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_RESET,
    GET_USER_DETAILS_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PASSWORD_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants"

export const userLogin = (userInfo) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST })
            const { data } = await axios.post('/api/users/login', userInfo);
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userRegister = (userInfo) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST })
            const { data } = await axios.post('/api/users/register', userInfo);
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data?.message
            })
            toast.success(data?.message)
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const activeUser = (token) => {
    return async dispatch => {
        try {
            dispatch({ type: ACTIVE_USER_REQUEST })
            const { data } = await axios.post(`/api/users/active/${token}`);
            dispatch({
                type: ACTIVE_USER_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: ACTIVE_USER_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
        }
    }
}

export const googleLogin = (tokenId) => {
    return async dispatch => {
        try {
            dispatch({ type: GOOGLE_LOGIN_REQUEST })
            const { data } = await axios.post('/api/users/googlelogin', { tokenId });
            dispatch({
                type: GOOGLE_LOGIN_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: GOOGLE_LOGIN_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const facebookLogin = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: FACEBOOK_LOGIN_REQUEST })
            const { data } = await axios.post('/api/users/facebooklogin', {
                accessToken: payload?.accessToken,
                userID: payload?.userID
            });
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: FACEBOOK_LOGIN_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userForgotPassword = (email, navigate) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_FORGOT_PASSWORD_REQUEST })
            const { data } = await axios.put('/api/users/forgotpassword', { email });
            dispatch({
                type: USER_FORGOT_PASSWORD_SUCCESS,
                payload: data?.message
            })
            toast.success(data?.message);
            navigate('/update-password')
        } catch (error) {
            dispatch({
                type: USER_FORGOT_PASSWORD_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userUpdatePassword = (code, password, navigate) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_UPDATE_PASSWORD_REQUEST })
            const { data } = await axios.put('/api/users/forgotpasswordactivation', {
                uniqueNumber: code,
                password
            });
            dispatch({
                type: USER_UPDATE_PASSWORD_SUCCESS,
                payload: data?.message
            })
            toast.success(data?.message);
            navigate('/login')
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PASSWORD_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const getUserDetails = () => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: GET_USER_DETAILS_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get('/api/user/profile', config);
            dispatch({
                type: GET_USER_DETAILS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: GET_USER_DETAILS_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
        }
    }
}

export const userUpdateProfile = (user, setShow) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: UPDATE_USER_PROFILE_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.put('/api/user/profile', user, config);
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: data
            })
            dispatch({
                type: GET_USER_DETAILS_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            setShow(false)
            localStorage.setItem("userInfo", JSON.stringify(data))
            toast.success("User Update Successfully");
        } catch (error) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userLoginPasswordChange = (user, reset) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: UPDATE_USER_PROFILE_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.put('/api/user/profile', user, config);
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: data
            })
            dispatch({
                type: GET_USER_DETAILS_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            reset()
            localStorage.setItem("userInfo", JSON.stringify(data))
            toast.success("User Update Successfully");
        } catch (error) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userList = () => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: USER_LIST_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get('/api/users', config);
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userDelete = (id) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: USER_DELETE_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.delete(`/api/users/${id}`, config);
            toast.success(data?.message)
            dispatch({ type: USER_DELETE_SUCCESS })
        } catch (error) {
            dispatch({
                type: USER_DELETE_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const userUpdateByAdmin = (id, payload, navigate) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: USER_UPDATE_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const {data} = await axios.put(`/api/users/${id}`, payload, config);
            console.log(data);

            dispatch({ type: USER_UPDATE_SUCCESS });
            dispatch({ type:USER_UPDATE_RESET});
            dispatch(userList())
            navigate('/admin/userlist');

        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message)
        }
    }
}

export const getSingleUser = (id) => {
    return async (dispatch, getState) => {
        try {
            const { userInfo } = getState()?.userLogin;

            dispatch({ type: GET_USER_DETAILS_REQUEST })

            const config = {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get(`/api/users/${id}`, config);
            dispatch({
                type: GET_USER_DETAILS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: GET_USER_DETAILS_FAIL,
                payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message
            })
        }
    }
}



export const userLogout = () => {
    return async dispatch => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        dispatch({ type: USER_LOGOUT })
        dispatch({ type: GET_USER_DETAILS_RESET })
        dispatch({ type: MY_ORDER_LIST_RESET })
        dispatch({ type: USER_LIST_RESET })
    }
}