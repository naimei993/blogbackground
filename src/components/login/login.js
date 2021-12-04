import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin}  from '../../api/index'
import logo from '../../static/img/logo.png'
import './login.less'

const Login = () => {
    const onFinish = async(values) => {
        let result = await reqLogin(values)
        console.log(result);
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
        name="name"
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

export default Login;