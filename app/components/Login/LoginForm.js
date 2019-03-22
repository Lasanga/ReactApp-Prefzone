import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {baseUrl, devBaseURL} from '../../../app.json'
import axios from 'axios'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loggedUser: {
                userId: 0,
                accessToken: ''
            }
        }
    }

    login = () => {
        let loginform = {
            userNameOrEmailAddress: this.state.username,
            password: this.state.password,
            rememberClient: true,
            tenantId: 1
        }

        let apiUrl = baseUrl + '/api/TokenAuth/Authenticate';
        axios.post(apiUrl, loginform)
            .then(res => {
                this.setState({ loggedUser: res.data.result })
                this.props.navigation.navigate('Home', {userDetails: this.state.loggedUser})
            }).catch(err => alert(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username/email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    onChangeText={text => this.setState({ username: text })}
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
                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
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

export default LoginForm;