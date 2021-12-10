import React from 'react';
import { Layout } from 'antd';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import {Route,Routes} from 'react-router'
import HeaderTop from './header/header'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import LeftNav from './left_nav/left_nav'
import './css/Admin.less'
import Home from '../home/home'
import Articlelist from '../article/articlelist/articlelist'
import Writearticle from '../article/writearticle/writearticle'
import Classification from '../article/classification/classification'
import Log from '../system/log/log'
import Comments from '../comments/comments'
import FriendLink from'../system/friendlink/friendlink'
import ArticleDetail from '../article/articlelist/articledetail';
import ArticleUpdate from '../article/articlelist/articleupdate';
const { Header,Sider, Content } = Layout;
const Admin =(props)=>{//箭头函数
  const [collapsed,setcollapsed] = React.useState(false)

  const onCollapse = () => {
    console.log(collapsed);
    setcollapsed(!collapsed)
  };
  const {isLogin} = props.userInfo;
  if(!isLogin){//判断用户是否登陆，未登录返回登录页面
      return <Navigate to="/login" replace={true} />
  }else{
      return(
        <div style={{height:"100%"}}>
       <Layout>
       <Sider
      collapsible collapsed={collapsed} onCollapse={onCollapse}
       ><LeftNav/></Sider>
      <Layout>
        <Header ><HeaderTop/></Header>
        <Content style={{marginTop:"20px"}}>
        <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/article_about">
                    <Route path="articlelist" element={<Articlelist/>}/>
                    <Route path="writearticle" element={<Writearticle/>}/>
                    <Route path="classification" element={<Classification/>}/>
                    <Route path="articledetail/:id" element={<ArticleDetail/>}/>
                    <Route path="articleupdate/:id" element={<ArticleUpdate/>}/>
                </Route>
                <Route path="/system">
                    <Route path="log"  element={<Log/>}/>
                    <Route path="friendlink"  element={<FriendLink/>}/>
                </Route>
                <Route path="/comments" element={<Comments/>}/>
                <Route
                path="*"
                element={
              <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
            />
              </Routes>
        </Content>
      </Layout>
    </Layout>
      </div>
         
      )
  }
}
const mapStateToProps = (state)=>({
    
  userInfo:state.userInfo

})
// const mapDispatchToProps = () => {
//     return {
//         deleteUserInfo:createDeleteUserInfoAction,
//     }
// }
// export default connect(
//     mapStateToProps,mapDispatchToProps
//   )(Admin)
export default connect(
// state => ({userInfo:state.userInfo}),
mapStateToProps,
{deleteUserInfo:createDeleteUserInfoAction}
)(Admin)
