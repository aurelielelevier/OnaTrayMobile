import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Image, Text, View, TouchableHighlight, Modal, Alert, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux'
import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const image = require('../assets/image-carousel-2.jpg');
const logo = require('../assets/logo-onatray.png');

function HomeScreen({navigation, profilToDisplay, pseudoToDisplay, onSetPseudo, onLogin }) {
  const [profil, setProfil] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMotDePasse, setValueMotDePasse] = useState('');
  const [valueEmail, setValueEmail] = useState('')

  async function signin() {
    var rawResponse = await fetch("http://192.168.1.7:3000/sign_in", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${valueEmail}&password=${valueMotDePasse}`
    })
    var response = await rawResponse.json()
    console.log('RESPONSE 0000000000', response)
      onLogin(response.profil)
      onSetPseudo(response.pseudo)
    if(response.type === 'talent'){
      // AsyncStorage.setItem("pseudo", response.pseudo)
      // AsyncStorage.setItem("profil", response.profil)
      navigation.navigate('Restaurants')
    } else if(response.type === 'restaurant'){
      navigation.navigate('Talents')
    } 
    // else {
    //   navigation.navigate('Home')
    // }
  }

  if(profil){
    var affichage =   <View style={{flex:1}}>
                        
                        <Text style={styles.text}> Bienvenue {pseudoToDisplay} </Text>
                        <Text > Bienvenue </Text>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#fed330", height:40, marginBottom:30}}
                            onPress={() => {navigation.navigate('Rechercher')}}
                          >
                          <Text style={styles.textStyle}>Je commence</Text>
                        </TouchableHighlight>
                      </View>

  } 

  return (
    
    
    <ImageBackground source={image} style={styles.image}>
      
      
      <View style={{flex:1, alignItems:'center', paddingTop:50}}>
        <View style={{flex:1}}>
          <Image  source={logo}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                  />
        </View>
        <Text style={styles.sousTitre}>Bienvenue</Text>
        
        <View style={styles.centeredView}>
      <Modal 
        style={{flex:1, marginBottom:100}}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Veuillez entrer votre Email et vote mot de passe</Text>
          
           <View style={{flexDirection:'row'}}>
            <Icon
                  name='envelope-o'
                  size={24}
                  color='#fed330'
                  style={{margin:10}}
                />
              <TextInput
                style={{ height: 30, width:'80%', fontSize:20, borderBottomWidth: 1, borderBottomColor: '#4b6584'}}
                onChangeText={email => setValueEmail(email)}
                value={valueEmail}
                placeholder='Email'
                autoCapitalize='none'
              />
            </View>
            <View style={{flexDirection:'row', marginTop:30}}>
            <Icon
                  name='lock'
                  size={24}
                  color='#fed330'
                  style={{margin:10}}
                />
              <TextInput
                style={{ height: 30, width:'80%', fontSize:20, borderBottomWidth: 1, borderBottomColor: '#4b6584'}}
                onChangeText={mdp => setValueMotDePasse(mdp)}
                value={valueMotDePasse}
                placeholder='Mot de passe'
                secureTextEntry={true}
                blurOnSubmit={true}
              />
            </View>
          
          <View style={{flexDirection:'row', marginTop:10}}>
          
          <TouchableHighlight
            style={{ ...styles.openButton }}
            onPress={() => { setModalVisible(!modalVisible); signin()}}
          >
            <Text style={styles.textStyle}>Confirmer</Text>
          </TouchableHighlight>
          
          <TouchableHighlight
            style={{ ...styles.openButton}}
            onPress={() => { setModalVisible(!modalVisible)}}
          >
            <Text style={styles.textStyle}>Annuler</Text>
          </TouchableHighlight>

          </View>
        </View>
      </View>
      </Modal>
      <View style={{flex:1, width:'50%'}}>
        <Button 
          onPress={()=>{setModalVisible(true)}}
          buttonStyle={styles.button}
          title='Connexion'
          titleStyle={{color:'#4b6584'}}
          color="#4b6584"
          />
      </View>
      
    </View>
        
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
  },
  sousTitre:{
    flex:1,
    color:'#4b6584',
    fontSize:40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    marginBottom:200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    flex: 1,
    height: 35,
    alignItems:'center',
    textAlign:'center',
    backgroundColor: "#fed330",
    borderRadius: 20,
    padding:10,
    margin:10,
    
    //elevation: 2
  },
  textStyle: {
    color: "#4b6584",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'#4b6584',
    fontSize:20
  },
  button:{
    backgroundColor:'#fed330',
    borderRadius:10,
   
  }
});

function mapDispatchToProps (dispatch) {
  return {
      onSetPseudo: function(pseudo){
        dispatch ({
          type:'savePseudo', pseudo:pseudo
        })
      },
      onLogin: function(profil){
          dispatch({type:'addProfil', profil:profil})
      }
      }
  }

function mapStateToProps(state) {
  return { profilToDisplay: state.profil, pseudoToDisplay: state.pseudo}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HomeScreen);
