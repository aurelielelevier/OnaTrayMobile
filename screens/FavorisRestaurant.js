import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import { withNavigationFocus } from 'react-navigation';
import CardTalent from '../components/CardTalent';
import url from '../url';

function FavorisRestaurants({isFocused, navigation, profilToDisplay}) {

  function logout(){
      navigation.navigate('Home')
  };

  const [liste, setListe] = useState([]);
  const [profil, setProfil] = useState(profilToDisplay);
  
  useEffect(()=>{
    if(isFocused){
      setProfil(profilToDisplay)
      setListe(profilToDisplay.wishlistRestaurant)
    }
  },[isFocused]);

  useEffect(() => {
    async function cherche (){
    var rawResponse = await fetch(`http://${url}/restaurants/affiche-whishlist/${profil.token}`)
    var response = await rawResponse.json()
    setListe(response)
    }
    cherche()
  }, [profil]);
  
  return (
    <View style={{flex:1}}>
      <HeaderBar page='Mes favoris' logout={logout}/>
      <View style={{flex:1}}>
        <ScrollView style={{marginTop: 20}}>
        {
          liste.map((talent,i)=> {
            return(
              <CardTalent key={`${talent}${i}`} talent={talent}/>
            )
          })
         }
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
    return { profilToDisplay : state.profil }
};

export default connect(
  mapStateToProps, 
  null
)(withNavigationFocus(FavorisRestaurants));

