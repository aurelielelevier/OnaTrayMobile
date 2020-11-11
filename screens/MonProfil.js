import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import { Divider, Avatar, Accessory, ListItem, Overlay, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';

function MonProfil({profilToDisplay}) {
  const[visible, setVisible] = useState(false)
  const[contenu, setContenu] = useState(<Text></Text>)

  const list = [{ title: 'Mes coordonnées', icon: 'user', contenu:'adresse tel'},
                {title: 'Ma formation', icon: 'briefcase', contenu:'formation 1 - PAris Bac'},
                {title: 'Mon expérience', icon: 'vcard-o', contenu:'expérience 1 sklsldkfj  lkj dflkjsdf '},
                {title: 'Mes métiers recherchés', icon: 'eye', contenu : 'cuisinier'},
                {title: 'Type de contrat recherché', icon: 'check-square', contenu: 'CDI, CDD'},
                {title: 'Je parle', icon: 'comments', contenu:'français'},
                {title: 'Mon secteur', icon: 'street-view', contenu:''},
  ]
  function affiche(i){
    var contenu = 
      <View style={{flex:1}}>
        <Text>{list[i].title}</Text>
        <Text>{list[i].contenu}</Text>
      </View>
    setContenu(contenu)
  }
  // useEffect( () => {
    
  // }, [visible])
    
  
  return (
    <Divider style={styles.container}>
      <HeaderBar page='Mon profil'/>
      <Overlay 
          isVisible={visible}
          overlayStyle={{flex:0.5, width:'90%'}}>
        <View style={{flex:1}}>
          {contenu}
          <Button 
            onPress={()=>{setVisible(false)}}
            buttonStyle={{flex:1, backgroundColor:'#fed330', margin:20,width:200, alignSelf:'center'}}
            titleStyle={{color:'#4b6584'}}
            title='OK'/>

        </View>
      </Overlay>
      <View style={{flex:1, marginTop:30, alignItems:'center'}}>
        <Avatar
          rounded
          size="xlarge"
          source={{
              uri:profilToDisplay.avatar,
          }}
          
        ><Accessory style={{width:40, height:40, borderRadius:50}}/></Avatar>
        <Text style={{color:'#4b6584', marginTop:20, fontWeight:'bold', fontSize:20}}>
          {`${profilToDisplay.firstName} ${profilToDisplay.lastName}`}
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
}

export default connect(
  mapStateToProps, 
  null
)(MonProfil);