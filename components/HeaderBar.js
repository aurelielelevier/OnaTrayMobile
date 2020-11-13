import React, { useState, useEffect } from 'react';
import {Header, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'

function HeaderBar({page, navigation, onLogout}){
    return (
        <Header
                centerComponent={{ text: `${page}`, style: { color: '#4b6584', fontSize:20, fontWeight:'bold' } }}
                rightComponent={
                  <Icon 
                  name='power-off' 
                  size={24}
                  color='#4b6584' 
                  onPress={()=>{ navigation.navigate('Home')}}
                  />
                  
                  }
                  containerStyle={{
                    backgroundColor: '#fed330',
                    justifyContent: 'space-around',
                    
                }}
              />

    )}
function mapDispatchToProps (dispatch) {
  return {
    onLogout: function(profil){
          dispatch({type:'addProfil', profil:profil})
      }
      }
  }

function mapStateToProps(state) {
  return { profilToDisplay: state.profil, pseudoToDisplay: state.pseudo}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HeaderBar);
