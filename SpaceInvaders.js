class Juego{
    creaCont(){
        let div=document.getElementById("contenedor");
        let cont=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        cont.setAttribute("id","cont");
        div.appendChild(cont);
    }
    mover(event){

    }
    disparar(){

    }
    movMarcia(){
    }
}


class Disparo{
    constructor(x ,y,id){
        this.x = x;
        this.y = y;
        this.color = color;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById("caja").appendChild(this.tag);
    }

    moverArriba(){
        if(this.y > 0){
            this.y = this.y - 5;
        }
    }
    pintar(){
        this.tag.setAttribute("y", this.y);
    }
}


class Nave{
    constructor(x, y,alto,ancho,velx,id){
        this.x=x;
        this.y=y;
        this.alto=alto;
        this.ancho=ancho;
        this.velx=velx;
        this.nave=document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.nave.setAttribute("x",this.x);
        this.nave.setAttribute("y",this.y);  
        this.nave.setAttribute("id",this.id);
        this.nave.setAttribute("width",this.ancho);
        this.nave.setAttribute("height",this.alto);
        document.getElementById(id).appendChild(this.nave);
    }
    mover(){
        if(this.x+this.velx<0 || this.x+this.velx+this.ancho>document.getElementById(id).getAttribute("height")){
            this.velx *= -1;
        }
        this.x+=this.velx;
    }
}


var juego=new Juego();
juego.creaCont();