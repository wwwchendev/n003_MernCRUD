// 1.載入express模組
const express = require('express')

// 2.建立Express應用
const app = express()

// 3.載入中間件模組
const morgan = require('morgan')//用途:http-request日誌
const bodyParser = require('body-parser')//用途:解析http-request
const cors = require('cors')//用途:瀏覽器中處理跨域請求機制
const mongoose = require('mongoose')
require('dotenv').config()

// 4.使用中間件模組
app.use(cors()) 
app.use(morgan('dev')) //說明:使用morgan的'dev'模式
app.use(bodyParser.json()) 

// 5.設計路由與回應內容(可跳過)
// app.get('*', (req, res) => {
//     res.json({
//         data: '你觸發了nodejs-crud-API!',
//     })
// })

// 8.連接資料庫
mongoose
    .connect(process.env.DATABASE,{})
    .then(()=>console.log('資料庫已連接'))
    .catch(err=>{console.error("資料庫連接錯誤", err);})

// 9.載入路由模組(註解掉或移除第5步驟的程式碼)
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

// 10.設定路徑與對應路由
//任何以 /api 開頭的請求都將交給 postRoutes 處理
app.use('/api',postRoutes)
app.use('/api',authRoutes)

// 6.監聽指定端口，讓Express應用程式開始接收來自客戶端的 HTTP請求
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`伺服器正在運行端口: ${port}`)
})

// 7.執行``$ node server.js`將運行伺服器 
