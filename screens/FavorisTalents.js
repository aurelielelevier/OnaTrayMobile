import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import {connect} from 'react-redux'
import HeaderBar from '../components/HeaderBar';
import CardRestaurant from '../components/CardRestaurant';

function FavorisTalents({profilToDisplay}) {
  const [liste, setListe] = useState([])
 
  useEffect(() => {
    console.log('COUCOU !!!!!!!!!!!!!!!!!!!',profilToDisplay.wishlistTalent)
    async function cherche (){
    var rawResponse = await fetch(`http://192.168.1.7:3000/talents/affiche-whishlist/${profilToDisplay.token}`)
    var response = await rawResponse.json()
    setListe(response)
    }
    cherche()
  }, [profilToDisplay])

  return (
    
    <View style={{flex:1}}>
      <HeaderBar page='Mes favoris' menu=''/>
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
}

export default connect(
  mapStateToProps, 
  null
)(FavorisTalents);
