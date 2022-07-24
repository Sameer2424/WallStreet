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
import Chart from '../components/Chart';

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




export default class Trade extends React.Component {


state={
    stock:"",
    quantity:"",
    type:"buy",
    message:""
  }


/*

market/company/api/<code/symbol>

*/
  
  render(){

  const reset = () =>
  {
    this.state.message = "";
    this.state.quantity = "";
    this.state.stock = "";

  }     



//        <Text style={styles.logo}>Trade</Text>


  return (


    <ScrollView>
    <View style={styles.chartcont}>

    <Chart 
    data={[
            { x: 0, y: 100 },
            { x: 1, y: 110 },
            { x: 2, y: 120 },
            { x: 3, y: 101 },
            { x: 4, y: 99.1 },
            { x: 5, y: 89.2 },
            { x: 6, y: 88 }
            
          ]}
          />


    </View>      

    <View style={styles.container}>
    <View  flexDirection= 'row'>
              <TouchableOpacity style={ this.state.type === "buy"? styles.PressedBtn: styles.Btn  }
            onPress={() =>{
    //          style={styles.buyPressedBtn}
            this.setState({type:'buy'});
            }}
            >
              <Text >Buy</Text>
            </TouchableOpacity>


              <TouchableOpacity style={ this.state.type === "sell"? styles.PressedBtn: styles.Btn  }
            onPress={() =>{
    //          style={styles.buyPressedBtn}
            this.setState({type:'sell'});

            }}
            >
              <Text >Sell</Text>
            </TouchableOpacity>

      </View>



  
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter Player stock symbol" 
            placeholderTextColor="grey"
            onChangeText={text => this.setState({stock:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter Quantity" 
            placeholderTextColor="grey"
            onChangeText={text => this.setState({quantity:text})}/>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn}
        onPress={() =>{

        this.setState({message: 'Order Placed'});
        const requestOptions = {
        method: 'POST',
//        headers: { 'Content-Type': 'application/json', 'Authorization':'Token '+ },
        headers: { 'Content-Type': 'application/json' },
        body: {'p-mode':this.state.type, quantity:this.state.quantity, mode:'transact'}
        };

        fetch(("http://market.cricktrade.com/api/market/transact/" + this.state.stock), requestOptions)
        .then(response => response.json());
        
        reset();


        }}
        >
        <Text style={styles.placeOrderBtn}>Place Order</Text>
        </TouchableOpacity>


      </View>
      </ScrollView>



  );
}
}



const styles = StyleSheet.create({
  chartcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'tomato',
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
    padding:20
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
    marginBottom:10
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
  }

});
