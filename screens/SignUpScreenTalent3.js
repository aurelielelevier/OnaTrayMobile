import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {Button} from 'react-native-elements'
import HeaderBar from '../components/HeaderBar';
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';
import url from '../url';
import ModalLogout from '../components/ModalLogout';

function SignUpScreenTalent3 ({navigation, onLogin, profilToDisplay}) {
  
  const [polygone, setPolygone] = useState([])
  const [polygoneinverse, setPolygoneinverse] = useState([])
  const[adresse, setAdresse] = useState('')
  const[adressesProposees, setAdressesProposees] = useState([])
  const [latlngDomicile, setLatlngDomicile] = useState({coordinates: [ 2.3488, 48.8534]})
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
    }, [adresse])


  async function valider(){
    // Envoi de l'adresse 
    // Envoi du tableau des points du périmètre défini vers le backend 
    // Pour un enregistrement en base de données 
    var listePoints = JSON.stringify(polygoneinverse)
    var lnglat = JSON.stringify(latlngDomicile)
    var rawResponse= await fetch(`${url}/talents/envoi-secteur`, {
      method:'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`token=${profilToDisplay.token}&liste=${listePoints}&adresse=${adresse}&lnglat=${lnglat}`
    })
    var profilAJour = await rawResponse.json()
    // Mise à jour dans le store du profil avec les nouvelles données enregistrées:
    onLogin(profilAJour)
  };

  return (
    <View style={{flex:1}}>

      <HeaderBar page= 'Inscription' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>
      
      <View style={{alignItems:'center'}}>
        <ScrollView style={{width:'100%'}}>
          <Text style={styles.text}>Renseignez votre adresse :</Text>
          <View style={{flex:1, margin:20}}>
            <Autocomplete
              style={{width:'80%', height:30}}
              inputContainerStyle={{borderRadius:10}}
              listContainerStyle={{flex:1}}
              data={adressesProposees}
              defaultValue={adresse}
              onChangeText={text => setAdresse(text)}
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => setAdresse(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              />
          </View>

          <View style={{ marginTop:60}}> 
            <Text style={styles.text}>Ensuite, dessinez sur la carte le périmètre dans lequel vous seriez intéressé 
              pour recevoir des offres de travail, n'oubliez pas de valider !</Text>
            <Text>(cliquez plusieurs fois pour dessiner les points de contours de votre choix)</Text>
          </View>

          <View style={styles.lignes}>
            <Button 
                  onPress={()=>{{valider(); navigation.navigate('Restaurants')}}}
                  buttonStyle={styles.button}
                  title='Valider et poursuivre'
                  titleStyle={{color:'#4b6584'}}
                  color="#4b6584"
                  />
            <Text>Ou</Text>
            <Button 
                  onPress={()=>{setPolygone([])}}
                  buttonStyle={styles.button}
                  title='Recommencer'
                  titleStyle={{color:'#4b6584'}}
                  color="#4b6584"
                  />
          </View>
        </ScrollView>
      </View>

      <MapView style={{flex: 1}}
                initialRegion={{
                latitude: latlngDomicile.coordinates[1],
                longitude: latlngDomicile.coordinates[0],
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
                }}
                onPress= {(e) => { 
                  setPolygone([...polygone, {latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}]); setPolygoneinverse([...polygoneinverse, [e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude]])
                }}
                >
                <Marker
                    coordinate={{latitude: latlngDomicile.coordinates[1], longitude: latlngDomicile.coordinates[0]}}
                    pinColor='#4b6584'
                    title='Mon domicile'
                    description= {adresse}
                />
                <Polygon
                    coordinates={polygone}
                    strokeWidth={1}
                    strokeColor='red'
                    fillColor='rgba(255, 0, 0, 0.2)'
                />
      </MapView>
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
    fontSize:20,
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
    width:'40%', 
    fontSize:20, 
    height: 40, 
    borderRadius:5, 
    borderColor: '#4b6584', 
    borderWidth: 1,
    marginTop:10,
    marginHorizontal:10
  },
  lignes:{
    flexDirection:'row', 
    flexWrap:'wrap', 
    alignItems:'center',
    justifyContent:'center'
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
)(SignUpScreenTalent3);
