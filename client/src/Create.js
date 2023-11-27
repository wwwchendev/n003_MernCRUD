// 1.載入useState
import { useState } from 'react'
// 9.載入axios
import axios from 'axios';
// 12.載入useHistory用於將應用程序導向到指定的路徑
import { useHistory } from 'react-router-dom';
// 15.載入getUser用於取得使用者資訊
// 17.載入getToken用於取得token
import { getUser, getToken } from './helpers'

// 載入其他組件
import Nav from './Nav'

const Create = () => {
    document.title = `新增貼文 | MERN CRUD`;

    // 2.用React-useState(初始值)來記憶表單內容的值
    // 16.應用使用者資訊
    const [state, setState] = useState({
        title: '',
        content: '',
        user: getUser(),
    })
    // 3.將State的屬性提取出來 並宣告
    const { title, content, user } = state

    // 13.在組件內部使用 useHistory
    const history = useHistory();

    // 6.onChange事件-調用setState更新狀態
    const handleChange = (name) => (event) => {
        // console.log(state)
        setState({ ...state, [name]: event.target.value })
    }

    // 8. onSubmit事件-
    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user})

        // 10.將API的URL存在.env環境變數中
        // 11.發送網路請求
        // 19.發送請求時表頭夾帶Token
        axios
            .post(`${process.env.REACT_APP_API}/post`,
                    { title, content, user },
                    { headers:{ authorization:`Bearer ${getToken()}` }}
                )
            .then(res => {
                //打印回傳結果
                console.log(res.data)
                //清空state
                setState({ ...state, title: '', content: '', user: '' })
                //顯示成功訊息
                alert(`已建立 ${res.data.title}`)
                // 14.在成功更新後導向到根路徑
                history.push('/');
            })
            .catch(err => {
                // 錯誤處理
                // 18.針對token未授權進行錯誤處理
                if(err.response.statusText==="Unauthorized"){
                    alert(`未授權Token`)
                }else{
                    alert(err.message)
                    alert(err)
                }      
                alert(err)       
            })
    }

    return (
        <div className="container p-5">
            <Nav />
            <h1>新增貼文</h1>
            <br />
            {/* {JSON.stringify(state)} */}
            {/* 7.設置onSubmit={handleSubmit} */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">標題</label>
                    <input
                        // 4.設置value={title}
                        value={title}
                        // 5.設置onChange={handleChange()}
                        onChange={handleChange('title')}
                        type="text"
                        className="form-control"
                        placeholder="文章標題"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">內容</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control"
                        placeholder="輸入內容...."
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">用戶</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="你的名稱"
                        required
                        disabled
                    />
                </div>
                <div className="">
                    <button className="btn btn-primary">提交</button>
                </div>
            </form>
        </div>
    )
}

export default Create;
