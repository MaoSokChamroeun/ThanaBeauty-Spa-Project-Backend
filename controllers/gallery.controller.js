const Gallery = require("../models/gallery.model");

const getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    if (!galleries) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGalleryPublic = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    if (!galleries) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const gallery = await Gallery.create({
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const findOneGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const galleryData = await Gallery.findByIdAndUpdate(
      id,
      { image: req.file.path },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: galleryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
    try{
        const id = req.params.id
        const gallery = await Gallery.findByIdAndDelete(id)
        if(!gallery){
            return res.status(404).json({
                success : false,
                message : 'Gallery not found'
            })
        }
        res.status(200).json({
            success : true,
            message : "Gallery has been deleted"
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
module.exports = {getGalleryPublic , createGallery, getGallery, findOneGallery , updateGallery , deleteGallery };
