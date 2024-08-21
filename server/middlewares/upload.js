import multer from "multer";

// STORE IMAGE IN DISK
// const storage = multer.diskStorage({ destination: (req, file, cb) => {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

/* STORE IMAGE IN MEMORY */
const storage = multer.memoryStorage();
const upload = multer({ storage, storage });

export default upload;
