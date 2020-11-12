import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';

function Map({profilToDisplay}) {
    const polygone = []
    for(var i=0; i<profilToDisplay.perimetre.length; i++){
        polygone.push({latitude:profilToDisplay.perimetre[i][1], longitude:profilToDisplay.perimetre[i][0]})
    }
    console.log(profilToDisplay.adresselgtlat.coordinates[1])
    return(
        <View style={{flex:1}}>
          
          <MapView style={{flex : 1}}
                      initialRegion={{
                      latitude: profilToDisplay.adresselgtlat.coordinates[1],
                      longitude: profilToDisplay.adresselgtlat.coordinates[0],
                      latitudeDelta: 0.5,
                      longitudeDelta: 0.5,
                    }}
                    >
                      <Marker
                          coordinate={{latitude: profilToDisplay.adresselgtlat.coordinates[1], longitude: profilToDisplay.adresselgtlat.coordinates[0]}}
                          pinColor='#4b6584'
                          title='Mon domicile'
                          description= {profilToDisplay.adress}
                      />
                    <Polygon
                        coordinates={polygone}
                        strokeWidth={1}
                        strokeColor='red'
                        fillColor='rgba(255, 0, 0, 0.2)'
                    />
                    
                    </MapView>
                    </View>
    )
}
function mapStateToProps(state) {
    return { profilToDisplay : state.profil }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(Map);