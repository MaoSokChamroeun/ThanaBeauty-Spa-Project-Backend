const express = require('express')
const { createGallery, getGallery, findOneGallery, updateGallery, deleteGallery, getGalleryPublic } = require('../controllers/gallery.controller')
const { authGuard } = require('../guard/authGuard.guard')
const { restricGuard } = require('../guard/restric.guard')
const { uploadGalleryFile } = require('../controllers/upload.controller')

const galleryRouter = express.Router()

galleryRouter.route('/public')
            .get(getGalleryPublic)
galleryRouter.route('/')
            .post(authGuard, restricGuard("admin") , uploadGalleryFile,  createGallery)
            .get(authGuard , restricGuard("admin") , getGallery)

galleryRouter.route('/:id')
            .get(authGuard , restricGuard("admin") , findOneGallery)
            .put(authGuard , restricGuard("admin") , uploadGalleryFile , updateGallery)
            .delete(authGuard , restricGuard("admin") , deleteGallery)
module.exports = galleryRouter