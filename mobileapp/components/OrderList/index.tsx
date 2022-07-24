import React, { Component } from 'react'
import {Text, FlatList, StyleSheet} from 'react-native'
import { View } from '../Themed'
//import { getGainers } from '../../store/actions'
import ListHeader from '../ListHeader'
import TableView from '../TableView'
import CardList from '../CardList'

export default class OrderList extends Component {
render() {
  const DATA:string[][] = [
      
    ['POKL 10@110', 'Executed @ 20-11-2020:3:31 PM', '1100'],
    ['SHIE 2@100','Executed @ 12-12-2020:3:51 PM', '200'],
    ['SEREE 2@110','Placed @ 25-12-2020:3:51 PM', '220']
];

const header:string[] = [
  'Stock/Price',
  'Transaction@Time',
  'Amt.'
];

return (

<View>
<CardList data ={DATA} title = {"Orders"} styles={styles}/>
</View>

);
}
}

const styles = StyleSheet.create({
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'gray',
    margin:3,
  },


  paragraph: {
  margin: 24,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  },
  textTitle: {
  color:'black',
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'left',
  },
  text: {
  color:'blue',
  fontSize: 18,
  textAlign: 'center',
  },

  card:{
  width:'90%',
  backgroundColor:'#66cccc',
  marginLeft:20,
  marginTop:50,
  marginRight:5,
  borderRadius: 20

  },

  img:{
  width:'25%',
  height:'100%'
  }




});


