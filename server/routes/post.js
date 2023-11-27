// 1.載入express
const express = require('express')
// 2.在express中新增一組路由
const router = express.Router()
// 3.載入控制器
const { create, list, read, update, remove } = require('../controllers/post')
// 5.載入驗證JWT機制
const { requireSignin } = require('../controllers/auth')

// 4.設計路由
// http://localhost:8000/**/*/post

// 6.在需要驗證登入狀態的路由中加入requireSignin中間件以驗證JWT
router.post('/post', requireSignin, create)
// http://localhost:8000/**/*/posts
router.get('/posts', list)
router.get('/post/:slug', read)
router.put('/post/:slug', requireSignin, update)
router.delete('/post/:slug', requireSignin, remove)

// 5.匯出路由模組
module.exports = router

