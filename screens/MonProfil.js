import React from 'react';
import { StyleSheet, ImageBackground, Text, View} from 'react-native';

import {Header, Divider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MonProfil() {
  return (
    <Divider>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{
          backgroundColor: '#4b6584',
          justifyContent: 'space-around',
        }}
      />
    </Divider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
