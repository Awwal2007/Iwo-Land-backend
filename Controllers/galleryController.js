const galleryModel = require('../Models/gallery')

const createGalleryImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Gallery image is required",
      });
    }

    const gallery = await galleryModel.create({
      ...req.body,
      gallery: req.file.path.replace(/\\/g, "/"),
      createdBy: req.user?.id || null,
    });

    res.status(201).json({
      status: "success",
      message: "Gallery Image created successfully!",
      gallery
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};


const getAllGalleryImage = async (req, res, next)=>{
    try {

        const gallery = await galleryModel.find().sort({ createdAt: -1 });
        
        if(!gallery){
            return res.status(404).json({
                status: "error",
                message: "gallery image not found"
            })
        }

        if(gallery.length === 0){
            return res.status(200).json({
                status: "success",
                message: "There is no gallery image in the database",
                gallery: []
            })
        }

        res.status(200).json({
            status: 'success',
            message: "gallery image fetched!",
            gallery
        })
    } catch (error) {
        console.log(error);
        next(error)       
    }
}

const getGalleryImageById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const gallery = await galleryModel.findById(id)
        if(!gallery){
            return res.status(404).json({
                status: "error",
                message: `gallery image with this id: ${id} not found`
            })
        }

        res.status(200).json({
            status: 'success',
            message: "gallery image fetched!",
            gallery
        })
    } catch (error) {
        console.log(error);
        next(error)     
    }
}

const deleteGalleryImageById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const gallery = await galleryModel.findByIdAndDelete(id)
        if(!gallery){
            return res.status(404).json({
                status: "error",
                message: `gallery image with id: ${id} not found`
            })
        }
        res.status(202).json({
            status: "error",
            message: "gallery Image deleted successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

module.exports = {
    createGalleryImage,
    getAllGalleryImage,
    getGalleryImageById,
    deleteGalleryImageById,
}