const mongoose = require('mongoose')


const schema = mongoose.Schema({

    nome:{
        type:String,
        require:true
    },
 
    telefone:{
        type:String,
        require:true
    },
    pais:{
        type:String,
     
    }

})
module.exports = mongoose.model('Editora',schema,'editoras')
