import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import { Divider, Avatar, Accessory, ListItem, Overlay, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Map from './Map';

function MonProfil({profilToDisplay}) {
  const[visible, setVisible] = useState(false)
  const [profil, setProfil] = useState(profilToDisplay)
  const[contenu, setContenu] = useState(<Text></Text>)
  const [flexOverlay, setFlexOverlay] = useState(0.5)
  
  const list = [{ title: 'Mes coordonnées', icon: 'user', contenu:'adresse tel'},
                {title: 'Ma formation', icon: 'briefcase', contenu:'formation 1 - PAris Bac'},
                {title: 'Mon expérience', icon: 'vcard-o', contenu:'expérience 1 sklsldkfj  lkj dflkjsdf '},
                {title: 'Mes métiers recherchés', icon: 'eye', contenu : 'cuisinier'},
                {title: 'Type de contrat recherché', icon: 'check-square', contenu: 'CDI, CDD'},
                {title: 'Je parle', icon: 'comments', contenu:'français'},
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
                      </View>

  const langues = profil.speakLangage.map((langue,i)=>{
    return(
      <Text key={`${langue}${i}`}>{langue}</Text>
    )
  })
  const formation = profil.formation.map((formation,i)=>{
    return(
      <View key={`${formation}${i}`}>
        <Text >{`${formation.diploma} - ${formation.school} - ${formation.endingDate}`}</Text>
      </View>
    )
  })
  const experience = profil.experience.map((experience,i)=>{
    return(
      <View key={`${experience}${i}`}>
        <Text style={{margin: 10}}>{`${experience.firm} - ${experience.city} - ${experience.job} - Du ${experience.startingDate} au ${experience.endingDate}`}</Text>
      </View>
    )
  })
  const metiers = profil.lookingJob.map((metier,i)=>{
    return(
      <Text key={`${metier}${i}`}>{metier}</Text>
    )
  })
  const contrats = profil.typeofContract.map((contrat,i)=>{
    return(
      <Text key={`${contrat}${i}`}>{contrat}</Text>
    )
  })
  
  const listeDeDonnees = [coordonnees, formation, experience, metiers, contrats, langues]
  
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
      <HeaderBar page='Mon profil' menu=''/>
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
        <Avatar
          rounded
          size="xlarge"
          source={{
              uri:profil.avatar,
          }}
          
        ><Accessory style={{width:40, height:40, borderRadius:50}}/></Avatar>
        <Text style={{color:'#4b6584', marginTop:20, fontWeight:'bold', fontSize:20}}>
          {`${profil.firstName} ${profil.lastName}`}
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
          <ListItem 
            bottomDivider
            onPress={()=>{setVisible(true); setFlexOverlay(0.9);setContenu(<Map/>)}}
            >
            <FontAwesome name='street-view' size={24} color="#4b6584" />
            <ListItem.Content>
              <ListItem.Title style={{color:'#4b6584'}}>Mon secteur</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
          
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
)(MonProfil);