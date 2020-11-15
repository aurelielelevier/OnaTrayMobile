import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, Picker, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import HeaderBar from '../components/HeaderBar';
import CardTalent from '../components/CardTalent';
import { withNavigationFocus } from 'react-navigation';
import adresseIP from '../adresseIP';
import items from '../données/itemsTalents';

//récupération des données métiers et contrats et création d'un tableau 
const metiers = items.itemsPostes.map(item=> item.name);
const contrats = items.itemsContrats.map(item=> item.name);

function RechercheTalents({profilToDisplay, isFocused, navigation}) {

  function logout(){
    navigation.navigate('Home')
  };

  const [profil, setProfil] = useState(profilToDisplay);
  const [choixContrat, setChoixContrat] = useState('CDI');
  const [metier, setMetier] = useState('Serveur');
  const [posterecherché,setposterecherché]=useState(metier);
  const [typedecontrat,settypedecontrat]=useState(contrats);
  const [rechercheeffectuée,setrechercheeffectuée]=useState(false);
  const [liste, setListe] = useState([]);
  
  useEffect(()=>{
    //rechargement du profil à chaque fois que la page est affichée (a pu être modifié sur une autre page)
    if(isFocused){
      setProfil(profilToDisplay)
    }
  },[isFocused]);
  
  useEffect(()=> {
    // requête permettant d'interroger le backend et de renvoyer la liste des talents
    // - dont la zone de recherche d'emploi comprend l'adresse du restaurant
    // - qui acceptent les contrats proposés par le restaurant
    // - qui peuvent répondre au métier dont le restaurateur a besoin
    async function cherche(){
    var criteres = JSON.stringify({posterecherché: metier, typedecontrat:choixContrat})
    var rechercheListe = await fetch(`http://${adresseIP}:3000/restaurants/recherche-liste-talents`, {
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${profil.token}&criteres=${criteres}`
    })
        var response = await rechercheListe.json()
        setListe(response.liste)
        setProfil(response.profil)
     }
    cherche()
  },[metier,choixContrat]);

  
  return (
    <View style={{flex:1}}>

      <HeaderBar page='Recherche de talents' logout={logout}/>

      <View style={{flex:1}}>
        <Text style={styles.titre}>Je cherche un(e) :</Text>
        <Picker
            selectedValue={metier}
            itemStyle={{fontSize:14, fontWeight:'bold' , height:150, color:'#4b6584',}}
            mode='dropdown'
            selectionColor='red'
            style={{height: 30, width:'100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setMetier(itemValue)
            }>
          {
            metiers.map((metier,i)=>{
              return(
                <Picker.Item  key={`${metier}${i}`}
                              label={metier} 
                              value={metier}
                              />
              )
            })
          }
        </Picker>
      </View>

      <View style={{ flexDirection:'row', marginTop:50, justifyContent:'center'}}>
        {
          contrats.map((contrat,i)=>{
            return(
              <CheckBox
                key={i+contrat}
                center
                title={contrat}
                color={'red'}
                containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0, margin:0}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={contrat===choixContrat?true:false}
                onPress={()=>{{setChoixContrat(contrat)}}}
              />
            )
          })
        }
      </View>
        
      <View style={{flex:3}}>
        <ScrollView>
        {
          liste.map((talent,i)=> {
            return(
              <CardTalent key={`${talent}${i}`} talent={talent} inwishlit={true}/>
            )
          })
         }
        </ScrollView>
      </View>
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
  titre:{ 
    textAlign:"center",
    color:'#4b6584',
    fontSize:20,
    fontWeight:'bold',
    marginTop:10
  },
  scrollview:{
    flex:5,
    backgroundColor: '#4b6584',
  }
});


function mapStateToProps(state) {
  return { profilToDisplay : state.profil }
};

export default connect(
  mapStateToProps, 
  null
)(withNavigationFocus(RechercheTalents));