import React from 'react';
import {ScrollView, Text, AsyncStorage, StyleSheet,DeviceEventEmitter} from 'react-native';
import {List} from '@ant-design/react-native';
import {apiUrl} from '../urlconfig';
import {postRequest} from '../utils/ajax';

const Item = List.Item;
const Brief = Item.Brief;

export class MyOrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  getOrder = () => {
    AsyncStorage.getItem('user').then((value) => {
      const url = apiUrl + '/getOrders';
      let user = JSON.parse(value);
      let userId = user.userId;
      let json = {userId: userId};
      const callback = (ret) => {
        ret.sort(function (a, b) {
          if (a.time > b.time) {
            return -1;
          } else if (a.time == b.time) {
            return 0;
          } else {
            return 1;
          }
        })
        this.setState({
          orders: ret,
        });
      };
      postRequest(url, json, callback);
    });
  }

  componentDidMount() {
    console.log('MyOrder');
    this.listener = DeviceEventEmitter.addListener('order', (message) => {
       this.getOrder();
    });
      this.getOrder();
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  render() {
    return (
      <ScrollView>
        {this.state.orders.map((list, i) => {
          return (
            <List
              renderHeader={() => (
                <Text>
                  OrderId:{list.listId} time:{list.time}
                </Text>
              )}
              className="my-list">
              {list.items.map((item, i) => {
                return (
                  <Item multipleLine extra={<Text color="red">{item.bookNumber}</Text>}>
                    {item.book.title}
                    <Brief>￥{item.bookPrice}</Brief>
                  </Item>
                );
              })}
            </List>
          );
        })}
      </ScrollView>
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
