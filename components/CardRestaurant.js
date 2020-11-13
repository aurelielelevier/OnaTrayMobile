import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import { Divider, Button, Overlay } from 'react-native-elements';
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';

function CardRestaurant({profilToDisplay, resto, onChangeProfil}) {
  const [whishlist, setWhishlist] = useState(profilToDisplay.wishlistTalent)
  const [coeur, setCoeur] = useState(isInwhislist())
  const [visible, setVisible] = useState(false);

  function isInwhislist(){
      var result = 'heart-o'
      for(var i=0; i<whishlist.length; i++){
          if(whishlist[i]._id === resto._id){
              result = 'heart'
          }
      }
      return result
  }

  const polygone = []
  for(var i=0; i<profilToDisplay.perimetre.length; i++){
        polygone.push({latitude:profilToDisplay.perimetre[i][1], longitude:profilToDisplay.perimetre[i][0]})
    }

    async function changementWhishlist(){
        var rawresponse = await fetch("http://192.168.1.7:3000/talents/whishlist", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${profilToDisplay.token}&id=${resto._id}`
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

    var cuisine = ' '
    if(resto.typeOfFood){
        for(var i=0; i<resto.typeOfFood.length; i++){
            if(i==resto.typeOfFood.length-1){
                cuisine+= resto.typeOfFood[i]
            } else {
                cuisine+=resto.typeOfFood[i] + ', '
            }
        }
    }
    var clientele = ' '
    if(resto.clientele){
        for(var i=0; i<resto.clientele.length; i++){
            if(i==resto.clientele.length-1){
                clientele+= resto.clientele[i]
            } else {
                clientele+=resto.clientele[i] + ', '
            }
        }
    }
    var ambiance = ' '
    if(resto.typeOfRestaurant){
        for(var i=0; i<resto.typeOfRestaurant.length; i++){
            if(i==resto.typeOfRestaurant.length-1){
                ambiance+= resto.typeOfRestaurant[i]
            } else {
                ambiance+=resto.typeOfRestaurant[i] + ', '
            }
        }
    }
    var iconEuro = <Icon
        name='euro'
        size={18}
        color='#4b6584'
        style={{marginRight:10}}
    />
    if(resto.pricing == 0){
        var prix = iconEuro
    } else if(resto.pricing == 1){
        var prix = <Text>{iconEuro}{iconEuro}</Text>
    } else if(resto.pricing == 1){
        var prix = <Text>{iconEuro}{iconEuro}{iconEuro}</Text>
    } else {
        var prix = '--'
    }
    
  return (
      <View>
          <Overlay 
                isVisible={visible}
                overlayStyle={{flex:1, width:'90%'}}
            >
              <View style={{flex:1, margin:20}}>
                <Text style={styles.titreOverlay}>{resto.name}</Text>
                <View style={{flex:2}}>
                    <Image
                        source={{ uri: resto.photo }}
                        style={{ width: '100%', height:100, marginTop:5}}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={{flex:1, padding:10}}>
                    <Text style={{...styles.desciptifOverlay}, {textAlign:'center'}}>{prix}</Text>
                    
                    <Text style={styles.desciptifOverlay}><Icon
                            name='cutlery'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        />
                    {` ${cuisine}`}
                    </Text>
                    <Text style={styles.desciptifOverlay}><Icon
                            name='users'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${clientele}`}
                    </Text>
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='info-circle'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${ambiance}`} </Text>
                    
                    
                </View>
                
                <MapView style={{flex : 4, borderRadius:10, width:'100%'}}
                    initialRegion={{
                    latitude: resto.adresselgtlat.coordinates[1],
                    longitude: resto.adresselgtlat.coordinates[0],
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{latitude: resto.adresselgtlat.coordinates[1], longitude: resto.adresselgtlat.coordinates[0]}}
                        pinColor='#4b6584'
                        title= {resto.name}
                        description= {resto.adress}
                    />
                    <Polygon
                        coordinates={polygone}
                        strokeWidth={1}
                        strokeColor='red'
                        fillColor='rgba(255, 0, 0, 0.2)'
                    />
                    
                </MapView>

                <View style={{flex:1, marginTop:20}}>
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='map-marker'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.adress}`}
                    </Text>
                        
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='phone'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.phone}`}
                    </Text>
            
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='envelope-o'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.email}`}
                    </Text>
                
                    <Text style={styles.desciptifOverlay}>
                        <Icon
                            name='link'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.website}`}
                    </Text>
                </View>
                <Button 
                    onPress={()=>{setVisible(false)}}
                    buttonStyle={{backgroundColor:'#fed330', margin:20}}
                    titleStyle={{color:'#4b6584'}}
                    title='OK'/>
              </View>
            </Overlay>
            
      
        <ScrollView >
            <Image
                source={{ uri: resto.photo }}
                style={{ width: '100%',  marginTop:5, borderRadius:10}}
            />     
            <View style={{ backgroundColor:'#d1d8e0', borderRadius:10, margin:10,border:'1px solid black'}}>
            
                <Image
                        source={{ uri: resto.photo }}
                        style={{ height:100, width: '100%',  marginTop:5, borderRadius:10}}
                    />   
                <View style={{flex:1}}>
            
                <Text style={styles.titre}>{resto.name}</Text>
        
                <View
                    style={{
                    flexDirection: "row",
                    flex:1,
                    paddingHorizontal: 10,
                    }}
                >
                <View style={{ flex: 5 }} >
                    
                    <Text style={styles.desciptif}>
                        <Icon
                        name='map-marker'
                        size={12}
                        color='#4b6584'
                        style={{marginRight:10}}
                    /> 
                        {` ${resto.adress}`}
                    </Text>
                        
                    <Text style={styles.desciptif}>
                        <Icon
                            name='phone'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.phone}`}
                    </Text>
            
                    <Text style={styles.desciptif}>
                        <Icon
                            name='envelope-o'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.email}`}
                    </Text>
                
                    <Text style={styles.desciptif}>
                        <Icon
                            name='link'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${resto.website}`}
                    </Text>
                </View>
                
                <View style={{  flex: 4}} >
                    <Text style={styles.desciptif}> <Icon
                            name='cutlery'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        />
                    {` ${cuisine}`}
                    </Text>
                    <Text style={styles.desciptif}><Icon
                            name='users'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${clientele}`}
                    </Text>
                    <Text style={styles.desciptif}>
                        <Icon
                            name='info-circle'
                            size={12}
                            color='#4b6584'
                            style={{marginRight:10}}
                        /> 
                        {` ${ambiance}`} </Text>
                </View>

                <View style={{  flex: 2}} >
                    <Text style={{...styles.desciptif}, {textAlign:'center'}}>{prix}</Text>
                    <Icon
                        name={coeur}
                        size={24}
                        color='#4b6584'
                        style={{margin:10, textAlign:'center'}}
                        onPress={()=>{{setCoeur(changementCoeur(coeur)); changementWhishlist()}}}
                    />
                </View>
                </View>
                <View>
                    <Icon
                        name='search-plus'
                        size={24}
                        color='#4b6584'
                        style={{margin:5, alignSelf:'center'}}
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
    fontSize:20,
    marginBottom:10,
    marginTop:5,
  },
  desciptif:{
    textAlign:'left',
    color:'#4b6584',
    fontSize:15,
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
    fontSize:25,
    marginBottom:10,
    marginTop:5,
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
)(CardRestaurant);