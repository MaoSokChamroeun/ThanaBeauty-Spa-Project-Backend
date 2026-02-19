const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createStorage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
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
  const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp","video/mp4", "video/mkv", "video/quicktime"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png .webp are allowed!"), false);
  }
};
const uploadVideo = multer({
  storage : createStorage("videos"),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});
const uploadService = multer({
  storage: createStorage("services"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
const uploadPost = multer({
  storage: createStorage("posts"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
const uploadGallery = multer({
  storage: createStorage("gallery"),
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

const uploadPostFile = (req, res, next) => {
  uploadPost.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a service image" });
    next();
  });
};
const uploadVideoFile = (req, res, next) => {
  uploadVideo.single("video")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a service image" });
    next();
  });
};

const uploadGalleryFile = (req, res, next) => {
  uploadGallery.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a service image" });
    next();
  });
};
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

module.exports = { uploadServiceFile, uploadPackageFile, uploadBannerFile , uploadPostFile , uploadGalleryFile , uploadVideoFile };
