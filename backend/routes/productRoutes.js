import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProductById,
    updateProduct,
    reviewProduct
} from '../controllers/productController.js';
import {
    adminProtect,
    protect
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.post('/products/:id/reviews', protect, reviewProduct);
// Admin
router.post('/products', protect, adminProtect, createProduct);
router.put('/products/:id', protect, adminProtect, updateProduct);
router.delete('/products/:id', protect, adminProtect, deleteProduct);


export default router;