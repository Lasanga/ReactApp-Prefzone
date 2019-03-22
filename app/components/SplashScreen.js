import React, { Component } from 'react'
import { Text, View, StyleSheet, ProgressBarAndroid } from 'react-native'

class SplashScreen extends Component {

  constructor(props) {
    super(props)

    //Splash screen purpose only
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.welcome}> Welcome To Prefzone </Text>
        <ProgressBarAndroid styleAttr="Horizontal" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default SplashScreen;
