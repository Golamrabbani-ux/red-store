import React from 'react';

const Loader = () => {
    return (
        <div
            className='loader'
            style={{ backgroundColor: '#0008', color: '#fff', zIndex: 20 }}
        >
            <svg width='130' height='130' viewBox='0 0 40 50'>
                <polygon
                    strokeWidth='1'
                    stroke='#fff'
                    fill='none'
                    points='20,1 40,40 1,40'
                ></polygon>
                <text fill='#fff' x='5' y='47'>
                    Loading
                </text>
            </svg>
        </div>
    );
};

export default Loader;