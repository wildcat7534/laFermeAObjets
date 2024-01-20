var park1 = document.querySelector(".park1");
var park2 = document.querySelector(".park2");
var porte = document.querySelector('#porte');
var cmd4 = document.querySelector('#command4');
var lastClicked = null;
var lastAnimalClicked = null;
var consoleCMD = document.querySelector(".consoleCMD");
var nomLaboratoire = document.querySelector("#nomLaboratoire");

var myRobs = new ResizeObserver(animalResizeCallback);

function animalResizeCallback(entries) {
	//centries = new Array();
	//entries.forEach(function(entry){centries.push(entry)});
	//centries.forEach(function(entry){
	entries.forEach(function(entry){
		if (entry.contentBoxSize && entry.contentRect.height>0) {
			entry.target.cible.myBalladeur.startBalladeAleatoire();
			myRobs.unobserve(entry.target);
			//entries.splice(entries.indexOf(entry),1);
		}
	})
	//console.log(entries);
}
/*function $(tag) {
	var id = document.querySelector(', tag, ');
	return id
}*/

class taille {

	constructor() {
	}
	getRandomArbitrary( min, max ) {
		return Math.random() * (max - min) + min;
	}
}
class Matricule {

	static random() {
	var seed = Math.random();
	    var x = Math.floor( Math.sin(seed++) * 1000000000000 );
		console.log("seed : ", x);
	    //console.log("random : ", x );
	    //console.log(x - Math.floor(x))
	    return x - Math.floor(x);
	}
}
class PanneauConsole {

	static print(message) {
		consoleCMD.innerHTML += message +"<br>";
		consoleCMD.style.overflow = "auto";
		consoleCMD.scrollTo(0,1000);
	}
}

///////////////////////////// CLASSE SUPERIEUR ( ==Base, Mère )////////////////////////////
class Corpus {
	tabName = { 0: "Craspouille", 1: "Chips", 2: "Ploups", 3: "Sugar", 4: "Brakebein", 5: "Youyou", 6: "Marco",
	7: "Cody", 8: "Volo", 9:"Tedd", 10:"Terminator", 11:"Ziplon", 12:"Flamby", 13:"Gambit", 14:"Orion", 15:"Poulpos", 16:"Zaïa",
	 17:"Kakki", 18:"Klanks", 19:"Hercule", 20:"PoussyCat", 21:"007", 22:"Galactica", 23:"Grunt", 24:"Trinity", 25:"M.Smith", 26:"Goldorak", 27:"Link", 28:"Robert", 
	 29:"Caraj", 30:"Urssaf", 31:"Assedic", 32:"Capsule", 33:"Stephano", 34:"Ursula" };

	#corpusBase;
	choseGénérée;
	#currentPark;
	corpsImg;
	myBalladeur;
	matricule;
	IDName = Math.floor( Math.random() * ( ((33 + 1) - 0) + 0 ) );
	concatString;
	queueImg;
	bulle;
	nomAnimal;
	dead = false;

