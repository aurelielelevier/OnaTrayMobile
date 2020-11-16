import React, { useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, Overlay} from 'react-native-elements';
import HeaderBar from '../components/HeaderBar';
import url from '../url';
import Autocomplete from 'react-native-autocomplete-input';
import ModalLogout from '../components/ModalLogout';

function SignUpScreenRestaurant ({navigation, onLogin}) {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMotDePasse, setValueMotDePasse] = useState('');
  const [valueMotDePasse2, setValueMotDePasse2] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valueEmail2, setValueEmail2] = useState('');
  const [nom, setNom] = useState('');
  const [site, setSite] = useState('');
  const [siret, setSiret] = useState('');
  const [telephone, setTelephone] = useState('');
  const [texteModal, setTexteModal] = useState('');
  const[adresse, setAdresse] = useState('');
  const[adressesProposees, setAdressesProposees] = useState([]);
  const [latlngDomicile, setLatlngDomicile] = useState({coordinates: [ 2.3488, 48.8534]});
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  
  function logout(){
    setModalLogoutVisible(true)
  };
  function deconnect(){
    navigation.navigate('Home')
  };
  function fermeModal(){
    setModalLogoutVisible(false)
  };

  useEffect(() => {
    // mise en forme du texte saisi pour pouvoir être utilisé avec l'API 
      let tableauAdresse = adresse.split(' ')
      let requete = ''
      for(var i=0; i<tableauAdresse.length; i++){
        if(i===tableauAdresse.length-1){
          requete += tableauAdresse[i]
        } else {
          requete += tableauAdresse[i] + '+'
        }
      }
      async function autocompletion(){
        // Recherche d'une adresse existante sur l'API data.gouv.fr et mise à jour des 
        // coordonnées lat lng pour le point sur la carte
        var rawResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${requete}`)
        var response = await rawResponse.json()
        var liste = []
        for(var i=0; i<response.features.length; i++){
          liste.push(response.features[i].properties.label)
        }
        setAdressesProposees(liste)
        if(response.features[0]){
          setLatlngDomicile(response.features[0].geometry)
        }
      } 
      autocompletion()
      console.log(latlngDomicile)
    }, [adresse]);

  async function valider() {
    var validation = false
    if(valueEmail === valueEmail2 && valueEmail){
      if(valueMotDePasse === valueMotDePasse2 && valueMotDePasse){
      validation =true
      } else {
        setModalVisible(true)
        setTexteModal('Veuillez renseigner des mots de passe identiques')
      }
    } else {
      setModalVisible(true)
      setTexteModal('Veuillez renseigner des emails identiques')
    };
    
    if(validation){
      var rawResponse = await fetch(`${url}/restaurants/createAccount`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `restaurantEmail=${valueEmail}&restaurantPassword=${valueMotDePasse}&restaurantSiret=${siret}&restaurantName=${nom}&phoneRestaurant=${telephone}&restaurantAdress=${adresse}&lnglat=${JSON.stringify(latlngDomicile)}&restaurantWebsite=${site}`
      })
      var profil = await rawResponse.json()
      onLogin(profil)
      navigation.navigate('SignUpRestaurant2')
    }
  };

  return (
    <View style={{flex:1}}>
      <HeaderBar page= 'Inscription' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>

      <View style={{flex:1, alignItems:'center', paddingTop:10}}>
        
      <Overlay 
        isVisible={modalVisible}
        overlayStyle={{flex:0.2, width:'90%'}}
        >
        <View>
          <Text style={{color:'red'}}>{texteModal}</Text>
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
              placeholder='NOM du restaurant'
              autoCapitalize='characters'
              autoCompleteType='name'
            />
            <TextInput
              style={styles.input}
              onChangeText={siret => setSiret(siret)}
              value={siret}
              placeholder='N° SIRET'
              autoCapitalize='none'
            />
              <TextInput
                style={styles.input}
                onChangeText={text => setSite(text)}
                value={site}
                placeholder='Website'
                autoCapitalize='none'
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
                //blurOnSubmit={true}
              />
              <TextInput
                style={styles.input}
                onChangeText={mdp => setValueMotDePasse2(mdp)}
                value={valueMotDePasse2}
                placeholder='Confirmez votre mot de passe'
                secureTextEntry={true}
                //blurOnSubmit={true}
              />
            <View style={{flex:1, marginBottom:60, marginTop:20, width:'80%', borderColor:'#4b6584', borderWidth:1, borderRadius:10}}>
                <Autocomplete
                  style={{width:'80%', height:35}}
                  inputContainerStyle={{borderWidth:0}}
                  listContainerStyle={{flex:1}}
                  data={adressesProposees}
                  defaultValue={adresse}
                  placeholder='Entrez votre adresse'
                  onChangeText={text => setAdresse(text)}
                  renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => setAdresse(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
            </View>
            
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
};

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
    borderRadius:10, 
    borderColor: '#4b6584', 
    borderWidth: 1,
    marginTop:20
  }
});

function mapDispatchToProps (dispatch) {
  return {
      onLogin: function(profil){
          dispatch({type:'addProfil', profil:profil})
      }
  }
};

export default connect(
  null, 
  mapDispatchToProps
)(SignUpScreenRestaurant);
