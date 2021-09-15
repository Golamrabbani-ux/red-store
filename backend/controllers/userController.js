import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { google } from 'googleapis';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken, generateActiveToken } from '../utils/generateToken.js';
import { sendMailActiveLink, sendMailForgotPassword } from '../utils/sendMail.js';
import { generateUniqueNumber } from '../utils/generateEtc.js';

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID);


// @description Register User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(401);
        throw new Error("Already Register User");
    } else {
        const userActiveToken = generateActiveToken(req.body);
        const url = `${process.env.CLIENT_URI}/verify/${userActiveToken}`;
        const fullName = `${firstName} ${lastName}`
        sendMailActiveLink(email, fullName, url)
        res.json({ message: `Account activation link has sent to ${email}` });
    }
})

// @description Active User
// @route POST /api/users/active/:activeToken
// @access Public
const activeUser = asyncHandler(async (req, res) => {
    const { activeToken } = req.params;
    const decoded = await jwt.verify(activeToken, process.env.JWT_SECRET);
    const userExists = await User.findOne({ email: decoded.payload.email });
    if (userExists) {
        res.status(401);
        throw new Error("Already Register User");
    } else {
        const createUser = await User.create(decoded.payload);
        if (createUser) {
            res.json({
                _id: createUser._id,
                name: createUser.firstName + ' ' + createUser.lastName,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
                avater: createUser.avater,
                token: generateToken(createUser._id)
            })
        } else {
            res.status(401);
            throw new Error("Something wrong")
        }
    }
})

// @description Google User
// @route POST /users/googlelogin
// @access Public
const googlelogin = asyncHandler(async (req, res) => {
    const { tokenId } = req.body;
    const result = await oAuth2Client.verifyIdToken({ idToken: tokenId, audience: process.env.CLIENT_ID })
    const { email, given_name, family_name, picture } = result.payload;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.json({
            _id: userExists._id,
            name: userExists.firstName + ' ' + userExists.lastName,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
            avater: userExists.avater,
            token: generateToken(userExists._id)
        })
    } else {
        const createUser = await User.create({
            firstName: given_name,
            lastName: family_name,
            email,
            password: email + process.env.CLIENT_ID,
            avater: picture
        })
        if (createUser) {
            res.json({
                _id: createUser._id,
                name: createUser.firstName + ' ' + createUser.lastName,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
                avater: createUser.avater,
                token: generateToken(createUser._id)
            })
        } else {
            res.status(401);
            throw new Error("Something wrong")
        }
    }
})

// @description Facebook User
// @route POST /users/facebooklogin
// @access Public
const facebooklogin = asyncHandler(async (req, res) => {
    const { accessToken, userID } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v3.0/${userID}/?fields=id,first_name,last_name,middle_name,email,picture&access_token=${accessToken}`
    const data = await fetch(urlGraphFacebook)
        .then(res => res.json())
        .then(json => json);
    const { first_name, last_name, email, picture } = data;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.json({
            _id: userExists._id,
            name: userExists.firstName + ' ' + userExists.lastName,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
            avater: userExists.avater,
            token: generateToken(userExists._id)
        })
    } else {
        const createUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: email + process.env.CLIENT_ID,
            avater: picture.data.url
        })
        if (createUser) {
            res.json({
                _id: createUser._id,
                name: createUser.firstName + ' ' + createUser.lastName,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
                avater: createUser.avater,
                token: generateToken(createUser._id)
            })
        } else {
            res.status(401);
            throw new Error("Something wrong")
        }
    }

})

// @description Users Forgot Password
// @route POST /users/forgotpassword
// @access Public
const forgotpassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        const name = userExists.firstName + ' ' + userExists.lastName;
        const uniqueNumber = generateUniqueNumber();
        sendMailForgotPassword(email, name, uniqueNumber);
        await User.updateOne(userExists, { uniqueNumber });
        res.json({ message: `Password activation link has sent to ${email}` })
    } else {
        res.status(404);
        throw new Error("User Not Found")
    }
})

// @description Users Forgot Password Activation
// @route POST /users/forgotpasswordactivation
// @access Public
const forgotpasswordactivation = asyncHandler(async (req, res) => {
    const { uniqueNumber, password } = req.body;
    const bcryptPassword = bcrypt.hashSync(password, 10)
    const user = await User.findOne({ uniqueNumber });
    if (user) {
        await User.updateOne(user, { password: bcryptPassword, uniqueNumber: 0 });
        res.json({ message: `Password change successfully` })
    } else {
        res.status(401);
        throw new Error("Wrong activation code.");
    }
})

// @description Auth User Login
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const matchPassword = await bcrypt.compare(password, user.password);
        if (matchPassword) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                avater: user.avater,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error("Invalid Password")
        }
    } else {
        res.status(401)
        throw new Error("Invalid email address")
    }
})

// @description User Profile
// @route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            avater: user.avater,
            token: generateToken(user._id)
        })
    } else {
        res.status(404);
        throw new Error("User Not Found")
    }
})

// @description Update User Profile Like firstName, lastName, avater, password
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.avater = req.body.avater || user.avater

        if (req.body.newPassword) {
            if (req.body.oldPassword) {
                if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                    user.password = req.body.newPassword
                } else {
                    res.status(400);
                    throw new Error("Current password is wrong");
                }
            }
            else {
                res.status(400);
                throw new Error("Current password is required")
            }
        }

        const updateUser = await user.save();
        if (updateUser) {
            res.json({
                _id: updateUser._id,
                name: updateUser.firstName + ' ' + updateUser.lastName,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                avater: updateUser.avater,
                token: generateToken(updateUser._id)
            })
        } else {
            res.status(500);
            throw new Error("Something wrong")
        }

    } else {
        res.status(404);
        throw new Error("User not found")
    }
})

// Admin Controllers
// @description Get all users
// @route GET /api/users
// @access Private / Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.json(users);
    } else {
        res.status(404);
        throw new Error("User not found.")
    }
})
// @description Delete User
// @route DELETE /api/users/:id
// @access Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove();
        res.status(201).json({ message: "User remove Successfully." })
    } else {
        res.status(404);
        throw new Error("User not found.")
    }
})
// @description GET  UserById 
// @route GET /api/users/:id
// @access Private / Admin
const userFindById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("User not found.")
    }
})

// @description PUT  User update 
// @route PUT /api/users/:id
// @access Private / Admin
const userUpdate = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.isAdmin = req.body.isAdmin

        const updateUser = await user.save();
        if (updateUser) {
            res.json({
                _id: updateUser._id,
                name: updateUser.firstName + ' ' + updateUser.lastName,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                avater: updateUser.avater,
            })
        }

    } else {
        res.status(404);
        throw new Error("User not found.")
    }
})

export {
    registerUser,
    activeUser,
    authUser,
    forgotpassword,
    forgotpasswordactivation,
    getUserProfile,
    googlelogin,
    facebooklogin,
    updateUserProfile,
    getUsers,
    deleteUser,
    userFindById,
    userUpdate
};