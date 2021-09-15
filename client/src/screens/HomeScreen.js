import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ProductComponent from '../components/ProductComponent';
import Slider from '../components/Slider';
import { listProducts } from '../redux/action/productsAction';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const { loading, products, error } = useSelector(state => state?.productList)

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    const homeHandler = () =>{
        navigate('/')
    }


    return (
        <>
            <Meta 
                title={keyword && `Red store | ${keyword}`} 
            />
            <Slider />
            {loading && <Loader />}
            {
                keyword && 
                <button 
                    className="btn edit-btn"
                    style={{backgroundColor: '#eeeeee9e', marginTop:'2rem'}}
                    onClick={homeHandler}
                >
                    Home
                </button>
            }
            {error && <span className="error">{error.message}</span>}
            {
                products.length > 0 &&
                <div className="row" style={{ marginTop: '50px' }}>
                    {
                        products?.map(product =>
                            <ProductComponent
                                product={product}
                                key={product._id}
                            />
                        )
                    }
                </div>
            }
        </>
    );
};

export default HomeScreen;


