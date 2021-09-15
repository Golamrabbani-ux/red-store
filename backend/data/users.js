import bcrypt from 'bcryptjs'

const users = [
    {
        firstName: 'Admin ',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        firstName: 'Jakir',
        lastName: 'Rahaman',
        email: 'jakir@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;