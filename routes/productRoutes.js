import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createProductController, getProductController, getSingleProductController, productCountController, productDeleteController, productFilterController, productListController, productPhotoController, productUpdateController, searchProductController } from "../controllers/ProductController.js";
import formidable  from "express-formidable"

const router= express.Router()

//Routes // Create Product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

// Get Products
router.get('/get-product',getProductController)

// Single product
router.get('/get-product/:slug',getSingleProductController)

// Get Photo
router.get('/product-photo/:pid',productPhotoController)

// Delete Product
router.delete('/product-delete/:pid',productDeleteController)

// Update Product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),productUpdateController)

//Filter Product
router.post('/product-filters',productFilterController)

// Product Count
router.get('/product-count',productCountController);

//Product per Page
router.get('/product-list/:page',productListController)

//Search Controller
router.get('/search/:keyword',searchProductController)

export default router