	constructor( dest ) {
		this.num = Math.floor(Math.random() *2 );
		this.matricule = Matricule.random();

		this.name = this.tabName[this.IDName];
		//console.log( 'IDName : ', Math.random() * ( ((28 + 1) - 0) + 0 ) );
		console.log( 'Nommage : ', this.name, this.IDName );
		( this.IDName < Object.keys(this.tabName).length ) ? this.IDName++ : this.IDName = 0;
		this.#currentPark = dest;
		this.#corpusBase = document.querySelector("template.corpusBase");

		this.choseGénérée = this.#corpusBase.content.firstElementChild.cloneNode(true);

		this.choseGénérée.classList.add('choseGénérée');

		this.corneImg = this.choseGénérée.querySelector('.corneImg');
		this.teteImg = this.choseGénérée.querySelector('.tetesImg');
		this.corpsImg = this.choseGénérée.querySelector('.corpsImg');
		this.queueImg = this.choseGénérée.querySelector('.queueImg');
		this.nomAnimal = this.choseGénérée.querySelector('#nomAnimal');
		this.tombe = this.choseGénérée.querySelector('.tombe');
		this.bulle = document.createElement("img");
		
		this.choseGénérée.cible = this;
		for (let myNode of this.choseGénérée.children){
			myNode.cible = this;
		};

		dest.appendChild(this.choseGénérée);

		let tailleO = new taille();
		let tailleRdn = tailleO.getRandomArbitrary(40, 60);

		this.choseGénérée.style.width = tailleRdn +"px";
		//this.choseGénérée.style.height = tailleRdn +"px";

		this.myBalladeur = new Balladeur( dest, this.choseGénérée );

		myRobs.observe(this.choseGénérée);
		//this.myBalladeur.startBalladeAleatoire();

		//this.myBalladeur.goToPoint();
		/*this.choseGénérée.addEventListener('click', function(e){
			this.selectionner();
			//this.myBalladeur.goToPoint();
			//this.detruire();
			//this.cacher();
		}.bind(this));*/
		porte.setAttribute('src', "images/porteOuverte.png");
		setTimeout(function() {
			porte.setAttribute('src', "images/porteFermée.png");
		}, 1000);
		this.afficheNom();
	}
	detruire() {
		this.#currentPark.removeChild(this.choseGénérée);
	}
	cacher() {
		this.choseGénérée.hidden = true;
	}
	montrer() {
		this.choseGénérée.hidden = false;
	}
	stop() {
		this.myBalladeur.stopBallade();
	}
	redemarrer() {
		this.myBalladeur.startBalladeAleatoire();
	}
	reseter() {
	}
	laserer() {
	}
	parler() {
	}
	seTaire() {
		this.bulle.style.visibility = "collapse";	
	}
	aller() {
	}
	getPosition() {
		let myDomElement = this.choseGénérée;
		return { "x" : myDomElement.offsetLeft, "y" : myDomElement.offsetTop }
	}
	selectionner() {
		console.info("Un animal vient d'être sélectionné !");
		lastClicked = this;
		this.stop();
	}
	unSelected() {
		console.info("Un animal n'est plus séléctionné.");
		this.startBalladeAleatoire();
	}
	tousLesAnimaux() {
		let choses = 
		forEach(function(animal, id ){
			this.#currentPark.removeChild(animal[id]);
		})
	}
	exploser() {
		if (!(this instanceof Chaton)) {
			this.dead = true;
			this.stop();
			this.corpsImg.setAttribute('src', '');
			this.teteImg.setAttribute('src', 'images/blood.gif');
			setTimeout(function(){
			
				this.teteImg.setAttribute('src', '');
				this.seTaire();
				this.choseGénérée.appendChild( this.tombe );
				this.tombe.setAttribute('src', 'images/tombeOmbre.png');

				}.bind(this),300);
		}
		else if (this instanceof Chaton) {
			park2.style.background = "url('images/catFaceAlert.jpg')";
			park2.style.backgroundSize = "cover";
			this.choseGénérée.classList.remove("bordureSelected");
			this.choseGénérée.classList.add("bordureSelectedChat");
			nomLaboratoire.classList.add("alert");
			PanneauConsole.print("LE CHAT EST PROTéGé ! ");
			setTimeout(function(){
				park2.style.background = "";
				this.choseGénérée.classList.remove("bordureSelectedChat");
				nomLaboratoire.classList.remove("alert");
			}.bind( this ), 2000);
		}
		/*detruire();*/
	}
	getNom() {
		PanneauConsole.print( this.name );
	}
	setAjouteNom(nom) {
		Corpus.tabName.push(nom);
	}
	afficheNom() {
			this.nomAnimal.innerHTML = this.name;
			this.nomAnimal.style.visibility = "visible";
	}
}
//////////////////////////////// FIN CLASSE SUPERIEUR ////////////////////////////


////////////////////// Classe : CHATS extends Corpus /////////////////////////////////////////////////
class Chaton extends Corpus{
	myDomElement = this.choseGénérée;

