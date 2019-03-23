import React, { Component } from 'react'
import { Text, View, ImageBackground, KeyboardAvoidingView, Button, StyleSheet } from 'react-native'
import RegisterForm from './RegisterForm'

class RegisterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../../images/login.jpg')} style={styles.container} >
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-550} enabled>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Sign In</Text>
            <Button
              title="Already have an account"
              onPress={() => navigate('Login', { screen: "Login" })}
            />
          </View>
          <View>
            <RegisterForm navigation={this.props.navigation} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  },
  subTitle: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    opacity: 0.7
  }
})

export default RegisterScreen;