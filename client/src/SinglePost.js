// 1.載入useState用於當前post內容狀態管理
// 3.載入useEffect用於頁面載入後進行取得資料的請求
import { useState, useEffect } from 'react'
// 4.載入axios
import axios from 'axios'

// 其他組件
import Nav from './Nav'

const SinglePost = (props) => {
    // console.log(JSON.stringify(props));

    // 2.初始化內容狀態
    const [post, setPost] = useState('')

  // 5.在頁面載入時發送請求
  // React Router 路由器（例如 BrowserRouter）在 React 應用程序中用於處理路由，並根據 URL 的變化渲染相應的組件。
  // 當某個路由匹配時，React Router 會將與該路由相關的信息包裝在 props 對象中，然後將這個 props 對象傳遞給相應的組件。
  // {"history":{
  // 	"length":7,
  // 	"action":"PUSH",
  // 	"location":{"pathname":"/post/我的第2篇貼文","search":"","hash":"","key":"lzj24b"}},
  //    "match":{"path":"/post/:slug","url":"/post/我的第2篇貼文","isExact":true,"params":{"slug":"我的第2篇貼文"}}
  // }
  // ${props.match.params.slug} 是從路由中獲取的動態路徑參數。
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(res => {
                // 6.更新post內容狀態
                setPost(res.data)
                // 設置瀏覽器標籤的title
                document.title = `${res.data.title} | MERN CRUD`;
            })
            .catch(err => {
                alert('請求貼文時發生錯誤');
                console.log(err)
            })
    }, []);

    return (
        // 7.將狀態內容渲染到畫面上
        <div className='container p-5'>
            <Nav />
            <br />
            <h1>{post.title}</h1>
            <br />
            <p className="lead">{post.content}</p>
            <p>
                Author
                <span className="badge">{post.user}</span>
                Published on {''}<span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
        </div>
    )
}

export default SinglePost;