import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Picker, ScrollView, Button } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'
import axios from 'axios'
import { devBaseURL, baseUrl } from '../../../app.json'

class HomeScreen extends Component {
    constructor(props) {
        super(props)


        this.state = {
            loading: false,
            products: [],
            stocks: [],
            product: ''
        }
    }

    componentDidMount() {

        const userDetails = this.props.navigation.getParam('userDetails', 'NO-ID');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userDetails.accessToken;

        this.setState({ loading: true });
        let apiUrl = baseUrl + '/api/services/app/Product/GetList';

        axios.get(apiUrl)
            .then(res => {
                this.setState({ products: res.data.result });
                this.setState({ loading: false });
                this.getStocks(this.state.products[0].id)
            }).catch(err => {
                alert(err);
                this.setState({ loading: false });
            })
    }

    getStocks = (id) => {
        this.setState({ loading: true });
        let apiUrl = baseUrl + '/api/services/app/Stock/GetAll?ProductId=' + id + '';

        axios.get(apiUrl)
            .then(res => {
                this.setState({ stocks: res.data.result.items });
                this.setState({ loading: false });
            }).catch(err => {
                alert(err);
                this.setState({ loading: false });
            })
    }

    renderStocks = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.heading}>{item.supplierName} - LKR {item.price}</Text>
                    <Text>{item.quantity} units available </Text>
                    <Text>Weight:  {item.weight}g</Text>
                    <Text>Offer: {item.discount}% discount</Text>
                    <Text style={styles.date}>Expires on {item.expiryDate}</Text>
                    <Text style={styles.date}>Manufactured on {item.manufactureDate}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        let productItems = this.state.products.map((item, i) => {
            return <Picker.Item key={i} value={item.id} label={item.productName} />
        });

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

                    <Text style={styles.selectText}>Select a product to get the stocks available</Text>
                    <Picker
                        style={styles.dropDown}
                        selectedValue={this.state.product}
                        onValueChange={(pro) => {
                            this.setState({ product: pro })
                            this.getStocks(pro)
                        }} >

                        {productItems}
                    </Picker>

                    <ScrollView>
                        <FlatList
                            data={this.state.stocks}
                            renderItem={this.renderStocks}
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
        padding: 10,
        // backgroundColor: "#fff"
    },
    card: {
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
    selectText: {
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 10
    },
    dropDown: {
        height: 40,
        color: 'black',
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        borderRadius: 5,
        textAlign: 'center'
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

export default HomeScreen;
