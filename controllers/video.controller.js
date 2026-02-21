
const Video = require("../models/Video.model");

const getVideo = async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVideoPublic = async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createVideo = async (req, res) => {
    const {title} = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video is required",
      });
    }

    const video = await Video.create({
      video: req.file.path,
      title : title
    });

    res.status(201).json({
      success: true,
      message: "Video upload successfully",
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const findOneVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const {title} = req.body;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video is required",
      });
    }

    const videoData = await Video.findByIdAndUpdate(
      id,
      { video: req.file.path , title : title },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: videoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
    try{
        const id = req.params.id
        const video = await Video.findByIdAndDelete(id)
        if(!video){
            return res.status(404).json({
                success : false,
                message : 'Video not found'
            })
        }
        res.status(200).json({
            success : true,
            message : "Video has been deleted"
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
module.exports = {getVideoPublic , createVideo, getVideo, findOneVideo , updateVideo , deleteVideo };
