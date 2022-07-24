import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
//import {Card} from 'react-native-elements';
import {Card, Title, Paragraph} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function CardList(props) {

  const navigation = useNavigation();

  
//  const avatar = "http://test-env.eba-nugusyzn.us-west-1.elasticbeanstalk.com/img/avatar.jpg"
  const avatar ="https://w7.pngwing.com/pngs/539/357/png-transparent-man-wearing-white-polo-shirt-crossing-his-arms-virat-kohli-india-national-cricket-team-tissot-virat-kohli-celebrities-tshirt-game-thumbnail.png";
  

  /*
    <TouchableOpacity onPress={() =>{alert("press")}}>
    <Title style={styles.textTitle}>Virat Kohli</Title>
    <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style ={styles.img}
              resizeMode="cover"
              source={{ uri: avatar }}
          />
      <Text style={styles.text}>100 +2</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity>
      <Title style={styles.textTitle}>Rohit Sharma</Title>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style ={styles.img}
              resizeMode="cover"
              source={{ uri: avatar }}
          />
      <Text style={styles.text}>101 +1</Text>
      </View>
      </TouchableOpacity>


      <Title style={styles.textTitle}>Jayant Yadav</Title>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style ={styles.img}
              resizeMode="cover"
              source={{ uri: avatar }}
          />
      <Text style={styles.text}>99 +1.5</Text>
      </View>

      <Title style={styles.textTitle}>Jaspreet Bhumrah</Title>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style ={styles.img}
              resizeMode="cover"
              source={{ uri: avatar }}
          />
      <Text style={styles.text}>99 +1.5</Text>
      </View>



  */

  function renderCards(){
    
      return props.data.map((item,i) => {
      return (

        <TouchableOpacity onPress={() =>{navigation.navigate("Trade")}}>
        <Title style={props.styles.textTitle}>{item[0]}</Title>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={props.styles.text}>{item[1] + '      ' } </Text>
          <Text style={props.styles.text}>{item[2]} </Text>
         </View>
         <View style = {props.styles.lineStyle} />

        </TouchableOpacity>
        )}
        );
      }
  
  return (
  

    <Card style={props.styles.card} elevation={3}>
    <Card.Title title={props.title} style={props.styles.header}/>
    <Card.Content>
    {renderCards()}
    </Card.Content>
    </Card>
    
    );
  }

