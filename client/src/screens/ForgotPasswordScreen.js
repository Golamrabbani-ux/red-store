import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../assests/image/logo.png';
import { userForgotPassword } from '../redux/action/userAction';
import Meta from '../components/Meta';

const ForgotPasswordScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userForgotPassword(email, navigate))
    }

    return (
        <>
            <Meta
                title={`Red Store | Forget Password`}
                keywords={'Shopping cart'}
            />
            <div className="forgot-password-container">
                <div className="forgot-div">
                    <div className="forgot-div-second">
                        <div className="forgot-header">
                            <img src={logo} alt="Redstore" width="125" />
                            <h3>Forgot Your Password</h3>
                            <p>
                                Don't worry.Resetting your password is easy.Just type
                                in the email your registered Boardme.
                            </p>
                        </div>
                        <div className="forgot-middle">
                            <form onSubmit={submitHandler}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    onChange={(e) => setEmail(e?.target?.value)}
                                />
                                <button
                                    className="btn btn-black"
                                    type="submit"
                                >
                                    SEND CODE
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

export default ForgotPasswordScreen;