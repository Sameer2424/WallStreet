import * as React from 'react';
import { StyleSheet, Button, Text, ScrollView, View } from 'react-native';
//import {Icon} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//import {  View } from '../components/Themed';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import Profile from './Profile';
import { NavigationContainer } from '@react-navigation/native';

import Blogs from './Blogs';
import SignIn from './SignIn';
import { DrawerActions } from '@react-navigation/native';
import Navigation from '../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();


/*
  <Button transparent  
    onPress ={() =>{navigation.toggleDrawer()}}  >
    <Ionicons name = 'ios-menu' color = 'blue'/>   
    </Button>
*/    


function Home({navigation})
{
  navigation.openDrawer();
  return (

  <View>
    <Text style={styles.title}>Welcome to Crick Trade</Text>
  </View>
  );

}


export default function HomeInfo() {
  
  const dimensions = useWindowDimensions();
  return (

        <Drawer.Navigator
          drawerType={dimensions.width >= 768 ? 'permanent' : 'slide'}
          // drawerType={'front'}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Account" component={Profile} />
          <Drawer.Screen name="Blogs" component={Blogs} />

        </Drawer.Navigator>
  );
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color:'blue',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
