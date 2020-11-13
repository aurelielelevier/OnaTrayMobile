import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, KeyboardAvoidingView, Modal, Alert, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux'
import {Button, CheckBox} from 'react-native-elements'
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBar from '../components/HeaderBar';

const image = require('../assets/image-carousel-2.jpg');
const logo = require('../assets/logo-onatray.png');

const itemsPostes = [{id: 'Voiturier', name: 'Voiturier'}, 
                        {id: 'Serveur', name: 'Serveur'}, 
                        {id: 'Garçon de café', name: 'Garçon de café'}, 
                        {id: 'Plongeur',name: 'Plongeur'},
                        {id: 'Runner', name: 'Runner'}, 
                        {id: 'Sommelier',name: 'Sommelier'},
                        {id: 'Chef de rang', name: 'Chef de rang'},
                        {id: "Maître d'hôtel", name: "Maître d'hôtel"},
                        {id: 'Manager', name: 'Manager'}, 
                        {id: 'Chef de cuisine',name: 'Chef de cuisine'},
                        {id: 'Chef de partie',name: 'Chef de partie'},
                        {id: 'Commis de cuisine', name: 'Commis de cuisine'}, 
                        {id: 'Pizzaiolo',name: 'Pizzaiolo'},
                        {id: 'Pâtissier',name: 'Pâtissier'},
];
const itemsLangues = [{id: 'Français', name: 'Français'}, 
                        {id: 'Anglais', name: 'Anglais'}, 
                        {id: 'Espagnol', name: 'Espagnol'}, 
                        {id: 'Italien',name: 'Italien'},
                        {id: 'Allemand', name: 'Allemand'}, 
                        {id: 'Chinois',name: 'Chinois'},
];
const itemsContrats = [{id: 'CDI', name: 'CDI'}, 
                        {id: 'CDD', name: 'CDD'}, 
                        {id: 'Extra', name: 'Extra'}, 
];
const enPoste = ['Oui', 'Non'];
const enRecherche =['Oui', 'Non']

