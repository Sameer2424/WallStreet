import React, { Component } from 'react'
import {Text, FlatList, StyleSheet} from 'react-native'
import { View } from '../Themed'
import {Constants} from 'expo-constants';
//import { getGainers } from '../../store/actions'
import ListHeader from '../ListHeader'
import TableView from '../TableView'
import CardList from '../CardList'

export default class Gainers extends Component {
render() {
/*
  const DATA:string[][] = [
      
    ['VKOHL', '120', '10'],
    ['DSHAR', '101', '1'],
    ['MSHAR', '101', '1'],
    ['KIMR', '101.5', '1.5'],
    ['MSHAM', '102.3', '2.3']

];
*/
const gainerArray:[] = JSON.parse(this.props.gainers);

if (!gainerArray)
return (<View></View>)


const DATA = gainerArray.map(item =>
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
  <ListHeader title={"Top Gainers"}/>
<TableView data ={DATA} header = {header}/>

*/
return (

<View>
<CardList title={"Top Gainers"} data={DATA} styles = {styles}/>
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
