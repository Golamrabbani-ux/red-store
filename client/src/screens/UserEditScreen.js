import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getSingleUser, userUpdateByAdmin } from '../redux/action/userAction';

const UserEditScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { userInfo: user } = useSelector(state => state?.userLogin);
    const { userInfo } = useSelector(state => state?.userDetails);
    const {loading} = useSelector(state => state?.userUpdateAdmin);

    useEffect(() => {
        if (!user || !user?.isAdmin) {
            navigate('/profile');
        }
        dispatch(getSingleUser(id))
    }, [dispatch, id, navigate, user])

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo?.firstName);
            setLastName(userInfo?.lastName);
            setEmail(userInfo?.email);
            setIsAdmin(userInfo?.isAdmin)
        }
    }, [userInfo]);

    const handleSubmit = (e) =>{
        e?.preventDefault();
        const payload = {
            firstName,
            lastName,
            isAdmin
        }
        dispatch(userUpdateByAdmin(id, payload, navigate))
    }


    return loading ? <Loader /> : (
        <div className="useredit-container">
            <div className="useredit">
                <form onSubmit={handleSubmit}>
                    <h2>EDIT USER</h2>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            defaultValue={firstName}
                            required
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            defaultValue={lastName}
                            required
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            defaultValue={email}
                            required
                            placeholder="Enter Email Address"
                            onChange={(e) => setIsAdmin(e?.target?.checked)}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={isAdmin}
                            id="isAdmin"
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label htmlFor="isAdmin">Is Admin</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-save"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEditScreen;