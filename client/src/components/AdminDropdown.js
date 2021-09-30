import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminDropdown = () => {
    const { userInfo } = useSelector(state => state?.userLogin);
    return (
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
    )
}

export default AdminDropdown
