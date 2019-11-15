const mongoose = require('mongoose')

const schema = mongoose.Schema({

    nome:{
        type: String,
        required:true
    },
    dtNascimento:{
        type:Date,
        require:true

    },
    cpf:{
        type:Number,
        require:true
    },
    telefone:{
        type:String,
        require:true

    },
    celular:{
        type:String
    },
    endereco:{
        type: mongoose.ObjectId,
        ref: 'Endereco'
    },
    nomeMae:{
        type:String, 
        require: true
    }
 
})

module.exports = mongoose.model('Aluno',schema,'alunos')