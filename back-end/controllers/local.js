const Local= require('../models/Local')
const controller ={}

controller.novo = async function(req,res){
    try{
        await Local.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const locais = await Local.find()
        res.send(locais)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const local = await Local.findById(id)
        if(local){
            res.send(local)
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
        const local = await Local.findByIdAndUpdate(id,req.body)
        if(local){
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
        const local = await Local.findByIdAndDelete(id)
        if(local){
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