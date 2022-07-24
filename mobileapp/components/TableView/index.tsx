
import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, StatusBar } from 'react-native';

import {DataTable} from 'react-native-paper';

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
    color:'black',
  },
  title: {
    fontSize: 32,
    justifyContent: 'flex-start',
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

});

function renderHeader(data:string[])
{
  return data.map(function (value) 
  {
    return (

    <DataTable.Title style = {styles.title}>{value}</DataTable.Title>


    )    
  });
}


function renderRows(data:string[][])
{
    
  return data.map(function (row) 
  {

      const content = row.map( function( cell ) { 
        return (
          <DataTable.Cell>{cell}</DataTable.Cell>
        
        )
        });
        
        return (
          <DataTable.Row style={styles.row}>
            {content} 
      
          </DataTable.Row>
        ); 
       
       
  });

  

}


export default class TableView extends React.Component{


  //    label="1-2 of 6"

render()
{
  return (

<ScrollView style={styles.container}> 
  <DataTable style={styles.table}>
  <DataTable.Header style={styles.head}>
   { renderHeader(this.props.header)}
  </DataTable.Header>
  {renderRows(this.props.data)}
  
  <DataTable.Pagination
    page={1}
    numberOfPages={3}
    onPageChange={page => {
      console.log(page);
    }}
  />
  </DataTable>
  
  
  </ScrollView>
  );
}

}