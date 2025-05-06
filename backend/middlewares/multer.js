import multer from "multer";

//to receive file you have to use multer

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");