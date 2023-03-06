const {
  cloudinaryVideoUpload,
  videoTransfrom,
  cloudinaryImageUpload,
} = require("../config/cloudinary");

const pictureUpload = async (req, res) => {
  if (req.files !== undefined) {
    try {
      const vid = await cloudinaryVideoUpload(req.files.video.path);
      const pic = await cloudinaryImageUpload(req.files.picture.path);
      const transformedVid = videoTransfrom(vid, pic);
      res.status(200).json({
        sucess: true,
        video: transformedVid,
      });
    } catch (error) {
      res.status(400).json({
        sucess: false,
        error,
      });
    }
  } else {
    res.status(400).json({
      sucess: false,
      error: "No image was uploaded",
    });
  }
};

module.exports = {
  pictureUpload,
};
