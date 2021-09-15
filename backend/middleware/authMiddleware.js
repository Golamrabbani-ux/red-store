import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.")
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.")
    }
})

const adminProtect = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as admin");
    }
})

export { protect, adminProtect }