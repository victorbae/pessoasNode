

const Pessoa = require('../models/Pessoa.js');
const Cidade = require('../models/Cidade.js');
var ObjectID = require('mongodb').ObjectID;

const repository = require('../repositories/pessoaRepository.js');
const cidadeService = require('./cidadeService.js');


var listaPessoas = [];
var cidade;

const salvar = function (pessoaToSave) {
	
	console.log("Codigo cidade a ser buscado " + pessoaToSave.cidade);

	cidadeService.findOne(pessoaToSave.cidade, function(erro, objeto){
		if (erro) {
			console.log(erro);
		}else{
			cidade = new Cidade(objeto.codigo, objeto.nome, objeto.estado);
			console.log("Cidade encontrada --> " + cidade.codigo + " - " + cidade.nome + " - " + cidade.estado.nome);
			save(pessoaToSave, cidade)
		}
	});
}

function save(personToSave, city) {
	var pessoa;

	if (personToSave.codigo) {
		pessoa = new Pessoa(personToSave.codigo, personToSave.nome, personToSave.cpf, personToSave.telefone, city);
		pessoa._id = new ObjectID();

		repository.alterar(pessoa);
	} else {
		pessoa = new Pessoa(new Date().getTime(), personToSave.nome, personToSave.cpf, personToSave.telefone, city);
		pessoa._id = new ObjectID();

		console.log("Pessoa a ser salva ---" + JSON.stringify(pessoa));
		repository.inserir(pessoa);
	}
}

const listar = function () {
	listaPessoas = repository.listar();
	return listaPessoas;
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
			people = new Pessoa( objeto.codigo, objeto.nome, objeto.cpf, objeto.telefone, objeto.cidade);
			//console.log("Pessoa Finded --> " + objeto.codigo + " - " + objeto.nome + " - " + objeto.CPF + " - " + objeto.telefone + " - " + objeto.cidade);
			callback(null, people);
		}
	});
}

module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.excluir = excluir;

module.exports.findOne = findOne;