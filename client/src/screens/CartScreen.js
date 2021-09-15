import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/action/cartAction';
import { addDecimal, numberToFixed, shipping, subTotal } from '../utils';
import cartEmptyImage from '../assests/image/cart-empty.svg';
import Meta from '../components/Meta';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state?.cart);

    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    // Calculation
    const subTotalPrice = addDecimal(subTotal(cartItems));
    const shippingPrice = addDecimal(shipping(subTotalPrice));
    const taxPrice = addDecimal(subTotalPrice * 0.01);
    const totalPrice = addDecimal(Number(subTotalPrice) + Number(shippingPrice) + Number(taxPrice))


    return (
        <>
            <Meta
                title={`Red Store | Your shopping cart`}
                keywords={'Shopping cart'}
            />
            {
                cartItems?.length > 0 ? 
                <div className="cart-area">
                    <div className="shopping-cart">
                        <div className="title-area">
                            <h2>Shopping Cart</h2>
                            <h2>{cartItems?.length} Items</h2>
                        </div>
                        {
                            cartItems?.map(item =>
                                <div key={item?.product} className="cart-details">
                                    <div style={{ display: 'flex' }}>
                                        <img src={item.image} width="90" alt={item?.name} />
                                        <div style={{ marginLeft: '40px' }}>
                                            <Link to={`/product/${item.product}`}>
                                                {
                                                    item?.name?.length > 30 ? `${item?.name?.substring(0, 28)}...` : item?.name
                                                }
                                            </Link>
                                            <p style={{ margin: '8px, 0' }}>{item?.brand}</p>
                                            <span
                                                className="span-remove"
                                                onClick={() => removeHandler(item?.product)}
                                            >
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml">
                                        <select
                                            value={item?.qty}
                                            onChange={(e) => {
                                                dispatch(addToCart(item?.product, Number(e.target.value)))
                                            }}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()]?.map(x =>
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="ml">
                                        <h4>${numberToFixed(item?.price)}</h4>
                                    </div>
                                    <div className="ml">
                                        <h4>${numberToFixed(item?.qty * item?.price)}</h4>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="order-calculation">
                            <h4>Total Item</h4>
                            <h4>{cartItems?.length}</h4>
                        </div>
                        <div className="order-calculation">
                            <h4>Sub Total</h4>
                            <h4>${subTotalPrice}</h4>
                        </div>
                        <div className="order-calculation">
                            <h4>Shipping </h4>
                            <h4>${shippingPrice}</h4>
                        </div>
                        <div className="order-calculation">
                            <h4>Tax </h4>
                            <h4>${taxPrice}</h4>
                        </div>
                        <div className="order-calculation">
                            <h4>Total Price</h4>
                            <h4>${totalPrice}</h4>
                        </div>
                        <button
                            onClick={checkoutHandler}
                            className="btn btn-checkout"
                        >
                            Checkout
                        </button>
                    </div>
                </div >
                :
                <div className='empty-cart'>
                    <img src={cartEmptyImage} alt={"Your cart is empty"} />
                    <h2>Your Shopping Cart is Empty</h2>
                    <Link to='/'>
                        <button className="btn">Go Back Shopping</button>
                    </Link>
                </div>
            }
        </>
    )
}
export default CartScreen;