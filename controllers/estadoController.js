

var Estados = [];

const Estado = require('../models/Estado.js');
const service = require('../services/estadoService.js');

var estado = new Estado();

const novo = (req, res) => {
	var estadoAux = new Estado(null, null, null);
	res.render('novoUF', { "estado": estadoAux });

}
const editar = (req, res) => {
	var codigoKK = req.params.cod;
	
	service.findOne(codigoKK, function(erro, objeto){
		if (erro) {
			console.log(erro);
		}else{
			estado = new Estado(objeto.codigo, objeto.nome, objeto.sigla);
			console.log("Estado Finded -->" + estado.codigo + " - " + estado.nome + " - " + estado.sigla);
	
			res.render('novoUF', { "estado": estado });	
		}
	});
}

const excluir = (req, res) => {
	var codigoKK = req.params.cod;
	service.excluir(codigoKK);
	res.redirect("/");
}

const listar = (req, res) => {
	Estados = service.listar();
	res.render('index', { "estados": Estados });
}

const salvar = (req, res) => {

	if (req.body.codigo)
		estado.codigo = req.body.codigo;

	estado.nome = req.body.nome;
	estado.sigla = req.body.sigla;

	service.salvar(estado);
	res.redirect("/");
}


module.exports.novo = novo;

module.exports.salvar = salvar;

module.exports.listar = listar;

module.exports.editar = editar;

module.exports.excluir = excluir;