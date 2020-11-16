import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Image, Text, View, TouchableHighlight, Modal, Alert, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import url from '../url';
const image = require('../assets/image-carousel-2.jpg');
const logo = require('../assets/logo-onatray.png');

function HomeScreen({navigation, onLogin}) {
  
  const [profil, setProfil] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMotDePasse, setValueMotDePasse] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  // Requête vers le backend pour voir si un utilisateur existe avec les identifiants email et mot de passe :
  async function signin() {
    var rawResponse = await fetch(`http://${url}/sign_in`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${valueEmail}&password=${valueMotDePasse}`
    });
    var response = await rawResponse.json()
    onLogin(response.profil)
    // Si le profil trouvé dans la base de données est un talent :
    if(response.type === 'talent'){
      navigation.navigate('Restaurants')
    // Si le profil trouvé dans la base de données est un restaurant :
    } else if(response.type === 'restaurant'){
      navigation.navigate('Talents')
    }
  };

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
          {/* MODAL pour le Sign-In */}
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

          {/* Boutons pour le Sign-Up : */}
          <View style={{flex:2, width:'80%'}}>
            <Text style={{ alignSelf:'center', marginBottom:30}}>ou je souhaite m'inscrire en tant que :</Text>
            <View style={{flexDirection:'row'}}>
              <Button 
                onPress={()=>{navigation.navigate('SignUpTalent')}}
                buttonStyle={styles.button}
                title='Talent'
                titleStyle={{color:'#4b6584'}}
                color="#4b6584"
              />
              <Button 
              onPress={()=>{navigation.navigate('SignUpRestaurant')}}
              buttonStyle={styles.button}
              title='Restaurant'
              titleStyle={{color:'#4b6584'}}
              color="#4b6584"
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    marginHorizontal:20
  }
});

function mapDispatchToProps (dispatch) {
  return {
    onLogin: function(profil){
        dispatch({type:'addProfil', profil:profil})
    }
  }
};

function mapStateToProps(state) {
  return { profilToDisplay: state.profil}
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HomeScreen);
