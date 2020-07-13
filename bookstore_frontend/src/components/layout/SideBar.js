import React from 'react';
import {Link} from "react-router-dom";
import { Menu, Layout} from 'antd';
import {BookOutlined,BarChartOutlined,SnippetsOutlined, EditOutlined, MoneyCollectOutlined, ShoppingCartOutlined, UserOutlined,StarOutlined,AimOutlined} from '@ant-design/icons';
const { Sider } = Layout;

export class SideBar extends React.Component {

        state= {
            collapsed: true,
            admin:false,
        };

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user&&user.userType === 0){
            this.setState({admin:true})
        }
    }

    onCollapse = collapsed => {
        if(collapsed){
        }
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <div style={{width:this.state.collapsed? "80px":"180px", maxWidth:this.state.collapsed? "80px":"180px", minWidth:this.state.collapsed? "80px":"180px" }}>
                <div className="mySider">
                    <Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
                        <Menu selectedKeys={[]} mode="inline">
                            <Menu.Item key="1">
                                <Link to='/'>
                                <BookOutlined/>
                                <span style={{ fontSize: '16px'}}>Books</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to='/cart'>
                                <ShoppingCartOutlined/>
                                <span style={{ fontSize: '16px'}}>My Cart</span>
                                 </Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to ='/order'>
                                <MoneyCollectOutlined/>
                                <span style={{ fontSize: '16px'}}>My Orders</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="7">
                                <Link to ='/myBuys'>
                                    <BarChartOutlined />
                                    <span style={{ fontSize: '16px'}}>My Buys</span>
                                </Link>
                            </Menu.Item>

                            {(this.state.admin)?
                                (
                                    <Menu.Item key="4">
                                        <Link to='/orderManage'>
                                            <SnippetsOutlined />
                                            <span style={{fontSize: '16px'}}>Order Manage</span>
                                        </Link>
                                    </Menu.Item>
                                ):
                                (<div/>)
                            }
                            {(this.state.admin)?
                                (
                                    <Menu.Item key="5">
                                <Link to='/bookManage'>
                                    <EditOutlined/>
                                    <span style={{fontSize: '16px'}}>Book Manage</span>
                                </Link>
                            </Menu.Item>
                                ):
                                (<div/>)
                            }
                            {(this.state.admin)?
                                (
                                    <Menu.Item key="6">
                                        <Link to='/userManage'>
                                            <UserOutlined/>
                                            <span style={{fontSize: '16px'}}>User Manage</span>
                                        </Link>
                                    </Menu.Item>
                                ):
                                (<div/>)
                            }
                            {(this.state.admin)?
                                (
                                    <Menu.Item key="9">
                                        <Link to='/bestSales'>
                                            <StarOutlined/>
                                            <span style={{fontSize: '16px'}}>Best Sales</span>
                                        </Link>
                                    </Menu.Item>
                                ):
                                (<div/>)
                            }
                            {(this.state.admin)?
                                (
                                    <Menu.Item key="9">
                                        <Link to='/bestCustomer'>
                                            <AimOutlined/>
                                            <span style={{fontSize: '16px'}}>Best Customers</span>
                                        </Link>
                                    </Menu.Item>
                                ):
                                (<div/>)
                            }
                        </Menu>
                    </Sider>
                </div>
            </div>

        );
    }

}
