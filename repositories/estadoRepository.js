

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/cidades';
var db;
const Estado = require('../models/Estado.js');

var listaestados = [];

MongoClient.connect(url, { useNewUrlParser: true }, (erro, cliente) => {
	if (erro) {
		return console.log(erro);
	}
	db = cliente.db("cidades");
});

const listar = function () {
	db.collection('estados').find().toArray((erro, result) => {
		if (erro) {
			console.log(erro)
		} else {
			listaestados = result;
		}
	});
	return listaestados;
}

const findOne = (codigoKK, callback) => {

	db.collection('estados').findOne({ "codigo": parseInt(codigoKK) }, (erro, animal) => {
		if (erro) {
			console.log(erro);
			callback(erro, null);
		} else {
			console.log("Estado que veio do banco --> " + animal.codigo + " - " + animal.nome + " - " + animal.sigla);
			callback(null, animal);
		}
	});
}

const excluir = (codigo) => {
	db.collection('estados').deleteOne({ "codigo": parseInt(codigo) }, (erro, result) => {
		erro ? console.log(erro) : console.log("Estado DELETADO succefully o/ " + result);
	});
}

const inserir = (estado) => {
	db.collection('estados').insertOne(estado, (erro, result) => {
		erro ? console.log(erro) : console.log("Estado SALVO succefully o/ " + result);
	});
}

const alterar = (estado) => {

	db.collection('estados').updateOne({
		"codigo": parseInt(estado.codigo)
	},
		{
			$set: {
				"nome": estado.nome, "sigla": estado.sigla
			}
		}, (erro, res) => {
			erro ? console.log(erro) : console.log("Estado ALTERADO succefully o/ " + res);
		}
	);
}


// Exporta a funcao salvar com o nome de salvar
module.exports.listar = listar;

// Exporta a funcao inserir com o nome de inserir
module.exports.inserir = inserir;
module.exports.alterar = alterar;

// Exporta a funcao excluir com o nome de excluir
module.exports.excluir = excluir;

// Exporta a funcao editar com o nome de editar
module.exports.findOne = findOne;