import React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

const ProfileScreen = () => {
    const { userInfo } = useSelector(state => state?.userLogin);

    return (
        <div className="entry-content">
            <div className="left-side-content">
                <div className="header">
                    <img width="150" src={userInfo?.avater} alt={userInfo?.name} />
                    <h2>{userInfo?.name}</h2>
                    <p>{userInfo?.email}</p>
                </div>
                <Sidebar />
            </div>
            <div className="right-side-content">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfileScreen;