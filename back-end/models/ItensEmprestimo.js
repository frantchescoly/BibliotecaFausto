const mongoose = require('mongoose')

const schema = mongoose.Schema({
  
    tombo:{
        type: mongoose.ObjectId,
        ref: 'Ativo'
    }, 
    emprestimo:{
        type:mongoose.ObjectId,
        ref:'Emprestimo'
    }
})
module.exports = mongoose.model('ItensEmprestimo',schema,'itensEmprestimos')