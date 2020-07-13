import React from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    FlatList,
    TouchableHighlight,
    Image,
    StyleSheet,
    DeviceEventEmitter,
    ToastAndroid,
} from 'react-native';
import {List, Button, Card, WhiteSpace,Stepper,Flex} from '@ant-design/react-native';
import {apiUrl} from '../urlconfig';
import {postRequest} from '../utils/ajax';

const Item = List.Item;
const Brief = Item.Brief;

export class MyCartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            sum: 0
        };
    }

    getCart = () => {
        console.log('getCart');
        AsyncStorage.getItem('user').then((value) => {
            const url = apiUrl + '/getCart';
            let user = JSON.parse(value);
            let userId = user.userId;
            let json = {userId: userId};
            const callback = (ret) => {
                let tmp=0
                for(let i=0;i<ret.length;i++)
                {
                     tmp += ret[i].bookNumber*ret[i].bookPrice;
                }
                this.setState({
                    cart: ret,
                    sum:tmp.toFixed(1),
                });
            };
            postRequest(url, json, callback);
        });
    };

    componentDidMount() {
        console.log('MyCart');
        this.listener = DeviceEventEmitter.addListener('cart', (message) => {
            if (message === 'addCart') {
                this.getCart();
            }
        });
        this.getCart();
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    deleteCartItem = (id) => {
        console.log('deleteItem');
        const url = apiUrl + '/delCartItem';
        let json = {id: id};
        const callback = (ret) => {
        };
        postRequest(url, json, callback);
    };

    buyAll = () => {
        const message = 'buyAll';
        DeviceEventEmitter.emit('order', message);
        console.log('buyAll');
        if (this.state.cart.length == 0) {
            ToastAndroid.show('购物车是空的，快去挑些书吧', ToastAndroid.SHORT);
            return;
        }
        AsyncStorage.getItem('user').then((value) => {
            const url = apiUrl + '/addOrder';
            const cart = this.state.cart;
            let user = JSON.parse(value);
            let userId = user.userId;
            let items = [];
            for (let item of cart) {
                items.push({
                    bookId: item.book.bookId,
                    number: item.bookNumber,
                    bookPrice: item.bookPrice,
                });
                this.deleteCartItem(item.itemId);
            }
            let json = {
                userId: userId,
                items: items,
            };
            const callback = (ret) => {
                if (ret.status >= 0) {
                    ToastAndroid.show(ret.msg, ToastAndroid.SHORT);
                    this.getCart();
                } else {
                    ToastAndroid.show(ret.msg, ToastAndroid.SHORT);
                }
            };
            postRequest(url, json, callback);
        });
    };

    handleNumberChange = (itemId,value) => {
        if (value <= 0) {
            message.error('数目必须大于0！');
            return;
        }
        let json = {
            itemId: itemId,
            bookNumber: value
        };
        const callback = () => {
            ToastAndroid.show('修改成功', ToastAndroid.SHORT);
            this.getCart();
        }
        console.log(json);
        const url = apiUrl + '/editCartItemNumber';
        postRequest(url, json, callback);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.cart.map((item, i) => {
                        return (
                            <Card>
                                <Card.Header
                                    title={item.book.title}
                                    thumbStyle={{ width: 30, height: 30 }}
                                    extra= {'￥'+item.bookPrice}
                                />
                                <Card.Body>
                                    <Flex>
                                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                                            <Stepper
                                                key="1"
                                                max={10}
                                                min={1}
                                                readOnly={false}
                                                defaultValue={item.bookNumber}
                                                onChange={(value) => this.handleNumberChange(item.itemId,value)}
                                            />
                                        </Flex.Item>
                                        <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                                            <Button onPress={() => {this.deleteCartItem(item.itemId)
                                            this.getCart()}}>Delete</Button>
                                        </Flex.Item>
                                    </Flex>
                                </Card.Body>
                                <Card.Footer>
                                    <WhiteSpace>
                                    </WhiteSpace>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </ScrollView>
                <Flex>
                    <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Text fontSize="100">￥{this.state.sum}</Text>
                    </Flex.Item>
                    <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Button type = "warning"onPress={() => this.buyAll()}>Buy All</Button>
                    </Flex.Item>
                    </Flex>  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    priceText: {
        color: 'red',
    },
});
