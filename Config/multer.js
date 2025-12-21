const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Iwo-Blogs",
    allowed_formats: ["png", "jpg", "gif", "jpeg"],
  },
});

const uploadNewsImages = multer({ storage });

module.exports = uploadNewsImages;
