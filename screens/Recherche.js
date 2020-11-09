import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, ActivityIndicator} from 'react-native';
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const users = [
  {
     name: 'Chez Sam',
     avatar: 'https://res.cloudinary.com/dpyqb49ha/image/upload/v1604315222/p42dinzwcjbkpq8zzbht.jpg'
  },
  {
    name: 'La pizzeria',
    avatar: 'https://res.cloudinary.com/dpyqb49ha/image/upload/v1604323288/vor3yhrukjyhscvqihr4.jpg'
 },
 {
  name: 'TEst',
  avatar: 'https://res.cloudinary.com/dpyqb49ha/image/upload/v1604315006/n1hvv1m9jt7uqwpflinw.jpg'
},
{
  name: 'brynn',
  avatar: 'https://res.cloudinary.com/dpyqb49ha/image/upload/v1604323288/vor3yhrukjyhscvqihr4.jpg'
},]

export default function Recherche( ) {
  return (
    <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Recherche', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{
          backgroundColor: '#4b6584',
          justifyContent: 'space-around',
        }}
      />
       <ScrollView style={{marginTop: 20}}>
         {
          users.map((user,i)=> {
            return(
              <View style={{ paddingHorizontal:10, border:'1px solid black'}}>
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: '100%', height: 80, marginTop:5}}
                  PlaceholderContent={<ActivityIndicator />}
                />

                <View style={{backgroundColor:'#d1d8e0'}}>
                  <Text style={styles.titre}>{user.name}</Text>
                
                <View
                  style={{
                    flexDirection: "row",
                    height: 100,
                    paddingHorizontal: 10,
                    backgroundColor: "#d1d8e0",
                  }}
                >
                    <View style={{ flex: 0.4 }} >
                      <Text style={styles.desciptif}>36 boulevard Haussmann 75009 Paris</Text>
                      <Text style={styles.desciptif}>0687573658</Text>
                      <Text style={styles.desciptif}>pizzeria@hotmail.com</Text>
                      <Text style={styles.desciptif}>www.lapizza.com</Text>
                    </View>
                    
                    <View style={{  flex: 0.4 }} >
                      <Text style={styles.desciptif}>cuisine :</Text>
                      <Text style={styles.desciptif}>cuisine :</Text>
                      <Text style={styles.desciptif}>cuisine :</Text>
                      <Text style={styles.desciptif}>cuisine :</Text>
                    </View>

                    <View style={{  flex: 0.2 }} >
                    <Icon
                  name='heart'
                  size={24}
                  color='#4b6584'
                  style={{margin:10}}
                />
                <Icon
                  name='heart-o'
                  size={24}
                  color='#4b6584'
                  style={{margin:10}}
                />
                    </View>
                  </View>
                  
                </View>

              </View>
            )
          })
         }
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
    textAlign:'center',
    color:'#4b6584',
    fontWeight:'bold',
    fontSize:15,
    margin:5,
    backgroundColor: "#d1d8e0",
  },
  desciptif:{
    textAlign:'center',
    // color:'#4b6584',
    fontSize:10,

  }
});
