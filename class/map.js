function Map(nom) {
	
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();

	// Chargement du fichier
	xhr.open("GET", './maps/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
	throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	var mapData = JSON.parse(mapJsonData);
	
	this.tileset = new Tileset(mapData.tileset);
	this.terrain = mapData.terrain;

	this.tabMonstre = [];
}

Map.prototype.getHauteur = function() {
	return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}

Map.prototype.testTiles = function(x,y,type,joueur) {
	if  ( (joueur == 1 && type == "D" && x == 0)
			||(joueur == 1 && type == "A" && x == 1)
			||(joueur == 2 && type == "A" && x == this.getLargeur() - 2)
			||(joueur == 2 && type == "D" && x == this.getLargeur() - 1))
		return true;
	else return false;
}

Map.prototype.montrerTiles = function(context,color,type , joueur) {
	context.strokeStyle = color;

	for (var i = 0 ; i < this.getHauteur() ; i ++)
		for(var j = 0; j < this.getLargeur() ; j++)
					if  (this.testTiles(j,i,type,joueur)){

						context.strokeRect(j * tailleTile, i *tailleTile , tailleTile,  tailleTile);
					}
}

Map.prototype.ajoutMonstre = function(monstre,X,Y,joueur){
	monstre.x = X;
	monstre.y = Y;
	monstre.joueur = joueur;
	
	this.tabMonstre.unshift(monstre);
}

Map.prototype.afficherMonstre = function(context) {
	if(this.tabMonstre){
		for(var  i = 0; i < this.tabMonstre.length;i++){
			if(!this.tabMonstre[i].mort){
				if (this.tabMonstre[i].joueur == 1)context.drawImage(this.tabMonstre[i].sprite,(this.tabMonstre[i].positionX+1)*tailleTile,this.tabMonstre[i].positionY*tailleTile,-tailleTile,tailleTile,this.tabMonstre[i].x*tailleTile,(this.tabMonstre[i].y*tailleTile)-16,tailleTile,tailleTile);
				else context.drawImage(this.tabMonstre[i].sprite,this.tabMonstre[i].positionX*tailleTile,this.tabMonstre[i].positionY*tailleTile,tailleTile,tailleTile,this.tabMonstre[i].x*tailleTile,(this.tabMonstre[i].y*tailleTile)-16,tailleTile,tailleTile);
				this.tabMonstre[i].afficherVie(context);
			}
		}
	}

}

Map.prototype.actuTabMonstre = function(context) {
	for(var  j = 0; j < this.tabMonstre.length ; j++){
		this.tabMonstre[j].actuMonstre(this,context);
	}
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * tailleTile;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * tailleTile, y);
		}
	}
	this.afficherMonstre(context);
	this.actuTabMonstre(context);
}

Map.prototype.deleteMonstre = function(element) {
	var index = this.tabMonstre.indexOf(element);
	if(index >= 0)
		this.tabMonstre.splice(index,1);
}