function Main(nb_carte,deck){
	this.tabCarte = [];
	
	for(var i=0 ; i < nb_carte ; i++)
	{
		this.tirerCarte(deck);
	}

	this.joueur = 0;
}

Main.prototype.tirerCarte = function(deck){
	if(deck.tabCarte[0]){
		var carte = new Carte(deck.tabCarte[0]);
		this.tabCarte.push(carte);
		deck.tabCarte.shift();
	}
	else alert("Plus de carte dans le deck");
}

Main.prototype.afficher = function(context,x,y,width){
	context.fillStyle = 'rgb(125, 218, 90)';
	context.fillRect(x,y,width,100);

	for (var i = this.tabCarte.length-1 ; i >=0 ; i--) {
		context.drawImage(img_carte,0,0,img_carte.width,img_carte.height,x + width*(i / this.tabCarte.length),y,img_carte.width,img_carte.height);
		context.drawImage(this.tabCarte[i].image,0,0,this.tabCarte[i].image.width,this.tabCarte[i].image.height,x + width*(i / this.tabCarte.length)+10,y+20,this.tabCarte[i].image.width,this.tabCarte[i].image.height);
		context.fillStyle = 'green';

		context.font="10px Georgia";
		context.fillText(this.tabCarte[i].pointAction + " PA",x + width*(i / this.tabCarte.length)+30,y+15,this.tabCarte[i].image.width,this.tabCarte[i].image.height);
		context.fillText(this.tabCarte[i].monstre.vie + " PV",x + width*(i / this.tabCarte.length)+30,y+60,this.tabCarte[i].image.width,this.tabCarte[i].image.height);
		context.fillText(this.tabCarte[i].monstre.attaque + "Att",x + width*(i / this.tabCarte.length)+30,y+70,this.tabCarte[i].image.width,this.tabCarte[i].image.height);
		context.fillText(this.tabCarte[i].monstre.range + "rge",x + width*(i / this.tabCarte.length)+20,y+80,this.tabCarte[i].image.width,this.tabCarte[i].image.height);
	}
}