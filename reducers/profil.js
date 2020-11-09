export default function(profil={},action){

    if(action.type == 'addProfil'){
        console.log('PROFIL COMPLET', action.profil)
        return action.profil
    }
    else{
        return profil 
    }
}