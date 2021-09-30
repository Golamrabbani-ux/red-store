import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginImage from '../assests/image/login.png'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login-lite';
import { facebookLogin, googleLogin, userRegister } from '../redux/action/userAction';
import Meta from '../components/Meta';


const SignupScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const { userInfo } = useSelector(state => state?.userLogin);
    const { loading: registerLoading } = useSelector(state => state?.userRegister);


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        const userInfo = {
            firstName,
            lastName,
            email,
            password
        }
        dispatch(userRegister(userInfo));
    }

    const responseGoogle = (response) => {
        dispatch(googleLogin(response?.tokenId))
    }

    const facebookOnSuccess = async (response) => {
        dispatch(facebookLogin({
            accessToken: response?.authResponse?.accessToken,
            userID: response?.authResponse?.userID,
        }))
    }


    return (
        <>
            <Meta
                title={`Red Store | Sign up`}
                keywords={'Shopping cart'}
            />
            <div className="sign-signup-area">
                <div className="withdraw-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="sign-signup-content">
                    <h2>Sign UP</h2>
                    <h3>Sign up your email account</h3>
                    <form onSubmit={submitHandler}>
                        <div className="grid-col">
                            <input
                                type="text"
                                required
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e?.target?.value)}
                            />
                            <input
                                type="text"
                                required
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e?.target?.value)}
                            />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            onChange={(e) => setEmail(e?.target?.value)}
                        />
                        <div className='input-area'>
                            <input
                                type={passwordShow ? 'text' : 'password'}
                                required
                                placeholder="password"
                                onChange={(e) => setPassword(e?.target?.value)}
                            />
                            <i 
                                className={`show-hide-password-btn ${passwordShow ?  'fas fa-eye' : 'fas fa-eye-slash'}`}
                                onClick={() =>setPasswordShow(!passwordShow)}
                            />
                        </div>

                        <button
                            className={registerLoading ? 'btn btn-black btn-disabled' : 'btn btn-black'}
                            type={registerLoading ? 'button' : 'submit'}
                            disabled={registerLoading}
                        >
                            Create Account
                        </button>
                        <div className="or-area">
                            <div className=""></div>
                            <p>Or Sign up with</p>
                            <div className=""></div>
                        </div>

                        <div className="social-login">
                            <div>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Login WIth Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div>
                                <FacebookLogin
                                    appId="342932780574646"
                                    onSuccess={facebookOnSuccess}
                                    isSignedIn={true}
                                />
                            </div>
                        </div>
                        <span>Already Have Any Account?<Link to='/login'>Signin</Link></span>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignupScreen;