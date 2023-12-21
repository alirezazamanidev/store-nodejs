const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
function createRoute(req) {
  const date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth().toString();
  let day = date.getDay().toString();
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  const dir = path.join(
    __dirname,
    `..`,
    "..",
    `public`,
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = String(new Date().getTime() + ext);
    req.body.filename=fileName;
    cb(null, fileName);
  },
});
function fileFilter(req,file,cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4",'.jpg', ".mpg", ".mov", ".avi", ".mkv"];
    if (mimetypes.includes(ext)) {
      return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده ویدیو صحیح نمیباشد"));
}
const UploadFile = multer({
  storage,
  limits:{fileSize:(1*1000*1000)},
  fileFilter
});

module.exports = {
  UploadFile,

};
