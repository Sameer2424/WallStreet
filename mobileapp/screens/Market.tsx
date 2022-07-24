import * as React from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
//import {RadioButton, Button} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';



// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useWindowDimensions } from 'react-native';
import Portfolio from './Portfolio';
import Order from './Order';
import { getCustomTabsSupportingBrowsersAsync } from 'expo-web-browser';

import Gainers from '../components/Gainers';
import Losers from '../components/Losers';
import Ticker from '../components/Ticker';

/*
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={Order} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
    </Tab.Navigator>
  );
}

*/




export default class Market extends React.Component {


componentWillMount()
{
  this.getMarketData();  
}


state={
    stock:"",
    quantity:"",
    type:"buy",
    message:"",
    marketData:null
  }



  getMarketData = () =>
  {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + this.props.token, 'Content-Type': 'application/json' }
      };
      fetch('http://market.cricktrade.com/market/api/data', requestOptions)
          .then(async response => {
              const data = await response.json();
              // check for error response
              if (response.status != 200) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  alert('There was an error!' +  error.toString());
                  return;
                  //return Promise.reject(error);
              }
              
              this.setState({'marketData': data});
  
          })
          .catch(error => {
              alert('There was an error!' +  error.toString());
          });
  
  }
  
  render(){

    

  const reset = () =>
  {
    this.state.message = "";
    this.state.quantity = "";
    this.state.stock = "";

  }     



//        <Text style={styles.logo}>Trade</Text>

  if (this.state.marketData == null)
  return (<View><Text>Loading..</Text></View>)

  else
  return (

    <ScrollView>
      <Ticker players = {this.state.marketData.players} navigation={this.props.navigation}/>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Gainers gainers = {this.state.marketData.gainers} navigation={this.props.navigation}/>
        <Losers losers = {this.state.marketData.losers} navigation={this.props.navigation}/>
      </View>
    </ScrollView>

  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'seagreen',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

inputView:{
    width:"80%",
    backgroundColor:"lightgreen",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    marginLeft:20
  },
inputText:{
    height:50,
    color:"black"
  },
    forgot:{
    color:"white",
    fontSize:11
  },
  placeOrderBtn:{
    width:"80%",
    backgroundColor:"skyblue",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    marginLeft:30
  },
  Btn:{
    width:"25%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginLeft:30,
    marginBottom:10
  },
  PressedBtn:{
    width:"25%",
    backgroundColor:"yellow",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    marginLeft:30
  },
  message:{
    width:"80%",
    backgroundColor:"seagreen",
    borderRadius:0,
    height:20,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginLeft:30,
    marginBottom:10
  },
logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"skyblue",
    marginLeft:60,
    marginBottom:40
  },
radio:{
    backgroundColor:"skyblue",
    color:"black",
  },

});
