import React from 'react';
import {Header, Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'

const logo = 'https://res.cloudinary.com/dpyqb49ha/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1605430584/logo-onatray_h2wdwl.jpg';

function HeaderBar ({page, logout}){

    return (
        <Header
                leftComponent={
                  <Avatar
                    source={{ uri: logo}}
                      size="small"
                      rounded
                    />}
                centerComponent={{ text: `${page}`, style: { color: '#4b6584', fontSize:20, fontWeight:'bold' } }}
                rightComponent={
                  <Icon 
                  name='power-off' 
                  size={24}
                  color='#4b6584' 
                  onPress={()=>{logout()}}
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
  return { profilToDisplay: state.profil}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HeaderBar);
