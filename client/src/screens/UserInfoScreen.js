import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getUserDetails, userUpdateProfile } from '../redux/action/userAction';

const UserInfoScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { userInfo } = useSelector(state => state?.userLogin);
    const { loading, userInfo: userDetails } = useSelector(state => state?.userDetails);
    const { loading: updateLoading } = useSelector(state => state?.userUpdate);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        if (!userDetails?.firstName || !userDetails?.lastName) {
            dispatch(getUserDetails())
        } else {
            setFirstName(userDetails?.firstName || userInfo?.firstName);
            setLastName(userDetails?.lastName || userInfo?.lastName);
            setEmail(userDetails?.email || userInfo?.email);
        }
    },[dispatch, userDetails, userInfo]);


    const submitHandler = (e) => {
        e.preventDefault();
        const userInfo = { firstName, lastName }
        dispatch(userUpdateProfile(userInfo, setShow));
    }

    return (
        <>
            <Meta
                title={`Red Store | Your Account`}
            />
            {loading && <Loader />}
            <div className="userinfo">
                <div className="header">
                    <h2>Personal Information</h2>
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
                    <form onSubmit={submitHandler}>
                        <div className="name-container">
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your First Name"
                                    required
                                    defaultValue={firstName}
                                    disabled={!show}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Last Name"
                                    required
                                    defaultValue={lastName}
                                    disabled={!show}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                required
                                defaultValue={email}
                                disabled
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
                                    className={updateLoading ? 'btn btn-save btn-disabled' : 'btn btn-save'}
                                    type="submit"
                                    disabled={updateLoading}
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

export default UserInfoScreen;