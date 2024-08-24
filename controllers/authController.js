import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js"


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,question} = req.body;

        // Validation
        if (!name) {
            return res.send({ msg: "Name is required" });
        }
        if (!email) {
            return res.send({ msg: "Email is required" });
        }
        if (!password) {
            return res.send({ msg: "Password is required" });
        }
        if (!phone) {
            return res.send({ msg: "Phone number is required" });
        }
        if (!address) {
            return res.send({ error: "Address is required" });
        }
        if (!question) {
            return res.send({ error: "Question is required" });
        }

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                msg: "Already Registered, please login"
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,question }).save();

        res.status(201).send({
            success: true,
            msg: "User Registered successfully",
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Error in Registration",
            err
        });
    }
};

// POST LOGIN

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                msg: "Email and password are required"
            });
        }

        // Check User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Email is not registered"
            });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                msg: "Invalid password"
            });
        }

        // Generate token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


        res.status(200).send({
            success: true,
            msg: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            },
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Error in login",
            err
        });
    }
};

//Forgot Password
export const forgotpasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body;

        if (!email) {
            return res.status(400).send({ msg: "Email is required" });
        }
        if (!question) {
            return res.status(400).send({ msg: "Question is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ msg: "New password is required" });
        }

        const user = await userModel.findOne({ email, question });
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Invalid email or security question"
            });
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).send({
            success: true,
            msg: "Password reset successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            msg: "Internal server error",
            err
        });
    }
};


//Get 
export const testController=(req,res)=>{
   res.send("protected routes");
}

// Update Profile Controller
export const updateProfileController =  async(req,res)=>{
    try{
        const{name,email,password,address,phone}=req.body
        const user=await userModel.findById(req.user._id)
        //password
        if(password && password.length < 6){
            return res.json({error:'Password is required and 6 characters long'})

        }
        const hashedPassword= password ? await hashPassword(password):undefined
        const updatedUser= await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashedPassword || user.password,
            phone: phone || user. phone,
            address:address|| user.address

        },{
            new:true
        });
        res.status(200).send({
            success: true,
            msg: "Updated Profile Successfully",
            updatedUser
        });
    }
    catch(err){
        console.error(err);
        res.status(500).send({
            success: false,
            msg: "Error while updating profile",
            err
        });
    }
};

 //orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

  // All-Orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({createdAt:"-1"});
      res.json(orders);

      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting All Orders",
        error,
      });
    }
  };