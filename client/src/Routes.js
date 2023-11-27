// 1.載入React
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** 
** 模組用途說明
** BrowserRouter 
*  用途:啟用瀏覽器端路由。將提供的路由規則與瀏覽器的URL進行匹配決定渲染哪個元件。
** Switch
*  用途:包裹一組 <Route> 組件，作用是只渲染第一個與目前 URL 相符的 <Route> 元件。
** Route
*  用途:定義路由規則
*/

// 2.載入組件
import App from './App'
import Create from './Create'
import SinglePost from './SinglePost'
import UpdatePost from './UpdatePost'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

// 3.定義路由
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* `exact`屬性只匹配到精確的路由 component={渲染組件} */}
                <Route path="/" exact component={App} />
                <PrivateRoute path="/create" exact component={Create} />
                <Route path="/post/:slug" exact component={SinglePost} />
                <PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

// 4.匯出模組
export default Routes;


