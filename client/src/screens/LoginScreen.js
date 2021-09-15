import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginImage from '../assests/image/login.png'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login-lite';
import { Link } from 'react-router-dom';
import { facebookLogin, googleLogin, userLogin } from '../redux/action/userAction';
import Meta from '../components/Meta';


const LoginScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, userInfo } = useSelector(state => state?.userLogin);

    const redirect = location?.search ? location?.search?.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        const userInfo = { email, password };
        dispatch(userLogin(userInfo))
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
                    title={`Red Store | Signin`}
                    keywords={'Shopping cart'}
            />
            <div className="sign-signup-area" >
                <div className="withdraw-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="sign-signup-content" style={{ marginTop: '50px' }}>
                    <h2>Sign in</h2>
                    <h3>Sign in your email account</h3>
                    <form onSubmit={submitHandler}>
                        <input
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            onChange={(e) => {
                                setEmail(e?.target?.value)
                            }}
                        />
                        <input
                            type="password"
                            required
                            placeholder="password"
                            onChange={(e) => setPassword(e?.target?.value)}
                        />
                        <button
                            className={loading ? 'btn btn-black btn-disabled' : 'btn btn-black'}
                            type={loading ? 'button' : 'submit'}
                            disabled={loading}
                        >
                            Sign in
                        </button>

                        <p
                            style={{ marginTop: '10px' }}>
                            <Link
                                to='/forgot-password'
                                className="danger"
                            >
                                Forgot password
                            </Link>
                        </p>


                        <div className="or-area">
                            <div className=""></div>
                            <p>Or Sign in with</p>
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
                        <span>
                            Don't have an account?
                            <Link to='/signup'>Sign up</Link>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginScreen;