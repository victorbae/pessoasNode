

var Pessoas = [];

const Pessoa = require('../models/Pessoa.js');
const service = require('../services/pessoaService.js');
const estadoService = require('../services/estadoService.js');
const cidadeService = require('../services/cidadeService.js');

var pessoa = new Pessoa();

const novo = (req, res) => {
	var pessoaAux = new Pessoa();
	Cidades = cidadeService.listar();
	res.render('novoPessoa', {"pessoa": pessoaAux, "cidades": Cidades });
}

const editar = (req, res) => {
	var codigoKK = req.params.cod;
	service.findOne(codigoKK, function(erro, objeto){
		if (erro) {
			console.log(erro);
		}else{
			pessoa = new Pessoa(objeto.codigo, objeto.nome, objeto.cpf, objeto.telefone, objeto.cidade);
			console.log("Pessoa Controller --> " + objeto.codigo + " - " + objeto.nome + " - " + objeto.cpf + " - " + objeto.telefone + " - " + objeto.cidade);

			Cidades = cidadeService.listar();
			res.render('novoPessoa', { "pessoa": objeto, "cidades": Cidades });
		}
	});	
}

const excluir = (req, res) => {
	var codigoKK = req.params.cod;
	service.excluir(codigoKK);
	res.redirect("/");
}

const listar = (req, res) => {
	Pessoas = service.listar();
	Cidades = cidadeService.listar();
	var Estados = estadoService.listar();
	res.render('index', { "cidades": Cidades, "pessoas": Pessoas, "estados": Estados });
}

const salvar = (req, res) => {

	if (req.body.codigo)
		pessoa.codigo = req.body.codigo;

	pessoa.nome = req.body.nome;
	pessoa.cpf = req.body.cpf;
	pessoa.telefone = req.body.telefone;
	pessoa.cidade = req.body.cidade;

	service.salvar(pessoa);
	res.redirect("/");
}


module.exports.novo = novo;

module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.editar = editar;

module.exports.excluir = excluir;