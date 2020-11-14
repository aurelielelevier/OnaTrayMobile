import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { StyleSheet, ScrollView,Picker, Text, View, SegmentedControlIOS} from 'react-native';
import { CheckBox } from 'react-native-elements'
import HeaderBar from '../components/HeaderBar'
import CardTalent from '../components/CardTalent';
import { withNavigationFocus } from 'react-navigation';
import adresseIP from '../adresseIP';

const metiers = ['Voiturier', 'Serveur', 'Garçon de café', 'Plongeur', 'Runner', 'Sommelier',
                    'Chef de rang', "Maître d'hôtel", 'Manager', 'Chef de cuisine', 'Chef de partie', 
                  'Commis de cuisine', 'Pizzaiolo', 'Pâtissier'];

const contrats = ['CDI', 'CDD', 'Extra'];

function RechercheTalents({profilToDisplay, isFocused}) {

  const [profil, setProfil] = useState(profilToDisplay)
  const [choixContrat, setChoixContrat] = useState('CDI')
  const [metier, setMetier] = useState('Serveur')
  const [posterecherché,setposterecherché]=useState(metier)
  const [typedecontrat,settypedecontrat]=useState(contrats)
  const [rechercheeffectuée,setrechercheeffectuée]=useState(false)
  const [liste, setListe] = useState([])
  
  useEffect(()=>{
    if(isFocused){
      setProfil(profilToDisplay)
    }
  },[isFocused]);
  
  useEffect(()=> {
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
  },[metier,choixContrat])

  
  return (
    <View style={{flex:1}}>
      <HeaderBar page='Recherche de talents'/>
      <View style={{flex:1}}>
        <Text style={styles.titre}>Je cherche un(e) :</Text>
        <Picker
            selectedValue={metier}
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
        <View style={{ flexDirection:'row', marginTop:100, justifyContent:'center'}}>
        {
            contrats.map((contrat,i)=>{
              return(
                <CheckBox
                  key={i+contrat}
                  center
                  title={contrat}
                  color={'red'}
                  containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)', borderWidth:0}}
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
        <ScrollView style={{marginTop: 20}}>
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
}

export default connect(
  mapStateToProps, 
  null
)(withNavigationFocus(RechercheTalents));