const Ativo = require('../models/Ativo')

const controller ={}

controller.novo = async function(req,res){
    try{
        await Ativo.create(req.body)
        res.sendStatus(201).end()
    }catch(erro){
        console.error(erro)
        res.sendStatus(500)
    }
}

controller.listar = async function(req,res){
    try{
        const ativos = await Ativo.find()
        .populate('editora')
        .populate('local')
        res.send(ativos)
        
    }catch(erro){
        console.error(erro)
        res.sendStatus(500).end()
    }
},

controller.obterUm = async function(req,res){
    const id= req.params.id
    try{
        const ativo = await Ativo.findById(id)
        if(ativo){
            res.send(ativo)
        }

    }catch(erro){
        console.error(erro)
        sendStatus(500).end()
    }

}
controller.atualizar = async function (req, res){
    const id = req.body._id
    try{
        const ativo = await Ativo.findByIdAndUpdate(id, req.body);
        if(ativo){
            res.sendStatus(204).end()
        } else{
            res.sendStatus(404).end()
        }
    }catch(erro){
        console.error(erro)
        sendStatus(500).end()
    }
}

controller.excluir = async function (req, res){
    const id = req.body._id

    try{
        const ativo = await Ativo.findByIdAndDelete(id)
        if(ativo){
            res.sendStatus(204).end()
        }else{
            res.sendStatus(404).end()
        }
    }catch(erro){
        console.error(erro)
        sendStatus(404).end()
    }
}
module.exports = controller