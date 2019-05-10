

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/cidades';
var db;

var listaCidades = [];

MongoClient.connect(url, { useNewUrlParser: true }, (erro, cliente) => {
	if (erro) {
		return console.log(erro);
	}
	db = cliente.db("cidades");
});

const listar = function () {
	db.collection('cidades').find().toArray((erro, result) => {
		if (erro) {
			console.log(erro)
		} else {
			listaCidades = result;
		}
	});
	return listaCidades;
}

const findOne = (codigoKK, callback) => {
	var cityEncontrada;

	db.collection('cidades').findOne({ "codigo": parseInt(codigoKK) }, (erro, bixo) => {
		if (erro) {
			console.log(erro);
			callback(erro, null);
		} else {
			console.log("Cidade que veio do banco --> " + bixo.codigo + " - " + bixo.nome);
			callback(null, bixo);
		}
	});

}

const excluir = (codigo) => {
	db.collection('cidades').deleteOne({ "codigo": parseInt(codigo) }, (erro, result) => {
		erro ? console.log(erro) : console.log("Cidade DELETADA succefully o/ " + result);
	});
}

const inserir = (cidade) => {
	db.collection('cidades').insertOne(cidade, (erro, result) => {
		erro ? console.log(erro) : console.log("Cidade SALVA succefully o/ " + result);
	});
}

const alterar = (cidade) => {

	db.collection('cidades').updateOne({
		"codigo": parseInt(cidade.codigo)
	},
		{
			$set: {
				"nome": cidade.nome, "estado": cidade.estado
			}
		}, (erro, res) => {
			erro ? console.log(erro) : console.log("Cidade ALTERADA succefully o/ " + res);
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