/* 
登陆的一级路由组件
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import ajax from '../../api/ajax'

import logo from './images/logo.png'
import './login.less'
const { Item } = Form // 必须在所有import的下面

export default class Login extends Component {

  andleSubmit = (event) => {
    event.preventDefault() // 阻止表单提交

    // 对所有表单项进行统一的表单验证
    this.props.form.validateFields((err, values) => {
     if(!err){
      //  const {username,password}=values
       console.log('发送ajax请求', values)

       ajax.post('/login',values)
       .the((user,token)=>{
      console.log('登录成功',user,token)
       })
       .catch(error=>{
         console.log(error)
       })
     }else{

     }
      
    });

    // 读取form收集的数据
    // const form = this.props.form
    // const username = form.getFieldValue('username')
    // const password = form.getFieldValue('password')
    // const values = form.getFieldsValue()
    // console.log('发ajax请求', username, password, values)
  }
  render(){
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
            </Item>
            <Form.Item> 
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
};

 




