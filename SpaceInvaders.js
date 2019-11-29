class Juego{
    constructor(id,alto,ancho){
        this.id = id;
        this.altoJuego = alto;
        this.anchoJuego = ancho;
        this.direccion = true;
        this.col = 4;
        this.fil = 3;
        this.svgid = "svgid";
        this.contJuego = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.contJuego.setAttribute("height", this.altoJuego);
        this.contJuego.setAttribute("width", this.anchoJuego);
        this.contJuego.style.border= "1px solid black";
        this.contJuego.id = this.svgid;
        document.getElementById(id).appendChild(this.contJuego); 
    }
    
    start(){
        // Establecemos los enemigos en la pantalla.
        this.enemy = this.posIniEne(this.fil, this.col);
        
        setInterval( () => {
            this.movEnemigos();
        }, 10);
    }

    /**
     *  Posicionamiento inicial de los enemigos en la pantalla
     * 
     * @param {Filas de enemigos} fil 
     * @param {Columnas de enemigos} col 
     * @returns {Array de todos los enemigos} enemigos
     */
    posIniEne(fil,col){
        var enemigos2 = Array();
        var posx = 5; 
        var posy = 5;
        var alto = 20;
        var ancho = 40; 
        
        for (let i=0; i<fil; i++){                                                              // Recorremos todas la fila de enemigos a dibujar.
            posx = 5;                                                                           // Inicalizamos la posicion de la x.
            for (let j=0; j<col; j++){                                                          // Recorremos todas la columnas de enemigos a dibujar.
                enemigos2.push(new enemigos(posx, posy, alto, ancho, "black", 3,this.svgid));   // Metemos un enemigo con las coordenadas y dimensiones expuestas.
                posx += (ancho + 5);                                                            // Cambiamos el punto x del rectangulo.
            }
            posy += (alto + 5) ;
        }

        return enemigos2;
    }

    // Mover Enemigos.
    movEnemigos(){
        this.izquierda = this.enemy[0].x;                                        //Punto x izquierda del cuadro gerenal de enemigos
        this.derecha = this.enemy[this.col-1].x+this.enemy[this.col-1].ancho;    //Punto x derecha del cuadro gerenal de enemigos

        //Cambia la direccion hacia la derecha.
        if ((this.izquierda + this.enemy[0].velx < 0)){
            this.direccion = true;
            for (let enemigo of this.enemy){
                enemigo.movAbajo();
            }
        }

        //Cambia la direccion hacia la izquierda.
        if ((this.derecha + this.enemy[0].velx > this.anchoJuego)){
            this.direccion = false;
            for (let enemigo of this.enemy){
                enemigo.movAbajo();
            }
        }

        // Movemos las naves segun la velocidad establecida.
        if (this.direccion){
            for (let enemigo of this.enemy){
                enemigo.movDerecha();
            }
        }else{
            for (let enemigo of this.enemy){
                enemigo.movIzquierda();
            }
        }

        // Pintar los enemigos por la pantalla.
        for (let enemigo of this.enemy){
            enemigo.pintar();
        }
    }
}

class enemigos{
    constructor(x ,y ,alt ,ach ,color, velx, id){
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alt;
        this.ancho = ach;
        this.velx = velx;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById(id).appendChild(this.tag);
    }
    
    // Movimiento de la nave.
    // Movimiento a la derecha de la nave
    movDerecha(){
        this.x += this.velx;
    }

    // Movimiento a la izquirda de la nave.
    movIzquierda(){
        this.x -= this.velx;
    }

    // Movimiento hacia abajo de la nave.
    movAbajo(){
        this.y += this.velx;
    }

    // Pintamos la nueva posicion de la nave
    pintar(){
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
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



window.onload = () => {
    var juego = new Juego("juego", 800, 800);
    juego.start();
}
