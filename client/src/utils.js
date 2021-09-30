export const returnFirstWord = (sen) => {
    const quoteSentence = `${sen}'`;
    const splitSentence = quoteSentence.split(' ');
    const lastSen = sen.substr(sen.indexOf(' ') + 1);
    return { firstSen: splitSentence[0], lastSen };
}

export const numberToFixed = (num) => {
    return num.toFixed(2);
}

export const subTotal = (arr) => {
    const sum = arr?.reduce((accumulator, item) => {
        return accumulator + item?.qty * item?.price;
    }, 0)
    return sum;
}
export const shipping = num => {
    let shippingPrice = 0;
    if (num < 10) {
        shippingPrice = 0;
    } else if (num > 10 && num < 100) {
        shippingPrice = 5;
    }
    else if (num > 100 && num < 1000) {
        shippingPrice = 15;
    } else if (num > 1000) {
        shippingPrice = 20
    }
    return shippingPrice
}

export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100)?.toFixed(2);
}


export const sidebarUserData = [
    {
        title: "My Account",
        path: "/profile",
        active: 'profile',
        icon: <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'></path></svg>
    },
    {
        title: "Address",
        path: "/profile/address",
        active: 'address',
        icon: <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path></svg>
    },
    {
        title: "My Order List",
        path: "/profile/my-order",
        active: 'userorderlist',
        icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
    },
    {
        title: "Change Password",
        path: "/profile/change-password",
        active: 'changepassword',
        icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
    }
]

export const reviewsData = [
    {value: 1, label: '1-poor'},
    {value: 2, label: '2-fair'},
    {value: 3, label: '3-good'},
    {value: 4, label: '4-very good'},
    {value: 5, label: '5-Excelent'}
]