

const Cidade = require('../models/Cidade.js');
const Estado = require('../models/Estado.js');
var ObjectID = require('mongodb').ObjectID;

const repository = require('../repositories/cidadeRepository.js');
const estadoService = require('../services/estadoService.js');

var listaCidades = [];
var estado;

const salvar = function(cityToSave) {
	
	console.log("codigo estado a ser buscado " + cityToSave.estado);
	
	estadoService.findOne(cityToSave.estado, function(erro, objeto){
		if (erro) {
			console.log(erro);
		}else{
			estado = new Estado(objeto.codigo, objeto.nome, objeto.sigla);
			console.log("Estado encontrado --> " + estado.codigo + " - " + estado.nome + " - " + estado.sigla)
			save(cityToSave, estado);
		}
	});
}


function save(toSave, estado){
	var cidade;
	
	if (toSave.codigo) {
		cidade = new Cidade(toSave.codigo, toSave.nome, estado);
		cidade._id = new ObjectID();

		repository.alterar(cidade);
	} else {
		cidade = new Cidade(new Date().getTime(), toSave.nome, estado);
		cidade._id = new ObjectID();

		//console.log("Cidade a ser salva ---" + JSON.stringify(cidade));
		repository.inserir(cidade);
	}
}

const listar = function () {
	listaCidades = repository.listar();
	return listaCidades;
}

const excluir = (codigo) => {
	repository.excluir(codigo);
}

const findOne = (codigo, callback) => {
	repository.findOne(codigo, function(erro, objeto){
		if (erro) {
			console.log(erro);
			callback(erro, null);
		}else{
			cityEncontrada = new Cidade(objeto.codigo, objeto.nome, objeto.estado);
			console.log("Cidade Finded --> " + objeto.codigo + " - " + objeto.nome + " - " + objeto.estado);
			callback(null, cityEncontrada);
		}
	});
}

module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.excluir = excluir;

module.exports.findOne = findOne;