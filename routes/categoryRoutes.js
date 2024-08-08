import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router=express.Router()

//routes

//Create-category route
router.post('/create-category',requireSignIn,isAdmin,createCategoryController )

// Update Category-route
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

//Get all the Categories
router.get("/get-categories",categoryController)

//Single Category
router.get("/single-category/:slug",singleCategoryController)

//delete Category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)


export default router