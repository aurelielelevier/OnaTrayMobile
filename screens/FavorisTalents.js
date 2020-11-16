import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import CardRestaurant from '../components/CardRestaurant';
import { withNavigationFocus } from 'react-navigation';
import url from '../url';

function FavorisTalents({profilToDisplay,navigation, isFocused}) {
  function logout(){
    navigation.navigate('Home')
  };

  const [liste, setListe] = useState([]);
  const [profil, setProfil] = useState(profilToDisplay);

  useEffect(()=>{
    if(isFocused){
      setProfil(profilToDisplay)
    }
  },[isFocused]);
 
  useEffect(() => {
    async function cherche (){
    var rawResponse = await fetch(`http://${url}/talents/affiche-whishlist/${profil.token}`)
    var response = await rawResponse.json()
    setListe(response)
    }
    cherche()
  }, [profil]);

  return (
    
    <View style={{flex:1}}>
      <HeaderBar page='Mes favoris' logout={logout}/>
      <View style={{flex:1}}>
        <ScrollView style={{flex: 1, marginTop: 20, marginBottom:10}}>
          <View style={{flex:1}}>
          {
          liste.map((resto,i)=> {
            return(
              <CardRestaurant key={`${resto}${i}`} resto={resto}/>
            )
          })
          }
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

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

function mapDispatchToProps (dispatch) {
  return {
      onChangeProfil: function(profil){
          dispatch({type:'addProfil', profil:profil})
      }
  }
};

function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withNavigationFocus(FavorisTalents));
