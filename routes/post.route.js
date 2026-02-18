const express = require('express')
const {getAllPost, createPost, findPostById, updatePost, deletePost, getAllPostPublic, getPostById} = require('../controllers/post.controller');
const { uploadPostFile } = require('../controllers/upload.controller');
const {authGuard} = require('../guard/authGuard.guard')
const {restricGuard} = require('../guard/restric.guard')
const postRouter = express.Router();

postRouter.route("/public")
        .get(getAllPostPublic)

postRouter.get('/slug/:slug' , getPostById)

postRouter.route("/")
            .get(authGuard, restricGuard("admin"), getAllPost)
            .post(authGuard , restricGuard("admin") , uploadPostFile ,createPost)
            
postRouter.route('/:id')
        .get(authGuard, restricGuard("admin"), findPostById)
        .put(authGuard , restricGuard("admin") , uploadPostFile, updatePost)
        .delete(authGuard , restricGuard("admin") , deletePost)
module.exports = postRouter