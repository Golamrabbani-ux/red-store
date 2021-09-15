import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { orderList } from '../redux/action/orderAction';


const AllOrderListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state?.userLogin);
    const { loading, orders } = useSelector(state => state?.orderList);

    useEffect(() => {
        if (!userInfo && !userInfo?.isAdmin) {
            navigate('/profile')
        }else{
            dispatch(orderList())
        }
    }, [dispatch, navigate, userInfo])

    
    return loading? <Loader /> : (
        <div className='userlist-container'>
            <h2>ORDERS</h2>
            <table className='table'>
                <thead className='thead'>
                    <tr>
                        <th>SL</th>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.length > 0 &&
                        orders.map((order, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order?._id}</td>
                                <td>{order?.user?.firstName + ' ' + order?.user?.lastName}</td>
                                <td>{order?.createdAt?.substring(0, 10)}</td>
                                <td>${order?.totalPrice}</td>
                                <td>
                                    {order?.isPaid ? order?.paidAt?.substring(0, 10) : <i className="error fas fa-times"></i>}
                                </td>
                                <td>
                                    {order?.isDelivered ? order?.deliveredAt?.substring(0, 10) : <i className="error fas fa-times"></i>}
                                </td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/order/${order?._id}`)}
                                    >
                                        <i className='fas fa-edit' />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    );
};

export default AllOrderListScreen;