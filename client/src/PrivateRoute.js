// 1.載入Route用於使用React路由模組
// 6.載入Redirect用於重定向到指定路由
import { Route, Redirect } from 'react-router-dom'
// 5.載入getUser用於判斷登入狀態及獲取用戶資訊
import { getUser } from "./helpers";

// 2.定義了一個名為 PrivateRoute 的組件，該組件是用來保護某些路由，只有在用戶登入的情況下才能訪問。
// 3.將傳入 PrivateRoute 組件的所有屬性（props）中的 component 屬性單獨提取出來，並將剩餘的屬性放入一個名為 rest 的對象中
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            // 4.展開其餘屬性(比如path="/"或 exact)
            {...rest}

            // 7.根據登入狀態決定渲染組件還是重定向
            // 如果getUser()返回 true，則 <Component {...props} /> 會渲染 Component，也就是成功登入後應訪問的組件
            // 如果getUser()返回 false，則 將用戶重定向到 /login 路由，同時將原始的 props.location 信息保存在 state 中，以便在登入後返回原來的位置。
            render={ props => getUser() ? (<Component {...props} />) : (
                <>
                {alert('請先登入')}
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                </>
            )}
        />
    )
}

// 8.匯出模組
export default PrivateRoute;