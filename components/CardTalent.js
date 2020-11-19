import React, { useState } from 'react';
import { Linking, StyleSheet, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import {Button, Overlay, Avatar, Divider, Badge} from 'react-native-elements';

function CardTalent({talent, onChangeWishlist, coeur}) {
  
  const [visible, setVisible] = useState(false);

  const langues = talent.speakLangage.map((langue,i)=>{
    return(
      <Text key={`${langue}${i}`} style={styles.desciptif}>{langue}</Text>
    )
  })

  const formation = talent.formation.map((formation,i)=>{
    return(
      <View key={`${formation}${i}`}>
        <Text style={{...styles.desciptif, marginTop:5}}>{`${formation.diploma} - ${formation.school} - ${formation.endingDate}`}</Text>
      </View>
    )
  })

  const experience = talent.experience.map((experience,i)=>{
    return(
      <View key={`${experience}${i}`}>
        <Text style={{...styles.desciptif, marginTop:5}}>{`${experience.firm} - ${experience.city} - ${experience.job} - Du ${experience.startingDate} au ${experience.endingDate}`}</Text>
      </View>
    )
  });

  if (talent.lookingForJob){
      var cherche = <FontAwesome name="check-square-o" size={15} color="#4b6584"/>
  } else {
      var cherche = <FontAwesome name="square-o" size={15} color="#4b6584" />
  }
  if (!talent.working){
    var dispo = <FontAwesome name="check-square-o" size={15} color="#4b6584"/>
} else {
    var dispo = <FontAwesome name="square-o" size={15} color="#4b6584" />
}

  return ( 
      <View>

        <Overlay 
            isVisible={visible}
            overlayStyle={{flex:0.9, width:'90%'}}
          >
          <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
              <Text style={styles.titreOverlay}>{`${talent.firstName} ${talent.lastName}`}</Text>
              <View style={{ padding:20, alignItems:'center'}}>
                  
                <Avatar
                    rounded
                    size="xlarge"
                    source={{
                    uri:talent.avatar, }}
                />
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
                    {` ${talent.phone}`}
                    </Text>
                </View>
                      
                <View style={{ flexDirection:'row', marginTop:2, justifyContent:'center'}}>
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
                    {` ${talent.email}`}
                    </Text>
                </View>
                <View style={{flex:1, width:'100%',justifyContent:'space-around', marginTop:10, flexDirection:'row'}}> 
                    <Button
                        buttonStyle={{backgroundColor:'#4b6584', borderWidth:'none', alignItems:'center', borderRadius:10}}
                        onPress={()=>{Linking.openURL(`tel:${talent.phone}`)}}
                        icon={
                          <Icon
                            name="phone"
                            size={15}
                            color="white"
                            style={{marginRight:10}}
                          />
                        }
                        title="Appeler"
                      />
                    <Button
                        buttonStyle={{backgroundColor:'#4b6584', borderWidth:'none', alignItems:'center', borderRadius:10}}
                        onPress={()=>{Linking.openURL(`sms:${talent.phone}`)}}
                        icon={
                          <Icon
                            name="comments"
                            size={15}
                            color="white"
                            style={{marginRight:10}}
                          />
                        }
                        title="Envoyer un SMS"
                      />
                  
                   
                  </View>
                  <View style={{flex:1, width:'100%',justifyContent:'space-around', marginTop:10, flexDirection:'row'}}> 
                    <Button
                        buttonStyle={{backgroundColor:'#4b6584', borderWidth:'none', alignItems:'center', borderRadius:10}}
                        onPress={()=>{Linking.openURL(`mailto:${talent.email}`)}}
                                     
                        icon={
                          <Icon
                            name="envelope-o"
                            size={15}
                            color="white"
                            style={{marginRight:10}}
                          />
                        }
                        title="Envoyer un email"
                      />
                  </View>
              </View>

              <Divider style={{marginBottom:10, alignItems:'center'}}/>

              <View style={{alignItems:'center'}}>
                  <Text style={styles.desciptif}>{cherche} Cherche un travail</Text>
                  <Text style={styles.desciptif}>{dispo} Est disponible</Text>
              </View>
                  
              <Divider style={{margin:10}}/>
                  
              <Text style={styles.desciptif}><Icon
                          name='comments'
                          size={20}
                          color='#4b6584'
                          style={{marginRight:10}}
                  />
              </Text>
              {langues}

              <Divider style={{margin:10}}/>
              
              <View style={{flex:1}}>
                <Text style={{...styles.desciptif, fontWeight:'bold'}}><Icon
                        name='briefcase'
                        size={20}
                        color='#4b6584'
                        style={{marginRight:10}}
                /> Formation
                </Text>
                {formation}

                <Text style={{...styles.desciptif, marginTop:5, fontWeight:'bold'}}><Icon
                        name='vcard-o'
                        size={20}
                        color='#4b6584'
                        style={{marginRight:10}}
                /> Expérience
                </Text>
                {experience}
              </View>
            </ScrollView>
            <Button 
                  onPress={()=>{setVisible(false)}}
                  buttonStyle={{backgroundColor:'#fed330', margin:20}}
                  titleStyle={{color:'#4b6584'}}
                  title='OK'/>
          </View>
        </Overlay>

        <ScrollView >
          <View style={{ backgroundColor:'#d1d8e0', borderRadius:10, margin:10,border:'1px solid black'}}>
            <View style={{flexDirection:'row', padding:10}}>
              <View>
                <Avatar
                    rounded
                    size="medium"
                    source={{
                    uri:talent.avatar, }}
                />     
              </View>
            <View style={{ width:'80%'}}>
              <Text style={styles.titre}>{talent.firstName}{' '}{talent.lastName}</Text>
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
                    {` ${talent.phone}`}
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
                    {` ${talent.email}`}
                    </Text>
                </View>
              <Text style={styles.desciptif}>
                  {cherche} Cherche un travail    {dispo} Est disponible
              </Text>
            </View>

            <View style={{paddingRight:1}}> 
                <Icon
                    name={coeur}
                    size={24}
                    color='#4b6584'
                    style={{marginRight:70}}
                    onPress={()=>{{
                      onChangeWishlist(talent._id)}}}
                />
            </View>
          </View>

          <View style={{flex:1}}>
            <View
                style={{
                flexDirection: "row",
                flex:1,
                paddingHorizontal: 10,
                }}
            >   
            </View>
            <View>
                <Icon
                    name='search-plus'
                    size={24}
                    color='#4b6584'
                    style={{ marginVertical:5, alignSelf:'center'}}
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
    fontSize:15,
    marginBottom:10,
    marginTop:5,
  },
  desciptif:{
    textAlign:'center',
    color:'#4b6584',
    fontSize:12,
  },
  desciptifOverlay:{
    textAlign:'left',
    color:'#4b6584',
    fontSize:18,
    textAlign:'center',
  },
  titreOverlay:{
    textAlign:'center',
    color:'#4b6584',
    fontWeight:'bold',
    fontSize:20,
  },
});


export default CardTalent;