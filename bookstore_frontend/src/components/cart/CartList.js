import React from 'react';
import {Button, Input, InputNumber, message, Popconfirm, Table} from 'antd';
import {addOrder, delCartItem, editCartItemNumber, getCart} from "../../services/userService";
import {history} from '../../utils/history';

const {Search} = Input;

export class CartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            showCart: [],
            searchValue: '',
            selectedRowKeys: [],
        }
    }

    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            message.error("请登录");
        } else {
            const callback = (data) => {
                for (let i = 0; i < data.length; ++i) {
                    data[i].key = data[i].itemId;
                    data[i].title = data[i].book.title;
                    data[i].bookId = data[i].book.bookId;
                    data[i].sum = (data[i].bookPrice * data[i].bookNumber).toFixed(1);
                }
                this.setState({
                    cart: data, showCart: data
                });
            };
            let userId = user.userId;
            getCart(userId, callback);
        }
    }

    searchChange = ({target: {value}}) => {

        this.setState({searchValue: value})
        let arr = [];
        let list = this.state.cart;
        let search = value.toLowerCase();

        for (let i = 0; i < list.length; i++) {
            if (
                list[i].title.toLowerCase().indexOf(search) >= 0
            ) {
                arr.push(list[i]);
            }
        }
        this.setState(
            {showCart: arr}
        );
    }

    deleteConfirm = (key) => {
        const data = this.state.cart;

        for (let i = 0; i < data.length; ++i) {
            if (data[i].key === key) {
                data.splice(i, 1);
                break;
            }
        }
        let tmp = [...data];

        this.sendDeletion(key);
        this.setState(() => ({data: tmp}));
    };

    sendDeletion = (id) => {
        const callback = (data) => {
            if (!data.status) {
                message.success(data.msg)

                let user = JSON.parse(localStorage.getItem('user'));
                let userId = user.userId;

                const callback1 = (data) => {
                    for (let i = 0; i < data.length; ++i) {
                        data[i].key = data[i].itemId;
                        data[i].title = data[i].book.title;
                        data[i].bookId = data[i].book.bookId;
                        data[i].sum = (data[i].bookPrice * data[i].bookNumber).toFixed(1);
                    }
                    this.setState({
                        cart: data,
                        showCart: data,
                        searchValue: '',
                        selectedRowKeys: [],
                        selectedRows: [],
                    });
                };
                getCart(userId, callback1);
            } else {
                message.error(data.msg);
            }
        };
        let json = {id: id};
        delCartItem(json, callback);
    };

    submitOrder = () => {

        if (this.state.selectedRowKeys.length === 0) {
            message.error("please choose at least one item");
            return;
        }

        let user = JSON.parse(localStorage.getItem('user'));
        let userId = user.userId;
        let items = [];
        let index;
        for (index in this.state.selectedRows) {
            items[index] = {
                bookId: this.state.selectedRows[index].bookId,
                number: this.state.selectedRows[index].bookNumber,
                bookPrice: this.state.selectedRows[index].bookPrice
            }
            let json = {id: this.state.selectedRows[index].itemId};
            delCartItem(json);
        }

        let json = {
            userId: userId,
            items: items
        };

        const callback = (data) => {
            if (data.status >= 0) {
                const callback1 = (data) => {
                    for (let i = 0; i < data.length; ++i) {
                        data[i].key = data[i].itemId;
                        data[i].title = data[i].book.title;
                        data[i].bookId = data[i].book.bookId;
                        data[i].sum = (data[i].bookPrice * data[i].bookNumber).toFixed(1);
                    }
                    this.setState({
                        cart: data,
                        showCart: data,
                        searchValue: '',
                    });
                };
                getCart(userId, callback1);
                message.success(data.msg + "请至订单界面查询订单信息");
                history.push('/order');
            } else {
                message.error(data.msg);
            }
        }
        addOrder(json, callback);
    };

    totalSum = (selectedRowKeys) => {

        let total = 0 ;
        for (let i = 0; i < selectedRowKeys.length; ++i) {
            for (let j = 0; j < this.state.cart.length; ++j) {
                if (selectedRowKeys[i] === this.state.cart[j].key) {
                    total += Number(this.state.cart[j].sum);
                    break;
                }
            }
        }
        return total;
    };

    calItems = (selectedRowKeys, selectedRow) => {
        let sum = 0;
        for (let i = 0; i < selectedRowKeys.length; ++i) {
            if (selectedRow[i] !== undefined) {
                sum += 1
            }
        }
        return sum;
    }

    handleNumberChange = (itemId, value) => {
        console.log('changed', itemId, value);
        if (value <= 0) {
            message.error('数目必须大于0！');
            return;
        }
        let json = {
            itemId: itemId,
            bookNumber: value
        };
        let tmp = this.state.cart;
        debugger;
        for (let i = 0; i < tmp.length; ++i) {
            if (tmp[i].key === itemId) {
                tmp[i].bookNumber = value;
                tmp[i].sum = (tmp[i].bookPrice * tmp[i].bookNumber).toFixed(1);
            }
        }
        this.setState({cart: tmp, showCart: tmp});
        const callback = () => {
            message.success('修改成功');
        }
        editCartItemNumber(json, callback);
    }

    render() {
        const {loading, selectedRowKeys, selectedRows} = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRowKeys: selectedRowKeys, selectedRows: selectedRows})
            },
        };

        const columns = [
            {
                title: 'Tilte',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Number',
                dataIndex: 'bookNumber',
                key: 'bookNumber',
                render: (text, record) =>
                    (<InputNumber defaultValue={record.bookNumber}
                                  onChange={value => {
                                      this.handleNumberChange(record.itemId, value);
                                  }
                                  }/>)
            },
            {
                title: 'Price/per',
                dataIndex: 'bookPrice',
                key: 'bookPrice',
            },
            {
                title: 'Sum',
                dataIndex: 'sum',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        <Popconfirm
                            title="Are you sure delete this book?"
                            onConfirm={() => this.deleteConfirm(record.itemId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>Delete</Button>
                        </Popconfirm>
                    );
                }
            }
        ];

        const hasSelected = this.calItems(selectedRowKeys, selectedRows) > 0;

        return (
            <div className="container">
                <br/>
                <Search value={this.state.searchValue} placeholder="search for cartItem" onChange={this.searchChange}
                        enterButton/>
                <Table rowSelection={rowSelection}
                       columns={columns}
                       dataSource={this.state.showCart}
                />
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.submitOrder} loading={loading}>
                        Submit
                    </Button>
                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `${this.calItems(selectedRowKeys, selectedRows)} items` : ''}
                    </span>
                    <span style={{marginLeft: 10}}>
                        {hasSelected ? `Total: ￥${this.totalSum(selectedRowKeys).toFixed(1)} ` : ''}
                    </span>
                </div>
            </div>
        )
    }
}
