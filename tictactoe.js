/**
 * Todas las casillas tienen la clase .casilla
 * 
 */

/**
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
let casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

/**
 * Recorrer las casillas que tengo en array casillas
 * Comprobar el contenido de cada una
 */

/**
 * Utilizo el array posicionesLlenas para introducir aquellas posiciones que contienen
 * un texto igual a 'X'
 * 
 * Al realizar un push lo que hago es introducir en el array, el numero de la posicion
 */
// let posicionesLlenas = [];
// for(let i = 0; i < casillas.length; i++){
//     console.log('La casilla numero ' + i + ' contiene: ' + casillas[i].innerHTML);
//     if(casillas[i].innerHTML == 'X'){
//         posicionesLlenas.push(i);
//     }
// }
// console.log(posicionesLlenas);

/**
 * Una vez tengo un array con las posiciones que contienen una 'X',
 * me interesa poder comparar si en el contenido de 'posicionesLlenas' esta incluido
 * alguna de las combinaciones de 'combinacionesGanadoras'.
 * 
 * En este caso en 'posicionesLlenas' tenemos:
 * [0] ---> 0
 * [1] ---> 1
 * [2] ---> 2
 * [3] ---> 5
 * 
 * En este caso en 'combinacionesGanadoras' tenemos:
 * [0] ---> [0, 1, 2]           // CORRECTA
 */


/**
 * -------------------------------------------------------------------------
 * CONTENIDO NUEVO
 * -------------------------------------------------------------------------
 */
let turno=true;
let comprobacion;
let p, div;
let puntX=0;
let puntO=0;
let combinacionO=[];
let combinacionX=[];
let puntosO;
let puntosX;
let valganador=false;
let puntuacion= document.getElementsByClassName("Jugadores");
let boton= document.getElementsByClassName("boton");
let turnoclase= document.getElementsByClassName("turno");
let pO=0;
let pX=0;

/*

Function que:
- añade contenido a una casilla
- da color al contenido de esa casilla
- compara arrays para saber si algun jugador a ganado

@param numero de la casilla presionada
@return void
*/

function agregarFicha(numero){    
    console.log('Has hecho un click en la casilla ' + numero);
    if(turno){
        turnoclase[0].textContent="Jugador 2 esta jugando";
        casillas[numero].textContent="X";

        //Guarda el numero de la casilla seleccionada en un array solo de X's
        combinacionX.push(numero);

        //Quita el evento "onclick" ya que no se deberían poner mas casillas ahí
        casillas[numero].removeAttribute('onclick');

        //Le añade una clase que le pone un color
        casillas[numero].classList.add('verdesito');

        //Cambia de turno
        turno=false;
    }else{
        turnoclase[0].textContent="Jugador 1 esta jugando";
        casillas[numero].textContent="O";

        //Guarda el numero de la casilla seleccionada en un array solo de O's
        combinacionO.push(numero);

        //Quita el evento "onclick" ya que no se deberían poner mas casillas ahí
        casillas[numero].removeAttribute('onclick');

        //Le añade una clase que le pone un color
        casillas[numero].classList.add('rojito');

        //Cambia de turno
        turno=true;
    }
    
    //Bucle para recorrer el array de combinacionesGanadoras
    for(let i=0;i<7;i++){

            //Bucle para recorrer las combinaciones de cada posicion del array anterior
            for(let j=0;j<3;j++){

                //Bucle para recorrer las combinaciones introducidas en la combinacion X
                //Es combinacionX en concreto porque siempre va a tener el mayor numero de items en el array
                for(let l=0;l<combinacionX.length;l++){

                    //Si un numero de la combinacion correspondiente coincide con un numero en la combinacion ganadora,
                    //se suma 1 a un contador
                    if(combinacionesGanadoras[i][j]==combinacionX[l]){
                        puntX++;
                    }else if(combinacionesGanadoras[i][j]==combinacionO[l]){
                        puntO++;
                    }
                }
            }
            //Si ese contador llega a 3 o mas, significa que el array correspondiente tiene una combinacion ganadora,
            //por lo tanto, gana ese jugador

            if(puntX>=3){

                //Se llama a la funcion ganador asignandole el id del jugador que ha ganado
                setTimeout(function(){ganador(0)},50);
                puntX=0;
                valganador=true;

            //Si no, se resetea el contador para comprobar la siguiente combinacion
            }else if(puntX<3){
                puntX=0;
            }
            
            //Lo mismo pero con el otro jugador
            if(puntO>=3){
                setTimeout(function(){ganador(1)},50);
                puntO=0;
                valganador=true;
            }else if(puntO<3){
                puntO=0;
            }
    }

    //Si se ha llenado el tablero y no ha ganado ninguno de los 2 jugadores, es empate
    if(combinacionX.length+combinacionO.length>=9 && valganador==false){
        window.alert('Empate');

        //Cambia el boton de reset para indicar que se puede pasar a la siguiente partida
        boton[0].textContent="Siguiente partida";
    }else if(valganador){
        boton[0].textContent="Siguiente partida";
    }
}

/*

Funcion que declara un ganador, bloquea el tablero y se suma la puntuacion

@param numero del jugador que ha ganado (0 o 1)
@return void
*/

function ganador(num){

    //num podría ser un booleano, pero era bastante confuso asique decidí ir por numero binario

    if(num==0){

        //Cuando algun jugador gana, se muestra un mensaje de alerta
        window.alert('Jugador 1 ha ganado');

        //Se elimina todos los atributos on click para que no se puedan seguir poniendo fichas
        for(let k=0;k<9;k++){
            casillas[k].removeAttribute('onclick');
        }

        //Y se añade un +1 al contador al jugador correspondiente
        pX=pX+1;
        puntuacion[0].textContent="Jugador 1: "+pX;
    }else if(num==1){

        //Lo mismo pero con el otro jugador
        window.alert('Jugador 2 ha ganado');
        for(let k=0;k<9;k++){
            casillas[k].removeAttribute('onclick');
        }
        pO++;
        puntuacion[1].textContent="Jugador 2: "+pO;
    }
}

/*

Funcion que resetea el tablero

@param void
@return void
*/

function sPartida(){

    //Recorre el tablero, vaciando todas las casillas y devolviendo el evento "onclick"
    for(let i=0;i<9;i++){
        casillas[i].textContent="";
        casillas[i].setAttribute("onclick",`agregarFicha(${i})`);
        casillas[i].classList.remove('verdesito');
        casillas[i].classList.remove('rojito');
    }

    //Estas son variables que se necesitan resetear cuando se empieza una nueva ronda
    turnoclase[0].textContent="Jugador 1 esta jugando";
    boton[0].textContent="Reset";
    combinacionO=[];
    combinacionX=[];
    turno=true;
    valganador=false;
}
/**
 * Para acabar el juego necesitamos:
 * 1. Colocar ficha
 * 2. Comprobar en cada insercion de ficha si se ha ganado el juego
 * 3. Cambiar turno
 * 4. Cuando hay ganador, mostrar mensaje
 * 
 * OPCIONES EXTRA:
 * 1. Generar un contado de victorias y resetear el tablero
 */