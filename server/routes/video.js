const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
const multer = require("multer");
const path = require("path")


//=================================
//             Video
//=================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const fileFilter = function(req, file, cb) {
    let ext = path.extname(file.originalname)
    console.log(ext)
    if(ext !== '.mp4' && ext !== '.mov') {
        req.fileValidationError = "only mp4, mov file"
        return cb(new Error('Only images are allowed'))
    } 
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")

router.post("/uploadfiles", (req, res) => {

    // 비디오를 서버에 저장 multer 필요
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        } 
        return res.json({ success:true, url: res.req.file.path, fileName:res.req.file.filename })
    })

});


module.exports = router;
