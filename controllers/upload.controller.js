// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const createStorage = (folderName) => {
//   return multer.diskStorage({
//     destination: (req, file, cb) => {
//       const folderPath = path.join(__dirname, "../public", folderName);
//       if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath, { recursive: true });
//       }
//       cb(null, folderPath);
//     },
//     filename: (req, file, cb) => {
//       const extName = path.extname(file.originalname);
//       const uniqueName = Date.now();
//       cb(null, uniqueName + extName);
//     },
//   });
// };
// const fileFilter = (req, file, cb) => {
//   const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp","video/mp4", "video/mkv", "video/quicktime"];
//   if (allowTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpg and .png .webp are allowed!"), false);
//   }
// };
// const uploadVideo = multer({
//   storage : createStorage("videos"),
//   limits: { fileSize: 50 * 1024 * 1024 },
//   fileFilter,
// });
// const uploadService = multer({
//   storage: createStorage("services"),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });
// const uploadPost = multer({
//   storage: createStorage("posts"),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });
// const uploadGallery = multer({
//   storage: createStorage("gallery"),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });
// const uploadPackage = multer({
//   storage: createStorage("packages"),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });

// const uploadBanner = multer({
//   storage : createStorage("banners"),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 },
// })

// const uploadPostFile = (req, res, next) => {
//   uploadPost.single("image")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a service image" });
//     next();
//   });
// };
// const uploadVideoFile = (req, res, next) => {
//   uploadVideo.single("video")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a service image" });
//     next();
//   });
// };

// const uploadGalleryFile = (req, res, next) => {
//   uploadGallery.single("image")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a service image" });
//     next();
//   });
// };
// const uploadServiceFile = (req, res, next) => {
//   uploadService.single("image")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a service image" });
//     next();
//   });
// };
// const uploadPackageFile = (req, res, next) => {
//   uploadPackage.single("image")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a package image" });
//     next();
//   });
// };

// const uploadBannerFile = (req, res, next) => {
//   uploadBanner.single("image")(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     if (!req.file)
//       return res.status(400).json({ message: "Please select a banner image" });
//     next();
//   });
// };

// module.exports = { uploadServiceFile, uploadPackageFile, uploadBannerFile , uploadPostFile , uploadGalleryFile , uploadVideoFile };
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// 1. Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Storage Factory for Cloudinary
const createCloudStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const isVideo = file.mimetype.startsWith("video");
      return {
        folder: `thanabeauty/${folderName}`, // Organized by folders in Cloudinary
        resource_type: isVideo ? "video" : "image",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov"],
        public_id: Date.now() + "-" + file.originalname.split(".")[0],
      };
    },
  });
};

const fileFilter = (req, file, cb) => {
  const allowTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/mkv",
    "video/quicktime",
  ];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed!"), false);
  }
};

// 3. Define Multer Instances
const uploadVideo = multer({
  storage: createCloudStorage("videos"),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadService = multer({
  storage: createCloudStorage("services"),
  fileFilter,
});
const uploadPost = multer({ storage: createCloudStorage("posts"), fileFilter });
const uploadGallery = multer({
  storage: createCloudStorage("gallery"),
  fileFilter,
});
const uploadPackage = multer({
  storage: createCloudStorage("packages"),
  fileFilter,
});
const uploadBanner = multer({
  storage: createCloudStorage("banners"),
  fileFilter,
});

// 4. Middleware Functions (Keep names same as your old code)
const uploadPostFile = (req, res, next) => {
  uploadPost.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select an image" });
    next();
  });
};

const uploadVideoFile = (req, res, next) => {
  uploadVideo.single("video")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select a video" });
    next();
  });
};

const uploadGalleryFile = (req, res, next) => {
  uploadGallery.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select an image" });
    next();
  });
};

const uploadServiceFile = (req, res, next) => {
  uploadService.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select an image" });
    next();
  });
};

const uploadPackageFile = (req, res, next) => {
  uploadPackage.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select an image" });
    next();
  });
};

const uploadBannerFile = (req, res, next) => {
  uploadBanner.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file)
      return res.status(400).json({ message: "Please select an image" });
    next();
  });
};

module.exports = {
  uploadServiceFile,
  uploadPackageFile,
  uploadBannerFile,
  uploadPostFile,
  uploadGalleryFile,
  uploadVideoFile,
};
