const mongoose = require('mongoose')
const config = require('../utils/config')

console.log(`===> Ingresa a MODEL`)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const mongoUrl = config.MONGODB_URI  // process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog