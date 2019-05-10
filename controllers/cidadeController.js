

var Cidades = [];

const Cidade = require('../models/Cidade.js');
const service = require('../services/cidadeService.js');
const estadoService = require('../services/estadoService.js');

var cidade = new Cidade();


const novo = (req, res) => {
	var cidadeAux = new Cidade();
	var Estados = estadoService.listar();
	res.render('novoCidade', { "cidade": cidadeAux, "estados": Estados });
}

const editar = (req, res) => {
	var codigoKK = req.params.cod;
	
	service.findOne(codigoKK, function(erro, objeto){
		if (erro) {
			console.log(erro);
		}else{
			cidade = new Cidade(objeto.codigo, objeto.nome, objeto.estado);
			console.log("Cidade Control --> " + cidade.codigo + " - " + cidade.nome + " - " + cidade.estado);
		
			var Estados = estadoService.listar();
			res.render('novoCidade', { "cidade": cidade, "estados": Estados });
		}
	});
}

const excluir = (req, res) => {
	var codigoKK = req.params.cod;
	service.excluir(codigoKK);
	res.redirect("/");
}

const listar = (req, res) => {
	Cidades = service.listar();
	var Estados = estadoService.listar();
	res.render('index', { "cidades": Cidades, "estados": Estados });
}

const salvar = (req, res) => {

	if (req.body.codigo)
		cidade.codigo = req.body.codigo;

	cidade.nome = req.body.nome;
	cidade.estado = req.body.estado;

	service.salvar(cidade);
	res.redirect("/");
}


module.exports.novo = novo;

module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.editar = editar;

module.exports.excluir = excluir;