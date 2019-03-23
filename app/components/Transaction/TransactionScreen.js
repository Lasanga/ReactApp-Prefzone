import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'
import axios from 'axios'
import { devBaseURL, baseUrl } from '../../../app.json'

class TransactionScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      transactions: [],
      childArray: []
    }
  }


  componentDidMount() {
    const userDetails = this.props.navigation.getParam('userDetails', 'NO-ID');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userDetails.accessToken;

    this.setState({ loading: true });
    let apiUrl = baseUrl + '/api/services/app/CustomerTransactions/GetCustomerTransaction?id=' + userDetails.userId + '';

    axios.get(apiUrl)
      .then(res => {
        this.setState({ transactions: res.data.result });
        this.setState({ loading: false });
      }).catch(err => {
        alert(err);
        this.setState({ loading: false });
      })
  }

  renderTransactions = ({ item }) => {

    let display = item.items.map((prop, i) => {
      return (
        <View style={{ margin: 10 }}>
          <Text>{prop.name} - LKR{prop.price}</Text>
          <Text>Expires on: {prop.expiryDate}</Text>
        </View>
      )
    })

    return (
      <View>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.heading}>Total Bill: {item.totalBill}</Text>
          {display}
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return this.state.loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" animating={true} />
      </View>
    ) : (
        <View style={styles.container}>
          <Header transparent={true} style={{ margin: 0, padding: 0 }}>
            <Right>
              <Button onPress={() => this.props.navigation.openDrawer()} title="menu"></Button>
            </Right>
          </Header>
          <ScrollView>
            <FlatList
              data={this.state.transactions}
              renderItem={this.renderTransactions}
              keyExtractor={(x, i) => i}
            />
          </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }, card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3
    },
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },
  date: {
    textAlign: 'right'
  }
})

export default TransactionScreen;