	constructor( dest ) {
		super( dest );
		/*this.choseGénérée.addEventListener('click', function(e){ //pour tester
			let x = e.clientX;
			let y = e.clientY;
			var lastClickedCat = this;
			console.log('lastClickedCat : ', lastClickedCat," x : ", x, " y : ",y );
		});*/
		this.choseGénérée.classList.add('chaton');
		let variante = ['images/chatColor.gif', 'images/chatColorReverse.gif'];
		this.corpsImg.setAttribute('src', variante[this.num]);

		this.corpsImg.style.filter = "saturate(100%)";
		this.corpsImg.style.filter = "hue-rotate(" +(Math.random() * 360) +"deg)";
	}
	parler() {
		this.bulle.style.visibility = "visible";
		this.bulle.classList.add('bulleCat');
		this.bulle.setAttribute('src', 'images/Miaouuu.png');
		this.choseGénérée.appendChild( this.bulle );
	}
	selectionner() {
		this.stop();
		this.parler();
		this.afficheNom();
		this.bulle.classList.add('afficherBulle');
		console.info("Un Chaton vient d'être sélectionné !", this.name); 
		this.concatString = "Chaton " +this.name +" vient d'être sélectionné !";
		PanneauConsole.print(this.concatString);

		lastAnimalClicked = this;
		let myDomElement = this.choseGénérée;
		myDomElement.classList.add('bordureSelected');
	}
	unSelected() {
		setTimeout(function(){
			this.seTaire(); }.bind (this), 2000);
		( !this.dead ) ? this.redemarrer() : this.stop();
		console.info("Un Chaton n'est plus séléctionné !");
		//Panneau("Un Chaton vient n'est plus séléctionné !");
		let myDomElement = this.choseGénérée;
		myDomElement.classList.remove('bordureSelected');
		this.bulle.classList.remove('afficherBulle');
	}
/*	exploser() {
		let myDomElement = this.choseGénérée;
		myDomElement.classList.remove('bordureSelected');
		this.bulle.classList.remove('afficherBulle');
	}*/
}
////////////////////// Fin CHATS /////////////////////////////////////////////////

////////////////////// Classe : CHIEN extends Corpus ////////////////////////////////////////////////
class Chien extends Corpus {

	constructor( dest ) {
		super( dest );

		this.choseGénérée.classList.add('puppy');
		this.corpsImg.setAttribute('src','images/chienColor.gif');
		this.corpsImg.style.filter = "hue-rotate(" +(Math.random() * 360) +"deg)";
		this.ablation();
	}
	parler() {
		this.bulle.classList.add('bulleChien');
		this.bulle.setAttribute('src', 'images/ouafouaf.png');
		this.choseGénérée.appendChild(this.bulle);
		this.bulle.style.visibility = "visible";
	}
	selectionner() {
		this.stop();
		this.parler();
		this.afficheNom();
		this.bulle.classList.add('afficherBulle');
		console.info("Un Chien vient d'être sélectionné !");
		this.concatString = "Chien " +this.name +" vient d'être sélectionné !";
		PanneauConsole.print(this.concatString);
		lastAnimalClicked = this;
		let myDomElement = this.choseGénérée;
		myDomElement.classList.add('bordureSelected');
	}
	unSelected() {
		setTimeout(function(){
			this.seTaire(); }.bind (this), 2000);
		console.info("Un Chien n'est plus séléctionné !");
		//Panneau("Un Chien vient n'est plus séléctionné !");
		let myDomElement = this.choseGénérée;
		myDomElement.classList.remove('bordureSelected');
		( !this.dead ) ? this.redemarrer() : this.stop();
	}
	ablation() {
		this.queueImg.remove();
	}
}
////////////////////// Fin CHIEN ////////////////////////////////////////////////////////

////////////////////// Classe : CAIMEN extends Corpus ///////////////////////////////////
class Caimen extends Corpus {

	constructor( dest ) {
		super( dest );

		this.choseGénérée.classList.add('caimenBB');
		this.teteImg.setAttribute('src','images/caimen/caimenTete.png');
		this.corpsImg.setAttribute('src','images/caimen/caimenCorps.png');
		let variante = ['images/caimen/caimenQueue2.gif', 'images/caimen/caimenQueue2Faster.gif'];
		this.queueImg.setAttribute('src',variante[this.num]);
		
		let deg = Math.random() * 360;
		this.corpsImg.style.filter = "hue-rotate(" +deg +"deg)"; 
		this.teteImg.style.filter = "hue-rotate(" +deg +"deg)"; 
		this.queueImg.style.filter = "hue-rotate(" +deg +"deg)";
	}
	parler () {
		this.choseGénérée.appendChild(this.bulle);
	}
	selectionner() {
		this.stop();
		this.bulle.classList.add('afficherBulle');
		console.info("Un Caimen vient d'être sélectionné !");
		this.concatString = "Caimen " +this.name +" vient d'être sélectionné !";
		PanneauConsole.print(this.concatString);
		lastAnimalClicked = this;
		let myDomElement = this.choseGénérée;
		myDomElement.classList.add('bordureSelected');
	}
	unSelected() {

		this.redemarrer();
		console.info("Un Caimen n'est plus séléctionné !");
		//Panneau("Un Caimen vient n'est plus séléctionné !");
		let myDomElement = this.choseGénérée;
		myDomElement.classList.remove('bordureSelected');
		( !this.dead ) ? this.redemarrer() : this.stop();

	}
}
////////////////////// Fin CAIMEN ///////////////////////////////////////////////////

