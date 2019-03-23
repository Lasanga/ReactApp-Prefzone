import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { DrawerNavigator } from 'react-navigation';

class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        const userDetails = navigation.getParam('userDetails', 'NO-ID');
        return (
            <View>
                <Text> {userDetails.userId} </Text>
            </View>
        )
    }
}

const AppStack = DrawerNavigator({
    Home: HomeScreen
})

export default HomeScreen;
