import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController= async(req,res) => {
         try{
            const {name}=req.body;
            if(!name){
                return res.status(401).send({msg:"Name is required"})
            }
            const existingCategory =await categoryModel.findOne({name})
            if(existingCategory){
                return res.status(200).send({
                    success:true,
                    msg:"Category Already exists"
                })
            }
            const category= await new  categoryModel({name,slug:slugify(name)}).save()
            res.status(201).send({
                success:true,
                msg:"New Category Created",
                category
            })

         }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                msg:"Error in Category"
            })
         };
};

// Update Category
export const updateCategoryController= async(req,res)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;
        const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            msg:"Category Updated Successfully",
            category
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            err,
            msg:"Error while updating category"
        })
    }
}

// Category Controller

export const categoryController= async(req,res)=>{
        try{
            const category=await categoryModel.find({})
            res.status(200).send({
                success:true,
                msg:"All Category List",
                category
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                msg:"Error white getting all the categories"
            })
        }
};
export const singleCategoryController=async(req,res)=>{
        try{
          
            const category= await categoryModel.findOne({slug:req.params.slug})
            res.status(200).send({
                success:true,
                msg:" Get Single Category",
                category,
            });

        }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                msg:"Error while finding one category"
            })
}
}

// delete Category 
export const deleteCategoryController = async(req,res) => {
        try{
         const{id}=req.params
          await categoryModel.findByIdAndDelete(id)
          res.status(200).send({
            success:true,
            msg:" Deleted Category",
          })
        }
        catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                msg:"Error while deleting category"
            })
}
}
