import React, { Component } from 'react';
import { Platform, StyleSheet, Text, SafeAreaView, ScrollView, Image, View } from 'react-native';
import { createStackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'

import SplashScreen from './app/components/SplashScreen';
import LoginScreen from './app/components/Login/LoginScreen';
import RegisterScreen from './app/components/Register/RegisterScreen';
import HomeScreen from './app/components/Home/HomeScreen';
import TransactionScreen from './app/components/Transaction/TransactionScreen';
import OfferScreen from './app/components/Offer/OfferScreen';

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const CustomDrawerComponent = (props) => (

  <SafeAreaView>
    <View style={styles.header}>
    <Image source={require("./app/images/letter.png")} resizeMode="contain" style={styles.iconHeader}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)


const Drawer = DrawerNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: {
      title: 'Home', drawerIcon: ({ tintColor }) => (<Image source={require("./app/images/home.png")} resizeMode="contain" style={styles.icon} />),
    }
  },
  Offer: {
    screen: OfferScreen, navigationOptions: {
      title: 'Offers', drawerIcon: ({ tintColor }) => (<Image source={require("./app/images/tag.png")} resizeMode="contain" style={styles.icon} />),
    }
  },
  Transaction: {
    screen: TransactionScreen, navigationOptions: {
      title: 'My Transactions', drawerIcon: ({ tintColor }) => (<Image source={require("./app/images/trans.png")} resizeMode="contain" style={styles.icon} />),
    }
  },
}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: 'orange'
    }
  }
)

const AppStackNavigator = createStackNavigator({
  Splash: { screen: SplashScreen, navigationOptions: { title: 'SplashScreen', header: null, gesturesEnabled: false }, },
  Login: { screen: LoginScreen, navigationOptions: { title: 'LoginScreen', header: null, gesturesEnabled: false }, },
  Register: { screen: RegisterScreen, navigationOptions: { title: 'RegisterScreen', header: null, gesturesEnabled: false }, },
  Drawer: { screen: Drawer, navigationOptions: { title: 'Drawer', header: null, gesturesEnabled: false } },
});

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  iconHeader: {
    width: 100,
    height: 100,
    marginTop:30
  },
  header:{
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


