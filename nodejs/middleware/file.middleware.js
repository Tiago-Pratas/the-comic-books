import multer from 'multer';
import fs from 'fs';
import path from 'path';

//use --dirname with es6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const validFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
});

const fileFilter = (req, file, cb) => {
    if (validFiles.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error('Invalidad file type!');
        cb(error);
    }
}

const upload = multer({
    storage,
    fileFilter,
});


export{ upload };