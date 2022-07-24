import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeInfo from '../screens/HomeInfo';
import Profile from '../screens/Profile';
import Trade from '../screens/Trade';
import Market from '../screens/Market';
import Portfolio from '../screens/Portfolio';
import Charts from '../screens/Charts';
import Orders from '../screens/Order';
import Research from '../screens/Research';
import General from '../screens/General';
import Alerts from '../screens/Alerts';
import AlertSettings from '../screens/AlertSettings';
import Notifications from '../screens/Notifications';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Market"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Research"
        component={TabTwoNavigator}
        options={{
//          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
          tabBarIcon: ({ color }) => <TabBarAntIcon name="areachart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-briefcase" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Alerts"
        component={TabFiveNavigator}
        options={{
            tabBarBadge: 3, 
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-alert" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabSixNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />



    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}


function TabBarAntIcon(props: { name: string; color: string }) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeInfo}
        options={{ headerTitle: 'Home', 
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
       }}
      />
    </HomeStack.Navigator>
  );
}

const ResearchStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <ResearchStack.Navigator>
      <ResearchStack.Screen
        name="Research"
        component={Research}
        options={{ headerTitle: 'Research',
        headerStyle: {
          backgroundColor: 'orange',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      
      }}
      />
    </ResearchStack.Navigator>
  );
}

const TradeStack = createStackNavigator<TabThreeParamList>();

const Tab = createMaterialTopTabNavigator();

function MarketTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Orders" component={Orders} />
    </Tab.Navigator>
  );
}
function SettingsTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={General} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}


function TabThreeNavigator() {
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen
        name="Market"
        component={MarketTabs}
        options={{ headerTitle: 'Market',
        headerStyle: {
          backgroundColor: 'magenta',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      
      
      }}
      />
    </TradeStack.Navigator>
  );
}

const PortfolioStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerTitle: 'Portfolio',
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      
      }}
      />
    </PortfolioStack.Navigator>
  );
}

const AlertsStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
  return (
    <AlertsStack.Navigator>
      <SettingsStack.Screen
        name="Alerts"
        component={Alerts}
        options={{ headerTitle: 'Alerts',
        headerStyle: {
          backgroundColor: '#ffff99',
        },
        headerTintColor: 'blue',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      
      }}
      />
    </AlertsStack.Navigator>
  );
}


const SettingsStack = createStackNavigator<TabSixParamList>();

function TabSixNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsTabs}
        options={{ headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: 'lavender',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      
      }}
      />
    </SettingsStack.Navigator>
  );
}

