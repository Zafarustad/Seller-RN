import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar} from '../Components/Custom/BottomTabBar';
import Login from '../Components/Login/Login';
import Register from '../Components/Login/Register';
import Splash from '../Components/Splash';
import OrderPending from '../Components/Home/OrderPending';
import OrderCompleted from '../Components/Home/OrderCompleted';
import Inventory from '../Components/Home/Inventory';
import MyShop from '../Components/Home/MyShop';
import ShopDetails from '../Components/Home/Forms/ShopDetails';
import GoogleMap from '../Components/Home/Forms/GoogleMap';
import Details from '../Components/Home/Forms/Details';
import Icon from 'react-native-vector-icons/Feather';
import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../utils/utils';
import AddProduct from '../Components/Home/Forms/AddProduct';
import store from '../Redux/Reducers/store';
import {clearShopDataAction} from '../Redux/Actions/shopAction';
import {clearOrderDataAction} from '../Redux/Actions/orderAction';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <View style={{flex: 1, position: 'relative'}}>
    <Tab.Navigator
      initialRouteName="OrdersOpen"
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Open',
        }}
        name="OrdersOpen"
        component={OrderPending}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Completed',
        }}
        name="OrdersCompleted"
        component={OrderCompleted}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Inventory',
        }}
        name="home-Shop"
        component={Inventory}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Shop',
        }}
        name="MyShop"
        component={MyShop}
      />
    </Tab.Navigator>
  </View>
);

const Routes = ({auth}) => {
  const {isAuthenticated, userData} = auth;

  // useEffect(() => {
  //   const getItem = async () => {
  //     await SInfo.getItem('token', {
  //       sharedPreferencesName: 'JwtToken',
  //       keychainService: 'JWT',
  //     });
  //   };
  //   getItem();
  //   const deleteItem = async () => {
  //     await SInfo.deleteItem('token', {
  //       sharedPreferencesName: 'JwtToken',
  //       keychainService: 'JWT',
  //     });
  //     await AsyncStorage.clear();
  //     delete axiosInstance.defaults.headers.common['Authorization'];
  //     store.dispatch(clearShopDataAction());
  //     store.dispatch(clearOrderDataAction());
  //   };
  //   deleteItem();
  // }, []);

  return isAuthenticated === null ? (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  ) : isAuthenticated === false ? (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  ) : isAuthenticated && userData.detailsCompleted < 2 ? (
    <Stack.Navigator initialRouteName="Details" headerMode="none">
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
      <Stack.Screen
        name="GoogleMap"
        component={GoogleMap}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  ) : isAuthenticated && userData.detailsCompleted === 2 ? (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ShopDetails"
        component={ShopDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="GoogleMap"
        component={GoogleMap}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  ) : null;
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, null)(Routes);
