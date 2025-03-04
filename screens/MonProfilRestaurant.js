import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import { Divider, ListItem, Overlay, Button, Image, Accessory} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import ModalLogout from '../components/ModalLogout';

function MonProfilRestaurant({profilToDisplay, navigation}) {

  const[visible, setVisible] = useState(false);
  const [profil, setProfil] = useState(profilToDisplay);
  const[contenu, setContenu] = useState(<Text></Text>);
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

  const list = [
    {title: 'Coordonnées', icon: 'home'},
    {title: 'Gamme de prix', icon: 'euro'},
    {title: 'Cuisine', icon: 'cutlery'},
    {title: 'Ambiance', icon: 'info-circle'},
    {title: 'Clientèle', icon: 'users'},
  ];

  // prépararion des données à afficher : 
  const coordonnees = <View>
                        <Text style={styles.textOverlay}>
                          <Icon
                              name='map-marker'
                              size={20}
                              color='black'
                              style={{marginRight:10}}
                          /> 
                          {` ${profil.adress}`}
                        </Text>
                      
                        <Text style={styles.textOverlay}>
                            <Icon
                                name='phone'
                                size={20}
                                color='black'
                                style={{marginRight:10}}
                            /> 
                            {` ${profil.phone}`}
                        </Text>
          
                        <Text style={styles.textOverlay}>
                            <Icon
                                name='envelope-o'
                                size={20}
                                color='black'
                                style={{marginRight:10}}
                            /> 
                            {` ${profil.email}`}
                        </Text>
                        <Text style={styles.textOverlay}>
                            <Icon
                                name='link'
                                size={20}
                                color='black'
                                style={{marginRight:10}}
                            /> 
                            {` ${profil.website}`}
                        </Text>
                      </View>

  const cuisine = profil.typeOfFood.map((cuisine,i)=>{
    return(
      <Text key={`${cuisine}${i}`}>{cuisine}</Text>
    )
  });

  const ambiance = profil.typeOfRestaurant.map((ambiance,i)=>{
    return(
      <Text key={`${ambiance}${i}`}>{ambiance}</Text>
    )
  });

  const clientele = profil.clientele.map((clientele,i)=>{
    return(
      <Text key={`${clientele}${i}`}>{clientele}</Text>
    )
  });

  var pricing
  if(profil.pricing === 0){
    pricing = <Text>€</Text>
  } else if(profil.pricing === 1){
    pricing = <Text>€€</Text>
  }else if(profil.pricing === 2){
    pricing = <Text>€€€</Text>
  };

  // mise en place des donnée dans un tableau en préparation de la liste à afficher : 
  const listeDeDonnees = [coordonnees, pricing, cuisine, ambiance, clientele]
  

  function affiche(i){
    // permet d'afficher le contenu de la ligne sur laquelle le OnPress a été détecté
    var contenu = 
      <View style={{flex:1}}>
        <View style={{flex:1, borderRadius:10, backgroundColor:"#fed330", paddingTop:10}}>
        <Text style={styles.title}>
          <FontAwesome name={list[i].icon} size={24} color="#4b6584" />
           {` ${list[i].title}`}</Text>
        </View>
        <View style={{flex:3, borderRadius:10, backgroundColor:"#d1d8e0", marginTop:30, padding:20}}>
          {listeDeDonnees[i]}
        </View>
      </View>
    setContenu(contenu)
  }
  
  return (
    <Divider style={styles.container}>

      <HeaderBar page='Mon profil' logout={logout}/>
      <ModalLogout visible={modalLogoutVisible} deconnect={deconnect} fermeModal={fermeModal}/>

      {/* Overlay permettant l'affichage dynamique des informations selon la ligne de la liste choisie : */}
      <Overlay 
          isVisible={visible}
          overlayStyle={{flex:0.5, width:'90%'}}>
        <View style={{flex:1}}>
          {contenu}
          <View style={{margin:20, width:50, alignSelf:'center'}}>
            <Button 
              onPress={()=>{setVisible(false)}}
              buttonStyle={{ backgroundColor:'#fed330'}}
              titleStyle={{color:'#4b6584'}}
              title='OK'/>
          </View>
        </View>
      </Overlay>

      <View style={{flex:1, marginVertical:10, alignItems:'center'}}>
        <Text style={{color:'#4b6584', fontWeight:'bold', fontSize:20}}>
          {profil.name}
          </Text>
        <Image
          source={{ uri: profil.photo }}
          style={{borderRadius:10, width: 400, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        >
        <Accessory style={{width:40, height:40, borderRadius:50 , marginRight:20, marginBottom:20}}
        onPress={()=>{navigation.navigate('PhotoScreen')}}/></Image>
      </View>
      
      <View style={{flex:2, width:'100%'}}>
        <ScrollView style={{ marginTop: 20, marginBottom:10}}>
          {
            list.map((item, i) => (
              <ListItem key={i} 
                        bottomDivider
                        onPress={()=>{setVisible(true); affiche(i)}}
                        >
                <FontAwesome name={item.icon} size={24} color="#4b6584" />
                <ListItem.Content>
                  <ListItem.Title style={{color:'#4b6584'}}>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            ))
          }
        </ScrollView>
      </View>
    </Divider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color:'#4b6584',
    textAlign:'center',
  },
  textOverlay: {
    fontSize: 14,
  }
});


function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
}

export default connect(
  mapStateToProps, 
  null
)(MonProfilRestaurant);