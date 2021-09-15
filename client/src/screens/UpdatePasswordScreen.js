import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../assests/image/logo.png'
import { userUpdatePassword } from '../redux/action/userAction';
import Meta from '../components/Meta';

const UpdatePasswordScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [code, setCode] = useState(0);
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userUpdatePassword(code, password, navigate))
    }

    return (
        <>
            <Meta
                title={`Red Store | Update password`}
                keywords={'Shopping cart'}
            />
            <div className="forgot-password-container">
                <div className="forgot-div">
                    <div className="forgot-div-second">
                        <div className="forgot-header">
                            <img src={logo} alt="Redstore" width="125" />
                            <h3>Your New Password</h3>
                            <p>
                                Enter the verification code we just sent you on your email address.
                            </p>
                        </div>
                        <div className="forgot-middle">
                            <form onSubmit={submitHandler}>
                                <label>Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter code"
                                    onChange={(e) => setCode(Number(e.target.value))}
                                />
                                <label>New Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter new password"
                                    onChange={(e) => setPassword(e?.target?.value)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-black"
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                        <div className="forgot-footer">
                            <small>
                                Did you remembered your password?
                                <Link to="/login">Try Logging in</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePasswordScreen;