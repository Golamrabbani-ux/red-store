import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { myOrderList } from '../redux/action/orderAction';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state?.userLogin);
    const { loading, orders } = useSelector(state => state?.myOrderList);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(myOrderList())
        }
    }, [dispatch, navigate, userInfo])


    return (
        <>
            <Meta
                title={`Red Store | Your Orderlist`}
            />
            {
                loading ? <Loader />
                :
                <div className='userlist-container'>
                    <h2>Order</h2>
                    <table className='table'>
                            <thead>
                                <tr className='thead'>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Delivered</th>
                                    <th>Payment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.length > 0 &&
                                    orders?.map(order =>
                                        <tr key={order._id}>
                                            <td>{order?._id}</td>
                                            <td>
                                                {order?.createdAt?.substring(0, 10)}
                                            </td>
                                            <td>
                                                {order?.totalPrice}
                                            </td>
                                            <td>
                                                {
                                                    order?.isDelivered ?
                                                        order?.deliveredAt?.substring(0, 10)
                                                        : <div style={{ textAlign: 'center', color: 'red' }}>
                                                            <i className="fas fa-times"></i>
                                                        </div>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    order?.isPaid ?
                                                        order?.paidAt?.substring(0, 10)
                                                        : <div style={{ textAlign: 'center', color: 'red' }}>
                                                            <i className="fas fa-times"></i>
                                                        </div>
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-cancel"
                                                    style={{ padding: '5px 7px', borderRadius: 0 }}
                                                    onClick={() => navigate(`/order/${order?._id}`)}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                    </table>
                </div >
            }
        </>
    );
};

export default OrderListScreen;