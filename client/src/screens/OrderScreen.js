import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, orderDelever, orderPay } from '../redux/action/orderAction';
import { Link } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import OrderSummary from '../components/OrderSummary';
import Loader from '../components/Loader';
import { addDecimal, shipping, subTotal } from '../utils';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';
import Meta from '../components/Meta';

const OrderScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, order } = useSelector(state => state?.orderDetails);
    const { userInfo } = useSelector(state => state?.userLogin);
    const { success: paySuccess } = useSelector(state => state?.orderPay);


    useEffect(() => {
        if (id && userInfo) {
            dispatch(getOrderById(id))
        } else if (!userInfo) {
            navigate('/login')
        } else if (paySuccess) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderById(id))
        }
    }, [dispatch, id, navigate, paySuccess, userInfo])


    // Calculation
    const subTotalPrice = addDecimal(subTotal(order?.orderItems));
    const shippingPrice = addDecimal(shipping(subTotalPrice));
    const taxPrice = addDecimal(subTotalPrice * 0.01);
    const totalPrice = addDecimal(Number(subTotalPrice) + Number(shippingPrice) + Number(taxPrice));


    const paymentHandler = (paymentResult) => {
        dispatch(orderPay(id, paymentResult))
    }

    const handleOrderDelever = () =>{
        dispatch(orderDelever(id))
    }

    return (
        <>
            <Meta
                title={`Red Store | Your Order`}
            />
            {
                loading ? <Loader /> : 
                <div className="place-order-container">
                    <div className="place-order">

                        <div className="order-item">
                            <h2>ORDER ITEMS</h2>
                            {
                                order?.orderItems?.length > 0 ? order?.orderItems?.map(item =>
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
                            <p>{order?.paymentMethod}</p>
                            <div
                                style={{ marginTop: '1rem' }}
                            >
                                {
                                    order?.isPaid ?
                                        <span className="badge-active">
                                            Paid At: {order?.paidAt}
                                        </span> :
                                        <span
                                            style={{ padding: '.5rem .9rem' }}
                                            className="badge-danger"
                                        >
                                            Not Paid
                                        </span>
                                }
                            </div>
                        </div>

                        <div className="shipping">
                            <h2>Shipping</h2>
                            <p>
                                <small>
                                    name: {order?.shippingAddress?.name || order?.user?.firstName + ' ' + order?.user?.lastName}
                                </small>
                            </p>
                            <p>
                                <small>E-mail:
                                    <a href={`mailto:${order?.shippingAddress?.email || order?.user?.email}`}>
                                        {order?.shippingAddress?.email || order?.user?.email}
                                    </a>
                                </small>
                            </p>
                            <p>
                                Mobie: {order?.shippingAddress?.phoneNumber}
                            </p>
                            <p>
                                <small>
                                    Address: {order?.shippingAddress?.address}
                                </small>
                            </p>
                            <div
                                style={{ marginTop: '1rem' }}
                            >
                                {
                                    order?.isDelivered ?
                                        <span className="badge-active">
                                            Delevery at: {order?.deliveredAt}
                                        </span> :
                                        <span
                                            style={{ padding: '.5rem .9rem' }}
                                            className="badge-danger"
                                        >
                                            Not Delivered
                                        </span>
                                }
                            </div>
                        </div>

                    </div>

                    <div className="order-summary">
                        <OrderSummary
                            title="ORDER SUMMARY"
                            products={order?.orderItems}
                            itemShow={false}
                        />
                        {
                            !order?.isPaid && !userInfo?.isAdmin &&
                            <PayPalButton
                                amount={totalPrice}
                                onSuccess={paymentHandler}
                            />
                        }
                        {
                            order?.isPaid && userInfo?.isAdmin && !order?.isDelivered &&
                            <button
                                className="btn btn-checkout"
                                type='button'
                                onClick={handleOrderDelever}
                            >
                                Mark as delivered
                            </button>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default OrderScreen;