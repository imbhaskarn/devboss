const fs = require('fs')
const mime = require('mime')
const base64 = require('base-64')

const fileUpload = (req, res, next) => {
    if (req.file) {
        // Create buffer object, specifying utf8 as encoding
        let bufferObj = Buffer.from(req.body.content, "utf8");
        req.body.base64Content = bufferObj
        const fileName = `${req.file.filename}.${mime.getExtension(req.file.mimetype)}`
        fs.rename(`./public/uploads/${req.file.filename}`, `./public/uploads/${fileName}`, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
        req.file.fileName = fileName
    }
    next();
}

module.exports = fileUpload