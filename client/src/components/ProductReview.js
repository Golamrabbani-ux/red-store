import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { createReview, productDetails } from '../redux/action/productsAction';
import { reviewsData } from '../utils';
import ProductRating from './ProductRating';

function ProductReview({product, productId}) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const { success, loading } = useSelector(state => state?.createReview);
    const { userInfo } = useSelector(state => state?.userLogin);
    
    useEffect(() =>{
        if(success){
            dispatch(productDetails(productId));
            setRating(1);
            setComment('');
        }
    },[dispatch, productId, success]);

    const submitHandler = (e) =>{
        e?.preventDefault();
        const payload = {
            name: userInfo?.name,
            image: userInfo?.avater,
            rating: Number(rating),
            comment:comment,
        }
        dispatch(createReview(productId, payload));
    } 

    return (
        <div className="row-2 review-product" style={{ marginTop: '50px' }}>
            <div className="reviews-list">
                <h3>Rating & Review of {product?.name}</h3>
                {
                    product?.reviews?.length > 0 ? 
                    product?.reviews?.map(review =>
                        <div key={review?.user}>
                            <div className="review">
                                <div className='review-img'>
                                    <img src={review?.image} alt="" />
                                </div>
                                <div className='review-content'>
                                    <p>{review?.name}</p>
                                    <ProductRating value={review?.rating} />
                                </div>
                            </div>
                            <p>{review?.comment}</p>
                        </div>
                    )
                    :<h5>No Review</h5>
                }
            </div>
            <div className='review-form'>
                {
                    !userInfo ? <p>Please <Link to='/login'>Sign in</Link> to write a review</p>
                    :
                    <>
                        <h4>Write a customer review</h4>
                        <form onSubmit={submitHandler}>
                            <Select 
                                options={reviewsData} 
                                placeholder="Select a Rating"
                                onChange={(e) =>setRating(e?.value)}
                            />
                            <textarea 
                                required={true}
                                placeholder="Write comment"
                                onChange={(e) =>setComment(e?.target?.value)}
                            />
                            <button 
                                type="submit" 
                                className={loading ? 'btn btn-save btn-disabled' :'btn btn-save'}
                                disabled={loading}
                            >
                                Review Submitted
                            </button>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}

export default ProductReview;



