// 1.authenticate 
// 這個函數在用戶成功登入後呼叫，將相關信息(包含name和token)存儲在瀏覽器的 sessionStorage 中。
export const authenticate = (res, next) => {
    if (window !== 'undefined') {
        sessionStorage.setItem('token', JSON.stringify(res.data.token));
        sessionStorage.setItem('user', JSON.stringify(res.data.name));
    }
    // 將控制權移交給下一個中間件或路由處理函數
    next()
}

// 2.getToken
// 從 sessionStorage 中獲取存儲的使用者令牌（token）。
export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'))
        }
    } else {
        return false
    }
}

// 3.getUser
// 從 sessionStorage 中獲取存儲的使用者名稱。它檢查 sessionStorage 中是否存在使用者名稱，如果存在，則返回解析後的名稱，否則返回 false。
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'))
        }
    } else {
        return false
    }
}

// 4.logout
// 登出時 移除session中使用者token
export const logout = (next) => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert('已登出!');
    }
    next();
}
