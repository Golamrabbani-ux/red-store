import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { userDelete, userList } from '../redux/action/userAction';


const UserListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, userInfo } = useSelector(state => state?.userLogin);
    const { loading: userListLoading, users } = useSelector(state => state?.userList);
    const { loading: deleteLoading, success } = useSelector(state => state?.userDelete)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else if (!userInfo?.isAdmin) {
            navigate('/profile')
        } else {
            dispatch(userList());
        }
    }, [dispatch, navigate, userInfo, success])

    const deleteHandler = (id) => {
        dispatch(userDelete(id));
    }

    return loading || userListLoading || deleteLoading ? <Loader /> : (
        <div className='userlist-container'>
            <h2>USERS</h2>
            <table className='table'>
                <thead className='thead'>
                    <tr>
                        <th>SL</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.length > 0 &&
                        users.map((user, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user?._id}</td>
                                <td>{user?.firstName + ' ' + user?.lastName}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {
                                        user?.isAdmin ? <i
                                            className='fas fa-check'
                                            style={{ color: 'green' }}
                                        />
                                            : <i
                                                className='fas fa-times'
                                                style={{ color: 'red' }}
                                            />
                                    }
                                </td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/admin/user/${user?._id}/edit`)}
                                    >
                                        <i className='fas fa-edit' />
                                    </button>
                                    <button
                                        className="btn-trash"
                                        onClick={() => deleteHandler(user?._id)}
                                    >
                                        <i className='fas fa-trash' />
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

export default UserListScreen;