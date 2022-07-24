
import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AutoScrolling from 'react-native-auto-scrolling';



export default class Ticker extends React.Component {

  renderList = (playerList) => 
  {
    if (!playerList) return (<View>    </View>);

    return playerList.map(item =>
    {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Trade")} ><Text style={styles.welcome}>{item.fields.name + ': ' + item.fields.cmp + ' (' + item.fields.change + ')'} </Text></TouchableOpacity>
        
      )
    }
    );
  }



  render() {

    var list = [{fields:{name:'nothing'}}];
    if( this.props.players)
      list  = JSON.parse(this.props.players);

    return (
      <View style={styles.container}>
        <AutoScrolling style={styles.scrolling2} endPadding={50} duration={100000}>
          <Text style={styles.welcome}>
            
          {this.renderList(list)}
          </Text>
        </AutoScrolling>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
  },
  scrolling1: {
    width: 400,
    padding: 10,
    marginBottom: 10,
  },
  scrolling2: {
    backgroundColor: 'red',
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  welcome: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});
