import React, { Component } from 'react'
import {Text, FlatList, StyleSheet} from 'react-native'
import { View } from '../Themed'
//import { getGainers } from '../../store/actions'
import ListHeader from '../ListHeader'
import TableView from '../TableView'
import CardList from '../CardList'

export default class WatchList extends Component {
render() {
  const DATA:string[][] = [
      
    ['POKL', '111', '1'],
    ['SHIE', '101', '1'],
    ['FSHAR', '111', '11'],
    ['KAPMR', '101.8', '1.8'],
    ['MMSAM', '102.7', '2.7']  
];

const header:string[] = [
  'Stock',
  'Current Price',
  'Gain'
];

/*
  <ListHeader title={"My Watch List"}/>
<TableView data ={DATA} header = {header}/>

*/

return (

  <CardList title={"My Watch List"} data={DATA} styles={styles}/>

);
}
}

const styles = StyleSheet.create({

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
  width:'85%',
  backgroundColor:'#00cc99',
  marginLeft:25,
  marginRight:5,
  marginTop:40,
  borderRadius: 20

  },

  lineStyle:{
    borderWidth: 0.5,
    borderColor:'gray',
    margin:3,
  },


  img:{
  width:'25%',
  height:'100%'
  }

});