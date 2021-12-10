import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import {reqLogin}  from '../../api/index'
import logo from '../../static/img/logo.png'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import './login.less'

const Login = (props) => {
    const navigate =  useNavigate()
    const onFinish = async(values) => {
      console.log(values);
      const{username,password} = values
        let result = await reqLogin(username,password)
        const {status,token,user} = result;
        if(status === 0){
          console.log(token,user);
          console.log(props);
          props.saveUserInfo(result)
          navigate('/admin/home');
        }
      };
      return (
          <div className="login-all">
              <header>
                     <img src={logo} alt="logo"/>
                     <h1>登录界面</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入您的用户名',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
        </section>
        </div>
      );
};


const mapStateToProps = (state)=>{
  return {
      isLogin:state.userInfo.isLogin
  }
}
// const mapDispatchToProps = () => {
//   return {
//     saveUserInfo:createSaveUserInfoAction,
//   }
// };
export default connect(
  mapStateToProps,{saveUserInfo:createSaveUserInfoAction,}
)(Login)