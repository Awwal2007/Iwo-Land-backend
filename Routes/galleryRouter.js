const express = require('express');
const galleryRouter = express.Router();

const {
    createGalleryImage,
    getAllGalleryImage,
    getGalleryImageById,
    deleteGalleryImageById
} = require('../Controllers/galleryController');

const uploadNewsImages = require("../Config/multer");
const isLoggedIn = require('../Middlewares/isLoggedIn');

galleryRouter.get("/", getAllGalleryImage);
galleryRouter.get("/:id", getGalleryImageById);
galleryRouter.delete("/:id", isLoggedIn, deleteGalleryImageById);

galleryRouter.post(
    "/",
    isLoggedIn,
    uploadNewsImages.single("gallery"),
    createGalleryImage
);

module.exports = galleryRouter;
