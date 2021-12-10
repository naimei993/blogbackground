import React from 'react';
import { connect } from 'react-redux';
import {Link,useLocation} from 'react-router-dom';
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action'
import { Menu } from 'antd';
import  * as Icon from '@ant-design/icons';
import logo from '../../../static/img/logo.png'
import menuList from '../../../config/menu_config';
import './left_nav.less'
const { SubMenu } = Menu;


const Left_nav = (props) => {

  const { pathname } = useLocation();
     const createMenu = (target)=>{//箭头函数
        return (target.map((item)=>{//箭头函数
          if(!item.children){
            return(
            <Menu.Item key={item.key} onClick={()=>{props.saveTitle(item.title)}}>
              <span>{
                React.createElement(
                  Icon[item.icon]
                )
              }</span>
              <Link className="nav-item" to={item.path}><span>{item.title}</span></Link>
            </Menu.Item>
            )}else{
              return(
    <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={<span>{item.title}</span>}>
    {
      createMenu(item.children)
    }

    </SubMenu> 
              )
            }
          
          
    }))
      }
      let pathnamedetail = pathname.split('/').splice(2)
      console.log(pathname.split('/').splice(2)[0],pathname.split('/').splice(2)[1]);
      if(pathnamedetail[1]==='articledetail' ||pathnamedetail[1]==='articleupdate' ){
        pathnamedetail=['article_about','articlelist']
      }
    return (
        <div style={{ width: "100%",backgroundColor:"red"}}>
           <header className="nav-header">
                  <img  src={logo} alt=""/>
                  <div className="header-title cssnice2">后台管理</div>
              </header>
        <Menu
          defaultSelectedKeys={pathnamedetail[1]?[pathnamedetail[1]]:[pathnamedetail[0]]}
          defaultOpenKeys={pathnamedetail[1]?[pathnamedetail[0]]:['']}
          mode="inline"
          theme="dark"
        >
          {createMenu(menuList)}
        </Menu>
      </div>
    );
};

const mapStateToProps = (state)=>{
  return {

  }
}

// const mapDispatchToProps = () => {
//   return {
//     saveUserInfo:createSaveUserInfoAction,
//   }
// };
export default connect(
  mapStateToProps,{saveTitle:createSaveTitleAction,}
)(Left_nav)