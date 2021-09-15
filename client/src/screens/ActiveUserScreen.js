import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activeUser } from '../redux/action/userAction';
import Loader from '../components/Loader';

const ActiveUserScreen = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state?.activeUser);
    const { loading: userLoading, userInfo } = useSelector(state => state?.userLogin);
    useEffect(() => {
        if (token) {
            dispatch(activeUser(token));
            navigate('/')
        } else if (userInfo) {
            navigate('/')
        }
        else {
            navigate('/')
        }
    }, [dispatch, navigate, token, userInfo])
    return loading || userLoading ? (
        <Loader></Loader>
    ) : null;
};

export default ActiveUserScreen;