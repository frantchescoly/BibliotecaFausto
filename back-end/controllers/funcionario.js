const Funcionario= require('../models/Funcionario')
const controller ={}

controller.novo = async function(req,res){
    try{
        await Funcionario.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
     
}

controller.listar = async function(req,res){
    try{
        const funcionarios = await Funcionario.find()
        .populate('endereco')
        
        res.send(funcionarios)

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const funcionario = await Funcionario.findById(id)
        if(funcionario){
            res.send(funcionario)
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
        const funcionario = await SVGPathSegCurvetoCubicSmoothAbs.findByIdAndUpdate(id,req.body)
        if(funcionario){
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
        const funcionario = await Funcionario.findByIdAndDelete(id)
        if(funcionario){
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
