import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import CardRestaurant from '../components/CardRestaurant';
import { withNavigationFocus } from 'react-navigation';
import url from '../url';
import ModalLogout from '../components/ModalLogout';

function FavorisTalents({profilToDisplay,navigation, isFocused, onChangeProfil}) {

  const [liste, setListe] = useState(profilToDisplay.wishlistTalent);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [tableau, setTableau] = useState(profilToDisplay.wishlistTalent.map(item=>item._id))
  
  function logout(){
    setModalLogoutVisible(true)
  };
  function deconnect(){
    navigation.navigate('Home')
  };
  function fermeModal(){
    setModalLogoutVisible(false)
  };
  
  useEffect(()=>{
    if(isFocused){
      setListe(profilToDisplay.wishlistTalent)
      setTableau(profilToDisplay.wishlistTalent.map(item=>item._id))
    }
  },[isFocused, profilToDisplay]);


  async function changementWishlist(idRestaurant){
    // requête vers le backend pour ajouter/supprimer les restaurants dans la wishlist
    var rawresponse = await fetch(`${url}/talents/wishlist`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `token=${profilToDisplay.token}&id=${idRestaurant}`
    })  
    var response = await rawresponse.json()
    // mise à jour du profil talent avec nouvelles données de wishlist
    onChangeProfil(response.profil)
    setListe(response.profil.wishlistTalent)
  };

  return (
    
    <View style={{flex:1}}>
      <HeaderBar page='Mes favoris' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>
      <View style={{flex:1}}>
        <ScrollView style={{flex: 1, marginTop: 20, marginBottom:10}}>
        {
        liste.map((resto,i)=> {
          return(
            <CardRestaurant key={resto+i} resto={resto} coeur='heart' changementWishlist={changementWishlist}/>
          )
        })
        }
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
