/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assests/image/logo.png';
import { userLogout } from '../redux/action/userAction';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchToggle, setSearchToggle] = useState(false);
    const [keyword, setKeyword] = useState('');
    const { cartItems } = useSelector(state => state?.cart);
    const { userInfo } = useSelector(state => state?.userLogin);
    const { whitelistProduct } = useSelector(state => state?.whitelist);

    const submitHandler = (e) =>{
        e?.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
            setSearchToggle(false);
        }
    }

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <div
                className="container"
            >
                <navbar>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Red Store" width="100px" />
                        </Link>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop">Shop</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="search-area">
                        <button
                            className="search-btn"
                            onClick={() => {
                                setSearchToggle(!searchToggle)
                            }}
                        >
                            <svg
                                className="search-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                >

                                </path>
                            </svg>
                        </button>
                        {
                            searchToggle &&
                            <div className="search-content">
                                <form
                                    onSubmit={submitHandler}
                                >
                                    <input 
                                        type="text" 
                                        placeholder="Search here.."
                                        onChange={(e) => setKeyword(e?.target?.value)}
                                    />
                                    <button type="submit">
                                        <svg
                                            className="search-icon-in"
                                            fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            >

                                            </path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        }
                    </div>

                    <Link to="/whitelist" className="icon-top">
                        <svg
                            className="nav-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            >

                            </path>
                        </svg>
                        <span>{whitelistProduct?.length > 0 && whitelistProduct?.length}</span>
                    </Link>

                    <Link to="/cart" className='icon-top'>
                        <svg
                            className="nav-icon "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            >

                            </path>
                        </svg>
                        <span>{cartItems?.length > 0 && cartItems?.length}</span>
                    </Link>

                    <div className="dropdown">
                        <div className="dropdown-user">
                            {
                                userInfo ?
                                    <div className="login-user">
                                        <img
                                            src={userInfo?.avater}
                                            alt={userInfo?.name}
                                        />
                                        <h4>{userInfo?.name}</h4>
                                    </div>
                                    :
                                    <img
                                        src="https://image.flaticon.com/icons/png/512/149/149071.png"
                                        alt="User profile"
                                    />
                            }

                            <div className="dropdown-menu">
                                {
                                    userInfo ?
                                        <div className="dropdown-content">
                                            <ul>
                                                <Link to='/profile'>
                                                    <li>Your Profile</li>
                                                </Link>
                                                <p
                                                    onClick={() => logoutHandler()}
                                                >
                                                    Log Out
                                                </p>
                                            </ul>
                                        </div>
                                        :
                                        <div className="dropdown-content">
                                            <h4>Login</h4>
                                            <form className="form">
                                                <div>
                                                    <label>Email</label>
                                                    <input type="email" placeholder="example@gmail.com" required />
                                                </div>
                                                <div>
                                                    <label>Password</label>
                                                    <input type="password" placeholder="*******" required />
                                                </div>
                                                <button className="login-btn">Login</button>
                                                <span>
                                                    Don't have an account?
                                                    <Link to='/signup'>Sign up</Link>
                                                </span>
                                            </form>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    {/* Admin Dropdown */}
                    <div className="dropdown">
                        <div className="dropdown-user">
                            {
                                userInfo && userInfo?.isAdmin &&
                                <div className="login-user">
                                    <h4>Admin</h4>
                                </div>
                            }
                            <div className="dropdown-menu">
                                <div className="dropdown-content">
                                    <ul>
                                        <Link to='/admin/userlist'>
                                            <li>User List</li>
                                        </Link>
                                        <Link to='/admin/productlist'>
                                            <li>Product List</li>
                                        </Link>
                                        <Link to='/admin/orderlist'>
                                            <li>Order List</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </navbar>
            </div>
        </header>
    );
};

export default Header;