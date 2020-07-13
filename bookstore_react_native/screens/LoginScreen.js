import React from 'react';
import {View, AsyncStorage, Alert, ToastAndroid} from 'react-native';
import {Button, InputItem, Toast} from '@ant-design/react-native';
import {apiUrl} from '../urlconfig';
import {postRequest} from '../utils/ajax';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login = () => {
    console.log('login');
    const url = apiUrl + '/login';
    const username = this.state.username;
    const password = this.state.password;
    let json = {username: username, password: password};

    const callback = (data) => {
      console.log(data);
      if (data.status >= 0) {
        if (data.data.userType === -1) {
          Alert.alert('登陆失败', '您的账户已被禁用！');
          console.log('您的账户已被禁用！');
        } else {
          AsyncStorage.setItem(
            'user',
            JSON.stringify(data.data),
          ).then((r) => {});
          ToastAndroid.show(data.msg, ToastAndroid.SHORT);
          this.props.navigation.navigate('Home');
        }
      } else {
        Alert.alert('登陆失败', '用户名或密码错误！');
      }
    };
    postRequest(url, json, callback);
  };

  render() {
    return (
      <View>
        <InputItem
          clear
          value={this.state.username}
          onChange={(value) => {
            this.setState({
              username: value,
            });
          }}
          placeholder="username">
          用户名
        </InputItem>
        <InputItem
          clear
          type="password"
          value={this.state.password}
          onChange={(value) => {
            this.setState({
              password: value,
            });
          }}
          placeholder="password">
          密码
        </InputItem>
        <Button
          onPress={() => {
            this.login();
          }}
          type="primary">
          Login
        </Button>
      </View>
    );
  }
}
