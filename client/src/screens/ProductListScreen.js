import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, listProducts, createProduct } from '../redux/action/productsAction';
import Loader from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productsConstants';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, products } = useSelector(state => state?.productList);
    const { loading: userInfoLoading, userInfo } = useSelector(state => state?.userLogin);
    const { loading: successLoading, success } = useSelector(state => state?.productDelete);
    const { loading: createLoading, product, success: createSuccess } = useSelector(state => state?.productCreate);

    useEffect(() => {
        if (products.length <= 0 && userInfo?.isAdmin) {
            dispatch(listProducts())
        } else if (createSuccess) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            navigate(`/admin/product/${product?._id}/edit`)
        } else {
            if (!userInfo) {
                navigate('/login')
            } else if (!userInfo?.isAdmin) {
                navigate('/profile')
            }
        }
    }, [
        dispatch,
        navigate,
        products.length,
        userInfo,
        success,
        createSuccess,
        product?._id
    ]);

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId));
    }

    return loading || userInfoLoading || successLoading || createLoading ? <Loader /> : (
        <div className="product-list-con">
            <div className="product-list-header">
                <h2>PRODUCTS</h2>
                <button
                    className="btn btn-save"
                    onClick={createProductHandler}
                >
                    <i className="fas fa-plus" />
                    CREATE PRODUCT
                </button>
            </div>
            <table className='table'>
                <thead className='thead'>
                    <tr>
                        <th>SL</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.length > 0 &&
                        products.map((product, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product?._id}</td>
                                <td>{product?.name}</td>
                                <td>${product?.price}</td>
                                <td>{product?.category}</td>
                                <td>{product?.brand}</td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/admin/product/${product?._id}/edit`)}
                                    >
                                        <i className='fas fa-edit' />
                                    </button>
                                    <button
                                        className="btn-trash"
                                        onClick={() => deleteHandler(product?._id)}
                                    >
                                        <i className='fas fa-trash' />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductListScreen;
