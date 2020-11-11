import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableHighlight, Modal, Alert, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux'
import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const image = require('../assets/image-carousel-2.jpg');

function HomeScreen({navigation, profilToDisplay, pseudoToDisplay, onSetPseudo, onLogin }) {

  const [token, setToken] = useState('')
  const [profil, setProfil] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMotDePasse, setValueMotDePasse] = useState('');
  const [valueEmail, setValueEmail] = useState('')

  useEffect( () => {
    console.log(profil)
    // AsyncStorage.getItem("token", 
    //         function(error, data){
    //           setToken(data);
    //         });
    // if(profil){
    //   var rawResponse = await fetch("http://192.168.1.7:3000/connect", {
    //   method: 'POST',
    //   headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //   body: `token=${profil.token}`
    // })
    //   var response = await rawResponse.json()
    //   setProfil(response.profil)
    //   onSetPseudo(response.pseudo)
    //   onLogin(response.profil)
    //   AsyncStorage.setItem("pseudo", response.pseudo)
    //   AsyncStorage.setItem("profil", response.profil)
   // }
  }, [])


  async function signin() {
    var rawResponse = await fetch("http://192.168.1.7:3000/sign_in", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${valueEmail}&password=${valueMotDePasse}`
    })
    var response = await rawResponse.json()
    if(response.profil){
      onLogin(response.profil)
      onSetPseudo(response.pseudo)
      // AsyncStorage.setItem("pseudo", response.pseudo)
      // AsyncStorage.setItem("profil", response.profil)
      console.log(response)
      navigation.navigate('Rechercher')
    } else {
      console.log(response)
      navigation.navigate('Rechercher')
    }
  }

  if(profil){
    var affichage = <View>
                          <Text style={styles.text}> Bienvenue {pseudoToDisplay} </Text>
                          <Text > Bienvenue </Text>
                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#fed330", height:40, marginBottom:30}}
                              onPress={() => {navigation.navigate('Rechercher')}}
                            >
                            <Text style={styles.textStyle}>Je commence</Text>
                          </TouchableHighlight>
                        </View>

  } else {
    var affichage = 
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
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
            style={{ ...styles.openButton, backgroundColor: "#fed330" }}
            onPress={() => {
              setModalVisible(!modalVisible); signin();
            }}
          >
            
            <Text style={styles.textStyle}>Confirmer</Text>
          </TouchableHighlight>
          
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#fed330" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Annuler</Text>
          </TouchableHighlight>

          </View>
        </View>
      </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Se connecter</Text>
      </TouchableHighlight>
    </View>
  }

  return (
    
    
    <ImageBackground source={image} style={styles.image}>
      
      <View style={{flex:3}}></View>
      <View style={{flex:3}}>
        <Text style={styles.titre}>On A Tray</Text>
        
        {affichage}
        
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
    flex:4,
    color:'#4b6584',
    fontSize:60,
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
    backgroundColor: "#fed330",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'#4b6584',
    fontSize:20
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
