import React from 'react';
import {Link} from "react-router-dom";
import { Dropdown, Menu} from 'antd';
import * as userService from '../../services/userService'
import '../../css/index.css'

export class UserAvatar extends React.Component{
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="https://www.baidu.com/" onClick={userService.logout}>
                        Log Out
                    </a>
                </Menu.Item>
            </Menu>
        );
        const {user} = this.props;
        return(
        <Link to='/LoginView'>
            <div id="avatar">
                <Dropdown overlay={menu} placement="bottomRight">
                    {/*{(user.icon!=='')?*/}
                    {/*    (<img alt={"usericon"} src={user.icon}/>): (<div/>)*/}
                    {/*}*/}
                    <span className="name"> Hi, {user.username}</span>
                </Dropdown>
            </div>
        </Link>
        )
    }
}

export  default  UserAvatar;
