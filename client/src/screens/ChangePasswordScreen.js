import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import { userLoginPasswordChange } from '../redux/action/userAction';

const ChangePasswordScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState(null);
    const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
    const [newPasswordShow, setNewPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const { userInfo } = useSelector(state => state?.userLogin);
    const { register, handleSubmit, reset , formState: { errors,} } = useForm();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo])

    const onSubmit = (data) => {
        if(data?.newPassword !== data?.confirmPassword){
            setPasswordError("Confirm password doesn't match.");
        }else{
            setPasswordError(null);
            const userInfo = { 
                oldPassword: data?.currentPassword, 
                newPassword:data?.newPassword 
            }
            dispatch(userLoginPasswordChange(userInfo, reset));
        }
    }

    const handlePasswordCancel = () =>{
        reset()
    }

    return (
        <>
            <Meta
                title={`Red Store | Change Password`}
            />
            <div className="userinfo">
                <div className="header">
                    <h2>Personal Information</h2>
                </div>
                <div className="details" style={{ marginTop: '30px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className='input-area'>
                                <input
                                    type={currentPasswordShow ? 'text' : 'password'}
                                    id="currentPassword"
                                    {...register('currentPassword', {
                                            required: true,
                                            minLength: 5, 
                                            maxLength: 10 
                                        })
                                    } 
                                />
                                <i 
                                    className={`show-hide-password-btn ${currentPasswordShow ?  'fas fa-eye' : 'fas fa-eye-slash'}`}
                                    onClick={() =>setCurrentPasswordShow(!currentPasswordShow)}
                                />
                            </div>
                            {errors.currentPassword && errors.currentPassword.type === "required" && <span className='error'>Current password is required.</span>}
                            {errors.currentPassword && errors.currentPassword.type === "minLength" && <span className='error'>Current password must be at least 5 characters long.</span>}
                            {errors.currentPassword && errors.currentPassword.type === "maxLength" && <span className='error'>Current password can be max 10 characters long.</span> }
                        </div>

                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <div className='input-area'>
                                <input
                                    type={newPasswordShow ? 'text' : 'password'}
                                    id="newPassword"
                                    {...register('newPassword', {
                                            required: true,
                                            minLength: 5, 
                                            maxLength: 10 
                                        })
                                    } 
                                />
                                <i 
                                    className={`show-hide-password-btn ${newPasswordShow ?  'fas fa-eye' : 'fas fa-eye-slash'}`}
                                    onClick={() =>setNewPasswordShow(!newPasswordShow)}
                                />
                            </div>
                            {errors.newPassword && errors.newPassword.type === "required" && <span className='error'>New password is required.</span>}
                            {errors.newPassword && errors.newPassword.type === "minLength" && <span className='error'>New password must be at least 5 characters long.</span>}
                            {errors.newPassword && errors.newPassword.type === "maxLength" && <span className='error'>New password can be max 10 characters long.</span> }
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className='input-area'>
                                <input
                                    type={confirmPasswordShow ? 'text' : 'password'}
                                    id="confirmPassword"
                                    {...register('confirmPassword')} 
                                />
                                <i 
                                    className={`show-hide-password-btn ${confirmPasswordShow ?  'fas fa-eye' : 'fas fa-eye-slash'}`}
                                    onClick={() =>setConfirmPasswordShow(!confirmPasswordShow)}
                                />
                            </div>
                            {passwordError && <span className='error'>{passwordError}</span>}
                        </div>


                        <div className='btn-area'>
                            <button
                                className="btn btn-cancel"
                                type="button"
                                onClick={handlePasswordCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={'btn btn-save'}
                                type="submit"
                            >
                                Save
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordScreen;