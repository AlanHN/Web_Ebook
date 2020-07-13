import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  AsyncStorage, ToastAndroid,DeviceEventEmitter
} from 'react-native';
import {
  Button,
  WingBlank,
  Flex,
  Stepper,
  List,
  Toast,
} from '@ant-design/react-native';
import {apiUrl} from '../urlconfig';
import {postRequest} from '../utils/ajax';

export class BookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      stock: -1,
    };
  }

  onChange = (val) => {
    this.setState({number: val});
    console.log(this.state.number);
  };

  addToCart = () => {
    console.log('addToCart');
    AsyncStorage.getItem('user').then((value) => {
      const url = apiUrl + '/addCart';
      const data = this.props.route.params.detail;
      let user = JSON.parse(value);
      let userId = user.userId;
      let bookId = data.bookId;
      let bookNumber = this.state.number;
      let bookPrice = data.price;
      let json = {
        userId: userId,
        bookId: bookId,
        bookNumber: bookNumber,
        bookPrice: bookPrice,
      };

      const callback = (ret) => {
        if (ret.status >= 0) {
          ToastAndroid.show(ret.msg, ToastAndroid.SHORT);
          const message = 'addCart';
          DeviceEventEmitter.emit('cart', message);
        } else {
          ToastAndroid.show(data.msg, ToastAndroid.SHORT);
        }
      };
      postRequest(url, json, callback);
    });
  };

  buyNow = () => {
    const message = 'buyNow';
    DeviceEventEmitter.emit('changeResult', message);
    console.log('buyNow');
    AsyncStorage.getItem('user').then((value) => {
      const url = apiUrl + '/addOrder';
      const data = this.props.route.params.detail;
      let user = JSON.parse(value);
      let userId = user.userId;
      let bookId = data.bookId;
      let bookNumber = this.state.number;
      let bookPrice = data.price;
      let items = [];
      let newNumber = 0;
      if (this.state.stock === -1) {
        newNumber = data.stock-bookNumber;
      } else {
        newNumber = this.state.stock-bookNumber;
    }
      this.setState(
        {
          stock:newNumber
        }
      )
      items[0] = {bookId: bookId, number: bookNumber, bookPrice: bookPrice};
      let json = {
        userId: userId,
        items: items,
      };
      const callback = (ret) => {
        if (ret.status >= 0) {
          ToastAndroid.show(ret.msg, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(data.msg, ToastAndroid.SHORT);
        }
      };
      postRequest(url, json, callback);
    });
  };

  render() {
    let detail = this.props.route.params.detail;
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={{uri: detail.image}} style={styles.image} />
          <View>
            <Text style={styles.title}>{detail.title}</Text>
          </View>
          <View>
            <Text>作者：{detail.author}</Text>
            <Text>ISBD：{detail.isbn}</Text>
            <Text>类型：{detail.type}</Text>
            <Text>单价：¥{detail.price}</Text>
            <Text>库存：{this.state.stock!== -1
                                        ?this.state.stock
                                        :detail.stock}
            </Text>
          </View>
          <View>
            <Text style={styles.description}>{detail.description}</Text>
          </View>
        </View>
        <List>
          <List.Item
            extra={
              <Stepper
                max={detail.stock}
                min={1}
                defaultValue={0}
                value={this.state.number}
                onChange={this.onChange}
              />
            }>
            数量
          </List.Item>
        </List>
        <View>
          <WingBlank style={{marginBottom: 5}}>
            <Flex>
              <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                <Button type={'primary'} onPress={() => this.buyNow()}>
                  购买
                </Button>
              </Flex.Item>
              <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                <Button onPress={() => this.addToCart()}>加入购物车</Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  image: {
    width: 182,
    height: 245,
  },
  description: {
    paddingLeft: 50,
    paddingRight: 55,
  },
});
