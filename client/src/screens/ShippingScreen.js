import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import OrderSummary from '../components/OrderSummary';
import { shippingAddressSave } from '../redux/action/cartAction';
import { useNavigate } from 'react-router';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.userLogin);
    const { cartItems, shippingAddress: address } = useSelector(state => state?.cart);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: address?.firstName || userInfo?.firstName,
        lastName: address?.lastName || userInfo?.lastName,
        email: address?.email || userInfo?.email,
        phoneNumber: address?.phoneNumber,
        address: address?.address,
        zipCode: address?.zipCode,
        city: address?.zipCode,
        state: address?.state
    })

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }

    const handleShippingAddress = (e) => {
        e.preventDefault();
        if (
            shippingAddress?.firstName === '' ||
            shippingAddress?.lastName === '' ||
            shippingAddress?.email === '' ||
            shippingAddress?.phoneNumber === '' ||
            shippingAddress?.address === '' ||
            shippingAddress?.zipCode === '' ||
            shippingAddress?.city === '' ||
            shippingAddress?.state === ''
        ) {
            toast.error('Please fill all fields');
        } else {
            dispatch(shippingAddressSave(shippingAddress))
            navigate('/payment')
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo])


    return (
        <>
            <Meta
                title={`Red Store | Your shipping address`}
                keywords={'Shopping cart'}
            />
            <CheckoutSteps
                step1
            />
            <div className='shipping-container'>
                <div className='shipping-address'>
                    <h2>Shipping Address</h2>
                    <div className='sub-con-two'>
                        <div>
                            <label>First Name</label>
                            <input
                                name='firstName'
                                type='text'
                                defaultValue={shippingAddress?.firstName}
                                placeholder="Enter Your First Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input
                                name='lastName'
                                type='text'
                                defaultValue={shippingAddress?.lastName}
                                placeholder="Enter Your Last Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Email Address</label>
                            <input
                                name='email'
                                type='email'
                                defaultValue={shippingAddress?.email}
                                placeholder="Enter Your Email Address"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input
                                name='phoneNumber'
                                type='text'
                                defaultValue={shippingAddress?.phoneNumber}
                                placeholder="Enter Your Phone Number"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Address</label>
                        <textarea
                            name='address'
                            type='text'
                            defaultValue={shippingAddress?.address}
                            placeholder="Enter Your Address"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="sub-con-three">
                        <div>
                            <label>Zip Code</label>
                            <input
                                name='zipCode'
                                type='text'
                                defaultValue={shippingAddress?.zipCode}
                                placeholder="Zip code"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <input
                                name='city'
                                type='text'
                                defaultValue={shippingAddress?.city}
                                placeholder="Your City"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                name='state'
                                type='text'
                                defaultValue={shippingAddress?.state}
                                placeholder="State"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="shipping-calculation">
                    <OrderSummary
                        title="Summary"
                        products={cartItems}
                        itemShow={true}
                    />
                    <button
                        className="btn btn-checkout"
                        onClick={handleShippingAddress}
                    >
                        Continue To Payment
                    </button>
                </div>
            </div>
        </>
    );
};

export default ShippingScreen;