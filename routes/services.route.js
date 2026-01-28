const express = require('express');
const {
  getAllService,
  createServices,
  getServiceById,
  deleteServicesById,
  updateServiceById,
  getServiceByCategory,
  getAllServicePublic
} = require('../controllers/services.controller');
const { uploadServiceFile } = require('../controllers/upload.controller');
const { restricGuard } = require('../guard/restric.guard');
const { authGuard } = require('../guard/authGuard.guard');

const ServiceRouter = express.Router();
//public user router

ServiceRouter.route('/public')
            .get(getAllServicePublic);
// 1. Static/Base Routes
ServiceRouter.route('/')
  .get(authGuard , restricGuard("admin", "staff"), getAllService)
  .post(authGuard ,restricGuard("admin"), uploadServiceFile, createServices);

ServiceRouter.get('/category/:slug', getServiceByCategory);

// 3. ID Routes
ServiceRouter.route('/:id')
  .get(authGuard ,restricGuard("admin","staff"), getServiceById)
  .delete(authGuard ,restricGuard("admin"), deleteServicesById)
  .put(authGuard ,restricGuard("admin"), uploadServiceFile, updateServiceById);

module.exports = ServiceRouter;