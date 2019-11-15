const Editora= require('../models/Editora')
const controller ={}

controller.novo = async function(req,res){
    try{
        await Editora.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const editoras = await Editora.find()
        res.send(editoras)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const editora = await Editora.findById(id)
        if(editora){
            res.send(editora)
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
        const editora = await Editora.findByIdAndUpdate(id,req.body)
        if(editora){
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
        const editora = await Editora.findByIdAndDelete(id)
        if(editora){
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