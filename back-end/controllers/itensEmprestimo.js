const ItensEmprestimo= require('../models/ItensEmprestimo')
const controller ={}

controller.novo = async function(req,res){
    try{
        await ItensEmprestimo.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const itensEmprestimos = await ItensEmprestimo.find()
        .populate('tombo')
        .populate('emprestimo')
        
        res.send(itensEmprestimos)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const itensEmprestimo = await ItensEmprestimo.findById(id)
        if(itensEmprestimo){
            res.send(itensEmprestimo)
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
        const itensEmprestimo = await ItensEmprestimo.findByIdAndUpdate(id,req.body)
        if(itensEmprestimo){
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
        const itensEmprestimo = await ItensEmprestimo.findByIdAndDelete(id)
        if(itensEmprestimo){
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