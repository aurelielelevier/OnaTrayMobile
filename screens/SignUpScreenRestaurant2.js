import React, { useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, Overlay} from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import HeaderBar from '../components/HeaderBar';
import adresseIP from '../adresseIP';
import items from '../données/itemsRestaurants';

function SignUpScreenRestaurant ({navigation, profilToDisplay, onLogin}) {
  
  const [profil, setProfil] = useState(profilToDisplay)
  const [modalVisible, setModalVisible] = useState(false);
  const [clientele, setClientele] = useState([]);
  const [prix, setPrix] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [ambiance, setAmbiance] = useState([]);
  
  function logout(){
    onLogin({})
    navigation.navigate('Home')
  };

  const onSelectedItemsClientele = (selectedItems) => {
    setClientele(selectedItems)
  };
  const onSelectedItemsCuisine = (selectedItems) => {
    setCuisine(selectedItems);
  };
  const onSelectedItemsAmbiance = (selectedItems) => {
    setAmbiance(selectedItems);
  };

  async function valider() {
    if(prix === '€'){
      var prixConverti = 0
    } else if (prix === '€€'){
      var prixConverti = 1
    } else {
      var prixConverti = 2
    }
    var rawResponse = await fetch(`http://${adresseIP}:3000/restaurants/informations`, {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profilToDisplay.token}&clientele=${JSON.stringify(clientele)}&foodOption=${JSON.stringify(cuisine)}&restaurantOption=${JSON.stringify(ambiance)}&pricing=${prixConverti}`
    })
    var response = await rawResponse.json()
    console.log(response)
    onLogin(response)
    navigation.navigate('Talents')
  }


  return (
    <View style={{flex:1}}>
      <HeaderBar page= 'Inscription' logout={logout}/>
      
      <View style={{flex:1, alignItems:'center', paddingTop:10}}>

      <Text>Complétez vos informations en cochant les caractéristiques de votre restaurant dans les listes suivantes :</Text>
      <KeyboardAvoidingView style={{ flex: 1, width:'100%', justifyContent: 'center', }} behavior="padding" enabled >
      <ScrollView style={{ width:'100%'}}>
      <View style={{flex:1, marginTop:10}}>
                <MultiSelect
                  hideTags
                  hideSubmitButton={true}
                  fixedHeight={false}
                  items={items.itemsCuisine}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsCuisine}
                  selectedItems={cuisine}
                  selectText="     Type de cuisine"
                  searchInputPlaceholderText="Cuisine"
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
                  items={items.itemsClientele}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsClientele}
                  selectedItems={clientele}
                  selectText="    Type de clientèle"
                  searchInputPlaceholderText="Type de clientèle"
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
                  items={items.itemsAmbiance}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsAmbiance}
                  selectedItems={ambiance}
                  selectText="   Type d'ambiance"
                  searchInputPlaceholderText="Type d'ambiance"
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
                <Text style={styles.text}>Gamme de prix :</Text>
                  <View style={{flexDirection:'row'}}>
                  

                    {
                      items.itemsPrix.map((valeur,i)=>{
                        return(
                          <CheckBox
                            key={i+valeur.name}
                            center
                            title={valeur.name}
                            color={'red'}
                            containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={valeur.name===prix?true:false}
                            onPress={()=>{{setPrix(valeur.name)}}}
                          />
                        )
                      })
                    }
                  </View>
                </View>
        <View style={{alignItems:'center'}}>
          
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
    fontSize:15,
    alignSelf: 'center',
    marginTop:10
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
  }

function mapStateToProps(state) {
  return { profilToDisplay: state.profil}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SignUpScreenRestaurant);
