import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import OrderSummary from '../components/OrderSummary';
import { orderCreate } from '../redux/action/orderAction';
import { addDecimal, shipping, subTotal } from '../utils';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state?.cart);
    const { userInfo } = useSelector(state => state?.userLogin);

    // CAlculation
    const subTotalPrice = addDecimal(subTotal(cartItems));
    const shippingPrice = addDecimal(shipping(subTotalPrice));
    const taxPrice = addDecimal(subTotalPrice * 0.01);
    const totalPrice = addDecimal(Number(subTotalPrice) + Number(shippingPrice) + Number(taxPrice))

    const orderCreateHandler = () => {
        const orderInfo = {
            orderItems: cartItems,
            shippingAddress: {
                ...shippingAddress,
                name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
            },
            paymentMethod,
            taxPrice: +taxPrice,
            shippingPrice: +shippingPrice,
            totalPrice: +totalPrice,
        }
        dispatch(orderCreate(orderInfo, navigate))
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [navigate, shippingAddress, userInfo])

    return (
        <>
            <Meta
                title={`Red Store | Your order place`}
            />
            <div className="place-order-container">
                <div className="place-order">
                    <div className="order-item">
                        <h2>ORDER ITEMS</h2>
                        {
                            cartItems?.length > 0 ? cartItems?.map(item =>
                                <div
                                    key={item?.product}
                                    className="single-item"
                                >
                                    <div className="img-con">
                                        <img src={item?.image} alt={item?.name} />
                                    </div>
                                    <div className="title-con">
                                        <Link to={`/product/${item?.product}`}>
                                            {item?.name}
                                        </Link>
                                    </div>
                                    <div className="price-con">
                                        <p>{`${item?.qty} x $${item?.price} = ${item?.qty * item?.price}`}</p>
                                    </div>
                                </div>
                            )
                                :
                                <p style={{ paddingRight: 0 }}>
                                    Your Order Item is Empty.
                                    <Link to='/'>Go back shopping</Link>
                                </p>
                        }
                    </div>
                    <div className="payment-method">
                        <h2>PAYEMNT METHOD</h2>
                        <p>{paymentMethod}</p>
                    </div>
                    <div className="shipping">
                        <h2>Shipping</h2>
                        <p><small>name: {shippingAddress?.firstName + ' ' + shippingAddress?.lastName || userInfo?.name}</small></p>
                        <p><small>E-mail: {shippingAddress?.email}</small></p>
                        <p>Mobie: {shippingAddress?.phoneNumber}</p>
                        <p>
                            <small>Address: {shippingAddress?.address}</small>
                        </p>
                    </div>
                </div>
                <div className="order-summary">
                    <OrderSummary
                        title="ORDER SUMMARY"
                        products={cartItems}
                    />
                    <button
                        type="submit"
                        className="btn btn-save"
                        style={{ width: '100%', marginTop: '.6rem' }}
                        onClick={orderCreateHandler}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;