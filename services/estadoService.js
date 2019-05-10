

const Estado = require('../models/Estado.js');
const repository = require('../repositories/estadoRepository.js');
var ObjectID = require('mongodb').ObjectID;

var estado = new Estado();
var listaestados = [];

const salvar = function (estadoToSave) {

	estado.nome = estadoToSave.nome;
	estado.sigla = estadoToSave.sigla;

	if (estadoToSave.codigo) {
		console.log("alterou")
		estado.codigo = estadoToSave.codigo;
		repository.alterar(estado);
	} else {
		estado.codigo = new Date().getTime();
		estado._id = new ObjectID();
		console.log("Estado a Ser salvo --->" + JSON.stringify(estado));
		repository.inserir(estado);
	}
}

const listar = function () {
	listaestados = repository.listar();

	return listaestados;
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
			estado = new Estado(objeto.codigo, objeto.nome, objeto.sigla);
			callback(null, estado);
		}
	});
}



module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.excluir = excluir;

module.exports.findOne = findOne;