Array.prototype.affichage = function(){
	console.group("|[°-KultOfTheRabbit-°]| Contenu du tableau demandé : ");
	for(let i = 0; i<this.length; i++){
		console.log(this[i]);
	}
	console.groupEnd();
}


function Sociale(temperament){
	this.temperament = temperament || "a def" ;
}

const SOCIALE = { "calineur": new Sociale("calineur"), "agressif": new Sociale("agressif"), "nostalgique": new Sociale("nostalgique"), "bagarreure": new Sociale("bagarreure")  };
class toto {
	constructor(nb) {}
	autre2() { console.log("help"); }
}
class crtGenome2 extends toto { // Classe
	#h = 52;
	constructor( c, t) {
		super();
		this.autre2();
		let _u = 8;
		this.nom = c.nom;
		this.pv = c.pv;
	}

	static d = 8;

  autre() {
		console.log("Je suis statique");
	}
}

var tubeAEssai= [

	[ crtGenome2, ["Splash", 10], [ SOCIALE.amoureux, SOCIALE.nostalgique ] ],
	[ crtGenome2, ["Pilou", 12],  [ SOCIALE.calineur ] 									 	 ],
	[ crtGenome2, ["Biboo", 18],  [ SOCIALE.bagarreure ] 									 ],

];

function crtGenome( caracStd, temperament) { // pseudo Classe
	//ppp.call(this)
	_u = 2;
	this.nom = caracStd.nom ;
	this.pv = caracStd.pv ;
}

crtGenome.u = 88;
crtGenome.prototype.autre = function(first_argument) {
	// body...
};

var manimale = function(tubeAEssai, nbPerso) {
	
	//var numLigne = tubeAEssai[Math.floor(Math.random() * tubeAEssai.length )];

	let cstr = tubeAEssai[nbPerso][0];
	console.log(cstr);
	let std = tubeAEssai[0][1];

	let caracStd = { "nom": std[0], "pv": std[1] };


	var creature = new cstr(caracStd);

	return creature;
}


console.log("|[°-KultOfTheRabbit-°]|", new manimale(tubeAEssai, 1));