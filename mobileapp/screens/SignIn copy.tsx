
import React from 'react';
import {TextInput, View, Button, StyleSheet} from  'react-native';
import Constants from 'expo-constants';

//import {AuthContext} from './Context';

//export default function SignIn(props: { login: (arg0: string, arg1: string) => void; }) {
export default function SignIn() {
  const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    //const { login } = React.useContext(AuthContext);

  
    return (
        <View style={styles.container}>

         <View style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center', 
            }}
        >
        <p></p>
        <p></p>
        <p></p>
        <p>CrickTrade SignIn</p>
        <p></p>
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

        <p></p>
        <p></p>

        <Button title="Sign in" onPress={() => { /* props.login( email, password );    */ //props.setUserToken(code);  
        }} />
        
        </View>
        
      </View>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      padding: 8,
    },
    inputText:{
        height:50,
        color:"white"
    },
    
});




