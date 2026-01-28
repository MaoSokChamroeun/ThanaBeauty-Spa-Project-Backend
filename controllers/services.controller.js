const Service = require('../models/Services.model')
const Category = require('../models/Category.model')
const getAllService = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const services = await Service.find(query).populate("category", "name path");
    if (services.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No services found for this category",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllServicePublic = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const services = await Service.find(query).populate("category", "name path");
    if (services.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No services found for this category",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getServiceByCategory = async (req, res) => {
    try {
        const { slug } = req.params; 
        const fullPath = `/services/${slug}`;
        const category = await Category.findOne({ path: fullPath });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found for this path"
            });
        }
        const services = await Service.find({ category: category._id })
            .populate('category', 'name path');
        
        res.status(200).json({ 
            success: true, 
            data: services 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const createServices = async (req, res) => {
  try {
    const { price, category, duration } = req.body;

    // បង្កើត Object សម្រាប់ភាសាដោយដៃពី req.body
    const title = {
      en: req.body['title.en'],
      kh: req.body['title.kh'],
      ch: req.body['title.ch']
    };

    const description = {
      en: req.body['description.en'],
      kh: req.body['description.kh'],
      ch: req.body['description.ch']
    };

    // ឆែកលក្ខខណ្ឌ (Validation)
    if (!title.en || !title.kh || !price || !description.en || !duration) {
      return res.status(400).json({
        success: false,
        message: "គ្រប់ភាសាទាំងអស់សម្រាប់ Title, Description និង Price/Duration គឺចាំបាច់ត្រូវមាន។",
      });
    }

    const services = await Service.create({
      title,
      description,
      price,
      category,
      duration,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      success: true,
      message: "បង្កើតសេវាកម្មបានជោគជ័យ!",
      data: services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate('category');
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service, // The frontend expects res.data.data
    });
  } catch (error) {
    res.status(500).json({
      success: false, // Added success: false for consistency
      message: error.message,
    });
  }
};

const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ឆែកមើលថាតើ Service មានក្នុង DB ឬអត់
    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "រកមិនឃើញសេវាកម្មដែលត្រូវកែប្រែឡើយ",
      });
    }

    // ១. ប្រមូលទិន្នន័យ Title និង Description តាមភាសានីមួយៗពី req.body
    const title = {
      kh: req.body['title.kh'] || existingService.title.kh,
      en: req.body['title.en'] || existingService.title.en,
      ch: req.body['title.ch'] || existingService.title.ch
    };

    const description = {
      kh: req.body['description.kh'] || existingService.description.kh,
      en: req.body['description.en'] || existingService.description.en,
      ch: req.body['description.ch'] || existingService.description.ch
    };

    // ២. រៀបចំទិន្នន័យសម្រាប់ Update
    const updateData = {
      title: title,
      description: description,
      price: req.body.price || existingService.price,
      category: req.body.category || existingService.category,
      duration: req.body.duration || existingService.duration
    };

    // ៣. ប្រសិនបើមានការប្តូររូបភាពថ្មី
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "កែប្រែសេវាកម្មបានជោគជ័យ",
      data: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const services = await Service.findByIdAndDelete(id);
    if (!services) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "service delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllService,
  createServices,
  getServiceById,
  deleteServicesById,
  updateServiceById,
  getServiceByCategory,
  getAllServicePublic
};
