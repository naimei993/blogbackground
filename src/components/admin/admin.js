import React from 'react';
import { Layout } from 'antd';
import HeaderTop from './header/header'
import LeftNav from './left_nav/left_nav'
import './css/Admin.less'

const { Header,Sider, Content } = Layout;
const Admin =()=>{//箭头函数
  const [collapsed,setcollapsed] = React.useState(false)

  const onCollapse = () => {
    console.log(collapsed);
    setcollapsed(!collapsed)
  };
      return(
        <div style={{height:"100%"}}>
       <Layout>
       <Sider
      collapsible collapsed={collapsed} onCollapse={onCollapse}
       ><LeftNav/></Sider>
      <Layout>
        <Header ><HeaderTop/></Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
      </div>
         
      )
}
export default Admin