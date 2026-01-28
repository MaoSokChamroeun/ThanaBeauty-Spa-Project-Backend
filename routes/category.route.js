const express = require("express");
const {
  getAllCategory,
  createCategory,
  findCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getPublicCategories,
} = require("../controllers/category.controller");

const { restricGuard } = require("../guard/restric.guard");
const { authGuard } = require("../guard/authGuard.guard");

const CategoryRouter = express.Router();

CategoryRouter.route("/public").get(getPublicCategories);

CategoryRouter.route("/")
  .get(authGuard, restricGuard("admin", "staff"), getAllCategory)
  .post(authGuard, restricGuard("admin"), createCategory);

CategoryRouter.route("/:id")
  .get(authGuard, restricGuard("admin"), findCategoryById)
  .put(authGuard, restricGuard("admin"), updateCategoryById)
  .delete(authGuard, restricGuard("admin"), deleteCategoryById);

module.exports = CategoryRouter;
