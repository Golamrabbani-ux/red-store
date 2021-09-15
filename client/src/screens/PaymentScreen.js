import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import OrderSummary from '../components/OrderSummary';
import { cartPaymentMethod } from '../redux/action/cartAction';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const { userInfo } = useSelector(state => state?.userLogin);
    const { cartItems, shippingAddress } = useSelector(state => state?.cart);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(cartPaymentMethod(paymentMethod))
        navigate('/place-order')
    }


    return (
        <>
            <Meta
                title={`Red Store | Payment`}
            />
            <CheckoutSteps step1 step2 />
            <div className="payment-container">
                <div className="payment-system">
                    <h2>PAYMENT METHOD</h2>
                    <form onSubmit={submitHandler}>
                        <div className="payment-input">
                            <input
                                type="radio"
                                label="paypal or credit card"
                                id="paypal"
                                name='paypalMethod'
                                value='paypal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="paypal">Paypal or Credit Card</label>
                        </div>

                        {/* <div className="payment-input">
                            <input
                                type="radio"
                                label="Stripe"
                                id="stripe"
                                name='paypalMethod'
                                value='stripe'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="stripe">Cash on Delivery</label>
                        </div> */}
                        <button
                            type="submit"
                            className="btn btn-save"
                        >
                            Continue
                        </button>
                    </form>
                </div>
                <div className="calculation">
                    <OrderSummary
                        title="ORDER SUMMARY"
                        products={cartItems}
                        itemShow={true}
                    />
                </div>
            </div>
        </>
    );
};

export default PaymentScreen;