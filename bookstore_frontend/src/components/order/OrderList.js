import React from 'react';
import {DatePicker,Input, List, message} from 'antd'
import {getOrders} from "../../services/userService";
import OrderDetail from "./OrderDetail";

const {Search} = Input;

const { RangePicker } = DatePicker;

export class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            showOrders: [],
            searchValue: '',
        };
    }

    componentDidMount() {

        const callback = (data) => {
            let tmp =[];
           for(let i = data.length-1;i>=0;i--)
            {
                tmp.push(data[i]);
            }
            this.setState({orders: tmp, showOrders: tmp});
        };

        let user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            message.error("请登录");
        } else {
            let userId = user.userId;
            getOrders(userId, callback);
        }

    }

    searchChange = ({target: {value}}) => {
        this.setState({searchValue: value})
        let arr = [];
        let list = this.state.orders;
        let search = value.toLowerCase();

        for (let i = 0; i < list.length; i++) {
            if (
                list[i].listId.toString() === search.toString()
            ) {
                arr.push(list[i]);
            }
            for (let j = 0; j < list[i].items.length; j++) {
                if (
                    list[i].items[j].book.title.toLowerCase().indexOf(search) >= 0
                ) {
                    arr.push(list[i]);
                }
            }
        }
        this.setState(
            {showOrders: arr}
        );
    }

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState(
                {showOrders: this.state.orders}
            );
            return;
        }
        console.log('Formatted Selected Time: ', dateString);
        const startTime= new Date(Date.parse(dateString[0]));
        const endTime=new Date(Date.parse(dateString[1]));
        let arr = [];
        let list = this.state.showOrders;
        for (let i = 0; i < list.length; i++) {
            let time = new Date(Date.parse(list[i].time));
            if (
                time >startTime && time<endTime
            ) {
                arr.push(list[i]);
            }
        }
        this.setState(
            {showOrders: arr}
        );
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <Search value={this.state.searchValue} placeholder="search for orders" onChange={this.searchChange}
                        enterButton/>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/>
                <List
                    dataSource={this.state.showOrders}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={'order:' + item.listId}
                                description={'time:' + item.time}
                            />
                            <OrderDetail info={item.items}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
