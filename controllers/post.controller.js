const Post = require("../models/Post.model");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPostPublic = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {

    const { slug } = req.params; 
    const post = await Post.find({ slug: slug }).populate('author', 'username');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found in database",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
const createPost = async (req, res) => {
  try {
    const { slug, author, tags, isPublished } = req.body;
    const title = {
      en: req.body["title.en"],
      kh: req.body["title.kh"],
      ch: req.body["title.ch"],
    };

    const content = {
      en: req.body["content.en"],
      kh: req.body["content.kh"],
      ch: req.body["content.ch"],
    };
    if (
      !title.en ||
      !title.kh ||
      !slug ||
      !content.kh ||
      !content.en ||
      !author ||
      !tags ||
      !isPublished
    ) {
      return res.status(401).json({
        success: false,
        message:
          "tile , slug , content , author , tags , isPublished are required",
      });
    }
    const post = await Post.create({
      title: title,
      slug: slug,
      content: content,
      author: author,
      tags: tags,
      isPublished: isPublished,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Post successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const findPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("author", "username");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // ទាញយក data ពី body
    const { slug, author, tags, isPublished } = req.body;
    const postData = {
      slug: slug,
      author: author,
      tags: tags,
      isPublished:
        isPublished !== undefined ? isPublished : existingPost.isPublished,
      title: {
        en: req.body["title.en"],
        kh: req.body["title.kh"],
        ch: req.body["title.ch"],
      },
      content: {
        en: req.body["content.en"],
        kh: req.body["content.kh"],
        ch: req.body["content.ch"],
      },
    };

    // ប្រសិនបើមាន File រូបភាពថ្មី
    if (req.file) {
      postData.image = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: postData },
      { new: true, runValidators: true },
    ).populate("author", "username");

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const postDelete = await Post.findByIdAndDelete(id);
    if (!postDelete) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getAllPost,
  createPost,
  findPostById,
  updatePost,
  deletePost,
  getAllPostPublic,
  getPostById,
};
