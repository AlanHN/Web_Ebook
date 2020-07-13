import React from 'react';
import {Row, Col} from 'antd';
import logo from '../../assets/pictures/logo.png';
import {Link} from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {UserOutlined} from "@ant-design/icons";
import '../../css/index.css'

export class HeadInfo extends React.Component {

    render() {

        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <div id="header">
                <div id="header-content">
                    <Row>
                        <Col span={2}>
                            <a id="logo" href={"/"}>
                            <Link to="/">
                                <img alt="logo" className="logo" src={logo} style={{height: 45}}/>
                            </Link>
                            </a>
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={14}>
                        </Col>
                        <Col span={2}>
                            {user != null ?
                                <UserAvatar user={user}/>
                                :
                                <Link to={'/login'}>
                                    <UserOutlined/> Log in
                                </Link>
                                }
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default HeadInfo
