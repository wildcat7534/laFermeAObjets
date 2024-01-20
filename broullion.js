



////////////BROUILLON DE CODE/////////////////////////////////////////////////


let s = document.querySelectorAll("section");
s.forEach(function(sc){
	sc.addEventListener("click", function(){
		console.log(sc.getBoundingClientRect())
	});
});

var test = document.getElementById("test");


Array.prototype.affichage = function(){
	console.group("|[°-KultOfTheRabbit-°]| Contenu du tableau demandé : ");
	for(let i = 0; i<this.length; i++){
		console.log(this[i]);
	}
	console.groupEnd();
}


class Main {
		#priv1 = "Hellooooo";
		tubeAEssai = [

			[ "crtGenome2", ["Splashou", 10], "[ SOCIALE.amoureux, SOCIALE.nostalgique ]" ],
			[ "crtGenome2", ["Pilou", 12],  "[ SOCIALE.calineur ] "									 	 ],
			[ "crtGenome2", ["Biboo", 18],  "[ SOCIALE.bagarreure ] 	"								 ],

		];

	constructor() {
		//console.log("Var2", this.var2);
	}
	autre2() { console.log("Main"); }
}

/*class GrosAnimaux extends Main {

	constructor(a) {

		super();
		let std = this.tubeAEssai[a][1];
		this.nom = std[0];

		let corps = document.createElement('article');
		corps.classList.add('corps');

	}
}*/

