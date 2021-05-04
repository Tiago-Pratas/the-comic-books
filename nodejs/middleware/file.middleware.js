import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

//use --dirname with es6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const validFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
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
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const filePath = req.file.path;
            const image = await cloudinary.uploader.upload(filePath);
            fs.unlinkSync(filePath);
            req.file_url =
                image.secure_url ||
                'https://i.pinimg.com/originals/22/51/d8/2251d8473fb7d7bd155a974753aa7a96.jpg';
            return next();
        } catch (err) {
            return next(err);
        }
    } else {
        return next();
    }
};

export { upload, uploadToCloudinary };
