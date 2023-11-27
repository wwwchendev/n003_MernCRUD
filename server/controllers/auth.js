// 1.載入'jsonwebtoken'用於生成和驗證 JWT
const jwt = require('jsonwebtoken')
// 5.載入'express-jwt'用於在Express應用中進行JWT驗證。
const expressJwt = require('express-jwt');

// 2.宣告用來處理登入的方法
exports.login = async (req, res) => {
    try {
        console.log(process.env.JWT_SECRET)
        // 3.解構並宣告請求物件中的變數
        const { name, password } = req.body
        // 4.如果密碼輸入正確
        if (password === process.env.PASSWORD) {
            // 4.生成JWT令牌 並發送給客戶端
            // (1)使用`jsonwebtoken`中的`sign`方法生成JWT
            // 生成的 JWT 將被賦值給變數 `token`，你可以將這個 token 用於在應用程序中進行身份驗證或其他需要安全性的操作。當客戶端攜帶這個 token 向服務器發送請求時，服務器可以使用相同的密鑰來驗證 token 的簽名，確保 token 的合法性。
            // (2)`jwt.sign(payload, secretOrPrivateKey, [options])` 
            // `payload`: 是要包含在 JWT 中的信息，通常是一個包含用戶相關信息的對象。
            // `secretOrPrivateKey`: 是用於簽署 JWT 的密鑰。在這個例子中，密鑰被存儲在環境變量 `process.env.JWT_SECRET` 中，這是一個良好的實踐，以便保持密鑰的機密性。
            // `options`: 是一個包含額外選項的對象，例如 過期時間`expiresIn`，用於指定 JWT 的過期時間為 `'1d'`，表示 JWT 在生成後的一天內過期。
            const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' })
            return res.json({ token, name })
        } else {
            res.status(400).json({
                error: '密碼錯誤'
            });
        }
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// 6.宣告用來處理驗證的方法
// expressJwt自動處理請求中的 JWT 驗證是否有效，並在有效的情況下將用戶信息添加到 request 對象中。
// 如果 JWT 無效，它會返回相應的錯誤，減少了手動處理 JWT 驗證的複雜性。
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
})