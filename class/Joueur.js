function Joueur(nom,deck){
	this.nom = nom;
	this.vie = 20;
	this.pointAction = 0;
	this.pointActionMax = 1;
	this.deck = deck;
	this.deck.melanger();
	this.main = new Main(3,deck);

	this.ID = 1;
	
	this.niv = 1;
	this.exp = 0;
}

Joueur.prototype.afficherCara = function(context,width,x,y){
	context.fillStyle = 'rgb(19, 22, 18)';
	
	context.fillRect(x,y,width,20);

	context.fillStyle = 'green';

	context.font="15px Georgia";
	context.fillText(this.vie + " points de vie.  " + this.pointAction +"/"+this.pointActionMax +"PA   Niv:" + this.niv + "   Exp : "+ this.exp + "/" + this.besoinXP(),x,y+15);
}

Joueur.prototype.ajoutPoint = function(){
	if(this.pointAction < this.pointActionMax)this.pointAction++;
}

Joueur.prototype.gagnerXP = function(nb_XP){
	this.exp+=nb_XP;
	if(this.exp>=this.besoinXP()){
		this.niv++;
		this.exp = 0;
		this.pointActionMax ++;
	}
}

Joueur.prototype.besoinXP = function(){
	return Math.round(15*this.niv);
}