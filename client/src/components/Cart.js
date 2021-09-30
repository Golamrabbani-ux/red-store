import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector(state => state?.cart);
    return (
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
    )
}

export default Cart
