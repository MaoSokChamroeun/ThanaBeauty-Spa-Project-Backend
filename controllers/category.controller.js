const Category = require('../models/Category.model');

const getAllCategory = async(req , res) => {
    try{
        const categories = await Category.find()
        if(!categories){
            return res.status(404).json({
                success : false,
                message :'Category not found'
            })
        }
        res.status(200).json({
            success : true,
            data : categories
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const createCategory = async(req , res) => {
    try{
        const {name , path} = req.body
        if(!name){
            return res.status(400).json({
                success :false,
                message : 'name are required'
            });
        }

        const categories = await Category.create({
            name : name,
            path : path
        })

        res.status(201).json({
            success : true,
            data : categories
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const findCategoryById = async (req,res) =>{
    try{
        const {id} = req.params;
        const categories = await Category.findById(id);
        if(!categories){
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            });
        }

        res.status(200).json({
            success : true,
            data : categories
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const updateCategoryById = async(req ,res) => {
    try{
        const {id} = req.params
        const {name , path} = req.body;
        const categories = await Category.findById(id)
        if(!categories){
            return res.status(404).json({
                success :false,
                message : 'Category not found'
            });
        }
        const dataUpdate = {
            name : name,
            path : path
        }
        const udpateCategory = await Category.findByIdAndUpdate(id,
            {$set : dataUpdate,},
            {new : true , runValidators : true}
        )

        res.status(200).json({
            success : true,
            data : udpateCategory
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const deleteCategoryById = async(req , res) => {
    try{
        const {id} = req.params;
        const deleteCategory = await Category.findByIdAndDelete(id)
        if(!deleteCategory) {
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            })
        }

        

        res.status(200).json({
            success : true,
            message :'Category delete successfully'
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const getPublicCategories = async(req , res) => {
    try{
        const publics = await Category.find();
        if(!publics){
            return res.status(404).json({
                success : false,
                message : 'Category not found'
            })
        }

        res.status(200).json({
            success : true,
            data : publics
        })
    }catch(error){
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}

module.exports = {getAllCategory , createCategory , findCategoryById , updateCategoryById , deleteCategoryById , getPublicCategories}