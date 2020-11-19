import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, CheckBox} from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import HeaderBar from '../components/HeaderBar';
import url from '../url';
import items from '../données/itemsTalents';
import ModalLogout from '../components/ModalLogout';

function SignUpScreenTalent2 ({navigation, profilToDisplay, onLogin}) {
  
  const [enPosteChoix, setEnPosteChoix] = useState(true);
  const [enRechercheChoix, setEnrechercheChoix]= useState(true);
  const [villeFormation, setVilleFormation] = useState('');
  const [ecole, setEcole] = useState('');
  const [anneeFormation, setAnneeFormation] = useState('');
  const [diplome, setDiplome] = useState('');
  const [jobChoosen, setJobChoosen] = useState([]);
  const [langues, setLangues] = useState([]);
  const [contrats, setContrat] = useState([]);
  const [entreprise, setEntreprise] = useState('');
  const [villeExperience, setVilleExperience] = useState('');
  const [posteOccupe, setPosteOccupe] = useState('');
  const [débutExperience, setDébutExperience] = useState('');
  const [finExperience, setfinExperience] = useState('');
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
    // Requête vers le backend pour mettre à jour les informations du talent en base de données
    var formation = JSON.stringify([{school: ecole, city:villeFormation, year:anneeFormation, diploma:diplome}])
    var experience = JSON.stringify([{firm: entreprise, city:villeExperience, job: posteOccupe, rangeDate:[débutExperience, finExperience]}])
    var rawResponse = await fetch(`${url}/talents/informations`, {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profilToDisplay.token}&recherche=${enRechercheChoix}&poste=${enPosteChoix}&langage=${JSON.stringify(langues)}&job=${JSON.stringify(jobChoosen)}&experience=${experience}&formation=${formation}&contrat=${JSON.stringify(contrats)}`
    })
    var profilAjour = await rawResponse.json()
    // Mise à jour dans le store du profil avec les nouvelles données enregistrées
    console.log(profilAjour)
    onLogin(profilAjour)
  };

  return (
    <View style={{flex:1}}>

      <HeaderBar page= 'Inscription' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>
      
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
                  items={items.itemsPostes}
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
                  items={items.itemsLangues}
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
                  items={items.itemsContrats}
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
                  <CheckBox
                    key='PasEnPoste'
                    center
                    title='Oui'
                    containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={ enPosteChoix?true:false}
                    onPress={()=>{setEnPosteChoix(true)}}
                  />
                  <CheckBox
                    key='enPoste'
                    center
                    title='Non'
                    containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={!enPosteChoix?true:false}
                    onPress={()=>{setEnPosteChoix(false)}}
                  />
                <View style={styles.lignes}>
                  <Text style={styles.text}>Vous êtes en recherche</Text>
                  <CheckBox
                    key='PasEnRecherche'
                    center
                    title='Oui'
                    containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={ enRechercheChoix?true:false}
                    onPress={()=>{setEnrechercheChoix(true)}}
                  />
                  <CheckBox
                    key='enRecherche'
                    center
                    title='Non'
                    containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={!enRechercheChoix?true:false}
                    onPress={()=>{setEnrechercheChoix(false)}}
                  />
                </View>
              </View>

              <Button 
                  onPress={()=>{{valider(); navigation.navigate('SignUpTalent3')}}}
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
)(SignUpScreenTalent2);
