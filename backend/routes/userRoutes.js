import express from 'express';
import {
    activeUser,
    authUser,
    getUserProfile,
    registerUser,
    googlelogin,
    facebooklogin,
    forgotpassword,
    forgotpasswordactivation,
    updateUserProfile,
    getUsers,
    deleteUser,
    userFindById,
    userUpdate
} from '../controllers/userController.js';
import {
    adminProtect,
    protect
} from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/users/register', registerUser);
router.post('/users/active/:activeToken', activeUser);
router.post('/users/login', authUser);
// Social login
router.post('/users/googlelogin', googlelogin);
router.post('/users/facebooklogin', facebooklogin);
// Forgot Password
router.put('/users/forgotpassword', forgotpassword);
router.put('/users/forgotpasswordactivation', forgotpasswordactivation);

router.get('/user/profile', protect, getUserProfile);
router.put('/user/profile', protect, updateUserProfile);
// Admin Access
router.get('/users', protect, adminProtect, getUsers);
router.delete('/users/:id', protect, adminProtect, deleteUser);
router.get('/users/:id', protect, adminProtect, userFindById);
router.put('/users/:id', protect, adminProtect, userUpdate);

export default router;