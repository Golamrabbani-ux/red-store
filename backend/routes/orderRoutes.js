import express from 'express';
import { adminProtect, protect } from '../middleware/authMiddleware.js';
import {
    addOrderItems,
    getOrderById,
    orderUpdateToPay,
    getMyOrder,
    getAllOrders,
    orderUpdateToDelever
} from '../controllers/orderController.js'


const router = express.Router();

router.get('/orders/my-order', protect, getMyOrder);
router.get('/orders/:id', protect, getOrderById);
router.put('/orders/:id/pay', protect, orderUpdateToPay);

router.post('/create-order', protect, addOrderItems);

router.get('/allorders', protect, adminProtect, getAllOrders);
router.put('/orders/:id/delever', protect, adminProtect, orderUpdateToDelever);

export default router;