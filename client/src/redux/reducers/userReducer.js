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
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action?.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action?.payload };
        case USER_LOGOUT:
            return {};

        default:
            return state
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, message: action?.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const activeUserReducer = (state = {}, action) => {
    switch (action?.type) {
        case ACTIVE_USER_REQUEST:
            return { loading: true };
        case ACTIVE_USER_SUCCESS:
            return { loading: false, userInfo: action?.payload };
        case ACTIVE_USER_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const googleLoginReducer = (state = {}, action) => {
    switch (action?.type) {
        case GOOGLE_LOGIN_REQUEST:
            return { loading: true };
        case GOOGLE_LOGIN_SUCCESS:
            return { loading: false, userInfo: action?.payload };
        case GOOGLE_LOGIN_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const facebookLoginReducer = (state = {}, action) => {
    switch (action?.type) {
        case FACEBOOK_LOGIN_REQUEST:
            return { loading: true };
        case FACEBOOK_LOGIN_SUCCESS:
            return { loading: false, userInfo: action?.payload };
        case FACEBOOK_LOGIN_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const userForgotPasswordReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true };
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, message: action?.payload };
        case USER_FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const userUpdatePasswordReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true };
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, message: action?.payload };
        case USER_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action?.payload };

        default:
            return state
    }
}

export const userDetailsReducer = (state = { userInfo: {} }, action) => {
    switch (action?.type) {
        case GET_USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case GET_USER_DETAILS_SUCCESS:
            return { loading: false, userInfo: action?.payload };
        case GET_USER_DETAILS_FAIL:
            return { loading: false, error: action?.payload };
        case GET_USER_DETAILS_RESET:
            return {};
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action?.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return { loading: true };
        case UPDATE_USER_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action?.payload };
        case UPDATE_USER_PROFILE_FAIL:
            return { loading: false, error: action?.payload };
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action?.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action?.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action?.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action?.payload };
        default:
            return state
    }
}

export const userUpdateAdminReducer = (state = {}, action) => {
    switch (action?.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action?.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state
    }
}

