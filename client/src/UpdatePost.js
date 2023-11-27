// 1.載入useState用於當前post內容狀態管理
// 4.載入useEffect用於頁面載入後進行取得資料的請求
import { useState, useEffect } from 'react'
// 13.載入useHistory用於將應用程序導向到指定的路徑
import { useHistory } from 'react-router-dom';
// 5.載入axios
import axios from 'axios'
// 16.載入getToken用於取得token
import { getToken } from './helpers'

// 其他組件
import Nav from './Nav'

const UpdatePost = (props) => {

    // 2.初始化內容狀態
    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
        createdAt: '',
        updatedAt: '',
        slug: '',
    })

    // 3.將State的屬性提取出來 並宣告
    const { title, content, slug, user, createdAt, updatedAt } = state

    // 14.在組件內部使用 useHistory
    const history = useHistory();

    // 6.在頁面載入時發送請求
    // React Router 路由器（例如 BrowserRouter）在 React 應用程序中用於處理路由，並根據 URL 的變化渲染相應的組件。
    // 當某個路由匹配時，React Router 會將與該路由相關的信息包裝在 props 對象中，然後將這個 props 對象傳遞給相應的組件。
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(res => {
                // 7.更新內容狀態
                const { title, content, slug, user, createdAt, updatedAt } = res.data;
                setState({ ...state, title, content, slug, user, createdAt, updatedAt })
                // 設置瀏覽器標籤的title
                document.title = `編輯貼文-${title} | MERN CRUD`;
            })
            .catch(err => {
                alert('請求貼文時發生錯誤');
                console.log(err)
            })
    }, []);

    // 10.onChange事件-調用setState更新狀態
    const handleChange = (name) => (event) => {
        console.log(state)
        setState({ ...state, [name]: event.target.value })
    }

    //12.onSubmit事件
    const handleSubmit = event => {
        event.preventDefault();
        // 點擊提交發送update請求後,server會response資料庫更新後的貼文資料
        // 18.發送請求時表頭夾帶Token
        axios.put(`${process.env.REACT_APP_API}/post/${slug}`, 
                    { title, content, user },
                    { headers:{ authorization:`Bearer ${getToken()}` }}
                    )
            .then(res => {
                // console.log(res)
                //將從server打回來的資料宣告成變數
                const { title, content, slug, user, createdAt, updatedAt } = res.data;
                // 將state資料與server同步
                setState({ ...state, title, content, slug, user, createdAt, updatedAt })
                // 顯示成功訊息
                alert(`貼文已更新 ${title}`)

                // 15.在成功更新後導向到根路徑
                history.push('/');
            })
            .catch(err => {
                // 17.針對token未授權進行錯誤處理
                if(err.response.statusText==="Unauthorized"){
                    alert(`未授權Token`)
                }else{
                    alert(err.response.data.error)
                }    
            })
    }

    // 9.單獨撰寫form的元件以提升可讀性
    // 14.監聽提交 onSubmit={handleSubmit}>
    const showUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">標題</label>
                    <input
                        // 11.監聽變更 onChange={handleChange("title")}
                        onChange={handleChange("title")}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder='文章標題'
                        required />
                </div>
                <div className="form-group">
                    <label className="text-muted">內容</label>
                    <textarea
                        onChange={handleChange("content")}
                        value={content}
                        className="form-control"
                        placeholder='輸入文章內容'
                        style={{ height: '200px' }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange("user")}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder='你的名稱'
                        required
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">createdAt:</label>
                    <span> {new Date(createdAt).toLocaleString()}</span>
                </div>
                <div className="form-group">
                    <label className="text-muted">updatedAt:</label>
                    <span> {new Date(updatedAt).toLocaleString()}</span>
                </div>
                <div className="">
                    <button className="btn btn-primary">更新</button>
                </div>
            </form>
        )
    }

    return (
        // 8.將狀態內容渲染到畫面上
        <div className='container p-5'>
            <Nav />
            <h1>編輯貼文</h1>
            <br />
            {/* {JSON.stringify(state)} */}
            {showUpdateForm()}
        </div >
    )
}

export default UpdatePost;