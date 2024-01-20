
class Balladeur{
	#spt;
	#cbl;
	#hBallade;

	/**
	*
	* @param {HTMLDivElement} spt : Parc support
	* @param {HTMLDivElement} cbl : Chose générée (complet)
	*
	*/
	constructor(spt, cbl){
		this.#spt = spt;
		this.#cbl = cbl;
	}

	#getCds( obj ) { return { "x" : obj.offsetLeft, "y" : obj.offsetTop } }
	//#getSz( obj ) { return { "w" : obj.offsetWidth, "h" : obj.offsetHeight } }
	#getSz( obj ) { 
		let s = obj.getBoundingClientRect();
		//console.log("height", s.height)
		return { "w" : s.width, "h" : s.height } 
	}
	#bz( p0, p1, p2, p3, t) { 
		let p = p0 * Math.pow( 1 - t, 3 ) + 3 * p1 * t * Math.pow( 1 - t, 2 ) + 3 * p2 * Math.pow( t, 2 ) * ( 1 - t ) + p3 * Math.pow( t, 3 );
		return p;
	}
	#getRandP2( pA ) {
		let n = new Object();
		n.w = Math.min( pA.x, this.#getSz( this.#spt ).w - pA.x - this.#getSz( this.#cbl ).w ); 
		n.h = Math.min( pA.y, this.#getSz( this.#spt ).h - pA.y - this.#getSz( this.#cbl ).h ); 
		n.p1 = { "x" : pA.x - n.w, "y" : pA.y - n.h }
		n.p2 = { "x" : pA.x + n.w, "y" : pA.y + n.h }
		let p2 = new Object();
		p2.x = Math.random() * 2 * n.w + n.p1.x;
		p2.y = Math.random() * 2 * n.h + n.p1.y;
		return p2;
	}
	#getRandPA() {
		let minHalfSq = 100;
		let box = new Object();
		let c = this.#getCds( this.#cbl );
		box.e1 = { "x" : c.x - minHalfSq/2, "y" : c.y - minHalfSq/2 }
		box.e2 = { "x" : c.x + minHalfSq/2, "y" : c.y + minHalfSq/2 }
		// Coordonnée haut/droite
		//box.e1 = { "x" : c.x - minHalfSq/2, "y" : c.y - minHalfSq/2 }
		// Coordonnée bas/gauche
		//box.e2 = { "x" : c.x + minHalfSq/2- this.#getSz( this.#cbl ).w , "y" : c.y + minHalfSq/2 - this.#getSz( this.#cbl ).h  }
		let r = { "x" : c.x, "y" : c.y }
		while( r.x > box.e1.x && r.x < box.e2.x && r.y > box.e1.y && r.y < box.e2.y ) {
			r.x = Math.random() * ( this.#getSz( this.#spt ).w - this.#getSz( this.#cbl ).w );
			r.y = Math.random() * ( this.#getSz( this.#spt ).h - this.#getSz( this.#cbl ).h );
			//r.x = Math.random() * this.#getSz( this.#spt ).w;
			//r.y = Math.random() * this.#getSz( this.#spt ).h;
		}
		return r;
	}
	#getRandFp1( r, p2 ) {
		let fp1 = new Object();
		fp1.x = 2 * r.x - p2.x;
		fp1.y = 2 * r.y - p2.y;
		return fp1;
	}
	#getRandP1() {
		let p1 = new Object();
		p1.x = Math.random() * ( this.#getSz( this.#spt ).w - this.#getSz( this.#cbl ).w );
		p1.y = Math.random() * ( this.#getSz( this.#spt ).h - this.#getSz( this.#cbl ).h );
		return p1;
	}
	// this.spt : support; this.cbl: cible; np1: ;    [MANUEL]
	#choisirDestination( np1 ) {
		let pD = this.#getCds( this.#cbl );
		let pA = this.#getRandPA();
		let p2 = this.#getRandP2( pA );
		let p1 = np1 || this.#getRandP1();
		let fp1 = this.#getRandFp1( pA, p2 );
		let temps = ( ( Math.random() * 7 + 3 )*1000 )<<0;
		let rafraichissement = 30;
		temps = temps < rafraichissement ? rafraichissement : temps;
		let step = rafraichissement / temps;
		let it = 0;
		this.#hBallade = setInterval( function() {
			let t = it / temps;
			let cx = this.#bz( pD.x, p1.x, p2.x, pA.x, t);
			let cy = this.#bz( pD.y, p1.y, p2.y, pA.y, t);
			this.#cbl.style.left = cx + "px";
			this.#cbl.style.top = cy + "px";
			it = it + rafraichissement;
			if ( it > temps ) {
				clearInterval( this.#hBallade );
				this.#hBallade = null;
				this.#choisirDestination( fp1 );
			}
		}.bind( this ), rafraichissement );
	}

	startBalladeAleatoire() {
		this.stopBallade();
		this.#choisirDestination( null );
	}

	/*goToPoint(x, y) {
		this.stopBallade(); //Shrodinger's effect à commenter
		let pD = this.#getCds( this.#cbl );
		let pA = { "x": x, "y": y};
		let p2 = { "x": pA.x, "y": pA.y};
		let p1 = { "x": pD.x, "y": pD.y};
		let temps = ( ( Math.random() * 7 + 3 )*1000 )<<0;
		let rafraichissement = 30;
		temps = temps < rafraichissement ? rafraichissement : temps;
		let step = rafraichissement / temps;
		let it = 0;
		this.#hBallade = setInterval( function() {
			let t = it / temps;
			let cx = this.#bz( pD.x, p1.x, p2.x, pA.x, t);
			let cy = this.#bz( pD.y, p1.y, p2.y, pA.y, t);
			this.#cbl.style.left = cx + "px";
			this.#cbl.style.top = cy + "px";
			it = it + rafraichissement;
			if ( it > temps ) {
				clearInterval( this.#hBallade );
				this.#hBallade = null;
			}
		}.bind( this ), rafraichissement );	}*/

	stopBallade() {
			if( this.#hBallade ){
				clearInterval( this.#hBallade );
				this.#hBallade = null;
			}
	}
	pauseBallade() {

	}
	repriseBallade() {
		
	}
}