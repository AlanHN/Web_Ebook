import * as React from 'react';
import {AsyncStorage, View, Text, Button} from 'react-native';
import {apiUrl} from '../urlconfig';
const LOGOUT_URL = apiUrl + '/logout';

export class Profile extends React.Component {
  render() {
    return (
      <View>
        <Text>My Profile</Text>
        <Button
          title="退出账户"
          onPress={() => {
            this.props.navigation.navigate('Login');
            AsyncStorage.removeItem('@Bookstore:token').then((r) => {});
            fetch(LOGOUT_URL, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            })
              .then((response) => {})
              .then((responseData) => {})
              .catch((error) => {});
          }}
        />
      </View>
    );
  }
}
