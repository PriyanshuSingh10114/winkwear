const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (_, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
