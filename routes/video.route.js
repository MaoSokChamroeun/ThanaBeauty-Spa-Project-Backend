const express = require('express')
const { createVideo, getVideo, findOneVideo, updateVideo, deleteVideo, getVideoPublic } = require('../controllers/video.controller')
const { authGuard } = require('../guard/authGuard.guard')
const { restricGuard } = require('../guard/restric.guard')
const { uploadVideoFile } = require('../controllers/upload.controller')

const videoRouter = express.Router()

videoRouter.route('/public')
            .get(getVideoPublic)
videoRouter.route('/')
            .post(authGuard, restricGuard("admin") , uploadVideoFile,  createVideo)
            .get(authGuard , restricGuard("admin") , getVideo)

videoRouter.route('/:id')
            .get(authGuard , restricGuard("admin") , findOneVideo)
            .put(authGuard , restricGuard("admin") , uploadVideoFile , updateVideo)
            .delete(authGuard , restricGuard("admin") , deleteVideo)
module.exports = videoRouter