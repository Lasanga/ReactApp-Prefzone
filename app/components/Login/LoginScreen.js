import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native'
import LoginForm from './LoginForm'

class LoginScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            welcomeMessages: [
                'The quickest way to know a woman is to go shopping with her.',
                'Recreational shopping is the shortest distance between two points: you and broke.',
                'I went to a general store but they wouldn\'t let me buy anything specific.',
                'I don\'t shop because I need something, I just shop for shopping\'s sake.',
                'I\'m shopping around for something to do that no one will like.'
            ],
            welcomeMessage: 'The quickest way to know a woman is to go shopping with her.'
        }
    }

    componentDidMount() {
        this.displayQuotes();
        // navigate('LoginForm', {navi: this.props.navigation.navigate("Home", {screen: "Home"})})
    }

    displayQuotes = () => {

        let quotesLength = this.state.welcomeMessages.length;
        let index = 0;

        setInterval(() => {
            let name = this.state.welcomeMessages[index];
            index = (index + 1) % quotesLength;
            this.setState({
                welcomeMessage: name
            })
        }, 6000);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../../images/login.jpg')} style={styles.container} >
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-550} enabled>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>Sign In</Text>
                        <Text style={styles.subTitle}>{this.state.welcomeMessage}</Text>
                        <Button
                            title="Rgister now"
                            onPress={() => navigate('Register', { screen: "Register" })}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        <LoginForm navigation={this.props.navigation} />
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
    },
    formContainer: {
        height: 250
    }
})

export default LoginScreen;