import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ err: "Name is required" })
            case !description:
                return res.status(500).send({ err: "Description is required" })
            case !price:
                return res.status(500).send({ err: "Price is required" })
            case !category:
                return res.status(500).send({ err: "Category is required" })
            case !quantity:
                return res.status(500).send({ err: "Quantity is required" })
            case photo && photo.size > 100000:
                return res.status(500).send({ err: "Photo is required and it should be less tban 1 mb " })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success: true,
            msg: "Product is saved",
            products
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Error in Product",
            err
        })
    }
};

// Get Product Controller 
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            msg: "All products",
            products
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Error in getting Product",
            err
        })
    }
};

//Get Single Product 
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo")
        res.status(200).send({
            success: true,
            msg: "Found the Single Product",
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Error in getting Single Product",
            err
        })
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)

        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            msg: "Error while getting photos",
            err
        });
    }
};

// Delete product 
export const productDeleteController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            msg: "Products deleted successfully"
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            msg: "Error while deleting products",
            err
        });
    }
};

// Update Product 
export const productUpdateController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};


// Filter Controller
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: "Error in Updte product",
        });
    }
};



export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    }
    catch {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: "Error in page count",
        });
    }
}


// Product List based on page 

export const productListController = async (req, res) => {
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        })
    }
    catch {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: "Error in per page",
        });
    }
};

// Search Product 
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};