import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import { shippingAddressSave } from '../redux/action/cartAction';

const AddressScreen = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const { userInfo } = useSelector(state => state.userLogin);
    const { shippingAddress: address } = useSelector(state => state?.cart);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: address?.firstName || userInfo?.firstName,
        lastName: address?.lastName || userInfo?.lastName,
        email: address?.email || userInfo?.email,
        phoneNumber: address?.phoneNumber,
        address: address?.address,
        zipCode: address?.zipCode,
        city: address?.zipCode,
        state: address?.state
    });

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }

    const handleShippingAddress = (e) => {
        e.preventDefault();
        setShow(false);
        dispatch(shippingAddressSave(shippingAddress));
    }

    return (
        <>
            <Meta
                title={`Red Store | Your Address`}
            />
                <div className='userinfo'>
                    <div className="header">
                        <h2>Address/Shipping</h2>
                        {
                            !show &&
                            <button
                                onClick={() => setShow(true)}
                            >
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    >
                                    </path>
                                </svg>
                                <span>Edit</span>
                            </button>
                        }
                    </div>
                    <div className="details">
                        <form onSubmit={handleShippingAddress}>

                            <div className="name-container">
                                <div>
                                    <label>First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter Your First Name"
                                        required
                                        defaultValue={shippingAddress?.firstName}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter Your Last Name"
                                        required
                                        defaultValue={shippingAddress?.lastName}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label>Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    required
                                    defaultValue={shippingAddress?.email}
                                    disabled={!show}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <div className="name-container">
                                <div>
                                    <label>Phone Number</label>
                                    <input
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                        required
                                        defaultValue={shippingAddress?.phoneNumber}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div>
                                    <label>Zip Code</label>
                                    <input
                                        name="zipCode"
                                        type="text"
                                        placeholder="Enter Your Zip Code"
                                        required
                                        defaultValue={shippingAddress?.zipCode}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="name-container">
                                <div>
                                    <label>City</label>
                                    <input
                                        name="city"
                                        type="text"
                                        placeholder="Enter Your City"
                                        required
                                        defaultValue={shippingAddress?.city}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div>
                                    <label>State</label>
                                    <input
                                        name="state"
                                        type="text"
                                        placeholder="Enter Your State"
                                        required
                                        defaultValue={shippingAddress?.state}
                                        disabled={!show}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div>
                            <label>Address</label>
                            <textarea
                                name='address'
                                type='text'
                                required
                                disabled={!show}
                                defaultValue={shippingAddress?.address}
                                placeholder="Enter Your Address"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                            
                            {
                                show &&
                                <div className='btn-area'>
                                    <button
                                        className="btn btn-cancel"
                                        type="button"
                                        onClick={() => setShow(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={'btn btn-save'}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                    
                </div>
        </>
    );
};

export default AddressScreen;