function HomeScreen({profilToDisplay}) {
  
  const [enPosteChoix, setEnPosteChoix] = useState('Oui')
  const [enRechercheChoix, setEnrechercheChoix]= useState('Oui')
  const [villeFormation, setVilleFormation] = useState('')
  const [ecole, setEcole] = useState('')
  const [anneeFormation, setAnneeFormation] = useState('')
  const [diplome, setDiplome] = useState('')
  const [jobChoosen, setJobChoosen] = useState([])
  const [langues, setLangues] = useState([])
  const [contrats, setContrat] = useState([])
  const [entreprise, setEntreprise] = useState('')
  const [villeExperience, setVilleExperience] = useState('')
  const [posteOccupe, setPosteOccupe] = useState('')
  const [débutExperience, setDébutExperience] = useState('')
  const [finExperience, setfinExperience] = useState('')


  const onSelectedItemsJob = (selectedItems) => {
    setJobChoosen(selectedItems)
  };
  const onSelectedItemsLangues = (selectedItems) => {
    setLangues(selectedItems);
  };
  const onSelectedItemsContrats = (selectedItems) => {
    setContrat(selectedItems);
  };

  async function valider() {
    var formation = JSON.stringify([{school: ecole, city:villeFormation, year:anneeFormation, diploma:diplome}])
    var experience = JSON.stringify([{firm: entreprise, city:villeExperience, job: posteOccupe, rangeDate:[débutExperience, finExperience]}])
    var rawResponse = await fetch("http://192.168.1.7:3000/talents/informations", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profilToDisplay.tokenToDisplay}&recherche=${enRecherche}&poste=${enPoste}&langage=${JSON.stringify(langues)}&job=${JSON.stringify(jobChoosen)}&experience=${experience}&formation=${formation}&contrat=${JSON.stringify(contrats)}`
    })
    var response = await rawResponse.json()
  }


  return (
    <View style={{flex:1}}>
      <HeaderBar page= 'Inscription'/>
      
      <View style={{flex:1, alignItems:'center'}}>

        <KeyboardAvoidingView style={{ flex: 1, width:'100%', justifyContent: 'center', }} behavior="padding" enabled >
          <ScrollView style={{ width:'100%'}}>
            <Text style={styles.text}>Votre formation principale :</Text>
              <View style={styles.lignes}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setEcole(text)}
                  value={ecole}
                  placeholder='École'
                  autoCapitalize='words'
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => setVilleFormation(text)}
                  value={villeFormation}
                  placeholder='Ville'
                  autoCapitalize='words'
                />
              </View>
              <View style={styles.lignes}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setDiplome(text)}
                  value={diplome}
                  placeholder='Diplome'
                  autoCapitalize='words'
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => setAnneeFormation(text)}
                  value={anneeFormation}
                  placeholder='Année'
                  autoCapitalize='words'
                />
              </View>
              <Text style={styles.text}>Votre dernière expérience :</Text>
              <View style={styles.lignes}>
                
                <TextInput
                  style={styles.input}
                  onChangeText={text => setEntreprise(text)}
                  value={entreprise}
                  placeholder='Restaurant'
                  autoCapitalize='words'
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => setVilleExperience(text)}
                  value={villeExperience}
                  placeholder='Ville'
                  autoCapitalize='words'
                />
              </View>
              <View style={styles.lignes}>
              <TextInput
                  style={styles.input}
                  onChangeText={text => setPosteOccupe(text)}
                  value={posteOccupe}
                  placeholder='Poste occupé'
                  autoCapitalize='words'
                />
                </View>
                <View style={styles.lignes}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setDébutExperience(text)}
                    value={débutExperience}
                    placeholder='Début'
                    autoCapitalize='words'
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setfinExperience(text)}
                    value={finExperience}
                    placeholder='Fin'
                    autoCapitalize='words'
                  />
              </View>
              <View style={{flex:1, marginTop:10}}>
                <MultiSelect
                  hideTags
                  hideSubmitButton={true}
                  fixedHeight={false}
                  items={itemsPostes}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsJob}
                  selectedItems={jobChoosen}
                  selectText="     Postes recherchés"
                  searchInputPlaceholderText="Postes recherchés"
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#4b6584"
                  selectedItemTextColor="#4b6584"
                  selectedItemIconColor="#4b6584"
                  itemTextColor="#CCC"
                  displayKey="name"
                  searchInputStyle={{color: '#4b6584'}}
                  submitButtonColor="#4b6584"
                  styleTextDropdownSelected={{color:'#4b6584', marginLeft:10}}
                  styleDropdownMenuSubsection={{borderColor:'#4b6584', borderStyle:'solid', borderWidth:1}}
                />
                <MultiSelect
                  hideTags
                  hideSubmitButton={true}
                  fixedHeight={false}
                  items={itemsLangues}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsLangues}
                  selectedItems={langues}
                  selectText="    Langues parlées"
                  searchInputPlaceholderText="Langues parlées"
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#4b6584"
                  selectedItemTextColor="#4b6584"
                  selectedItemIconColor="#4b6584"
                  itemTextColor="#CCC"
                  displayKey="name"
                  searchInputStyle={{color: '#4b6584'}}
                  submitButtonColor="#4b6584"
                  styleTextDropdownSelected={{color:'#4b6584', marginLeft:10}}
                  styleDropdownMenuSubsection={{borderColor:'#4b6584', borderStyle:'solid', borderWidth:1}}
                />
                <MultiSelect
                  hideTags
                  hideSubmitButton={true}
                  fixedHeight={false}
                  items={itemsContrats}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsContrats}
                  selectedItems={contrats}
                  selectText=" Types de contrats acceptés"
                  searchInputPlaceholderText="Types de contrats acceptés"
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#4b6584"
                  selectedItemTextColor="#4b6584"
                  selectedItemIconColor="#4b6584"
                  itemTextColor="#CCC"
                  displayKey="name"
                  searchInputStyle={{color: '#4b6584'}}
                  submitButtonColor="#4b6584"s
                  styleTextDropdownSelected={{color:'#4b6584', marginLeft:10}}
                  styleDropdownMenuSubsection={{borderColor:'#4b6584', borderStyle:'solid', borderWidth:1}}
                />
                </View>
                <View style={styles.lignes}>
                  <Text style={styles.text}>Vous êtes en poste</Text>
                  {
                    enPoste.map((choix,i)=>{
                      return(
                        <CheckBox
                          key={i+choix}
                          center
                          title={choix}
                          color={'red'}
                          containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={choix===enPosteChoix?true:false}
                          onPress={()=>{{setEnPosteChoix(choix==='Oui'?true:false)}}}
                        />
                      )
                    })
                  }
                <View style={styles.lignes}>
                  <Text style={styles.text}>Vous êtes en recherche</Text>
                  {
                    enRecherche.map((choix,i)=>{
                      return(
                        <CheckBox
                          key={i+choix}
                          center
                          title={choix}
                          color={'red'}
                          containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={choix===enRechercheChoix?true:false}
                          onPress={()=>{{setEnrechercheChoix(choix==='Oui'?true:false)}}}
                        />
                      )
                    })
                  }
                </View>

            
                
                </View>
                <Button 
                    onPress={()=>{valider()}}
                    buttonStyle={styles.button}
                    title='Valider'
                    titleStyle={{color:'#4b6584'}}
                    color="#4b6584"
                    />
                    
            
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
  return { profilToDisplay: state.profil}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HomeScreen);
