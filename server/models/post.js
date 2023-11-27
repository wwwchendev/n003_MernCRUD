// 1.載入mongoose
const mongoose = require('mongoose')
// 2.(option)在 Mongoose 模型中，預設情況下，你不需要明確定義 _id 字段，Mongoose 會為你自動產生一個唯一的 ObjectID 作為 _id。如果你希望手動指定 _id 的值，你可以使用 ObjectID 對象，但在大多數情況下，使用 MongoDB 自動產生的唯一 _id 是常見做法。
const { ObjectID } = mongoose.Schema

// 3.定義資料模型(Mongoose Schema)
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        require: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
    },
    content: {
        type: {},
        required: true,
        min: 20,
        max: 2000000
    },
    user: {
        type: String,
        default: 'Admin'
    }
}, { timestamps: true })

// 4.匯出模組
// mongoose.model('Post', postSchema) 創建名為 "Post" 的模型（Model)
// 模型是 Mongoose 中的一個核心概念，它定義了與 MongoDB 集合（collection）之間的映射，並允許你進行 CRUD（創建、讀取、更新、刪除）操作。
module.exports = mongoose.model('Post', postSchema)

