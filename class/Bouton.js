function Bouton(x,y,ID,pa){
	this.ID = ID;

	this.image= new Image();
	this.image.src = "./sprite/bouton/" + ID + ".png"; 

	this.x = x;
	this.y = y;

	this.pointAction = pa;
}

Bouton.prototype.afficher = function(context){
	context.drawImage(this.image,0,0,this.image.width,this.image.height,this.x,this.y,this.image.width,this.image.height);
}

Bouton.prototype.test = function(joueur,x,y){
	if(x>=this.x && x < this.x + this.image.width )
		if(y>this.y && y < this.y + this.image.height )
			this.utiliser(joueur);
}

Bouton.prototype.utiliser=function(joueur){
	if(joueur.pointAction>=this.pointAction){
		if(this.ID = "pioche")joueur.main.tirerCarte(joueur.deck);


		joueur.pointAction -= this.pointAction;
	}
}