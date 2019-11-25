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
    constructor(){
        this.x=;
        this.y=;
    }
}


var juego=new Juego();
juego.creaCont();