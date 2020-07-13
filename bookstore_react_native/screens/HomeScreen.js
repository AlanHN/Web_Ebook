import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Profile} from '../components/Profile';
import {BookScreen} from './BookScreen';
import {BookListScreen} from './BookListScreen';
import {MyCartScreen} from './MyCartScreen';
import {MyOrderScreen} from './MyOrderScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function BookListAndDetail() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="BookList"
          component={BookListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Detail" component={BookScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

function MyCart() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="MyCart"
          component={MyCartScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

function MyOrder({navigation}) {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="MyOrder"
          component={MyOrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

function MyProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Profile navigation={navigation} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('Home');
  }

  render() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Books" component={BookListAndDetail} />
        <Drawer.Screen name="MyCart" component={MyCart} />
        <Drawer.Screen name="MyOrder" component={MyOrder} />
        <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
      </Drawer.Navigator>
    );
  }
}
