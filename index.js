

//adicionando o express
const express = require('express');
const pug = require('pug'); // template html
const parser = require('body-parser'); // pega parametros do request

const server = express();


const estadoController = require("./controllers/estadoController");
const cidadeController = require("./controllers/cidadeController");
const pessoaController = require("./controllers/pessoaController");

server.set("views", __dirname + "/views"); //Especifica onde estarao as views
server.set("view engine", "pug"); //Usa o EJS para os Templates
server.use(parser.urlencoded({ extended: true }));


// Temos direto o tipo do request no metodo
//res.render('index', {estados: estadoController.listar, cidades: cidadeController.listar});
server.get('/', pessoaController.listar);

server.get('/cidade/novo', cidadeController.novo);

server.post('/cidade/salvar', cidadeController.salvar);

server.get('/cidade/editar/:cod', cidadeController.editar);

server.get('/cidade/excluir/:cod', cidadeController.excluir);

server.get('/estado/novo', estadoController.novo);

server.post('/estado/salvar', estadoController.salvar);

server.get('/estado/editar/:cod', estadoController.editar);

server.get('/estado/excluir/:cod', estadoController.excluir);

server.get('/pessoa/novo', pessoaController.novo);

server.post('/pessoa/salvar', pessoaController.salvar);

server.get('/pessoa/editar/:cod', pessoaController.editar);

server.get('/pessoa/excluir/:cod', pessoaController.excluir);

server.listen(6060, () => console.log(`Rodando em localhost:6060/`));
