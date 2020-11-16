import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { Button, Overlay, Badge } from 'react-native-elements';
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import url from '../url';

function CardRestaurant({profilToDisplay, resto, onChangeProfil}) {

    const [wishlist, setWishlist] = useState(profilToDisplay.wishlistTalent);
    const [coeur, setCoeur] = useState(isInWishlist());
    const [visible, setVisible] = useState(false);

    function isInWishlist(){
        var result = 'heart-o'
        for(var i=0; i<wishlist.length; i++){
            if(wishlist[i]._id === resto._id){
                result = 'heart'
            }
        }
        return result
    };

    const polygone = []
    for(var i=0; i<profilToDisplay.perimetre.length; i++){
        polygone.push({latitude:profilToDisplay.perimetre[i][1], longitude:profilToDisplay.perimetre[i][0]})
    };

    async function changementWishlist(){
        // requête vers le backend pour ajouter/supprimer les restaurants dans la wishlist
        var rawresponse = await fetch(`http://${url}/talents/wishlist`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${profilToDisplay.token}&id=${resto._id}`
        })  
        var response = await rawresponse.json()
        // mise à jour du profil talent avec nouvelles données de wishlist
        onChangeProfil(response.profil)
        setWishlist(response.profil.wishlistTalent)
    };

    function changementCoeur(coeur){
        if(coeur ==='heart'){
            return('heart-o')
        } else {
            return('heart')
        }
    };

    // préparation des données pour leur affichage :
    var cuisine = ' ';
    if(resto.typeOfFood){
        for(var i=0; i<resto.typeOfFood.length; i++){
            if(i==resto.typeOfFood.length-1){
                cuisine+= resto.typeOfFood[i]
            } else {
                cuisine+=resto.typeOfFood[i] + ', '
            }
        }
    };

    var clientele = ' ';
    if(resto.clientele){
        for(var i=0; i<resto.clientele.length; i++){
            if(i==resto.clientele.length-1){
                clientele+= resto.clientele[i]
            } else {
                clientele+=`${clientele+=resto.clientele[i]}, `
            }
        }
    };

    var ambiance = ' ';
    if(resto.typeOfRestaurant){
        for(var i=0; i<resto.typeOfRestaurant.length; i++){
            if(i==resto.typeOfRestaurant.length-1){
                ambiance+= resto.typeOfRestaurant[i]
            } else {
                ambiance+=resto.typeOfRestaurant[i] + ', '
            }
        }
    };

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
    };
    
  return (
      <View>
          <Overlay 
                isVisible={visible}
                overlayStyle={{flex:0.9, width:'90%'}}
            >
              <View style={{flex:1, margin:10}}>
                <Text style={styles.titreOverlay}>{resto.name}</Text>
                <View style={{flex:3}}>
                    <Image
                        source={{ uri: resto.photo }}
                        style={{flex:1, width: '100%', marginTop:5, borderRadius:10}}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={{flex:2, justifyContent:'center', flexDirection:'row'}}>
                    <View>
                        <View style={{flexDirection:'row', marginTop:2}}>
                            <View>
                                <Badge
                                    badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                    containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                    value={<Icon
                                        name='cutlery'
                                        size={14}
                                        color='#4b6584'
                                    />}
                                /> 
                            </View>
                            <Text style={styles.desciptif}>
                            {` ${cuisine}`}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:2}}>
                            <View>
                                <Badge
                                    badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                    containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                    value={<Icon
                                        name='users'
                                        size={14}
                                        color='#4b6584'
                                    />}
                                /> 
                            </View>
                            <Text style={styles.desciptif}>
                            {` ${clientele}`}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:2}}>
                            <View>
                                <Badge
                                    badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                    containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                    value={<Icon
                                        name='info-circle'
                                        size={14}
                                        color='#4b6584'
                                    />}
                                /> 
                            </View>
                            <Text style={styles.desciptif}>
                            {` ${ambiance}`}
                            </Text>
                        </View>
                    </View>
                    <Badge
                        badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center', marginLeft:50}}
                        containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                        value={prix}
                    /> 
                </View>
                
                <MapView style={{flex:4, borderRadius:10, width:'100%'}}
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

                <View style={{flex:2, marginTop:20}}>
                <View style={{flexDirection:'row', marginTop:2, justifyContent:'center'}}>
                    <View >
                        <Badge
                            badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                            containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                            value={<Icon
                                name='map-marker'
                                size={14}
                                color='#4b6584'
                            />}
                        /> 
                    </View>
                    <Text style={styles.desciptif}>
                    {` ${resto.adress}`}
                    </Text>
                </View>
                        
                <View style={{flexDirection:'row', marginTop:2, justifyContent:'center'}}>
                    <View >
                        <Badge
                            badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                            containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                            value={<Icon
                                name='phone'
                                size={14}
                                color='#4b6584'
                            />}
                        /> 
                    </View>
                    <Text style={styles.desciptif}>
                    {` ${resto.phone}`}
                    </Text>
                </View>
            
                <View style={{flexDirection:'row', marginTop:2, justifyContent:'center'}}>
                    <View >
                        <Badge
                            badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                            containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                            value={<Icon
                                name='envelope-o'
                                size={14}
                                color='#4b6584'
                            />}
                        /> 
                    </View>
                    <Text style={styles.desciptif}>
                    {` ${resto.email}`}
                    </Text>
                </View>
                
                <View style={{flexDirection:'row', marginTop:2, justifyContent:'center'}}>
                    <View >
                        <Badge
                            badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                            containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                            value={<Icon
                                name='link'
                                size={14}
                                color='#4b6584'
                            />}
                        /> 
                    </View>
                    <Text style={styles.desciptif}>
                    {` ${resto.website}`}
                    </Text>
                </View>
                </View>
                <Button 
                    onPress={()=>{setVisible(false)}}
                    buttonStyle={{backgroundColor:'#fed330', margin:20}}
                    titleStyle={{color:'#4b6584'}}
                    title='OK'/>
              </View>
            </Overlay>
            
      
        <ScrollView style={{flex:1}}>
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
                    
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', padding:3}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='map-marker'
                                    size={14}
                                    color='#4b6584'
                                    // style={{marginRight:10}}
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${resto.adress}`}
                        </Text>
                    </View>
                        
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='phone'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${resto.phone}`}
                        </Text>
                    </View>
            
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='envelope-o'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${resto.email}`}
                        </Text>
                    </View>
                
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='link'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${resto.website}`}
                        </Text>
                    </View>
                </View>
                
                {/* <View style={{  flex: 4}} >
                <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='cutlery'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${cuisine}`}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='users'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${clientele}`}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Badge
                                badgeStyle={{backgroundColor:'#fed330', borderWidth:'none', alignItems:'center'}}
                                containerStyle={{alignItems:'center', justifyContent:'center', textAlign:'center'}}
                                value={<Icon
                                    name='info-circle'
                                    size={14}
                                    color='#4b6584'
                                />}
                            /> 
                        </View>
                        <Text style={styles.desciptif}>
                        {` ${ambiance}`}
                        </Text>
                    </View>
                </View> */}

                <View style={{  flex: 2}} >
                    <Text style={{...styles.desciptif}, {textAlign:'center'}}>{prix}</Text>
                    <Icon
                        name={coeur}
                        size={24}
                        color='#4b6584'
                        style={{margin:10, textAlign:'center'}}
                        onPress={()=>{{setCoeur(changementCoeur(coeur)); changementWishlist()}}}
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
};

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
    fontSize:12,
  },
  desciptifOverlay:{
    textAlign:'left',
    color:'#4b6584',
    fontSize:12,
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
};

function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CardRestaurant);