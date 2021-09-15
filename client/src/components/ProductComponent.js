import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import { addToCart, whitelistToCart } from '../redux/action/cartAction';

const ProductComponent = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (id) => {
        if (id) {
            dispatch(addToCart(id, 1));
        }
    }

    const handleWhiteList = (product) => {
        dispatch(whitelistToCart(product))
    }

    return (
        <div className="col-3">
            <div className="product-card">
                <div className="product-img">
                    <Link to={`/product/${product?._id}`}>
                        <img src={product.image} alt="" />
                    </Link>
                </div>
                <div className="product-content">
                    <Link to={`/product/${product?._id}`}>
                        <h4>{product.name}</h4>
                    </Link>
                    <ProductRating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                    <div className="product-footer">
                        <div>
                            <h2>${product.price}</h2>
                            <small>{product.brand}</small>
                        </div>
                        <div>
                            {
                                product?.countInStock === 0 ? '' :
                                    <button
                                        type="button"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleAddToCart(product?._id)}
                                    >
                                        <svg
                                            className="cart-icon"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            >
                                            </path>
                                        </svg>
                                    </button>
                            }
                            <button
                                style={{ cursor: 'pointer' }}
                                type="button"
                                onClick={() => handleWhiteList(product)}
                            >
                                <svg
                                    className="cart-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    >
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;