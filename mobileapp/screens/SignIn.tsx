
import React from 'react';
import {Text, TextInput, View, Button, TouchableOpacity, StyleSheet} from  'react-native';
//import Constants from 'expo-constants';

export default function SignIn(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /*
              <Button title="Sign in" onPress={() => { props.login(email, password)
            }} />

            */

    return (
        <View>

         <View style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center', 
            }}
        >
            <TouchableOpacity style={styles.blueband}>
            </TouchableOpacity>
         
            <TouchableOpacity style={styles.band}>
              <Text style={styles.logo}>CrickTrade</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.inputText}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={ styles.Btn  }
            onPress={() => { props.login(email, password)
            }}
            >
              <Text>Login</Text>
            </TouchableOpacity>            
            
        
        </View>
        
      </View>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
//      paddingTop: Constants.statusBarHeight,
      padding: 8,
    },
    inputText:{
        height:50,
        color:"black"
    },
    Btn:{
      width:"80%",
      backgroundColor:"skyblue",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:10,
      marginLeft:30
    },
  
    band:{
      fontWeight:"bold",
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      height : 100,
      backgroundColor:'lightgreen'
    },
    blueband:{
      fontWeight:"bold",
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      height : 100,
      backgroundColor:'blue'
    },

    logo:{
      fontWeight:"bold",
      fontStyle:'italic',
      fontFamily:'Roboto',
      fontSize:50,
      color:"blue",
    },
    
});




