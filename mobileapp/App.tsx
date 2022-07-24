import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CrickAppBar from './components/CrickAppBar';
import MyAppBar from './components/MyAppBar';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import SignIn from  './screens/SignIn';


export default function App() {
//export default class App extends Component {
  
const isLoadingComplete = useCachedResources();
const colorScheme = useColorScheme();

const [userToken, setUserToken] = React.useState();

const loginCrick = (username:string, password:string) => {

/*  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password:password})
    };
    fetch('http://market.cricktrade.com/auth/token/login', requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (response.status != 200) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                alert('There was an error!' +  error.toString());
                return;
                //return Promise.reject(error);
            }

            setUserToken(data.auth_token);
            //return ({userToken: data.auth_token});

        })
        .catch(error => {
            alert('There was an error!' +  error.toString());
        });
*/
setUserToken("14252562");
}


if (!isLoadingComplete) {
  return null;
} else {


      return (
      (userToken) ? (
        <>
          <SafeAreaProvider>
            <CrickAppBar/>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </>
      ) : (
        <>
          <SignIn login={loginCrick}/>
        </>  
      ));
    }

}




