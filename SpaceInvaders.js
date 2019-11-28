class Juego{
    constructor(id,alto,ancho){
        this.id = id;
        this.altoJuego = alto;
        this.anchoJuego = ancho;
        this.contJuego = document.createElement("svg");
        this.contJuego.style.height = this.altoJuego;
        this.contJuego.style.width = this.ancho;
        document.getElementById(id).appendChild(this.contJuego); 
    }
    
    start(){

        // this.enemigos = [new enemigo(5,5,10,20,"black",this.id)]
    
        setInterval( () => {
            
        }, 1);
    }

    disparar(){

    }
    movMarcia(){

    }
}

class enemigos{
    constructor(x ,y ,alt ,ach ,color,id){
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alt;
        this.ancho = ach;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById(id).appendChild(this.tag);
    }

}

class Disparo{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
}

var juego = new Juego("juego", 100, 100);