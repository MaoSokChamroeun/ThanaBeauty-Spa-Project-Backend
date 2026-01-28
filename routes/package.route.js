const express = require('express')
const {getAllPackage, createPackage, findPackageById , updatePackageById , deletePackage , getPublicPackage, createPackageFront} = require('../controllers/package.controller');
const {uploadPackageFile} = require('../controllers/upload.controller');

const { restricGuard  } = require('../guard/restric.guard');
const {authGuard} = require('../guard/authGuard.guard')
const PackageRouter = express.Router();

PackageRouter.route('/public')
            .get(getPublicPackage)
            .post(createPackageFront)

PackageRouter.route('/')
            .get(authGuard , restricGuard("admin") , getAllPackage)
            .post(authGuard , restricGuard("admin") , uploadPackageFile ,createPackage)

PackageRouter.route('/:id')
            .get(authGuard, restricGuard("admin") , findPackageById)
            .delete(authGuard, restricGuard("admin") ,deletePackage)
            .put(authGuard, restricGuard("admin") , uploadPackageFile , updatePackageById)
module.exports = PackageRouter