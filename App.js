import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import SplashScreen from './app/components/SplashScreen';
import LoginScreen from './app/components/Login/LoginScreen';
import RegisterScreen from './app/components/Register/RegisterScreen';
import HomeScreen from './app/components/Home/HomeScreen';

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Splash: { screen: SplashScreen, navigationOptions: { title: 'SplashScreen', header: null ,gesturesEnabled:false},},
  Login: { screen: LoginScreen, navigationOptions: { title: 'LoginScreen', header: null ,gesturesEnabled:false},},
  Register: { screen: RegisterScreen, navigationOptions: { title: 'RegisterScreen', header: null ,gesturesEnabled:false},},
  Home: { screen: HomeScreen, navigationOptions: { title: 'HomeScreen', header: null ,gesturesEnabled:false},},
})

