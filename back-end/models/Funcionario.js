const mongoose = require('mongoose')

const schema = mongoose.Schema({

    nome:{
        type:String,
        require:true
    },
    dtNascimento:{
        type:Date,
        require:true
    },
    cpf:{
        type:String,
        require:true
    },
    celular:{
        type:String,
        require:true
    },
    telefone:{
        type:String
    },
    endereco:{
        type: mongoose.ObjectId,
        ref: 'Endereco'

    },

})

module.exports = mongoose.model('Funcionario',schema,'funcionarios')
