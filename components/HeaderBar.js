import React, { useState, useEffect } from 'react';
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

function HeaderBar(props){
    return (
        <Header
                leftComponent={{ icon: 'menu', color: '#4b6584' }}
                centerComponent={{ text: `${props.page}`, style: { color: '#4b6584', fontSize:20, fontWeight:'bold' } }}
                rightComponent={
                  <Icon 
                    name='power-off' 
                    size={24}
                    color='#4b6584' />
                  }
                  containerStyle={{
                    backgroundColor: '#fed330',
                    justifyContent: 'space-around',
                }}
              />

    )}
export default HeaderBar;