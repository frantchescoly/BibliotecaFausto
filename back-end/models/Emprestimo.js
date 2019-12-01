const mongoose = require('mongoose');

const schema = mongoose.Schema({

    dtEmpre:{
        type:Date,
        require:true
    },
    aluno:{
        type: mongoose.ObjectId,
        ref: 'Aluno',
        required: true
    },
    funcionario:{
        type: mongoose.ObjectId,
        ref: 'Funcionario',
        required: true
    },
    dataDev:{
        type:Date,
        require:true
    },

});

module.exports = mongoose.model('Emprestimo',schema,'emprestimos');