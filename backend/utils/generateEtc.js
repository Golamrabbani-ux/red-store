const generateString = () => {
    const len = 8;
    let uniqueString = "";
    for (let i = 0; i < len; i++) {
        const ch = Math.floor(Math.random() * 10 + 1);
        uniqueString += ch;
    }
    return uniqueString
}

const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export {
    generateString,
    generateUniqueNumber
};