///////////////////PANNEAU DE COMMANDE////////////////////////////////////////////

var iDeg = 0;
var voyantsG = document.querySelectorAll("#cmd_gauche div figure img");
var voyantsD = document.querySelectorAll("#cmd_droite div figure img");
var voyants = Array.prototype.concat( voyantsD, voyantsG );

function marioKartColor(){

		let rand = Math.floor(Math.random()*voyants[0].length);
		iDeg = (iDeg+rand*rand*rand)%360;

		voyants.forEach(function() {
			
			voyants[0][rand].style.filter = "hue-rotate(" + iDeg +"deg)";
			voyants[1][rand].style.filter = "hue-rotate(" + iDeg +"deg)";
		});
		let goMarioKartColor = setTimeout(marioKartColor, 100);
};

////////////////////// LEVIERS /////////////////////////////////////////////////
						////LEVIER////////
var génome = document.querySelector("select");
var superlevier = document.querySelector(".superlevier");
var superlevier10 = document.querySelector(".superlevier10");
//var lavalue =  génome.value;
//console.log(lavalue);
function createAnimalChoix( myName, myClass ) {
	let myOpt = document.createElement( "option" );
	myOpt.value = myName.toLowerCase();
	myOpt.myName = myName;
	myOpt.innerHTML = myName;
	myOpt.myClass = myClass;
	génome.appendChild( myOpt );
}

createAnimalChoix("Kitty", Chaton);
createAnimalChoix("Puppy", Chien);
createAnimalChoix("CaimenBB", Caimen);

superlevier.addEventListener('click', function() {
	//console.log("selected :", génome.selectedOptions);
	// Array.prototype.slice.call(génome.selectedOptions).forEach(function(opt){
	// 	console.log("option :", opt);
	// });
	for( let opt of génome.selectedOptions ) {
		//console.log( "option :", opt, opt.myClass );
		if (opt.myClass) { 
			//console.log("Création demandée !", opt.myName );
			new opt.myClass( park1 );

			this.setAttribute('src','images/levierBas.png');

			setTimeout(function(){
					superlevier.setAttribute('src', 'images/levierHaut.png');
			}, 500);
		}
	}
});
superlevier10.addEventListener('click', function() {
	//console.log("selected :", génome.selectedOptions);
	// Array.prototype.slice.call(génome.selectedOptions).forEach(function(opt){
	// 	console.log("option :", opt);
	// });
	for( let opt of génome.selectedOptions ) {
		//console.log( "option :", opt, opt.myClass );
		if (opt.myClass) {
			//console.log("Création demandée !", opt.myName );
			for(let i = 0; i < 10; i++) {
				new opt.myClass( park1 );
			}

			this.setAttribute('src','images/levierBas.png');
			PanneauConsole.print('Nombre dans le park1 : ' + park1.children.length);

			setTimeout(function(){
					superlevier10.setAttribute('src', 'images/levierHaut.png');
			}, 500);
		}
	}
});
						////LEVIER LASER////////
var levierLaser = document.querySelector('.levierLaser');
var shot = document.querySelector('#beam');

levierLaser.addEventListener( 'click', function() {

	this.setAttribute('src','images/levierBas.png');
	shot.style.animationName = "shot";

	setTimeout(function(){
		levierLaser.setAttribute('src', 'images/levierHaut.png');
		shot.style.animationName = "";
	},1000);
});

class Laser{

	static laser(){
		shot.style.animationName = "shot";

		setTimeout(function(){
			shot.style.animationName = "";
		},1000);
	}
}

						////FIN LEVIER LASER////////

///////////////////PANNEAU DE COMMANDE FIN////////////////////////////////////////

////////////////////// ParK //////////////////////////////////////////////////


