import React from 'react';
import { Link } from 'react-router-dom';
import { addDecimal, shipping, subTotal } from '../utils';

const OrderSummary = ({ title, products, itemShow }) => {

    // Calculation
    const subTotalPrice = addDecimal(subTotal(products));
    const shippingPrice = addDecimal(shipping(subTotalPrice));
    const taxPrice = addDecimal(subTotalPrice * 0.01);
    const totalPrice = addDecimal(Number(subTotalPrice) + Number(shippingPrice) + Number(taxPrice))

    return (
        <div className='order-summary'>
            <div className="summary">
                <h3>{title}</h3>
                <span className="badge-active">{products?.length} items</span>
            </div>
            {
                itemShow &&
                products?.length > 0 && products?.map(product =>
                    <div key={product?.product} className='order-product'>
                        <div className='order-content'>
                            <img src={product?.image} alt={product?.name} />
                            <div className=''>
                                <Link to={`/product/${product?.product}`}>
                                    <h4> {product?.name}</h4>
                                </Link>
                                <p>{product?.qty} x ${product?.price}</p>
                            </div>
                        </div>
                        <div>
                            <h4>${`${product?.qty * product?.price}`}</h4>
                        </div>
                    </div>
                )
            }
            <div className="sub-total">
                <h4>Sub Total: </h4>
                <h4>${subTotalPrice}</h4>
            </div>
            <div className="shipping">
                <div>
                    <h4>Shipping: </h4>
                    <small>First delivery</small>
                </div>
                <h4>${shippingPrice}</h4>
            </div>
            <div className="sub-total">
                <h4>Tax: </h4>
                <h4>${taxPrice}</h4>
            </div>
            <div className="total">
                <h4>Total: </h4>
                <h4>${totalPrice}</h4>
            </div>
        </div >
    );
};

export default OrderSummary;