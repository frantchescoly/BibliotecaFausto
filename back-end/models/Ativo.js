const mongoose = require('mongoose')

const schema = mongoose.Schema({
    tipo:{
        type:String,
        require:true
    },
    nome:{
        type:String,
        require:true
    },
    autor:{
        type:String,
        require:true
    },
    editora:{
        type: mongoose.ObjectId,
        ref: 'Editora'
    },
    descricao:{
        type:String
    },
    ano:{
        type:String

    },
    edicao:{
        type:Number
    },
    isbn:{
        type:Number
    },
    tombo:{
        type: Number,
        require:true

    },
    local:{
        type: mongoose.ObjectId,
        ref: 'Local', 
    }

})
module.exports = mongoose.model('Ativo',schema,'ativos')