class Park {
	mesAnimaux = new Array();
	constructor() {
	}
	compterAnimaux() {
	}
	fermerLePark() {
	}
	detruirePark() {
	}
	static whereIsMyAnimal( animal ) {
		animal.style.border = "solid 4px indianred";
	}
}
var contextPark1 = document.querySelector('.contextPark1');
park1.addEventListener("click", function(e) {
	//PanneauConsole.print("click park");
	//console.log("X : ",e.clientX, "Y : ", e.clientY);
	let target = e.target;
	if (target.cible) {
		let cible = target.cible;
		if (cible instanceof Corpus) { 
				console.log("AnimalClicked = cible");
				infoContext(e);
				animalClicked = cible;

			if(lastAnimalClicked != animalClicked && lastAnimalClicked != null) {

				lastAnimalClicked.unSelected(); //doit pas etre égal à null
				lastAnimalClicked = animalClicked;
				animalClicked.selectionner();
				//console.log("lastAnimalClicked = animalClicked, lastAnimalClicked.unSelected(), animalClicked.selectionner() ");
			}else{
				console.log("doit lastAnimalClicked unSelected(), animalClicked.selectionner");
				animalClicked.selectionner();

			}
		 }
	}
	/*if (lastClicked && lastClicked instanceof Corpus) {
		//console.log('detail : ', event.detail)
		lastClicked.myBalladeur.goToPoint(e.clientX, e.clientY);
		console.log("X : ",e.clientX, "Y : ", e.clientY);
		lastClicked = null;
	}*/
}, true);

var cible;
var pince = document.querySelector('#pince');

park1.addEventListener( 'contextmenu', function(e) {

	e.preventDefault();

	let target = e.target;

	if(target.cible){

		cible = target.cible;
		cible.afficheNom();
		cible.stop();

		cmd4.innerHTML += cible.name +"<br>";

		let position = cible.getPosition();
		let x = position.x;
		let y = position.y;

		pince.style.left = x +"px";

		contextPark1.style.visibility = "visible";
		setTimeout( function() {
			contextPark1.style.visibility = "hidden";
		}, 4000);
		contextPark1.style.left = x+50  +"px";
		contextPark1.style.top = y +"px";

		let listes = document.querySelectorAll( '.contextPark1 ul li' );
		listes.forEach( function( liste, id, listes ) {

			listes[0].innerHTML = "Effacer";
			listes[1].innerHTML = "Cacher";
			listes[2].innerHTML = "Montrer";
			listes[3].innerHTML = "Lasérifier";
			listes[4].innerHTML = "Stop";

			listes[0].addEventListener('click', function(){
				cible.detruire();
			});
			listes[1].addEventListener('click', function(){
				cible.cacher();
			});
			listes[2].addEventListener('click', function(){
				cible.montrer();
			});
			listes[3].addEventListener('click', function(){
				Laser.laser();
				cible.exploser();
			});
			listes[4].addEventListener('click', function(){
				cible.stop();
			});
		});
	}
});

////////////////////// ParK FIN//////////////////////////////////////////////////


///////////////////////// MAIN ///////////////////////////////////////////////

marioKartColor();


///////////////////////// FIN MAIN ///////////////////////////////////////////////


function infoContext(e) {


	let target = e.target;

	if(target.cible) {

		cible = target.cible;

		let position = cible.getPosition();
		let x = position.x;
		let y = position.y;

		pince.style.left = x +"px";

		contextPark1.style.visibility = "visible";
		setTimeout( function(){
			contextPark1.style.visibility = "hidden";
		}, 4000);
		contextPark1.style.left = x+50  +"px";
		contextPark1.style.top = y +"px";

		let listes = document.querySelectorAll( '.contextPark1 ul li' );
		listes.forEach( function( liste, id, listes ) {

			listes[0].innerHTML = "Effacer";
			listes[1].innerHTML = "Cacher";
			listes[2].innerHTML = "Montrer";
			listes[3].innerHTML = "Lasérifier";
			listes[4].innerHTML = "Stop";

			listes[0].addEventListener('click', function(){
				cible.detruire();
			});
			listes[1].addEventListener('click', function(){
				cible.cacher();
			});
			listes[2].addEventListener('click', function(){
				cible.montrer();
			});
			listes[3].addEventListener('click', function(){
				Laser.laser();
				cible.exploser();
			});
			listes[4].addEventListener('click', function(){
				cible.stop();
			});
		});
	}
}




