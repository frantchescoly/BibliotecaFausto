const Emprestimo= require('../models/Emprestimo')
const controller ={}

controller.novo = async function(req,res){
    try{
        await Emprestimo.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const emprestimos = await Emprestimo.find()
        .populate('aluno')
        .populate('funcionario')
        res.send(emprestimos)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const emprestimo = await Emprestimo.findById(id)
        if(emprestimo){
            res.send(emprestimo)
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
        const emprestimo = await Emprestimo.findByIdAndUpdate(id,req.body)
        if(emprestimo){
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
        const emprestimo = await Emprestimo.findByIdAndDelete(id)
        if(emprestimo){
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