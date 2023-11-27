// 1.載入useEffect用於處理組件的副作用
// 3.載入useState用於管理組件的狀態
import { useEffect, useState } from 'react';
// 11.載入axios用於發送網路請求
import axios from 'axios'
// 13.載入authenticate用於將成功登入後的token存在session
import { authenticate } from './helpers'

// 載入其他元件
import Nav from './Nav'

// 14.加入props參數
// React Router 路由器（例如 BrowserRouter）在 React 應用程序中用於處理路由，並根據 URL 的變化渲染相應的組件。
// 當某個路由匹配時，React Router 會將與該路由相關的信息包裝在 props 對象中，然後將這個 props 對象傳遞給相應的組件。
const Login = (props) => {
  // 4.管理登入頁面的表單狀態
  const [state, setState] = useState({
    name: '',
    password: '',
  });
  // 5.將State的屬性提取出來 並宣告
  const { name, password } = state;

  // 2.初次載入頁面時更新title
  useEffect(() => {
    document.title = "登入 | MERN CRUD"
    // getUser() && props.history.push('/')
  }, [])

  // 8.onChange事件-調用setState更新狀態
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value })
  }
  // 10.onSubmit事件
  const handleSubmit = event => {
    event.preventDefault();
    // console.table({name,password})

    // 12.請求登入
    axios
      .post(`${process.env.REACT_APP_API}/login`, { name, password })
      .then(res => {
        // 登入成功的話 響應物件會包含token和name
        // console.table(res.data)

        // 15.將token相關訊息存進sessionStorage後,
        // 這裡使用的箭頭函數 () => { props.history.push('/') } 作為 next 函數，
        // 當 authenticate 函數中的處理邏輯（設置 sessionStorage）完成後，它就會執行這個箭頭函數，進而將控制權轉交給下一個中間件或路由處理函數。 
        // props.history.push('/') 將應用程序導向到指定的路由。
        authenticate(res, () => {
          alert('登入成功!')
          props.history.push('/')
        })
      })
      .catch(err => {
        console.log(err.response)
        alert(err.response.data.error)
      })
  }

  // 6.切版出登入頁面
  // 7.監聽欄位變化事件
  // 9.監聽表單提交事件
  return (
    <div className='container p-5'>
      <Nav />
      {/* {JSON.stringify(state)} */}
      <br />
      <h1>登入</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">
            name/account
          </label>
          <input
            onChange={handleChange('name')} type="text"
            className="form-control"
            required />
        </div>
        <div className="form-group">
          <label className="text-muted">
            password
          </label>
          <input
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            required />
        </div>
        <div className="">
          <button className="btn btn-primary">登入</button>
        </div>
      </form>
    </div>
  );
}

export default Login;