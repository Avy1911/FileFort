const express = require('express')
const app = express()

require('dotenv').config()
const port = process.send.PORT || 4000

app.use(express.json())
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 100 * 1024 * 1024 },
}));

const db = require('./config/database')
db.connect()

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect()

const Upload = require('./routes/fileUpload')
app.use('/ap1/v1/upload' , Upload)

app.listen(port, () => {
    console.log(`app is ${port} pe chal rhi h`)
})
