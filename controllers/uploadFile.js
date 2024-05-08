const { trusted } = require('mongoose')
const File = require('../models/file')
const cloudinary = require('cloudinary')

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder }

    if (quality)
        options.quality = quality

    options.resource_type = 'auto'
    await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.localFileUpload = async (req, res) => {

    try {

        const file = req.files.files
        console.log('file arrived - ', file)

        // gives path where the file has to be stored on server
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`
        console.log('path - ', path)

        file.mv(path, (err) => {
            console.log(err)
        })

        res.json({
            success: true,
            message: "file uploaded successfully"
        })

    }

    catch (error) {

        console.log(error)
    }

}

exports.imageUpload = async (req, res) => {

    try {

        const { name, tags, email } = req.body
        console.log(name, tags, email)

        const file = req.files.imageFile

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(fileType, supportedTypes)) {

            return res.status(400).json({
                success: false,
                message: 'file format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file, 'codehelp')
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message: 'image successfully uploaded'
        })
    }
    catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

exports.videoUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body
        const file = req.files.videoFile

        const supportedTypes = ['mp4', 'mov']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(file, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'file format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file, 'codehelp')
        const fileData = await File.create({
            name, tags, email, videoUrl: response.secure_url
        })

        res.json({
            success: true,
            message: 'video successfully uploaded'
        })

    }
    catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

exports.imageSizeReducer = async (req, res) => {

    try {
        const { name, tags, email } = req.body
        console.log(name, tags, email)

        const file = req.files.imageFile

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(fileType, supportedTypes)) {

            return res.status(400).json({
                success: false,
                message: 'file format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file, 'codehelp', 90)
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message: 'image successfully uploaded'
        })
    }
    catch (error) {

    }
}