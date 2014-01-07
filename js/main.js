var plateau = new Map("test");
var J1 = new Joueur("Ed",new Deck("test"));
var menu = new Interface();

var img_mort = new Image();
img_mort.src = "./sprite/monstre/mort.png";
var img_carte = new Image();
img_carte.src = "./sprite/carte/base.png";

var tailleTile = 32;

var canvas = document.getElementById('canvas');
    var gui = canvas.getContext('2d');
    canvas.addEventListener("mousedown", getPosition, false);

window.onload = function()
{
    

    
	canvas.width  = plateau.getLargeur()*tailleTile;
    canvas.height = (plateau.getHauteur()*tailleTile) + 100;

	setInterval(function(){plateau.dessinerMap(gui);},40);
	setInterval(function(){J1.main.afficher(gui,0,(plateau.getHauteur()*tailleTile),plateau.getLargeur()*tailleTile);},40);
	setInterval(function(){J1.afficherCara(gui,canvas.width,0,canvas.height - 20);},40);

	setInterval(function(){menu.afficher(gui);},40);
	setInterval(function(){J1.ajoutPoint();},5000);
	setInterval(function(){J1.gagnerXP(1);},5000);
}

function getPosition(event)
{
	var x = event.x;
	var y = event.y;

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	menu.tester(J1,x,y);
	if(J1.main.tabCarte[0])J1.main.tabCarte[0].test(plateau,Math.round(x/tailleTile),Math.round(y/tailleTile),J1);
}