const Endereco= require('../models/Endereco')
const controller ={}

controller.novo = async function(req,res){
    try{
        await Endereco.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const enderecos = await Endereco.find()
        res.send(enderecos)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const endereco = await Endereco.findById(id)
        if(endereco){
            res.send(endereco)
        }
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()
    }
}

controller.atualizar = async function(req,res){
    const id = req.body._id
    try{
        const endereco = await Endereco.findByIdAndUpdate(id,req.body)
        if(endereco){
            res.sendStatus(204).end()
        }
        else{
            res.sendStatus(404).end()
        }
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
    con
}
controller.excluir = async function (req,res){
    const id = req.body._id
    try{
        const endereco = await Endereco.findByIdAndDelete(id)
        if(endereco){
            res.sendStatus(204).end()
        }else{
            res.sendStatus(404).end()
        }

    }catch(erro){
        console.erro(erro)
        res.sendStatus(500).end()
    }
}

module.exports = controller