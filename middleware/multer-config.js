const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// const maxSize = 1 * 1000 * 1000;
// var upload = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
//   // fileFilter: function (req, file, cb) {
//   //   // Set the filetypes, it is optional
//   //   var filetypes = /jpeg|jpg|png/;
//   //   var mimetype = filetypes.test(file.mimetype);

//   //   var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   //   if (mimetype && extname) {
//   //     return cb(null, true);
//   //   }

//   //   cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
//   // },
//   // mypic is the name of file attribute
// });

module.exports = multer({ storage: storage }).single("image");
// module.exports = multer({ storage: upload }).single("image");
