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
      
    ['MNKL', '111', 'Price crosses 110'],
    ['HJIE', '101', 'Price crosses 100']
];

const header:string[] = [
  'Stock',
  'Current Price',
  'Condition'
];

return (

<View>
  <CardList data ={DATA} title = {"Alerts List"} styles={styles}/>
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
    color:'brown',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    },
    text: {
    color:'blue',
    fontSize: 18,
    textAlign: 'center',
    },

    textHeader: {
      color:'yellow',
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'left',
      },
    
    card:{
    width:'85%',
    backgroundColor:'khaki',
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

