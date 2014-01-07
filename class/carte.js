function Carte(nom) {


	// Création de l'objet XmlHttpRequest
	var xhrCarte = getXMLHttpRequest();

	// Chargement du fichier
	xhrCarte.open("GET", './carte/' + nom + '.json', false);
	xhrCarte.send(null);
	if(xhrCarte.readyState != 4 || (xhrCarte.status != 200 && xhrCarte.status != 0)) // Code == 0 en local
	throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhrCarte.status + ").");
	var carteJsonData = xhrCarte.responseText;
	
	var carteData = JSON.parse(carteJsonData);

	this.image = new Image();

	this.image.src = "./sprite/carte/" +nom + ".png";

	this.type = carteData.type;

	this.pointAction = carteData.pointAction;

	if(this.type == "M")
	{
		this.monstre = new Monstre(carteData.typeMonstre,carteData.vieMonstre,carteData.attaqueMonstre,nom,carteData.vitesse,carteData.range,carteData.vitesseAction);
	}
}

Carte.prototype.jouer = function(lieu,x,y,joueur){
	if(joueur.pointAction>=this.pointAction){
		if(this.type == "M")lieu.ajoutMonstre(this.monstre,x,y,joueur.ID);
		
		joueur.pointAction -= this.pointAction;
		joueur.main.tabCarte.shift();
	}
}

Carte.prototype.test = function(lieu,x,y,joueur){
	
	if(this.type == "M"&& y <= 3){
		if(this.monstre.type == "A"){
			if(x == 1 && joueur.ID ==1 )this.jouer(lieu,x,y,joueur);
			if(x == 13 && joueur.ID ==2 )this.jouer(lieu,x,y,joueur);
		}
		else if(this.monstre.type == "D"){
			if(x == 0 && joueur.ID ==1 )this.jouer(lieu,x,y,joueur);
			if(x == 14 && joueur.ID ==2 )this.jouer(lieu,x,y,joueur);
		}
	}
}