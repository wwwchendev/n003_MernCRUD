// 1.載入express
const express = require('express')
// 2.在express中新增一組路由
const router = express.Router()
// 3.載入控制器
const {login} = require('../controllers/auth') 

// 4.設計路由
// http://localhost:8000/**/*/login
router.post('/login', login)

// 5.匯出路由模組
module.exports =router