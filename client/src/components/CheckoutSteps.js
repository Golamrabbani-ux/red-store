import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from "react-icons/bs";

const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <div className="step-con">
            <div >
                {
                    step1 ?
                        <div className='step'>
                            <Link to='/shipping'>
                                Shipping
                            </Link>
                            <BsChevronRight />
                        </div>
                        :
                        <div className='step'>
                            <span>
                                Shipping
                            </span>
                            <BsChevronRight />
                        </div>
                }
            </div>
            <div >
                {
                    step2 ?
                        <div className='step'>
                            <Link to='/payment'>
                                Payment
                            </Link>
                            <BsChevronRight />
                        </div>
                        :
                        <div className='step'>
                            <span>
                                Payment
                            </span>
                            <BsChevronRight />
                        </div>
                }
            </div>
            <div >
                {
                    step3 ?
                        <div className='step'>
                            <Link to='/placeorder'>
                                Place Order
                            </Link>
                            <BsChevronRight />
                        </div>
                        :
                        <div className='step'>
                            <span>
                                Place Order
                            </span>
                            <BsChevronRight />
                        </div>
                }
            </div>
        </div>
    );
};

export default CheckoutSteps;