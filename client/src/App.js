import axios from 'axios';
// 1.載入useEffect用於頁面載入後進行取得資料的請求
// 3.載入useState用於當前post內容狀態管理
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './helpers'
// 12.載入getToken用於取得token
import { getToken } from './helpers'

// 載入其他組件
import Nav from './Nav'

const App = () => {
  document.title = `首頁 | MERN CRUD`;
  // -讀取列表
  // 2.初始化列表狀態
  const [post, setPosts] = useState([])

  // 5.發送get請求
  const fetchPost = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then(res => {
        // 6.取得資料後更新post狀態
        // console.log(res)
        setPosts(res.data)
      })
      .catch(err => {
        // 錯誤處理 
        alert('請求貼文列表時發生錯誤');
        console.log(err)
      })
  }
  // 4.在頁面載入時發送請求
  useEffect(() => { fetchPost() }, []);

  // 10.監聽刪除按鈕觸發刪除機制
  const deleteConfirm = (slug, title) => {
    let answer = window.confirm(`確定要刪除貼文 ${title} 嗎?`)
    if (answer) {
      deletePost(slug)
    }
  }

  // 11.發送請求刪除貼文
  const deletePost = async (slug) => {
    try {
      // 14.發送請求時表頭夾帶Token
      // console.log('delete',slug,'post')
      const res = await axios.delete(`${process.env.REACT_APP_API}/post/${slug}`,
        { headers: { authorization: `Bearer ${getToken()}` } }
      )
      alert(res.data.message)
      // 更新畫面
      fetchPost()
    } catch (err) {
      // 13.針對token未授權進行錯誤處理
      if (err.response.statusText === "Unauthorized") {
        alert(`未授權Token`)
      } else {
        alert(err.response.data.error)
      }
    }
  }

  return (
    <div className="container p-5">
      <Nav />
      <h1 className='mb-3'>CRUD MERN</h1>

      { // 7.將伺服器傳回的post資料顯示在畫面中
        post.map((post, idx) => (
          <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">

              <div className="row">
                <div className="col-md-10">
                  {/* 這裡設置單篇文章的url slug-應與server端裡post controller當中內容呼應 */}
                  <Link to={`/post/${post.title}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p className="lead">{post.content.substring(0, 100)}...</p>
                  <p>
                    作者
                    <span className="badge">{post.user}</span>
                    Published on {''}<span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                  </p>
                </div>
                {
                  getUser() && (
                    <div className="col-md-2">
                      {/* 8.加入編輯按鈕 */}
                      <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning ">
                        編輯
                      </Link>
                      {/* 9.加入刪除按鈕 */}
                      <button onClick={() => { deleteConfirm(post.slug, post.title) }}
                        className="btn btn-sm btn-outline-danger ml-1">
                        刪除
                      </button>
                    </div>
                  )
                }

              </div>

            </div>
          </div>
        ))}

    </div>
  );
}

export default App;