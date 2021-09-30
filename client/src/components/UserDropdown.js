import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, userLogout } from '../redux/action/userAction';

const UserDropdown = () => {
    const dispatch = useDispatch();
    const [passwordShow, setPasswordShow] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { userInfo } = useSelector(state => state?.userLogin);

    const handleLogin = (e) => {
        e?.preventDefault();
        const userInfo = { email, password };
        dispatch(userLogin(userInfo))
    }

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
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
                            <form 
                                className="form"
                                onSubmit={handleLogin}
                            >
                                <div>
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="example@gmail.com" 
                                        required 
                                        onChange={(e) => setEmail(e?.target?.value)}
                                    />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <div className='input-area'>
                                        <input
                                            type={passwordShow ? 'text' : 'password'}
                                            required
                                            placeholder="password"
                                            onChange={(e) => setPassword(e?.target?.value)}
                                        />
                                            <i 
                                                className={`show-hide-password ${passwordShow ?  'fas fa-eye' : 'fas fa-eye-slash'}`}
                                                onClick={() =>setPasswordShow(!passwordShow)}
                                            />
                                    </div>
                                </div>
                                <button type="submit" className="btn login-btn">Login</button>
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
    )
}

export default UserDropdown
