

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/cidades';
var db;
const Pessoa = require('../models/Pessoa.js');

var listapessoas = [];

MongoClient.connect(url, { useNewUrlParser: true }, (erro, cliente) => {
	if (erro) {
		return console.log(erro);
	}
	db = cliente.db("cidades");
});

const listar = function () {
	db.collection('pessoas').find().toArray((erro, result) => {
		if (erro) {
			console.log(erro)
		} else {
			listapessoas = result;
		}
	});
	return listapessoas;
}

const findOne = (codigoKK, callback) => {

	db.collection('pessoas').findOne({ "codigo": parseInt(codigoKK) }, (erro, animal) => {
		if (erro) {
			console.log(erro);
			callback(erro, null);
		} else {
			console.log("Pessoa que veio do banco --> " + animal.codigo + " - " + animal.nome + " - " + animal.cpf + " - " + animal.telefone + " - " + animal.cidade);
			callback(null, animal);
		}
	});
}

const excluir = (codigo) => {
	db.collection('pessoas').deleteOne({ "codigo": parseInt(codigo) }, (erro, result) => {
		erro ? console.log(erro) : console.log("Pessoa DELETADA succefully o/ " + result);
	});
}

const inserir = (pessoa) => {
	db.collection('pessoas').insertOne(pessoa, (erro, result) => {
		erro ? console.log(erro) : console.log("Pessoa SALVA succefully o/ " + result);
	});
}

const alterar = (pessoa) => {

	db.collection('pessoas').updateOne({
		"codigo": parseInt(pessoa.codigo)
	},
		{
			$set: {
				"nome": pessoa.nome, "cpf": pessoa.cpf, "telefone": pessoa.telefone, "cidade": pessoa.cidade
			}
		}, (erro, res) => {
			erro ? console.log(erro) : console.log("Pessoa ALTERADA succefully o/ " + res);
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