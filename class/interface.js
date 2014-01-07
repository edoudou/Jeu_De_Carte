function Interface(){
	this.tabBouton = [];
	this.tabBouton.push(new Bouton(460,208,"pioche",1));
}

Interface.prototype.afficher = function(context) {
	for (var i = 0; i < this.tabBouton.length; i++) {
		this.tabBouton[i].afficher(context);
	}
}

Interface.prototype.tester =function(joueur,x,y){
	
	for (var i = 0; i < this.tabBouton.length; i++) {
		this.tabBouton[i].test(joueur,x,y);
	}
}