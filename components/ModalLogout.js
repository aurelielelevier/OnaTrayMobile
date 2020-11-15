import React, { useState } from 'react';
import {Text, View} from 'react-native';

export default function ModalLogout(props) {

    const[visible, setVisible] = useState(props.visible);
  
    return (
      
        <Overlay 
            isVisible={visible}
            overlayStyle={{flex:flexOverlay, width:'90%'}}>
          <View style={{flex:1}}>
            <Text>Etes-vous sûr de vouloir vous déconnecter ?</Text>
            <View style={{margin:20, width:50, alignSelf:'center'}}>
              <Button 
                onPress={()=>{setVisible(false)}}
                buttonStyle={{ backgroundColor:'#fed330'}}
                titleStyle={{color:'#4b6584'}}
                title='Oui'/>
              <Button 
                onPress={()=>{setVisible(false)}}
                buttonStyle={{ backgroundColor:'#fed330'}}
                titleStyle={{color:'#4b6584'}}
                title='Non'/>
            </View>
  
          </View>
        </Overlay>
    );
  }
