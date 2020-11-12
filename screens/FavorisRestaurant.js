import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import HeaderBar from '../components/HeaderBar'

export default function Favoris() {
  
  return (
    <View>
      <HeaderBar page='Mes favoris'/>
      <ScrollView style={{marginTop: 20}}>
        <Text></Text>
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
