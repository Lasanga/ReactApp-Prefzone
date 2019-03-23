import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import { baseUrl, devBaseURL, defaultTenantVal } from '../../../app.json'

class RegisterForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      name: '',
      surname: '',
      username: '',
      emailAddress: '',
      password: '',
      captchaResponse: ''
    }
  }

  register = () => {
    this.setState({ loading: true });
    let newRegForm = {
      name: this.state.name,
      surname: this.state.surname,
      username: this.state.username,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      captchaResponse: this.state.captchaResponse,
      tenantId : defaultTenantVal
    }

    let apiUrl = baseUrl + '/api/services/app/Account/Register';
    axios.post(apiUrl, newRegForm)
      .then(res => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Login');
      }).catch(err => {
        alert(err)
        this.setState({ loading: false });
      })
  }


  render() {
    return this.state.loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" animating={true} />
      </View>
    ) :
      (
        <ScrollView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={text => this.setState({ name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={text => this.setState({ surname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={text => this.setState({ emailAddress: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.register}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    color: 'white',
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(247, 182, 17,0.7)'
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'orange'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  register: {
    textAlign: 'right',
    marginBottom: 10,
    color: 'white',
    fontSize: 12
  }
})

export default RegisterForm;
