import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb)=> cb(null, 'src/uploads/'),
    filename: (req, file, cb)=> cb(null, Date.now() + '_' + file.originalname)
});

const fileFilter = (req, file, cb)=>{
    const allowedType = ['image/jpg', 'image/png', 'image/jpeg'];

    if(allowedType.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error('only image files are allowed'), false)
    }
}

const upload = multer({storage, fileFilter});
export default upload;