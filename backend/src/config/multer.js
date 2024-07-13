const multer = require("multer")
const path = require("node:path")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("product_images"))
    },

    filename: (req, file, callback) => {
        const time = new Date().getTime()
        req.imagename = `${time}_${file.originalname}`

        callback(null, `${time}_${file.originalname}`)
    }
})

module.exports = storage
