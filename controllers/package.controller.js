const Packgae = require('../models/Packages.models');
const Package = require('../models/Packages.models');

const getAllPackage = async(req , res) =>{
    try{
        const packages = await Package.find();
        if(!packages){
            return res.status(404).json({
                success : false,
                message : 'Package not found'
            });
        }
        res.status(200).json({
            success : true,
            data : packages
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const getPublicPackage = async(req , res) =>{
    try{
        const packages = await Package.find();
        if(!packages){
            return res.status(404).json({
                success : false,
                message : 'Package not found'
            });
        }
        res.status(200).json({
            success : true,
            data : packages
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const findPackageById = async(req ,res) => {
    try{
        const {id} = req.params
        const packages = await Package.findById(id)

        if(!packages){
            return res.status(404).json({
                success : false,
                message : 'Package not found'
            })
        }
        res.status(200).json({
            success : true,
            data : packages
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const createPackage = async (req, res) => {
    try {
        const { package_name, price , description } = req.body;
        if (!package_name || !price) {
            return res.status(400).json({
                success: false,
                message: 'package name , price are required'
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Choose your image!'
            });
        }
        // ៣. បង្កើត record ថ្មីក្នុង database
        const newPackage = await Package.create({
            package_name: package_name,
            price: price,
            description : description,
            image: req.file ? req.file.filename : null
        });

        res.status(201).json({
            success: true,
            message: 'Create successfully',
            data: newPackage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createPackageFront = async (req, res) => {
    try {
        const { package_name, price , description } = req.body;
        if (!package_name || !price) {
            return res.status(400).json({
                success: false,
                message: 'package name , price are required'
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Choose your image!'
            });
        }
        // ៣. បង្កើត record ថ្មីក្នុង database
        const newPackage = await Package.create({
            package_name: package_name,
            price: price,
            description : description,
            image: req.file ? req.file.filename : null
        });

        res.status(201).json({
            success: true,
            message: 'Create successfully',
            data: newPackage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatePackageById = async(req ,res) => {
    try{
        const {package_name , price , description} = req.body;
        const {id} = req.params;

        const exitPackage = await Packgae.findById(id);
        if(!exitPackage){
            return res.status(404).json({
                success : false,
                message : 'package not found'
            });
        }
        const updateData = {
            package_name : package_name,
            price : price,
            description : description
        };

        if(req.file){
            updateData.image = req.file.filename
        }
        const newUpate = await Package.findByIdAndUpdate(
            id,
            {$set : updateData},
            {new : true , runValidators : true}
        )

        res.status(200).json({
            success : true,
            message : 'Package update successfully',
            data : newUpate
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const deletePackage = async(req , res) => {
    try{    
        const {id} = req.params
        const packages = await Package.findByIdAndDelete(id)
        if(!packages){
            return res.status(404).json({
                success : false,
                message : 'Package not found'
            });
        }

        res.status(200).json({
            success : true,
            message : 'Package delete successfully'
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {getAllPackage , createPackage , findPackageById , deletePackage , updatePackageById, createPackageFront , getPublicPackage}