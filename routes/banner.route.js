const express = require("express");
const { getAllBanners, createBanner, findBannerById, updateBannerById, deleteBannerById , getAllPublicBanners } = require("../controllers/banner.controller");
const { uploadBannerFile } = require("../controllers/upload.controller");
const { restricGuard } = require("../guard/restric.guard");
const {authGuard} = require('../guard/authGuard.guard')
const BannerRouter = express.Router();

BannerRouter.route("/public")
            .get(getAllPublicBanners)

BannerRouter.route("/")
    .get(authGuard ,restricGuard("admin"), getAllBanners)
    .post(authGuard ,restricGuard("admin"), uploadBannerFile, createBanner);

BannerRouter.route("/:id")
    .get(authGuard ,restricGuard("admin"), findBannerById)
    .put(authGuard ,restricGuard("admin"), uploadBannerFile, updateBannerById)
    .delete(authGuard ,restricGuard("admin"), deleteBannerById);
module.exports = BannerRouter;