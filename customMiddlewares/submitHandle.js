const fs = require('fs')
const mime = require('mime')
const base64 = require('base-64')

const fileUpload = (req, res, next) => {
    if (req.file) {
        req.body.base64Content = base64.encode(req.body.content)
        const fileName = `${req.file.filename}.${mime.getExtension(req.file.mimetype)}`
        fs.renameSync(`./public/uploads/${req.file.filename}`, `./public/uploads/${fileName}`)
        req.file.fileName = fileName
    }
    next();
}

module.exports = fileUpload