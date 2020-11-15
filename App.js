import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from './screens/HomeScreen';
import MonProfilTalent from './screens/MonProfilTalent';
import RechercheRestaurant from './screens/RechercheRestaurants';
import Favoris from './screens/FavorisTalents';
import MonProfilRestaurant from './screens/MonProfilRestaurant';
import RechercheTalents from './screens/RechercheTalents';
import FavorisRestaurant from './screens/FavorisRestaurant';
import SignUpRestaurant from './screens/SignUpScreenRestaurant';
import SignUpRestaurant2 from './screens/SignUpScreenRestaurant2';
import SignUpTalent from './screens/SignUpScreenTalent';
import SignUpTalent2 from './screens/SignUpScreenTalent2';
import SignUpTalent3 from './screens/SignUpScreenTalent3';
import PhotoScreen from './screens/PhotoScreen';


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
      }

      return <AntDesign name={iconName} size={25} color={tintColor} />;
    },
  }),
  
  tabBarOptions: {
    activeTintColor: '#fc5c65',
    inactiveTintColor: '#4b6584',
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
      } 

      return <AntDesign name={iconName} size={25} color={tintColor} />;
    },
    
  }),
  
  tabBarOptions: {
    activeTintColor: '#fc5c65',
    inactiveTintColor: '#4b6584',
  
    style: {
      backgroundColor: '#fed330',
    }
  }  
}
);

StackNavigator = createStackNavigator({
  Home: HomeScreen,  
  SignUpTalent: SignUpTalent,
  SignUpTalent2: SignUpTalent2,
  SignUpTalent3: SignUpTalent3,
  SignUpRestaurant: SignUpRestaurant,
  SignUpRestaurant2: SignUpRestaurant2,
  PhotoScreen: PhotoScreen,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
