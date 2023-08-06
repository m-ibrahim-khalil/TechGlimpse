import { cloudinary } from "../configs/cloudinary.config.js";
import { environment } from "../configs/environment.config.js";
import { HttpError } from "../utils/httpError.js";
import { StatusCode } from "../utils/statusCode.js";


const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/"))
    return cb(
      new HttpError(
        StatusCode.FORBIDDEN,
        "Only jpg, jpeg and png files are allowed."
      ),
      false
    );

  if (file.size > 5 * 1024 * 1024)     // 5 MB (5 * 1024 * 1024)
    return cb(
      new HttpError(StatusCode.FORBIDDEN, "File size must be less than 5 MB."),
      false
    );

  return cb(null, true);
};


export const uploadImage = async (req, res, next) => {
  if (!req.file) return next();

  cloudinary.uploader
    .upload_stream(
      {
        folder: environment.CLOUDINARY_FOLDER,
        resource_type: "image",
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return next(
            new HttpError(
              StatusCode.INTERNAL_SERVER_ERROR,
              "Error while uploading image."
            )
          );
        }

        req.file = result;
        next();
      }
    )
    .end(req.file.buffer);
};