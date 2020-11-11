import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
import CardRestaurant from '../components/CardRestaurant';
import HeaderBar from '../components/HeaderBar';

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

function Recherche({navigation, profilToDisplay}) {
  const [liste, setListe] = useState([])
  const [profil, setProfil] = useState(profilToDisplay)
  const [whishlist, setWishlist] = useState([])
  const [selectedItemsClientele, setSelectedItemsClientele] = useState(clientele);
  const [selectedItemsAmbiance, setSelectedItemsAmbiance] = useState(ambiance);
  const [selectedItemsCuisine, setSelectedItemsCuisine] = useState(cuisine);
  const [selectedItemsPrix, setSelectedItemsPrix] = useState(prix);
  const [zone, setZone] = useState(zoneFrance);
  const [texteZone, setTexteZone] = useState('Ne montrer que les restaurants dans ma zone')
  
  const onSelectedItemsCuisineChange = (selectedItems) => {
    console.log(selectedItems,'selected')
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

  function changeZone(){
    if(texteZone === 'Ne montrer que les restaurants dans ma zone'){
      setZone(profilToDisplay.polygone.coordinates[0])
      setTexteZone('Montrer tous les restaurants')
    } else {
      setTexteZone('Ne montrer que les restaurants dans ma zone')
      setZone(zoneFrance)
    }
  }

  useEffect(() => {
    var criteres = JSON.stringify({ambiance: selectedItemsAmbiance, cuisine: selectedItemsCuisine, prix: selectedItemsPrix, type:selectedItemsClientele, zone:zone})
    async function cherche (){
    var rawResponse = await fetch("http://192.168.1.7:3000/talents/recherche-liste-restaurants", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${profilToDisplay.token}&restaurant=${criteres}`
    })
    var response = await rawResponse.json()
    setListe(response.liste)
    }
    cherche()
  }, [profilToDisplay, selectedItemsClientele, selectedItemsAmbiance, selectedItemsCuisine, selectedItemsPrix, zone])


  return (
    <View style={{flex:1}} >
      <HeaderBar page='Recherche des restaurants'/>
      
      <View style={{margin:0}}>
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
                    onPress={()=>{changeZone()}}
                    buttonStyle={{backgroundColor:'#fed330', marginLeft:20, marginRight:20, borderRadius:10}}
                    title={texteZone}
                    titleStyle={{color:'#4b6584'}}
                    color="#4b6584"
                    />
                    
      </View>
      
      
       <ScrollView style={{flex: 1, marginTop: 20, marginBottom:10}}>
         {
          liste.map((resto,i)=> {
            return(
              <CardRestaurant resto={resto}/>
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

function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
}

export default connect(
  mapStateToProps, 
  null
)(Recherche);