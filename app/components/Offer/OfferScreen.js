import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'

class OfferScreen extends Component {
  render() {
    return (
      <View>
        <Header transparent={true} style={{ margin: 0, padding: 0 }}>
          <Right>
            <Button onPress={() => this.props.navigation.openDrawer()} title="menu"></Button>
          </Right>
        </Header>
        <Text> Offers </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default OfferScreen;