import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native-elements'

export default function Recherche( ) {
  return (
    <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{
          backgroundColor: '#4b6584',
          justifyContent: 'space-around',
        }}
      />
      <ScrollView style={{marginTop: 20}}>
        <Text>ON a mjlkjh lkjg yguy uy kuyf kjhfgk jhf kuyf</Text>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    flex:4,
    marginTop:25,
    backgroundColor: '#4b6584',
    
  },
  scrollview:{
    flex:5,
    backgroundColor: '#4b6584',

  }
});
