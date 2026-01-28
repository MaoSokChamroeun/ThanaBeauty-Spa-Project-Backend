const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createStorage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // បង្កើត path ទៅកាន់ public/services ឬ public/packages
      const folderPath = path.join(__dirname, "../public", folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const extName = path.extname(file.originalname);
      const uniqueName = Date.now();
      cb(null, uniqueName + extName);
    },
  });
};
const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png .webp are allowed!"), false);
  }
};

const uploadService = multer({
  storage: createStorage("services"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadPackage = multer({
  storage: createStorage("packages"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadBanner = multer({
  storage : createStorage("banners"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
})

const uploadServiceFile = (req, res, next) => {
  uploadService.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a service image" });
    next();
  });
};
const uploadPackageFile = (req, res, next) => {
  uploadPackage.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a package image" });
    next();
  });
};

const uploadBannerFile = (req, res, next) => {
  uploadBanner.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a banner image" });
    next();
  });
};

module.exports = { uploadServiceFile, uploadPackageFile, uploadBannerFile };
