import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from './screens/HomeScreen'
import MonProfil from './screens/MonProfil'
import Recherche from './screens/Recherche'
import Favoris from './screens/Favoris'

import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import profil from './reducers/profil';

const store = createStore(combineReducers({profil}));

var BottomNavigator = createBottomTabNavigator({
  'Mon Profil': MonProfil,
  Rechercher: Recherche,
  'Mes favoris': Favoris,
  Messagerie: HomeScreen
},

{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Mon Profil') {
        iconName = 'user';
      } else if (navigation.state.routeName == 'Rechercher') {
        iconName = 'search1';
      } else if (navigation.state.routeName == 'Mes favoris') {
        iconName = 'hearto';
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
    <Provider store={store}>
      <Navigation />
    </Provider>
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
