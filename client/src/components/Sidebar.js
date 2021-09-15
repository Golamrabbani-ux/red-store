import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { sidebarUserData } from '../utils';

const Sidebar = () => {
    const location = useLocation();
    const [active, setActive] = useState(null);

    useEffect(() => {
        setActive(location?.pathname);
    },[location?.pathname])

    return (
        <div className='sidebar'>
            {
                sidebarUserData?.map((item, index) =>
                    <Link
                        to={`${item?.path}`}
                        key={item?.title}
                        onClick={() => setActive(item?.path)}
                    >
                        <div
                            className={active === item?.path ? 'item active-item' : 'item'}>
                            {item?.icon}
                            <span>{item?.title}</span>
                        </div>
                    </Link>
                )
            }
        </div>
    );
};

export default Sidebar;