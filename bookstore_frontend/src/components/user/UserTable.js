import React from 'react';
import {Table, Drawer, Input, Col, Row, Button, Popover, Form, message, Select} from 'antd';
import {Link} from "react-router-dom";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {getUsers} from "../../services/userService";
import '../../css/userTable.css'
import {deleteUser} from "../../services/userService";
import * as userService from "../../services/userService";

const {Option} = Select;

class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            searchText: '',
            searchedColumn: '',
            addVisible: false,
            editVisible: false,
            loading: false,
            userId: '',
            username: '',
            password: '',
            email: '',
            address: '',
            userType: '',
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({dataSource: data});
        };

        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("你没有权限");
        } else {
            getUsers({"search": null}, callback);
        }
    }

    showAddDrawer = () => {
        this.setState({
            addVisible: true,
        });
    };

    closeAddDrawer = () => {
        this.setState({
            addVisible: false,
        });
    };

    handleAdd = () => {
        console.log('addUser')
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),

        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,

        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },

        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    showEditDrawer = () => {
        this.setState({
            editVisible: true,
        });
    };

    closeEditDrawer = () => {
        this.setState({
            editVisible: false,
        });
    };

    handleEdit = (userId, username, password, email, address, userType) => {
        this.showEditDrawer();
        this.setState(
            {
                userId: userId,
                username: username,
                password: password,
                email: email,
                address: address,
                userType: userType,
            }
        )
    };

    handleDelete = () => {
        const callback = (data) => {
            if (data.status >= 0) {
                message.success(data.msg);
                this.setState({
                        userId: '',
                        username: '',
                        password: '',
                        email: '',
                        address: '',
                        userType: '',
                    }
                )
                this.closeEditDrawer();
                const dataSource = [...this.state.dataSource];
                this.setState({
                    dataSource: dataSource.filter(item => item.userId !== this.state.userId),
                });

                const callback = (data) => {
                    this.setState({dataSource: data});
                };
                getUsers({"search": null}, callback);

            } else {
                message.error(data.msg);
            }
        };
        deleteUser(this.state.userId, callback);
    };

    handleSubmit = () => {
        const callback = (data) => {
            message.success('修改成功');
            let tmp = this.state.dataSource;
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].userId === this.state.userId) {
                    tmp[i].userType = this.state.userType;
                }
                this.setState({dataSource: tmp})
            }
            this.closeEditDrawer();
        }
        let json = {
            userId: this.state.userId,
            userType: this.state.userType
        };
        userService.editUser(json, callback);
    }

    render() {
        const columns = [
            {
                title: 'userId',
                dataIndex: 'userId',
                ...this.getColumnSearchProps('userId'),
                editable: false,
                sorter: (a, b) => a.userId - b.userId,
            },
            {
                title: 'username',
                dataIndex: 'username',
                ...this.getColumnSearchProps('username'),
                editable: true,
                sorter: (a, b) => a.username.length - b.username.length,
            },
            {
                title: 'password',
                dataIndex: 'password',
                ...this.getColumnSearchProps('password'),
                editable: true,
            },
            {
                title: 'email',
                dataIndex: 'email',
                ...this.getColumnSearchProps('email'),
                editable: true,
                sorter: (a, b) => a.email.length - b.email.length,
            },
            {
                title: 'address',
                dataIndex: 'address',
                ...this.getColumnSearchProps('address'),
                editable: true,
                sorter: (a, b) => a.address.length - b.address.length,
            },
            {
                title: 'userType',
                dataIndex: 'userType',
                ...this.getColumnSearchProps('userType'),
                editable: true,
                sorter: (a, b) => a.userType - b.userType,
                render: (text, record) =>
                    <Popover content={
                        <div>
                            <p>-1: ban</p>
                            <p> 0: admin</p>
                            <p> 1: customer</p>
                        </div>
                    } title="Attention">
                        <text>{text}</text>
                    </Popover>
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Button
                            onClick={() => {
                                this.handleEdit(record.userId, record.username, record.password, record.email, record.address, record.userType)
                            }}>Edit
                        </Button>
                    ) : null
            },
        ];
        const {dataSource} = this.state;
        return (
            <div>
                <Link to='/'>
                    <Button>Home</Button>
                </Link>
                <Button onClick={this.showAddDrawer}>Add a user</Button>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
                <Drawer
                    title="Add a new user"
                    width={720}
                    onClose={this.closeAddDrawer}
                    visible={this.state.addVisible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.closeAddDrawer} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            {/*Todo*/}
                            <Button onClick={this.handleAdd} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="username"
                                    label="username"
                                    rules={[{required: true, message: 'Please enter username'}]}
                                >
                                    <Input placeholder="Please enter username"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="password"
                                    rules={[{required: true, message: 'Please enter password'}]}
                                >
                                    <Input placeholder="Please enter password"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="email"
                                    rules={[{required: true, message: 'Please enter password'}]}
                                >
                                    <Input placeholder="Please enter email"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="address"
                                    label="address"
                                    rules={[{required: true, message: 'Please enter address'}]}
                                >
                                    <Input placeholder="Please enter address"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userType"
                                    label="userType"
                                    rules={[{required: true, message: 'Please choose a userType'}]}
                                >
                                    <Select placeholder="Please choose a userType">
                                        <Option value="-1">Banned</Option>
                                        <Option value="0">Administrator</Option>
                                        <Option value="1">Customer</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>


                <Drawer
                    title="Edit user"
                    width={720}
                    onClose={this.closeEditDrawer}
                    visible={this.state.editVisible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.handleDelete} style={{marginRight: 8}}>
                                Delete
                            </Button>
                            <Button onClick={this.handleSubmit} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="username"
                                    label="username"
                                    rules={[{required: true, message: 'Please enter username'}]}
                                >
                                    <Input placeholder="Please enter username" defaultValue={this.state.username}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="password"
                                    rules={[{required: true, message: 'Please enter password'}]}
                                >
                                    <Input placeholder="Please enter password" defaultValue={this.state.password}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="email"
                                    rules={[{required: true, message: 'Please enter email'}]}
                                >
                                    <Input placeholder="Please enter email" defaultValue={this.state.email}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="address"
                                    label="address"
                                    rules={[{required: true, message: 'Please enter address'}]}
                                >
                                    <Input placeholder="Please enter address" defaultValue={this.state.address}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="userType"
                                    label="userType"
                                    rules={[{required: true, message: 'Please choose a userType'}]}
                                >
                                    <Popover content={
                                        <div>
                                            <p>-1: ban</p>
                                            <p> 0: admin</p>
                                            <p> 1: customer</p>
                                        </div>
                                    } title="Attention">
                                        <Input placeholder="Please choose a userType"
                                               onChange={e => this.setState({userType: e.target.value})}
                                               defaultValue={this.state.userType}/>
                                    </Popover>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>

        );
    }
}

export default UserTable;
