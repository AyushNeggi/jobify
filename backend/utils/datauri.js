import DataUriParser from "datauri/parser.js"                //Converts the uploaded file (from multer) into a base64 string with proper MIME type.

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;