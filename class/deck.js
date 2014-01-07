function Deck(nom){


	// Création de l'objet XmlHttpRequest
	var xhrDeck = getXMLHttpRequest();

	// Chargement du fichier
	xhrDeck.open("GET", './deck/' + nom + '.json', false);
	xhrDeck.send(null);
	if(xhrDeck.readyState != 4 || (xhrDeck.status != 200 && xhrDeck.status != 0)) // Code == 0 en local
	throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhrDeck.status + ").");
	var deckJsonData = xhrDeck.responseText;
	
	var deckData = JSON.parse(deckJsonData);

	this.tabCarte = deckData.carte;

}

Deck.prototype.melanger = function(){
	var nouvTabCarte = [];

	for(var i = this.tabCarte.length; i >0 ; i --)
	{
		var index = Math.floor(Math.random()*i);
		nouvTabCarte.unshift(this.tabCarte[index]);
		this.tabCarte.splice(index,1);
	}
	this.tabCarte=nouvTabCarte;
}