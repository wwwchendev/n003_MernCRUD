// 1.載入Link
import { Link } from 'react-router-dom'
// 3.載入getUser用於檢查session是否存在使用者名稱，如果存在則返回解析後的名稱，否則返回 false。
// 6.載入logout用於移除session中使用者token。
import { getUser, logout } from './helpers'
// 7.載入withRouter將路由相關的屬性注入Nav組件的props中，確保組件能夠正確訪問路由相關的屬性，如 history。
import { withRouter } from 'react-router-dom'

// 9.加入props參數
// React Router 路由器（例如 BrowserRouter）在 React 應用程序中用於處理路由，並根據 URL 的變化渲染相應的組件。
// 當某個路由匹配時，React Router 會將與該路由相關的信息包裝在 props 對象中，然後將這個 props 對象傳遞給相應的組件。
const Nav = (props) => {
    return (
        <nav className='my-3'>
            <ul className='nav nav-tabs'>
                <li className='nav-item pr-3 pt-3 pb-3'>
                    {/* 2.使用 Link 來指定導航到的路徑 */}
                    <Link to="/">首頁</Link>
                </li>
                {   // 4.如果登入(session有user資料)時，顯示新增貼文登入按鈕
                    getUser() && (
                        <li className='nav-item pr-3 pt-3 pb-3'>
                            <Link to="/create">新增貼文</Link>
                        </li>
                    )
                }
                {   // 如果未登入(session沒有user資料)時，顯示登入按鈕
                    !getUser() &&
                    <li className='nav-item ml-auto pt-3 pb-3'>
                        <Link to="/login">登入</Link>
                    </li>
                }
                {   // 5.如果登入(session有user資料)時，顯示登出按鈕
                    // 10.點擊登出時轉址到根目錄
                    getUser() && (
                        <li className='nav-item pr-3 pt-3 pb-3 ml-auto' >
                            <span className='px-3'>{getUser()}您好</span>
                            <span   style={{ cursor: 'pointer',color:'#888' }}
                                    onClick={() => { logout(() => { props.history.push('/') }) }}>登出</span>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

// 8.使用withRouter包裹Nav組件
export default withRouter(Nav);