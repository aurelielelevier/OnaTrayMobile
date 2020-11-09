import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from './screens/HomeScreen'
import MonProfil from './screens/MonProfil'
import Recherche from './screens/Recherche'

import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';


var BottomNavigator = createBottomTabNavigator({
  Profil: MonProfil,
  Recherche: Recherche,
  Messagerie: HomeScreen
},

{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Profil') {
        iconName = 'user';
      } else if (navigation.state.routeName == 'Recherche') {
        iconName = 'search1';
      } else if (navigation.state.routeName == 'Messagerie') {
        iconName = 'wechat';
      }

      return <AntDesign name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: '#4b6584',
    style: {
      backgroundColor: '#fed330',
    }
  }  

}
);

StackNavigator = createStackNavigator({
  Home: HomeScreen,  
  BottomNavigator: BottomNavigator
}, 
{headerMode: 'none'}
);  

const Navigation = createAppContainer(StackNavigator);

export default function App() {
  return (
    
      <Navigation/>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
