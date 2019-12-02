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
        // Establecemos los listener de para el movimiento del jugador.
        document.addEventListener("keydown", (e) => {this.movJugador(e)});
        document.addEventListener("keyup", (e) => {this.parJugador(e)});

        // Creamos los jugador.
        this.jugador = new Jugador(50 ,this.altoJuego-50 ,10 ,50, 5,"black", this.svgid);

        // Establecemos los enemigos en la pantalla.
        this.enemy = this.posIniEne(this.fil, this.col);
        
        setInterval( () => {
            this.movEnemigos();

            // Movimiento del jugador 1.
            if (this.derecha)
                this.jugador.movDerecha();
            if (this.izquierda)   
                this.jugador.movIzquierda();
            
            this.jugador.pintar();
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
                enemigos2.push(new enemigos(posx, posy, alto, ancho, "black", 1,this.svgid));   // Metemos un enemigo con las coordenadas y dimensiones expuestas.
                posx += (ancho + 5);                                                            // Cambiamos el punto x del rectangulo.
            }
            posy += (alto + 5) ;
        }

        return enemigos2;
    }

    /**
     *  Controla el movimiento de los enemigos.
     * 
     */
    movEnemigos(){
        this.pizquierda = this.enemy[0].x;                                        //Punto x izquierda del cuadro gerenal de enemigos
        this.pderecha = this.enemy[this.col-1].x+this.enemy[this.col-1].ancho;    //Punto x derecha del cuadro gerenal de enemigos

        //Cambia la direccion hacia la derecha.
        if ((this.pizquierda + this.enemy[0].vel < 0)){
            this.direccion = true;
            for (let enemigo of this.enemy){
                enemigo.movAbajo();
            }
        }

        //Cambia la direccion hacia la izquierda.
        if ((this.pderecha + this.enemy[0].vel > this.anchoJuego)){
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

    /**
     * Controla el movimiento del jugador
     * 
     */
    movJugador(e){
        //Jugador 1.
        if(e.keyCode == 39)
            this.derecha = true;
        if(e.keyCode == 37)
            this.izquierda = true;
    }

    parJugador(e){
        //Juegador 1.
        if(e.keyCode == 39)
            this.derecha = false;
        if(e.keyCode == 37)
            this.izquierda = false;
    }
}
/**
 *  Clase enemigos
 * 
 */
class enemigos{
    constructor(x ,y ,alt ,ach ,color, vel, id){
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alt;
        this.ancho = ach;
        this.vel = vel;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById(id).appendChild(this.tag);
    }
    
    // Movimiento de lod enemigos.
    // Movimiento a la derecha de la nave
    movDerecha(){
        this.x += this.vel;
    }

    // Movimiento a la izquirda de la nave.
    movIzquierda(){
        this.x -= this.vel;
    }

    // Movimiento hacia abajo de la nave.
    movAbajo(){
        this.y += this.vel;
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


class Jugador{
    constructor(x ,y ,alt ,ach , vel, color, id){
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alt;
        this.ancho = ach;
        this.vel = vel;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("fill", this.color);
        document.getElementById(id).appendChild(this.tag);
    }

    movDerecha(){
        if(this.x + this.alto < 800){
            this.x += this.vel;
        }
    }

    movIzquierda(){
        if(this.x > 0){
            this.x -= this.vel;
        }
    }

    pintar(){
        this.tag.setAttribute("x", this.x);
    }
}


// Ejecucion del programa.
window.onload = () => {
    var juego = new Juego("juego", 800, 800);
    juego.start();
}
