import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, StatusBar } from 'react-native';
import {Constants} from 'expo-constants';
import { Text, View } from '../components/Themed';
//import {Table, Row, Rows} from 'react-native-table-component';
import {DataTable} from 'react-native-paper';

import TableView from '../components/TableView';
import WatchList from '../components/WatchList';
import CardList from '../components/CardList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f9c2ff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    justifyContent: 'center',
    alignContent:'center',
  },
  table: {
    backgroundColor: 'lightgreen',
    borderColor:'blue',
    borderTopWidth:2,
    borderBottomWidth:2,
  },
    
  head: { height: 40, backgroundColor: 'lightgreen'},
  row: { height: 40, backgroundColor: 'skyblue' },
  text: { margin: 6 },
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
  header: {
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

  card:{
  width:'85%',
  backgroundColor:'khaki',
  marginLeft:25,
  marginRight:5,
  borderRadius: 20
  },

  img:{
  width:'25%',
  height:'100%'
  }

});



export default function Portfolio() {
  const DATA:string[][] = [
      
    ['VKOHL\n10@110', '120', '10'],
    ['DSHAR\n2@100', '101', '1'],
    ['MSHAR\n2@100', '101', '1'],
    ['KIMR\n1@100', '101.5', '1.5'],
    ['MSHAM\n4@100', '102.3', '2.3'],
    ['BSVAR\n20@100', '101.2', '1.2']
  
];

const header:string[] = [
  'Stock/Price',
  'Current Price',
  'Gain/Loss'
];

return (

<ScrollView style={styles.container}>
<View style={{flex: 1, flexDirection: 'column'}}>
<CardList data ={DATA} title = {"Holdings"} styles={styles}/>
<WatchList/>
</View>
</ScrollView>
);

}

