const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
    },

    tags: {
        type: String,
    },

    email: {
        type: String,
    }
})

fileSchema.post('save' , async function(doc) {
    try {
        
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        //to send mail
        let info = await transporter.sendMail({
            from : `Me`,
            to : doc.email,
            subject :'new file upload on cloudinary',
            html :`<h1>file uploaded</h1> <a hred = '${doc.imageUrl}'>${doc.imageUrl}</a>`
        })
        
    } 
    catch (error) {
        console.error(error)
    }
})

const File = mongoose.model('File' , fileSchema)
module.exports = File