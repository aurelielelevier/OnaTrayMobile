import React, { useState } from 'react';
import {Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';

export default function ModalLogout({visible, fermeModal, deconnect}) {

    return (
      
        <Overlay 
            isVisible={visible}
            overlayStyle={{flex:0.2, width:'90%'}}>
          <View style={{flex:1}}>
            <Text style={{color:'#4b6584', alignSelf:'center', marginTop:30}}>Etes-vous sûr de vouloir vous déconnecter ?</Text>
            <View style={{alignSelf:'center', justifyContent:'space-around', width:'80%', marginTop:30, flexDirection:'row'}}>
              <Button 
                onPress={()=>{fermeModal()}}
                buttonStyle={{ backgroundColor:'#fed330'}}
                titleStyle={{color:'#4b6584'}}
                title=' Non '/>
              <Button 
                onPress={()=>{deconnect()}}
                buttonStyle={{ backgroundColor:'#fed330'}}
                titleStyle={{color:'#4b6584'}}
                title=' Oui '/>
            </View>
  
          </View>
        </Overlay>
    );
  }
