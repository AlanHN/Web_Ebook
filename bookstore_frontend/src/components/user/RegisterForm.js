import React from 'react';
import {Form,
    Input,
    Checkbox,
    Button} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, HomeOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../css/register.css'
import * as userService from "../../services/userService";
import {Link} from "react-router-dom";

class RegisterForm extends React.Component {

    onFinish = values => {
        console.log('Received values of form: ', values);
        userService.register(values);
    };

    render() {
        return (
            <Form
                  onFinish={this.onFinish} className="register-form" layout="inline" scrollToFirstError>
                <Form.Item
                    className="register-form-button"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    className="register-form-button"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    className="register-form-button"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password again"
                    />
                </Form.Item>
                <Form.Item
                    className="register-form-button"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon"/>}
                        type="email"
                        placeholder="email"
                    />
                </Form.Item>
                <Form.Item
                    className="register-form-button"
                    name="address"
                    rules={[{required: true, message: 'Please input your address!'}]}
                >
                    <Input
                        prefix={<HomeOutlined className="site-form-item-icon"/>}
                        type="address"
                        placeholder="address"
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                    ]}
                >
                    <Checkbox>
                        I have read the <a href="https://www.baidu.com/"> agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item className="register-form-button">
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                </Button>
                    Or <Link to = "/login">log in</Link>
            </Form.Item>
            </Form>
        );
    }
}

export default RegisterForm
