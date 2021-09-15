import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM, CART_RESET, RESET_PAYMENT_METHOD, USER_SHIPPING_ADDRESS, WHITELIST_ADD_ITEM, WHITELIST_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action?.payload;
            const exitItem = state?.cartItems?.find(x => x?.product === item?.product);

            if (exitItem) {
                return {
                    ...state,
                    cartItems: state?.cartItems?.map(x => x?.product === exitItem?.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state?.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: action?.payload
            }
        case USER_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action?.payload
            }
        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action?.payload
            }
        case CART_RESET:
            return {
                ...state,
                cartItems: []
            };
        case RESET_PAYMENT_METHOD:
            return state;
        default:
            return state;
    }
}

export const whitelistReducer = (state = { whitelistProduct: [] }, action) => {
    switch (action.type) {
        case WHITELIST_ADD_ITEM:
            const item = action?.payload;
            const sameProduct = state.whitelistProduct?.find(x => x._id === item?._id);
            if (sameProduct) {
                return {
                    ...state,
                    whitelistProduct: state.whitelistProduct?.filter(x => x._id !== item?._id)
                };
            } else {
                return {
                    ...state,
                    whitelistProduct: [...state.whitelistProduct, item]
                }
            }
        case WHITELIST_REMOVE_ITEM:
            return state;
        default:
            return state;
    }
}