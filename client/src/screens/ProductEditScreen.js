import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { backendApi } from '../api';
import Loader from '../components/Loader';
import { productDetails, updateProduct } from '../redux/action/productsAction';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productsConstants';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const { userInfo: user } = useSelector(state => state?.userLogin);
    const { product } = useSelector(state => state?.productDetails);
    const { success, loading } = useSelector(state => state?.productUpdate);

    useEffect(() => {
        if (!user || !user?.isAdmin) {
            navigate('/profile');
        } else if (success) {
            navigate('/admin/productlist');
            dispatch({ type: PRODUCT_UPDATE_RESET });
        }
        dispatch(productDetails(id));
    }, [dispatch, id, navigate, success, user]);

    useEffect(() => {
        if (product?._id) {
            setName(product?.name);
            setPrice(product?.price);
            setImage(product?.image);
            setBrand(product?.brand);
            setCountInStock(product?.countInStock);
            setCategory(product?.category);
            setDescription(product?.description);
        }
    }, [product]);

    const handleImage = async(e) =>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const {data} = await axios.post(`${backendApi}/api/uploads`, formData);
        setImage(JSON.stringify(data))
    }

    const submitHandler = (e) => {
        e?.preventDefault();
        const updateData = {
            id,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description,
        }
        dispatch(updateProduct(updateData))
    }

    return loading ? <Loader /> : (
        <div className="useredit-container">
            <div className="useredit">
                <form onSubmit={submitHandler}>
                    <h2>EDIT PRODUCT</h2>

                    <div>
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={name}
                            required
                            placeholder="Enter Product Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Product Price</label>
                        <input
                            type="text"
                            defaultValue={price}
                            required
                            placeholder="Enter Product Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Brand</label>
                        <input
                            type="text"
                            defaultValue={brand}
                            required
                            placeholder="Brand"
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Count In Stock</label>
                        <input
                            type="text"
                            defaultValue={countInStock}
                            required
                            placeholder="Count In Stock"
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Category</label>
                        <input
                            type="text"
                            defaultValue={category}
                            required
                            placeholder="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            type="text"
                            defaultValue={description}
                            required
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Product Image</label>
                        <input
                            type="file"
                            // required
                            placeholder="Enter Product Image"
                            onChange={(e) => handleImage(e)}
                            
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-save"
                    >
                        UPDATE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEditScreen;