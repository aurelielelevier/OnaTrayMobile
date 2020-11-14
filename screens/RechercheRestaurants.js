import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import { Button, Overlay, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
import CardRestaurant from '../components/CardRestaurant';
import { withNavigationFocus } from 'react-navigation';
import adresseIP from '../adresseIP';

const zoneFrance= [
  [ -5.3173828125, 48.458124202908934 ],
  [ 2.1313476562500004, 51.26170001449684 ],
  [ 8.811035156250002, 48.90783374365477 ],
  [ 7.998046875000001, 43.70709714273101 ],
  [ 3.2080078125000004, 42.228008913641865 ],
  [ 1.4941406250000002, 42.293056273848215 ],
  [ -2.0214843750000004, 43.06838615478111 ],
  [ -5.3173828125, 48.458124202908934 ]
]
const itemsCuisine = [{id: 'française', name: 'française'}, 
                      {id: 'italienne', name: 'italienne'}, 
                      {id: 'japonaise', name: 'japonaise'}, 
                      {id: 'chinois',name: 'chinois'}, 
                      {id: 'healthy', name: 'healthy'}, 
                      {id: 'viande', name: 'viande'}, 
                      {id: 'poisson', name: 'poisson'}, 
                      {id: 'pizza', name: 'pizza'}, 
                      {id: 'burger', name: 'burger'}, 
                      {id: 'vegetarienne', name: 'vegetarienne'}, 
                      {id: 'vegan', name: 'vegan'}
];
const itemsPrix = [{id: 0, name: '€'}, 
                    {id: 1, name: '€€'}, 
                    {id: 2, name: '€€€'}
];
const itemsAmbiance = [{id: 'calme', name: 'calme'}, 
                        {id: 'animé', name: 'animé'}, 
                        {id: 'branché', name: 'branché'}, 
                        {id: 'sobre',name: 'sobre'}
];
const itemsClientele = [{id: 'touristique', name: 'touristique'}, 
                        {id: 'quartier', name: 'quartier'}, 
                        {id: 'jeune', name: 'jeune'}, 
                        {id: 'agée',name: 'agée'},
                        {id: 'familiale', name: 'familiale'}, 
                        {id: 'business',name: 'business'}
];
const ambiance = itemsAmbiance.map(item => item.name)
const cuisine = itemsCuisine.map(item => item.name)
const prix = itemsPrix.map(item => item.id)
const clientele = itemsClientele.map(item => item.name)

function Recherche({onChangeProfil, profilToDisplay, isFocused}) {
  const [liste, setListe] = useState([])
  const [profil, setProfil] = useState(profilToDisplay)
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedItemsClientele, setSelectedItemsClientele] = useState(clientele);
  const [selectedItemsAmbiance, setSelectedItemsAmbiance] = useState(ambiance);
  const [selectedItemsCuisine, setSelectedItemsCuisine] = useState(cuisine);
  const [selectedItemsPrix, setSelectedItemsPrix] = useState(prix);
  const [zone, setZone] = useState(zoneFrance);
  const [texteZone, setTexteZone] = useState('Uniquement dans mon périmètre')
  
  useEffect(()=>{
    if(isFocused){
      setProfil(profilToDisplay)
    }
  },[isFocused]);

  const onSelectedItemsCuisineChange = (selectedItems) => {
    setSelectedItemsCuisine(selectedItems);
  };
  const onSelectedItemsClienteleChange = (selectedItems) => {
    setSelectedItemsClientele(selectedItems);
  };
  const onSelectedItemsAmbianceChange = (selectedItems) => {
    setSelectedItemsAmbiance(selectedItems);
  };
  const onSelectedItemsPrixChange = (selectedItems) => {
    setSelectedItemsPrix(selectedItems);
  };
  function afficheMenu(){
    setVisibleModal(true)
  }
  function changeZone(){
    if(texteZone === 'Uniquement dans mon périmètre'){
      setZone(profil.polygone.coordinates[0])
      setTexteZone('Montrer tous les restaurants')
    } else {
      setTexteZone('Uniquement dans mon périmètre')
      setZone(zoneFrance)
    }
  }

  useEffect(() => {
    var criteres = JSON.stringify({ambiance: selectedItemsAmbiance, cuisine: selectedItemsCuisine, prix: selectedItemsPrix, type:selectedItemsClientele, zone:zone})
    async function cherche (){
    var rawResponse = await fetch(`http://${adresseIP}:3000/talents/recherche-liste-restaurants`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profil.token}&restaurant=${criteres}`
    })
    var response = await rawResponse.json()
    setListe(response.liste)
    onChangeProfil(response.profil)
    console.log(response.profil)
    }
    cherche()
  }, [selectedItemsClientele, selectedItemsAmbiance, selectedItemsCuisine, selectedItemsPrix, zone])
  

  return (
    <View style={{flex:1}} >
      <Header
                leftComponent={
                  <Icon 
                    name='check' 
                    color='#4b6584'
                    size={24}
                    onPress={()=>{afficheMenu()}}/>}
                centerComponent={{ text: `Les restaurants`, style: { color: '#4b6584', fontSize:20, fontWeight:'bold' } }}
                rightComponent={
                  <Icon 
                    name='power-off' 
                    size={24}
                    color='#4b6584' />
                  }
                  containerStyle={{
                    backgroundColor: '#fed330',
                    justifyContent: 'space-around',
                }}
              />
      <Button 
        onPress={()=>{changeZone()}}
        buttonStyle={{backgroundColor:'#fed330', margin:20, marginBottom:0, borderRadius:10}}
        title={texteZone}
        titleStyle={{color:'#4b6584'}}
        color="#4b6584"
        />
      <Overlay isVisible={visibleModal} overlayStyle={{flex:0.8, width:'80%'}}>
        <>
        <View style={{margin:0}}>
          <Button 
            onPress={()=>{{ setVisibleModal(false); 
                            setSelectedItemsClientele(clientele);
                            setSelectedItemsAmbiance(ambiance);
                            setSelectedItemsCuisine(cuisine);
                            setSelectedItemsPrix(prix)}
                          }
                    }
            buttonStyle={{backgroundColor:'#fed330', marginLeft:20, marginRight:20, borderRadius:10}}
            title='Tous les restaurants'
            titleStyle={{color:'#4b6584'}}
            color="#4b6584"
            />
          <Text style={{margin:10, textAlign:"center"}}>ou</Text>
          <Text style={{margin:10, textAlign:'center'}}>Veuillez choisir vos critères de tri :</Text>
          <MultiSelect
            hideTags
            hideSubmitButton={true}
            fixedHeight={false}
            items={itemsCuisine}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsCuisineChange}
            selectedItems={selectedItemsCuisine}
            selectText="Type de cuisine"
            searchInputPlaceholderText="Choisir la cuisine"
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
            submitButtonText="Ok"
            styleMainWrapper={{backgroundColor:'#4b6584', padding:0}}
            styleDropdownMenuSubsection={{backgroundColor:'#4b6584'}}
            styleTextDropdownSelected={{color:'#FFFFFF', marginLeft:10}}
          />
          <MultiSelect
            hideTags
            hideSubmitButton={true}
            fixedHeight={false}
            items={itemsPrix}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsPrixChange}
            selectedItems={selectedItemsPrix}
            selectText="Gamme de prix"
            searchInputPlaceholderText="Gamme de prix"
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
            submitButtonText="Ok"
            styleMainWrapper={{backgroundColor:'#4b6584', padding:0}}
            styleDropdownMenuSubsection={{backgroundColor:'#4b6584'}}
            styleTextDropdownSelected={{color:'#FFFFFF', marginLeft:10}}
          />
          <MultiSelect
            hideTags
            hideSubmitButton={true}
            fixedHeight={false}
            items={itemsAmbiance}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsAmbianceChange}
            selectedItems={selectedItemsAmbiance}
            selectText="Ambiance"
            searchInputPlaceholderText="Ambiance"
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
            submitButtonText="Ok"
            styleMainWrapper={{backgroundColor:'#4b6584', padding:0}}
            styleDropdownMenuSubsection={{backgroundColor:'#4b6584'}}
            styleTextDropdownSelected={{color:'#FFFFFF', marginLeft:10}}
          />
          <MultiSelect
            hideTags
            hideSubmitButton={true}
            fixedHeight={false}
            items={itemsClientele}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsClienteleChange}
            selectedItems={selectedItemsClientele}
            selectText="Type de clientèle"
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
            submitButtonText="Ok"
            styleDropdownMenuSubsection={{backgroundColor:'#4b6584'}}
            styleTextDropdownSelected={{color:'#FFFFFF', marginLeft:10}}
          />
          
          <Button 
            onPress={()=>{setVisibleModal(false)}}
            buttonStyle={{backgroundColor:'#fed330', marginLeft:20, marginRight:20, borderRadius:10}}
            title='Valider'
            titleStyle={{color:'#4b6584'}}
            color="#4b6584"
            />    
      </View>
      
          
        </>
        
      </Overlay>
     
       <ScrollView style={{flex: 1, marginTop: 10, marginBottom:10}}>
       
         {
          liste.map((resto,i)=> {
            return(
              <CardRestaurant key={`${resto}${i}`} resto={resto}/>
            )
          })
         }
         
      </ScrollView>
      
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
  },
  titre:{
    textAlign:'center',
    color:'#4b6584',
    fontWeight:'bold',
    fontSize:15,
    margin:5,
  },
  desciptif:{
    textAlign:'center',
    color:'#4b6584',
    fontSize:10,

  }
});

function mapDispatchToProps (dispatch) {
  return {
      onChangeProfil: function(profil){
          dispatch({type:'addProfil', profil:profil})
      }
      }
  }
function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withNavigationFocus(Recherche));