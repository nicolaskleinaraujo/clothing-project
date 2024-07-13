const multer = require("multer")
const path = require("node:path")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("product_images"))
    },

    filename: (req, file, callback) => {
        const time = new Date().getSeconds()

        callback(null, `${time}_${file.originalname}`)
    }
})

module.exports = storage
