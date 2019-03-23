import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'
import axios from 'axios'
import { devBaseURL, baseUrl } from '../../../app.json'

class OfferScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      offers: []
    }
  }

  componentDidMount() {
    const userDetails = this.props.navigation.getParam('userDetails', 'NO-ID');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userDetails.accessToken;

    this.setState({ loading: true });
    let apiUrl = baseUrl + '/api/services/app/Product/GetDiscountProducts';

    axios.get(apiUrl)
      .then(res => {
        this.setState({ offers: res.data.result });
        this.setState({ loading: false });
      }).catch(err => {
        alert(err);
        this.setState({ loading: false });
      })
  }

  renderOffers = ({ item }) => {
    return (
      <View>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.heading}>{item.productName} - {item.discount}</Text>
          <Text>Category: {item.category}</Text>
          <Text>Units left: {item.quantity}</Text>
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
        <View>
          <Header transparent={true} style={{ margin: 0, padding: 0 }}>
            <Right>
              <Button onPress={() => this.props.navigation.openDrawer()} title="menu"></Button>
            </Right>
          </Header>
          <ScrollView>
            <FlatList
              data={this.state.offers}
              renderItem={this.renderOffers}
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

export default OfferScreen;