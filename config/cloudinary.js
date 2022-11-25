const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudinaryVideoUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        resource_type: "video",
        allowed_formats: ["mkv", "mp4"],
      })
      .then((result) => {
        resolve(result.public_id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const cloudinaryImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file)
      .then((result) => {
        resolve(result.public_id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const videoTransfrom = (vid, img) =>
  cloudinary.video(vid, {
    transformation: [
      {
        overlay: img,
        width: 200,
        height: 200,
      },
    ],
  });

module.exports = {
  cloudinaryVideoUpload,
  cloudinaryImageUpload,
  videoTransfrom,
};
