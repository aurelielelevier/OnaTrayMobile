import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import { withNavigationFocus } from 'react-navigation';
import CardTalent from '../components/CardTalent';
import url from '../url';
import ModalLogout from '../components/ModalLogout';

function FavorisRestaurants({isFocused, navigation, profilToDisplay, onChangeProfil}) {

  const [liste, setListe] = useState([]);
  const [profil, setProfil] = useState(profilToDisplay);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [tableau, setTableau] = useState(profilToDisplay.wishlistRestaurant.map(talent=>talent._id));
  
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
      setProfil(profilToDisplay)
      setListe(profilToDisplay.wishlistRestaurant)
      setTableau(profilToDisplay.wishlistRestaurant.map(talent=>talent._id))
    }
  },[isFocused]);

  useEffect(() => {
    async function cherche (){
    var rawResponse = await fetch(`${url}/restaurants/affiche-whishlist/${profil.token}`)
    var response = await rawResponse.json()
    setListe(response)
    }
    cherche()
  }, [profil]);

  async function onChangeWishlist(idTalent){
    // requête vers le backend pour ajouter/supprimer le talent dans la wishlist
      var rawresponse = await fetch(`${url}/restaurants/wishlist`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profilToDisplay.token}&id=${idTalent}`
      })
      var response = await rawresponse.json()
      // mise à jour du profil restaurant avec nouvelles données de wishlist

      onChangeProfil(response.profil)
      setListe(response.profil.wishlistRestaurant)
      setProfil(response.profil)
      setTableau(response.profil.wishlistRestaurant.map(talent=>talent._id))
      onChangeWishlist(response.profil.wishlistRestaurant)
};
  
  return (
    <View style={{flex:1}}>
      <HeaderBar page='Mes favoris' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>
      <View style={{flex:1}}>
        <ScrollView style={{marginTop: 20}}>
        {
          liste.map((talent,i)=> {
            if(tableau.includes(talent._id)){
              var coeur = 'heart'
            } else {
              var coeur = 'heart-o'
            }
            return(
              <CardTalent key={`${talent}${i}`} talent={talent} coeur={coeur} onChangeWishlist={onChangeWishlist}/>
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
)(withNavigationFocus(FavorisRestaurants));

