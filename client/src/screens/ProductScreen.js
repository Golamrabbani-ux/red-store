import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { returnFirstWord } from '../utils';
import ProductRating from '../components/ProductRating';
import { productDetails } from '../redux/action/productsAction';
import Loader from '../components/Loader';
import { addToCart } from '../redux/action/cartAction';
import ProductReview from '../components/ProductReview';
import Meta from '../components/Meta';

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [showDes, setShowDes] = useState('description');
    const [qty, setQty] = useState(1);
    const { loading, product, error } = useSelector(state => state?.productDetails);
    
    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id])
    const productName = product?.name && returnFirstWord(product?.name);

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty))
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <h1>{error}</h1>
    )
        : <>
            <Meta
                title={`Red Store | ${productName?.firstSen}`}
                keywords={productName}
            />
            <div className="productdetails">
                <div className="row-2" style={{ marginTop: '50px' }}>
                    <div className="product-img-container">
                        <img src={product?.image} alt={product?.name} />
                    </div>
                    <div className="product-content">
                        <h1>{productName?.firstSen}</h1>
                        <h5>{productName?.lastSen}</h5>
                        <ProductRating
                            value={product?.rating}
                            text={`${product.numReviews} reviews`}
                        />
                        <div className='price-available'>
                            <h2>${product?.price}</h2>
                            <span
                                className={product.countInStock === 0 ? 'badge-danger' : 'badge-active'}
                            >
                                {
                                    product.countInStock === 0 ?
                                        <>
                                            <i className="fas fa-times-circle"></i>
                                            Out of Stock
                                        </>
                                        :
                                        <>
                                            <i className="fas fa-check-circle"></i>
                                            In Stock
                                        </>
                                }
                            </span>
                        </div>
                        <div className="description-details-container">
                            <span
                                onClick={() => setShowDes("description")}
                                className=""
                            >
                                Description
                            </span>
                            <span
                                onClick={() => setShowDes("details")}
                                className="details-nav"
                            >
                                Details
                            </span>
                        </div>
                        {
                            showDes === "description" ?
                                <p>{product?.description}</p>
                                : "Hello details"
                        }
                        {/* add to cart and quantityadd here */}
                        <div className="qty-area">
                            {
                                product?.countInStock > 0 &&
                                <>
                                    <h4>Quantity</h4>
                                    <select
                                        onClick={(e) => setQty(e.target.value)}
                                    >
                                        {
                                            [...Array(product?.countInStock).keys()]?.map(x =>
                                                <option
                                                    value={x + 1}
                                                    key={x}
                                                >
                                                    {x + 1}
                                                </option>
                                            )
                                        }
                                    </select>
                                </>
                            }
                            <button
                                className={product?.countInStock === 0 ? 'btn btn-primary btn-disabled' : 'btn btn-danger'}
                                disabled={product?.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
                <ProductReview
                    product={product}
                    productId={id}
                />
            </div>
        </>
};

export default ProductScreen;