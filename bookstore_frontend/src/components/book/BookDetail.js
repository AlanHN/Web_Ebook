import React from 'react';
import {Descriptions, Button, message} from 'antd';
import {MoneyCollectOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {addOrder, addCart} from "../../services/userService";

export class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.setState({number: 0})
    }

    componentDidMount() {
        this.setState({number: 0})
    }

    addToCart = () => {
        const data = this.props.info;
        const user = JSON.parse(localStorage.getItem("user"));
        if (user != null) {
            let userId = user.userId;
            let bookId = data.bookId;
            let bookNumber = document.getElementById("number").value;
            let bookPrice = data.price;
            let json = {userId: userId, bookId: bookId, bookNumber: bookNumber, bookPrice: bookPrice};

            const callback = (data) => {
                if (data.status >= 0) {
                    message.success(data.msg);
                } else {
                    message.error(data.msg);
                }
            };
            addCart(json, callback);
        } else {
            message.error("请登录")
        }
    };

    buyNow = () => {
        const data = this.props.info;
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let userId = user.userId;
            let items = [];
            let bookId = data.bookId;
            let bookNumber = document.getElementById("number").value;
            let bookPrice = data.price;
            items[0] = {bookId: bookId, number: bookNumber, bookPrice: bookPrice};
            let json = {
                userId: userId,
                items: items
            };

            const callback = (data) => {
                if (data.status >= 0) {
                    message.success(data.msg + "请至订单界面查询订单信息");
                    let number;
                    if (this.state.number === 0) {
                        number = this.props.info.stock;
                    } else {
                        number = this.state.number;
                    }
                    number -= document.getElementById("number").value;
                    this.setState(
                        {
                            number: number,
                        }
                    )
                } else {
                    message.error(data.msg);
                }
            };
            addOrder(json, callback);
        } else {
            message.error("请登录")
        }
    }

    render() {
        const info = this.props.info;
        if (info == null) {
            return null;
        }
        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}>
                        <img alt="bookFace" src={info.image} style={{width: "350px", height: "350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>
                                {info.title}
                            </Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>
                                {info.author}
                            </Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>
                                {info.type}
                            </Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span
                                className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>
                                {
                                    info.stock !== 0 ?
                                <span>有货
                                    <span className={"inventory"}>库存
                                    {this.state.number !== 0
                                        ? <text>{this.state.number}</text>
                                        : <text>{info.stock}</text>}
                                    件</span>
                                </span> :
                                <span className={"status"}>无货</span>
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>

                <div>
                    Number : <input id="number" defaultValue={1}/>
                </div>

                <div className={"button-groups"}>
                    <Button type="danger" size={"large"} onClick={this.addToCart}>
                        <ShoppingCartOutlined/>加入购物车
                    </Button>

                    <Button type="danger" size={"large"} onClick={this.buyNow} style={{marginLeft: "15%"}} ghost>
                        <MoneyCollectOutlined/>立即购买
                    </Button>
                </div>
            </div>

        )

    }

}
