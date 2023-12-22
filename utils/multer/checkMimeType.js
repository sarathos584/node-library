const checkMimeType = (file, cb) => {
    switch (file.fieldname) {
      case "video":
        if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") {
          cb(null, true);
        } else {
          cb(null, false);
        }
        break;
  
      case "image":
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }

      case "file":
        if (
          file.mimetype === "application/pdf" ||
          file.mimetype === "application/msword"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
        break;

      case "attachments":
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "application/pdf" ||
          file.mimetype === "application/msword" ||
          file.mimetype === "video/mp4" ||
          file.mimetype === "video/mkv"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
        break;

      // Add more cases if needed for other fieldnames
      default:
        cb(null, false); // Default case when fieldname doesn't match any specific case
        break;
    }
  }
  export default checkMimeType