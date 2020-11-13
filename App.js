import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from './screens/HomeScreen';
import MonProfilTalent from './screens/MonProfilTalent';
import RechercheRestaurant from './screens/RechercheRestaurants';
import Favoris from './screens/FavorisTalents';
import MonProfilRestaurant from './screens/MonProfilRestaurant';
import RechercheTalents from './screens/RechercheTalents';
import FavorisRestaurant from './screens/FavorisRestaurant';


import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import profil from './reducers/profil';

const store = createStore(combineReducers({profil}));

var BottomNavigatorTalent = createBottomTabNavigator({
  'Mon Profil': MonProfilTalent,
  Restaurants: RechercheRestaurant,
  Favoris: Favoris,
  Messagerie: HomeScreen,
},

{
  defaultNavigationOptions: ({ navigation }) => ({

    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Mon Profil') {
        iconName = 'user';
      } else if (navigation.state.routeName == 'Restaurants') {
        iconName = 'search1';
      } else if (navigation.state.routeName == 'Favoris') {
        iconName = 'heart';
      } else if (navigation.state.routeName == 'Messagerie') {
        iconName = 'wechat';
      } 

      return <AntDesign name={iconName} size={25} color={tintColor} />;
    },
  }),
  
  tabBarOptions: {
    activeTintColor: '#4b6584',
    inactiveTintColor: '#a5b1c2',
    style: {
      backgroundColor: '#fed330',
    }
  }  

}
);

var BottomNavigatorRestaurant = createBottomTabNavigator({
  'Mon Profil': MonProfilRestaurant,
  Talents: RechercheTalents,
  'Mes favoris': FavorisRestaurant,
  Messagerie: HomeScreen
},

{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Mon Profil') {
        iconName = 'user';
      } else if (navigation.state.routeName == 'Talents') {
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
    activeTintColor: '#4b6584',
    inactiveTintColor: '#a5b1c2',
  
    style: {
      backgroundColor: '#fed330',
    }
  }  

}
);

StackNavigator = createStackNavigator({
  Home: HomeScreen,  
  BottomNavigatorRestaurant: BottomNavigatorRestaurant,
  BottomNavigatorTalent: BottomNavigatorTalent,
  
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
