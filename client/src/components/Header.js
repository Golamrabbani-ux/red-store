/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../assests/image/logo.png';
import Search from './Search';
import UserDropdown from './UserDropdown';
import AdminDropdown from './AdminDropdown';
import Cart from './Cart';
import Whitelist from './Whitelist';

const Header = () => {
    const [searchToggle, setSearchToggle] = useState(false);


    return (
        <header>
            <div
                className="container"
                style={{marginBottom: 0}}
            >
                <navbar className={'navbar-flex-between'}>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Red Store" width="100px" />
                        </Link>
                    </div>

                    <div className='search-area'>
                        <Search />
                    </div>

                    <div style={{display: 'flex'}}>
                        <div 
                            className="search-toogle"
                            onClick={()=>setSearchToggle(!searchToggle)}
                        >
                            <svg
                                className="nav-icon"
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
                        </div>
                        <>
                            <Whitelist />
                            <Cart />
                            <UserDropdown />
                            <AdminDropdown />  
                        </>
                    </div> 
                </navbar>
                {
                    searchToggle &&
                    <div className='search-area-full'>
                        <Search 
                            displayShow={true}
                        />
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;