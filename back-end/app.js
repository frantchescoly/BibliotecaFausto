// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const database = require('./config/database');
const biblioteca = 'mongodb://localhost:27017/biblioteca';
database(biblioteca);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



const aluno = require('./routes/aluno')
app.use('/aluno',aluno)

const funcionario = require('./routes/funcionario')
app.use('/funcionario', funcionario)

const ativo = require('./routes/ativo')
app.use('/ativo',ativo)

const editora = require('./routes/editora')
app.use('/editora',editora)

const emprestimo = require('./routes/emprestimo')
app.use('/emprestimo',emprestimo)

const itensEmprestimo = require('./routes/itensEmprestimo')
app.use('/itensEmprestimo',itensEmprestimo)

const local = require('./routes/local')
app.use('/local',local)

const endereco = require('./routes/endereco')
app.use('/endereco',endereco)

module.exports = app;
