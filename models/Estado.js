

class Estado{

	constructor(codigo, nome, sigla){
		this.codigo = codigo;
		this.nome = nome;
		this.sigla = sigla; 
	}

	nomeSigla(){
		return nome + " - " + sigla;
	}  

}


module.exports = Estado;