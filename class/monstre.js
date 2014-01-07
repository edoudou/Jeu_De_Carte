function Monstre(type,vie,attaque,nom,vitesse,range,vitesseAction){
	this.nom = nom;

	this.type = type ; 

	this.vieMax = this.vie = vie;
	this.attaque = attaque;

	this.sprite = new Image();
	this.sprite.src = "./sprite/monstre/" + nom + ".png";

	this.x = 0.0;
	this.y = 0.0;

	this.joueur=0;

	this.positionX = 0;
	this.positionY = 0;

	this.vitesse = vitesse;

	this.range = range;

	this.tmp=0;
	this.tmpX=0;
	this.tmpY=0;
	
	this.vitesseAction = vitesseAction;

	this.mort = 0;
}

Monstre.prototype.Attaque = function(lieu){
	
	if(this.joueur==1){
		for(var i=0; i < lieu.tabMonstre.length; i ++){
			
			if(lieu.tabMonstre[i].joueur==2){
				if(((this.x+this.range) >= lieu.tabMonstre[i].x )&&(this.y==lieu.tabMonstre[i].y)&&!lieu.tabMonstre[i].mort){
					lieu.tabMonstre[i].vie-=this.attaque;
					this.tmp = this.vitesseAction;
					this.positionY=1;
					return true;
				}
			}
		}
	}
	else{
		for(var i=0; i < lieu.tabMonstre.length; i ++)
			if(lieu.tabMonstre[i].joueur==1){
				if(((this.x-this.range) <= lieu.tabMonstre[i].x )&&(this.y==lieu.tabMonstre[i].y)&&!lieu.tabMonstre[i].mort){
					lieu.tabMonstre[i].vie-=this.attaque;
					this.tmp = this.vitesseAction;
					this.positionY=1;
					return true;
				}
			}
	}
	return false;
}

Monstre.prototype.deplacement = function(){
	if(this.joueur == 1)this.x += this.vitesse;
	else this.x -= this.vitesse;
}

Monstre.prototype.actuMonstre = function(lieu,context){
	
	if(!this.mort){
		this.testAttaqueHero();
		this.actuAction();
		if(this.tmp <= 0){
			if(!this.Attaque(lieu)){
				this.actuPosition();
				this.deplacement();
			}
		}
		else this.tmp--;
	}
	this.testMort(lieu,context);
}

Monstre.prototype.mourir = function (lieu,context){
	if(this.mort<25){
		this.mort++;
		context.drawImage(img_mort,Math.floor(this.mort/5)*tailleTile,0,tailleTile,tailleTile,this.x * tailleTile,this.y * tailleTile - 16,tailleTile,tailleTile);
	}
	else lieu.deleteMonstre(this);
}

Monstre.prototype.testMort = function (lieu,context){
	if(this.vie<=0)this.mourir(lieu,context);
}

Monstre.prototype.afficherVie = function (context){
	if(this.vie!=this.vieMax){
		context.strokeStyle = 'black';
		context.fillStyle = 'green';

		context.strokeRect(this.x * tailleTile,this.y * tailleTile +16 , tailleTile , 4);
		context.fillRect(this.x * tailleTile,this.y * tailleTile +16 , (this.vie / this.vieMax) *tailleTile , 4);
	}
}

Monstre.prototype.actuPosition = function (){
	if(!this.tmpX){
		this.positionX++;
		if(this.positionX >= (this.sprite.width/tailleTile)) this.positionX=0;
		this.tmpX = 3;
	}
	else
	{
		this.tmpX --;
	}
}

Monstre.prototype.actuAction = function (){
	if(!this.tmpY){
		if(this.positionY != 0)this.positionY++;
		if(this.positionY >= (this.sprite.height/tailleTile))this.positionY=0;
		this.tmpY = this.vitesseAction/(this.sprite.height/tailleTile);
	}
	else
	{
		this.tmpY --;
	}
}

Monstre.prototype.testAttaqueHero = function(){
	if(this.joueur == 1){
		if(this.x >= 14){
			this.vie=0;
		}
	}
	else 
		if(this.x <=0){
			this.vie=0;
		}
}