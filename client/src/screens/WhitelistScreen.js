import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { whitelistToCart } from '../redux/action/cartAction';
import whiteListEmptyImage from '../assests/image/cart-empty.svg';
import Meta from '../components/Meta';

const WhitelistScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { whitelistProduct } = useSelector(state => state?.whitelist);

    const handleWhiteList = (product) => {
        dispatch(whitelistToCart(product))
    }

    return (
            <>
                <Meta
                    title={`Red Store | Your Whitelist`}
                    keywords={'Shopping cart'}
                />
                {
                    whitelistProduct?.length > 0 ? 
                    <div className="whitelist">
                        <div className="title-area">
                            <h2>Your favorites product</h2>
                            <h2>{whitelistProduct?.length && whitelistProduct?.length} Items</h2>
                        </div>
                        {
                            whitelistProduct?.length > 0 && whitelistProduct?.map(product =>
                                <div key={product?._id} className="whitelist-item">
                                    <div className="image">
                                        <img
                                            width="90"
                                            src={product?.image}
                                            alt={product?.name}
                                        />
                                    </div>
                                    <div className="name">
                                        <Link to={`/product/${product?._id}`}>
                                                {product?.name}
                                        </Link>
                                    </div>
                                <div className="price-stock">
                                        <div className="price">
                                            <p>${product?.price}</p>
                                        </div>
                                        <div className="stock">
                                            <p>{product?.countInStock === 0 ? 'Out of stock' : 'Stock Available'}</p>
                                        </div>
                                    </div>
                                    <div className="view-delete">
                                        <div className="view">
                                            <button
                                                className="btn btn-primary"
                                                onClick={()=> navigate(`/product/${product?._id}`)}
                                            >
                                                View
                                            </button>
                                        </div>
                                        <div className="remove">
                                            <button 
                                                className="btn btn-danger"
                                                onClick={()=>handleWhiteList(product)}
                                            >
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        className='w-6 h-6'
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    >
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className='empty-cart'>
                        <img src={whiteListEmptyImage} alt={"Your whitelist is empty"} />
                        <h2>Your Shopping Whitelist is Empty</h2>
                        <Link to='/'>
                            <button className="btn">Back Home</button>
                        </Link>
                    </div>
                }
            </>
        );
};

export default WhitelistScreen;