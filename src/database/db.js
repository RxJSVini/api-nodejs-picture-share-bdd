const mongoose = require('mongoose');
const dotenv = require('dotenv').config()


// module.exports = () =>{
//     mongoose.connect(`mongodb://${process.env.URL_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`,{useUnifiedTopology: true, useNewUrlParser: true })
//     .then(( ) =>{
    
//     })
//     .catch((error) =>{

//         console.log(`Erro na conexão com o banco de dados!`,error);
//     })
// }


try{
    mongoose.connect(`mongodb://${process.env.URL_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`,{useUnifiedTopology: false, useNewUrlParser: true })
 .then(( ) =>{}).catch((error) =>{console.log(`Erro na conexão com o banco de dados!`, error) })

}catch(e){
    console.log(e)
}


/**
 * Criando banco em localhost
 * use guiapics
 */