class objChat {
	#myModel;
	#myDomElement;
	#myImg;
	#myBulle;
	constructor(destination) {
		this.#myModel = document.querySelector(".petitChatModel");
		this.#myDomElement = this.#myModel.cloneNode(true);
		this.#myDomElement.classList.remove("petitChatModel");
		this.#myImg = this.#myDomElement.querySelector("img");
		this.#myBulle = this.#myDomElement.querySelector(".catBulle");
		this.appliquePelageHasard();
		destination.appendChild(this.#myDomElement);
	}
	afficheMoi() {
		this.#myDomElement.hidden = false; 
	}
	cacheMoi() {
		this.#myDomElement.hidden = true; 
	}
	appliquePelageHasard() {
		var deg = Math.random()*360<<0; 
		this.#myImg.style.filter = "hue-rotate("+deg+"deg)";
	}
	parler(txt) {
		this.#myBulle.innerHTML = txt;
	}
	get domElement() {
		return this.#myDomElement;
	}
	deplaceMoi(dest) {
		dest.appendChild(this.#myDomElement);
	}
}

class corpus {
	#corpusBase;
	#corpusPop;
	constructor(destination) {
		this.#corpusBase = document.querySelector(".corpusBase");
		this.#corpusPop = this.#corpusBase.cloneNode(true);

	}
}
class PtitsAnimaux extends Main { // Classe

	#var1 = 222;														// Private
	static #varX = "xxXXXxxxXXXxx";					// Private Static
	var2 = 333;															// Public
	static var3 = 800;											// Statique de classe, pour x raisons....

	//static #modelChat = document.querySelector(".petitChatModel");
	static #monParc1 = document.querySelector(".sec_gauche");
	static #monParc2 = document.querySelector(".sec_droite");

	#me;
	#dom;
	//static colorChat = function() { var chat2 = document.querySelector('.chat2'); chat2.style.filter = "hue-rotate(90deg)"; }

	constructor(a, model) {
		super();
		let self = this;

		this.#me = new objChat(PtitsAnimaux.#monParc1);
		this.#dom = this.#me.domElement; 		// Objet du dom de mon animal instancié
		this.#me.afficheMoi();
		this.#dom.addEventListener("click", function(){
			self.isoleMoi();
		});


		//this.colorChat = function(deg) { var chat2 = document.querySelector('.chat2'); var deg = 120; chat2.style.filter = "hue-rotate("+deg+"deg)"; }
		//this.popChat = function() { var chat2 = document.querySelector('#chat2'); chat2.style.display = "block"; }
		this.baladeAuto = function() {
			//console.log(this.#dom.offsetParent)
			//console.log(this.#dom)
			//choisirDestination(this.#dom.offsetParent, this.#dom);


			/*setInterval(function() {
				var a = (Math.random() * 10 - 5);
				var b = (Math.random() * 10 - 5);
				let cds = self.#dom.getBoundingClientRect();
				let pcds = self.#dom.parentNode.getBoundingClientRect();

				let x = cds.left;
				let y = cds.top;

				let w = pcds.width;
				let h = pcds.height;

				x = (x+a)<0 ? x : (x+a)>w ? w : x+a;
				y = (y+b)<0 ? y : (y+b)>h ? h : y+b;

				self.#dom.style.left = x + "px";
				self.#dom.style.top = y + "px";
				// self.#dom.style.right = +a +"px";
				// self.#dom.style.top = +b +"px";
				// //console.log(this.#dom);
		 	}, 100 );*/
		}
		this.baladeAuto();

		let std = this.tubeAEssai[a][1];

		//console.log("tube : ", this.tubeAEssai[0][1]);
		let _u = 8;
		this.nom = std[0];
		this.coucou = "Miaou"
		setTimeout(function(){ self.coucou = "MIAOUUUUUUU"; }, 30000);
		//this.pv = std[1].pv;
		//console.log(this.maValeur);
		console.log("this :", this);
	}
	isoleMoi() {
		this.#me.deplaceMoi(PtitsAnimaux.#monParc2);
	}
	get maValeur() { return 3*this.#var1; }
	set maValeur(v) { this.#var1 = v*2; }

  autre() {
		console.log("");
	}
}

//var monAnimal1 = new PtitsAnimaux(0);



//var catBulle = document.querySelector('#catBulle');
var catBulle = document.getElementById('catBulle');

console.log(catBulle);
//catBulle.innerHTML = monAnimal1.coucou;


var newChat = document.querySelector('#new');

newChat.addEventListener('click', function(){

	var monAnimal2 = new PtitsAnimaux(1);
	//var monAnimal3 = new PtitsAnimaux(2);
	console.log(monAnimal2);
	//monAnimal2.popChat();
	
	//monAnimal3.colorChat();
	//monAnimal3.popChat();

})

//var chat2 = document.querySelector('.chat2'); chat2.style.filter = "hue-rotate(90deg)";


var sup = document.querySelector(".sec_gauche");

var test = document.querySelector(".minitest");
var curd = document.querySelector("#curseurd");
var cura = document.querySelector("#curseura");
var curf1 = document.querySelector("#curseurf1");
var cur1 = document.querySelector("#curseur1");
var cur2 = document.querySelector("#curseur2");
var boxcurd = document.querySelector("#boxcurd");
var boxcura = document.querySelector("#boxcura");


function getCds( obj ) { return { "x" : obj.offsetLeft, "y" : obj.offsetTop } }
function getSz( obj ) { return { "w" : obj.offsetWidth, "h" : obj.offsetHeight } }
function bz( p0, p1, p2, p3, t) { 
	let p = p0 * Math.pow( 1 - t, 3 ) + 3 * p1 * t * Math.pow( 1 - t, 2 ) + 3 * p2 * Math.pow( t, 2 ) * ( 1 - t ) + p3 * Math.pow( t, 3 );
	return p;
}
function getRandP2( spt, cbl, pA ) {
	let n = new Object();
	n.w = Math.min( pA.x, getSz( spt ).w - pA.x - getSz( cbl ).w ); 
	n.h = Math.min( pA.y, getSz( spt ).h - pA.y - getSz( cbl ).h ); 
	n.p1 = { "x" : pA.x - n.w, "y" : pA.y - n.h }
	n.p2 = { "x" : pA.x + n.w, "y" : pA.y + n.h }
	let p2 = new Object();
	p2.x = Math.random() * 2 * n.w + n.p1.x;
	p2.y = Math.random() * 2 * n.h + n.p1.y;

	//debug
	boxcura.style.left = n.p1.x + "px";
	boxcura.style.top = n.p1.y + "px";
	boxcura.style.width = 2 * n.w + "px";
	boxcura.style.height = 2 * n.h + "px";
	cur2.style.left = p2.x + "px";
	cur2.style.top = p2.y + "px";

	return p2;
}
function getRandPA( spt, cbl ) {
	let minHalfSq = 100;
	let box = new Object();
	let c = getCds( cbl );
	box.e1 = { "x" : c.x - minHalfSq/2, "y" : c.y - minHalfSq/2 }
	box.e2 = { "x" : c.x + minHalfSq/2, "y" : c.y + minHalfSq/2 }
	let r = { "x" : c.x, "y" : c.y }
	while( r.x > box.e1.x && r.x < box.e2.x && r.y > box.e1.y && r.y < box.e2.y ) {
		r.x = Math.random() * ( getSz( spt ).w - getSz( cbl ).w );
		r.y = Math.random() * ( getSz( spt ).h - getSz( cbl ).h );
	}
	// debug
	boxcurd.style.left = box.e1.x + "px";
	boxcurd.style.top = box.e1.y + "px";
	boxcurd.style.width = box.e2.x - box.e1.x + "px";
	boxcurd.style.height = box.e2.y - box.e1.y + "px";
	curd.style.left = c.x + "px";
	curd.style.top = c.y + "px";
	cura.style.left = r.x + "px";
	cura.style.top = r.y + "px";
	return r;
}
function getRandFp1( r, p2 ) {
	let fp1 = new Object();
	fp1.x = 2 * r.x - p2.x;
	fp1.y = 2 * r.y - p2.y;
	// debug
	curf1.style.left = fp1.x + "px";
	curf1.style.top = fp1.y + "px";
	return fp1;
}
function getRandP1( spt, cbl ) {
	let p1 = new Object();
	p1.x = Math.random() * ( getSz( spt ).w - getSz( cbl ).w );
	p1.y = Math.random() * ( getSz( spt ).h - getSz( cbl ).h );
	// debug
	cur1.style.left = p1.x + "px";
	cur1.style.top = p1.y + "px";
	return p1;
}
function choisirDestination( spt, cbl, np1 ) {
	let pD = getCds( cbl );
	let pA = getRandPA( spt, cbl );
	let p2 = getRandP2( spt, cbl, pA );
	let p1 = np1 || getRandP1( spt, cbl );
	let fp1 = getRandFp1( pA, p2 );
	let temps = ( ( Math.random() * 7 + 3 )*1000 )<<0;
	let rafr = 30;
	temps = temps < rafr ? rafr : temps;
	let step = rafr / temps;
	let it = 0;

	let hBcl = setInterval( function() {
		let t = it / temps;
		let cx = bz( pD.x, p1.x, p2.x, pA.x, t);
		let cy = bz( pD.y, p1.y, p2.y, pA.y, t);
		cbl.style.left = cx + "px";
		cbl.style.top = cy + "px";
		it = it + rafr;
		if ( it > temps ) {
			clearInterval( hBcl );
			choisirDestination( spt, cbl, fp1 );
		}
	}, rafr );
}
