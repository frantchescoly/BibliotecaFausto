const mongoose = require('mongoose')


const schema = mongoose.Schema({


    corredor:{
        type:Number,
        require:true
  
    },
    estante:{
        type:Number,
        require:true
        
    },
    prateleira:{
        type:Number,
        require:true
    }
    
})
module.exports = mongoose.model('Local',schema,'locais')