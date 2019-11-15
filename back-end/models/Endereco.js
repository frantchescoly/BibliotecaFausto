const mongoose = require('mongoose')

const schema = mongoose.Schema({

    tipoLogradouro:{
        type:String,
        require:true
    }, 
    logradouro:{
        type:String,
        require:true
    }, 
    numero:{
        type:Number,
        require:true
    },
    bairro:{
        type:String,
        require:true
    }, 
    cidade:{
        type:String,
        require:true
    }, 
    uf:{
        type:String,
        require:true
    }, 
    cep:{
        type:String,
        require:true
    }

})
module.exports = mongoose.model('Endereco',schema,'enderecos')
