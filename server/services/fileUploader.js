const cloudinary = require("cloudinary").v2;

exports.uploadCSVToCloudinary = async (filePath, folder) => {
  const options = { folder,use_filename:true };
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(filePath, options);
};
