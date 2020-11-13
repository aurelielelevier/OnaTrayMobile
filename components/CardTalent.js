import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {Button, Overlay, Avatar, Divider } from 'react-native-elements';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

function CardTalent({profilToDisplay, talent, onChangeProfil}) {
  const [whishlist, setWhishlist] = useState(profilToDisplay.wishlistRestaurant)
  const [coeur, setCoeur] = useState(isInwhislist())
  const [visible, setVisible] = useState(false);

  const langues = talent.speakLangage.map((langue,i)=>{
    return(
      <Text key={`${langue}${i}`} style={styles.desciptif}>{langue}</Text>
    )
  })
  const formation = talent.formation.map((formation,i)=>{
    return(
      <View key={`${formation}${i}`}>
        <Text >{`${formation.diploma} - ${formation.school} - ${formation.endingDate}`}</Text>
      </View>
    )
  })
  const experience = talent.experience.map((experience,i)=>{
    return(
      <View key={`${experience}${i}`}>
        <Text style={{marginBottom:5}}>{`${experience.firm} - ${experience.city} - ${experience.job} - Du ${experience.startingDate} au ${experience.endingDate}`}</Text>
      </View>
    )
  })

  function isInwhislist(){
      var result = 'heart-o'
      for(var i=0; i<whishlist.length; i++){
          if(whishlist[i]._id === talent._id){
              result = 'heart'
          }
      }
      return result
  }
  if (talent.lookingForJob){
      var cherche = <FontAwesome name="check-square-o" size={15} color="#4b6584"/>
  } else {
      var cherche = <FontAwesome name="square-o" size={15} color="#4b6584" />
  }
  if (!talent.working){
    var dispo = <FontAwesome name="check-square-o" size={15} color="#4b6584"/>
} else {
    var dispo = <FontAwesome name="square-o" size={15} color="#4b6584" />
}

    async function changementWhishlist(){
        var rawresponse = await fetch("http://192.168.1.7:3000/restaurants/wishlist", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${profilToDisplay.token}&id=${talent._id}`
        })
        var response = await rawresponse.json()
        onChangeProfil(response.profil)
    }
    function changementCoeur(coeur){
        if(coeur ==='heart'){
            return('heart-o')
        } else {
            return('heart')
        }
    }
    
  return ( 
      <View>
            <Overlay 
                isVisible={visible}
                overlayStyle={{flex:0.8, width:'90%'}}
            >
              <View style={{flex:1, margin:30}}>
                <Text style={styles.titreOverlay}>{`${talent.firstName} ${talent.lastName}`}</Text>
                <View style={{ padding:20, alignItems:'center'}}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={{
                    uri:talent.avatar, }}
                />
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='phone'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${talent.phone}`}
                    </Text>
                    
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='envelope-o'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${talent.email}`}
                    </Text>
                </View>
                <Divider style={{marginBottom:10, alignItems:'center'}}/>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.desciptif}>{cherche} Cherche un travail</Text>
                    <Text style={styles.desciptif}>{dispo} Est disponible</Text>
                </View>
                
                <Divider style={{margin:10}}/>
                <Text style={styles.desciptif}><Icon
                            name='comments'
                            size={20}
                            color='#4b6584'
                            style={{marginRight:10}}
                    /></Text>{langues}
                <Divider style={{margin:10}}/>
                <ScrollView>
                    <Text style={styles.desciptif}><Icon
                            name='briefcase'
                            size={20}
                            color='#4b6584'
                            style={{marginRight:10}}
                    /></Text>{formation}

                    <Text style={styles.desciptif}><Icon
                            name='vcard-o'
                            size={20}
                            color='#4b6584'
                            style={{marginRight:10}}
                    /></Text>{experience}
                </ScrollView>
                
                
                <Button 
                    onPress={()=>{setVisible(false)}}
                    buttonStyle={{backgroundColor:'#fed330', margin:20}}
                    titleStyle={{color:'#4b6584'}}
                    title='OK'/>
              </View>
            </Overlay>
            
      
        <ScrollView >
            
            <View style={{ backgroundColor:'#d1d8e0', borderRadius:10, margin:10,border:'1px solid black'}}>
            <View style={{flexDirection:'row', padding:10}}>
                <View>
                    <Avatar
                        rounded
                        size="medium"
                        source={{
                        uri:talent.avatar, }}
                    />     
                </View>
                <View style={{ width:'80%'}}>
                    <Text style={styles.titre}>{talent.firstName}{' '}{talent.lastName}</Text>
                    <Text style={styles.desciptif}>
                        <Icon
                            name='phone'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${talent.phone}`}
                    </Text>

                    <Text style={styles.desciptif}>
                        <Icon
                            name='envelope-o'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${talent.email}`}
                    </Text>
                </View>
                <View>
                    <Icon
                        name={coeur}
                        size={24}
                        color='#4b6584'
                        style={{marginRight:50}}
                        onPress={()=>{{setCoeur(changementCoeur(coeur)); changementWhishlist()}}}
                    />
                </View>
            </View>
                <View style={{flex:1}}>
                <View
                    style={{
                    flexDirection: "row",
                    flex:1,
                    paddingHorizontal: 10,
                    }}
                >
                <View style={{ paddingLeft: 20, flex: 8,  justifyContent:'center' }} >
                        
            
                    <Text style={styles.cases}>
                        {cherche} Cherche un travail    {dispo} Est disponible
                    </Text>
                
                </View>
                
                
                <View style={{flex: 2}} >
                     
                </View>
                </View>
                <View>
                    <Icon
                        name='search-plus'
                        size={24}
                        color='#4b6584'
                        style={{ margin:10, alignSelf:'center'}}
                        onPress={()=>{setVisible(true)}}
                        />
                </View>
                
            </View>
    
            </View>
    
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
    flex:1,
    textAlign:'center',
    color:'#4b6584',
    fontWeight:'bold',
    fontSize:15,
    marginBottom:10,
    marginTop:5,
  },
  desciptif:{
    textAlign:'center',
    color:'#4b6584',
    fontSize:15,
  },
  cases:{
    textAlign:'center',
    color:'#4b6584',
    fontSize:15,
    marginTop:10,
  },
  desciptifOverlay:{
    textAlign:'left',
    color:'#4b6584',
    fontSize:18,
    textAlign:'center',
  },
  titreOverlay:{
    textAlign:'center',
    color:'#4b6584',
    fontWeight:'bold',
    fontSize:20,
  },
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
)(CardTalent);