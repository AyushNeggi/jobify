import multer from "multer";                  //multer is middleware to handle file uploads in Node.js.

const storage = multer.memoryStorage();          //to receive file you have to use multer  memoryStorage() keeps the file in RAM, not saved to disk.→ Faster access + needed when uploading to Cloudinary right after.

export const singleUpload = multer({storage}).single("file");            //.single("file") means you expect one file with the name "file" from the frontend.