import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Whitelist = () => {
    const { whitelistProduct } = useSelector(state => state?.whitelist);
    return (
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
    )
}

export default Whitelist

