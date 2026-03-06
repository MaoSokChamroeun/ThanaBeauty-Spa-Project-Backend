const Packages = require('../models/Package.model');


const getAllPackage = async (req, res) => {
  try {
    const packages = await Packages.find();
    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPublicPackage = async (req, res) => {
  try {
    const packages = await Packages.find();
    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const packages = await Packages.findById(id);

    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createPackage = async (req, res) => {
  try {
    const title = {
      en: req.body["title.en"],
      kh: req.body["title.kh"],
      ch: req.body["title.ch"],
    };
    const description = {
      en: req.body["description.en"],
      kh: req.body["description.kh"],
      ch: req.body["description.ch"],
    };
    if (!title.en || !title.kh || !title.ch) {
      return res.status(400).json({
        success: false,
        message: "package name , title are required",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Choose your image!",
      });
    }
    const newPackage = await Packages.create({
      title: title,
      description: description,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      message: "Create successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPackageFront = async (req, res) => {
  try {
    const title = {
      en: req.body["title.en"],
      kh: req.body["title.kh"],
      ch: req.body["title.ch"],
    };
    const description = {
      en: req.body["description.en"],
      kh: req.body["description.kh"],
      ch: req.body["description.ch"],
    };
    if (!title.en || !title.kh || !title.ch) {
      return res.status(400).json({
        success: false,
        message: "package name , title are required",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Choose your image!",
      });
    }
    const newPackage = await Packages.create({
      title: title,
      description: description,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      message: "Create successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const exitPackage = await Packages.findById(id);
    if (!exitPackage) {
      return res.status(404).json({
        success: false,
        message: "package not found",
      });
    }
    
    const updateData = {
      title: {
        en: req.body["title.en"],
        kh: req.body["title.kh"],
        ch: req.body["title.ch"],
      },
      description: {
        en: req.body["description.en"],
        kh: req.body["description.kh"],
        ch: req.body["description.ch"],
      },
    };

    if (req.file) {
      updateData.image = req.file.path;
    }
    const newUpate = await Packages.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Package update successfully",
      data: newUpate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const packages = await Packages.findByIdAndDelete(id);
    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllPackage,
  createPackage,
  findPackageById,
  deletePackage,
  updatePackageById,
  createPackageFront,
  getPublicPackage,
};
