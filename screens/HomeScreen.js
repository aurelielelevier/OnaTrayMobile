import React from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';

import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const image = require('../assets/image-carousel-2.jpg');

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={{flex:3}}></View>
      <View style={{flex:3}}>
        <Text style={styles.titre}>On A Tray</Text>
        <Text style={styles.text}>  Bienvenue</Text>
      </View>
      
      <View style={{justifyContent:'center', border:'1px solid red', flexDirection:'row', flex:1}}>
        <Button 
           title="Me connecter"
           type="solid"
           buttonStyle={{backgroundColor: "#fed330", borderRadius:5,  margin:10, color:'black'}}
           onPress={() => navigation.navigate('Profil')}
       />   
       <Button 
           title="Créer un compte"
           type="solid"
           buttonStyle={{backgroundColor: "#fed330", borderRadius:5, margin:10}}
           onPress={() => navigation.navigate('Profil')}
       />   
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    textAlign:'center',
  },
  text:{
    flex:1,
    color:'#4b6584',
    fontSize:30,
    alignSelf: 'center',
  },
  titre:{
    flex:1,
    color:'#4b6584',
    fontSize:60,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});
