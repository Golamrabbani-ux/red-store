import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description Fetching all products
// @route GET /api/products
// @access Public
const getProduct = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

    const products = await Product.find({...keyword});
    res.json(products);
})

// @description Fetching single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found")
    }
})
// @description Delete a single product
// @route DELETE /api/products/:id
// @access PRIVATE / ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product delete successfully." })
    } else {
        res.status(404);
        throw new Error("Product not found.")
    }
})
// ADMIN
// @description CREATE A PRODUCT
// @route POST /api/products
// @access PRIVATE / ADMIN
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createProduct = await product.save();
    res.status(201).json(createProduct);
})
// @description UPDATE A PRODUCT
// @route PUT /api/products/:id
// @access PRIVATE / ADMIN
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.status(201).json(updateProduct);

    } else {
        res.status(404);
        throw new Error("Product not found")
    }
})

// @description Review A PRODUCT
// @route PUT /api/products/:id/reviews
// @access PRIVATE 
const reviewProduct = asyncHandler(async (req, res) => {
    const { name, rating, comment, image} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        const alreadyReviwed = product.reviews.find(review => review.user.toString() === req.user.toString());
        if(alreadyReviwed){
            res.status(400);
            throw new Error("Already product review")
        }else{
            const newReview = {
                name,
                comment,
                image,
                rating:Number(rating),
                user:req.user
            }
            product.reviews.push(newReview);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            await product.save();
        
            res.status(201).json({message: 'Review added'});

        }
   }else{
        res.status(404);
        throw new Error("Product not found")
    }
})

export {
    getProduct,
    getProductById,
    deleteProduct,
    createProduct,
    reviewProduct,
    updateProduct
}