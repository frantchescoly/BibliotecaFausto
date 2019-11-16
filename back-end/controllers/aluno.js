const Aluno= require('../models/Aluno')
const controller ={}

//Teste de commit;
controller.novo = async function(req,res){
    try{
        await Aluno.create(req.body)

        res.sendStatus(201).end()

    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500)

    }
}

controller.listar = async function(req,res){
    try{
        const alunos = await Aluno.find().populate("endereco")
        res.send(alunos)
    }
    catch(erro){
        console.error(erro)
        res.sendStatus(500).end()

    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id
    try{
        const aluno = await Aluno.findById(id)
        if(aluno){
            res.send(aluno)
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
        const aluno = await Aluno.findByIdAndUpdate(id,req.body)
        if(aluno){
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
        const aluno = await Aluno.findByIdAndDelete(id)
        if(aluno){
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