import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import { Divider, ActivityIndicator, ListItem, Overlay, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Map from './Map';

function MonProfilRestaurant({profilToDisplay}) {
  console.log(profilToDisplay)
  const[visible, setVisible] = useState(false)
  const [profil, setProfil] = useState(profilToDisplay)
  const[contenu, setContenu] = useState(<Text></Text>)
  const [flexOverlay, setFlexOverlay] = useState(0.5)
  
  const list = [{ title: 'Coordonnées', icon: 'home'},
                {title: 'Gamme de prix', icon: 'euro'},
                {title: 'Cuisine', icon: 'cutlery'},
                {title: 'Ambiance', icon: 'info-circle'},
                {title: 'Clientèle', icon: 'users'},
  ]
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
  })
  const ambiance = profil.typeOfRestaurant.map((ambiance,i)=>{
    return(
      <Text key={`${ambiance}${i}`}>{ambiance}</Text>
    )
  })
  const clientele = profil.clientele.map((clientele,i)=>{
    return(
      <Text key={`${clientele}${i}`}>{clientele}</Text>
    )
  })
const pricing = <Text>€</Text>
  // if(profil.pricing===0){
  //    pricing = '€'
  // } else if(profil.pricing===1){
  //    pricing = '€€'
  // }else if(profil.pricing===1){
  //    pricing = '€€€'
  // }
  

  
  
  const listeDeDonnees = [coordonnees, pricing, cuisine, ambiance, clientele]
  
  function affiche(i){
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
    setFlexOverlay(0.5)
    setContenu(contenu)
  }
  
  return (
    <Divider style={styles.container}>
      <HeaderBar page='Mon profil'/>
      <Overlay 
          isVisible={visible}
          overlayStyle={{flex:flexOverlay, width:'90%'}}>
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
      <View style={{flex:1, marginTop:30, alignItems:'center'}}>
      <Image
        source={{ uri: profil.photo }}
        style={{borderRadius:10, width: 400, height: 200 }}
        
      />
        <Text style={{color:'#4b6584', marginTop:20, fontWeight:'bold', fontSize:20}}>
          {profil.name}
          </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
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