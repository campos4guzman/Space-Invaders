class Juego{
    constructor(id,alto,ancho){
        this.id = id;
        this.altoJuego = alto;
        this.anchoJuego = ancho;
        this.direccion = true;
        this.col = 6;
        this.fil = 5;
        this.svgid = "svgid";
        this.contJuego = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.contJuego.setAttribute("height", this.altoJuego);
        this.contJuego.setAttribute("width", this.anchoJuego);
        this.contJuego.style.border= "1px solid black";
        this.contJuego.id = this.svgid;
        document.getElementById(id).appendChild(this.contJuego); 
    }
    
    /**
     * Metodo que hace que el juego Comience
     */
    start(){
        // Establecemos los listener de para el movimiento del jugador.
        document.addEventListener("keydown", (e) => {this.movJugador(e)});
        document.addEventListener("keyup", (e) => {this.parJugador(e)});


        // Creamos los jugador.
        this.jugador = new Jugador(250 ,this.altoJuego-100 ,100 ,100, 5, this.svgid);

        // Creamos el disparo.
        this.disparo=new Disparo(this.jugador.x+46,this.jugador.y+10,30,10,5,this.svgid);

    
        // Establecemos los enemigos en la pantalla.
        this.enemy = this.posIniEne(this.fil, this.col);
        
        setInterval( () => {

            this.movEnemigos();

            //Empieza a disparar
            this.disparo.disparar(this.jugador.x+46,this.jugador.y+10);
            this.disparo.pintar();
            this.disparo.contacto(this.disparo,this.enemy,this.contJuego);
            
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
                enemigos2.push(new enemigos(posx, posy, alto, ancho, 1,this.svgid));   // Metemos un enemigo con las coordenadas y dimensiones expuestas.
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
        try {
            this.pizquierda = this.enemy[0].x;                                        //Punto x izquierda del cuadro gerenal de enemigos
            this.pderecha = this.enemy[Math.ceil((this.enemy.length/this.col)-1)].x+this.enemy[Math.ceil((this.enemy.length/this.col)-1)].ancho;    //Punto x derecha del cuadro gerenal de enemigos
        } catch (error) {
        }
        

        var cont=0;
        var colision=0;
        /*do{
            
            this.cont++;
        }while(cont<this.enemy.length || colision==true);*/
        colision=false;
        //Cambia la direccion hacia la derecha.
        if (colision=="derecha"){
            this.direccion = true;
            for (let enemigo of this.enemy){
                enemigo.movAbajo();
            }
        }

        //Cambia la direccion hacia la izquierda.
        if (colision == "izquierda"){
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
     * @param {Evento} e
     */
    movJugador(e){
        //Jugador 1.
        if(e.keyCode == 39)
            this.derecha = true;
        if(e.keyCode == 37)
            this.izquierda = true;
    }
    /**
     * Para el Movimiento del jugador
     * @param {Evento} e 
     */
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
    constructor(x ,y ,alt ,ach , vel, id){
        this.x = x;
        this.y = y;
        this.alto = alt;
        this.ancho = ach;
        this.vel = vel;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","image");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("href","enemigo.png");
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
        this.y += this.vel*10;
    }

    // Pintamos la nueva posicion de la nave
    pintar(){
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
    }

    comprobar(){
        
    }


}

/**
 * Clase Jugador
 * 
 */
class Jugador{
    constructor(x ,y ,alt ,ach , vel, id){
        this.x = x;
        this.y = y;
        this.alto = alt;
        this.ancho = ach;
        this.vel = vel;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","image");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("href","nave.png");
        document.getElementById(id).appendChild(this.tag);
    }

    // Movimiento del Jugador
    // Movimiento hacia la derecha
    movDerecha(){
        if(this.x + this.ancho < 800){
            this.x += this.vel;
        }
    }

    // Movimiento a la Izquierda.
    movIzquierda(){
        if(this.x > 0){
            this.x -= this.vel;
        }
    }

    pintar(){
        this.tag.setAttribute("x", this.x);
    }
}

/**
 *  Clase Disparo
 *  
 */
class Disparo{
    constructor(x ,y ,alt ,ach , vel, id){
        this.x = x;
        this.y = y;
        this.alto = alt;
        this.ancho = ach;
        this.vel = vel;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg","image");
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y", this.y);
        this.tag.setAttribute("width", this.ancho);
        this.tag.setAttribute("height", this.alto);
        this.tag.setAttribute("href","disparo.png");
        document.getElementById(id).appendChild(this.tag);
    }


    /**
     * Controla el disparo del jugador
     * @param {Evento} e
     */
    disparar(jx,alto){
        this.y -= this.vel;
        if(this.y+this.vel<0){
            this.x=jx;
            this.y=alto;
        }
    }
    

    contacto(disparo,enemy,contJuego){
        for(var i=0;i<enemy.length;i++){
            if(disparo.x>=enemy[i].x && disparo.x<=enemy[i].x+40 && disparo.y==enemy[i].y+20){
                contJuego.removeChild(enemy[i].tag);
                enemy.splice(i,1);
            }
        }
    }

    pintar(){
        this.tag.setAttribute("x", this.x);
        this.tag.setAttribute("y",this.y);
    }
}

/**
 * Ejecucion del Codigo.
 * 
 */
window.onload = () => {
    var juego = new Juego("juego", 800, 800);
    juego.start();
}