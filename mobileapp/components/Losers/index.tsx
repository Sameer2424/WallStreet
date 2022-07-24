import React, { Component } from 'react'
//import { getLosers } from '../../store/actions'
import {Text, FlatList, StyleSheet,View} from 'react-native'
import CardList from '../CardList';
import {Constants} from 'expo-constants';

import ListHeader from '../ListHeader'

import TableView from '../TableView'

export default class Losers extends Component {
  render() {
/*
    const DATA:string[][] = [
        
      ['VKOHL', '90', '-20'],
      ['DSHAR', '91', '-9'],
      ['MSHAR', '90', '-10'],
      ['KIMR', '91', '-9'],
      ['MSHAM', '89', '-11']  
  ];

*/
  const loserArray:[] = JSON.parse(this.props.losers);

  if (!loserArray)
  return (<View></View>)
  
  
  const DATA = loserArray.map(item =>
  {
    const strArray = [item.fields.name, item.fields.cmp, item.fields.change ];
    return strArray;
  }
  );

  const header:string[] = [
    'Player Name',
    'Price',
    'Change'
  ];
  

  /*

      <ListHeader title={"Top Losers"}/>

    <TableView data ={DATA} header = {header}/>

    */
  return (

    <View>
    <CardList title={"Top Losers"} data={DATA} styles={styles}/>
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
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    text: {
      color:'blue',
      fontSize: 15,
      textAlign: 'center',
    },
  
  card:{
      width:'90%',
      backgroundColor:'lightgreen',
      marginLeft:15,
      marginRight:5,
      borderRadius: 20

    },
  
    img:{
      width:'25%',
      height:'100%'
    }
  
  });
  

