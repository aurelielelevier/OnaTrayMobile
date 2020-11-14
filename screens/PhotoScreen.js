import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { Button, Overlay } from 'react-native-elements';

import adresseIP from '../adresseIP';

function PhotoScreen({profilToDisplay, onLogin, navigation}) {
    
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false)
  var camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  var cameraDisplay;
  if (hasPermission) {
    cameraDisplay = <Camera
      style={{ flex: 0.8 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <IconIonic
            name="md-reverse-camera"
            size={20}
            color="#ffffff"
          /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Retourner </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{

            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setFlash(
              flash === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.torch
            );
          }}
        >
          <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
          /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
        </TouchableOpacity>

      </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }
  
  
    return(
        <View style={{flex:1}}>
          <Overlay isVisible={visible} width="auto" height="auto">
          <View style={{justifyContent: "center" }}>
            <ActivityIndicator size="large" color='#4b6584'/>
          </View>
          </Overlay>

          {cameraDisplay}

          <Button
            icon={
              <IconFontAwesome
                name="save"
                size={20}
                color="#ffffff"
              />
            }
            title="  Prendre une photo"
            buttonStyle={{ backgroundColor: "#4b6584" }}
            type="solid"
            onPress={async () => {
              setVisible(true);
              if (camera) {
                let photo = await camera.takePictureAsync({ quality: 0.3 });

                var data = new FormData();

                data.append('photo', {
                  uri: photo.uri,
                  type: 'image/jpeg',
                  name: `${profilToDisplay.token}photo.jpg`,
                });

                var rawResponse = await fetch(`http://${adresseIP}:3000/upload/${profilToDisplay.token}`, {
                  method: 'post',
                  body: data
                })

                var response = await rawResponse.json()
                console.log(response)
                setVisible(false)
                onLogin(response)
                navigation.navigate('Restaurants')
              }
            }}
            />
  </View>
    )
}
function mapDispatchToProps (dispatch) {
  return {
      onLogin: function(profil){
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
  )(PhotoScreen);