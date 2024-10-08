import express from 'express';
import { forgotpasswordController, getAllOrdersController, getOrdersController, loginController, registerController, testController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";


const router = express.Router();

// Register route
router.post('/register', registerController);

// Login route
router.post('/login', loginController);

//test
router.get("/test", requireSignIn, isAdmin, testController)

//Protected  route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//Protected  Admin route
router.get("/admin-auth", requireSignIn,isAdmin ,(req, res) => {
    res.status(200).send({ ok: true });
})

//Update Profile
router.put('/profile',requireSignIn,updateProfileController)


// Forgot Route || POST
router.post("/forgotpassword",forgotpasswordController)


// orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", isAdmin,requireSignIn, getAllOrdersController);


export default router;
