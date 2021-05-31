const app = require('./app');
const db = require('./database/db');

app.listen(3131, (err) =>{
    if(err){
        console.log(err)
    }else {
        console.log(`Servidor rodando!`)
    }
})