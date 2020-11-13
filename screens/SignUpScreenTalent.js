import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, KeyboardAvoidingView, Modal, Alert, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux'
import {Button, Overlay} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBar from '../components/HeaderBar';

const image = require('../assets/image-carousel-2.jpg');
const logo = require('../assets/logo-onatray.png');

function HomeScreen({navigation, onLogin }) {
  
  const [profil, setProfil] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMotDePasse, setValueMotDePasse] = useState('');
  const [valueMotDePasse2, setValueMotDePasse2] = useState('');
  const [valueEmail, setValueEmail] = useState('')
  const [valueEmail2, setValueEmail2] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [texteModal, setTexteModal] = useState('')

  async function valider() {
    var validation = false
    if(valueEmail === valueEmail2 && valueEmail){
      if(valueMotDePasse === valueMotDePasse2 && valueMotDePasse){
      validation =true
      } else {
        setModalVisible(true)
        setTexteModal('Veillez à renseigner des mots de passe identiques')
      }
    } else {
      setModalVisible(true)
      setTexteModal('Veillez à renseigner des email identiques')
    }
    
    if(validation){
      var rawResponse = await fetch("http://192.168.1.7:3000/talents/createAccount", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${valueEmail}&password=${valueMotDePasse}&firstName=${prenom}&lastName=${nom}&phone=${telephone}`
      })
      var response = await rawResponse.json()
      onLogin(response.profil)
      navigation.navigate('SignUpTalent2')
    }
  }


  return (
    <View style={{flex:1}}>
      <HeaderBar page= 'Inscription'/>
      
      <View style={{flex:1, alignItems:'center', paddingTop:50}}>
        
      <Overlay 
        isVisible={modalVisible}
        overlayStyle={{flex:0.2, width:'90%'}}
        >
        <View>
          <View style={{flex:1, margin:20}}>
            <Text style={{color:'red'}}>{texteModal}</Text>
          </View>
          <Button 
              onPress={()=>{setModalVisible(false)}}
              buttonStyle={{backgroundColor:'#fed330', margin:20}}
              titleStyle={{color:'#4b6584'}}
              title='OK'/>
        </View>
      </Overlay>

      <Text>Pour créer votre compte, renseignez les informations suivantes :</Text>
      <KeyboardAvoidingView style={{ flex: 1, width:'100%', justifyContent: 'center', }} behavior="padding" enabled >
      <ScrollView style={{ width:'100%'}}>
      
        <View style={{alignItems:'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={email => setValueEmail(email)}
            value={valueEmail}
            placeholder='Email'
            autoCapitalize='none'
            autoCompleteType='email'
          />
          <TextInput
            style={styles.input}
            onChangeText={email => setValueEmail2(email)}
            value={valueEmail2}
            placeholder='Confirmez votre email'
            autoCapitalize='none'
            autoCompleteType='email'
          />
          <TextInput
            style={styles.input}
            onChangeText={nom => setNom(nom)}
            value={nom}
            placeholder='NOM'
            autoCapitalize='characters'
            autoCompleteType='name'
          />
          <TextInput
            style={styles.input}
            onChangeText={prenom => setPrenom(prenom)}
            value={prenom}
            placeholder='Prénom'
            autoCapitalize='words'
          />
          <TextInput
            style={styles.input}
            onChangeText={tel => setTelephone(tel)}
            value={telephone}
            placeholder='Téléphone'
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            onChangeText={mdp => setValueMotDePasse(mdp)}
            value={valueMotDePasse}
            placeholder='Mot de passe'
            secureTextEntry={true}
            blurOnSubmit={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={mdp => setValueMotDePasse2(mdp)}
            value={valueMotDePasse2}
            placeholder='Confirmez votre mot de passe'
            secureTextEntry={true}
            blurOnSubmit={true}
          />
          
          <Button 
              onPress={()=>{{valider()}}}
              buttonStyle={styles.button}
              title='Valider'
              titleStyle={{color:'#4b6584'}}
              color="#4b6584"
              />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
      
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
    textAlign:'center',
  },
  button:{
    backgroundColor:'#fed330',
    borderRadius:10,
    marginHorizontal:20,
    marginTop: 40
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
  input:{ 
    height: 30, 
    width:'80%', 
    fontSize:20, 
    height: 40, 
    borderRadius:5, 
    borderColor: '#4b6584', 
    borderWidth: 1,
    marginTop:20
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
