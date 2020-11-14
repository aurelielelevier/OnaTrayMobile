import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux'
import HeaderBar from '../components/HeaderBar';
import { withNavigationFocus } from 'react-navigation';
import CardTalent from '../components/CardTalent';
import adresseIP from '../adresseIP';

function FavorisRestaurants(isFocused, profilToDisplay) {
  const [liste, setListe] = useState([])
  const [profil, setProfil] = useState(profilToDisplay)
  console.log('COUCOUC PROFIL', profilToDisplay)
  

  useEffect(()=>{
    if(isFocused){
      setProfil(profilToDisplay)
      
    }
  },[isFocused]);

  
  return (
    <View style={{flex:1}}>
      {
          liste.map((talent,i)=> {
            return(
              <CardTalent key={`${talent}${i}`} talent={talent}/>
            )
          })
         }
      <HeaderBar page='Mes favoris'/>
      <View style={{flex:1}}>
        <ScrollView style={{flex:1, marginTop: 20}}>
        
        </ScrollView>
      </View>
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

function mapStateToProps(state) {
  return { profilToDisplay : state.profil}
}

export default connect(
  mapStateToProps, 
  null
)(withNavigationFocus(FavorisRestaurants));

