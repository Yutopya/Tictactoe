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
let p;
let puntX=0;
let puntO=0;
let div;
let combinacionO=[];
let combinacionX=[];
let ganador;


function agregarFicha(numero){    
    console.log('Has hecho un click en la casilla ' + numero);
    if (turno){
        casillas[numero].textContent="X";
        combinacionX.push(numero);
        turno=false;
        casillas[numero].removeAttribute('onclick');
    }else{
        casillas[numero].textContent="O";
        turno=true;
        combinacionO.push(numero);
        casillas[numero].removeAttribute('onclick');
    }
    
    for(let i=0;i<7;i++){
            for(let j=0;j<3;j++){
                for(let l=0;l<combinacionX.length;l++){
                    if(combinacionesGanadoras[i][j]==combinacionX[l]){
                        puntX++;
                    }else if(combinacionesGanadoras[i][j]==combinacionO[l]){
                        puntO++;
                    }
                }
            }
            if(puntX>=3){
                ganador(0);
                puntX=0;
                for(let k=0;k<9;k++){
                    casillas[k].removeAttribute('onclick');
                }
            }else if(puntX<3){
                puntX=0;
            }
            
            if(puntO>=3){
                ganador(1);
                puntO=0;
                for(let k=0;k<9;k++){
                    casillas[k].removeAttribute('onclick');
                }
            }else if(puntO<3){
                puntO=0;
            }
    }

    function ganador(num){
        if(num==0){
            window.alert('J1 Win');
        }else if(num==1){
            window.alert('J2 Win');
        }
    }
    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el click del div
     */
    
    console.log(combinacionX);
    console.log(combinacionO);
}
function sPartida(){
    let resetAll = document.createElement("button");
    for(let i=0;i<9;i++){
        casillas[i].textContent="";
        casillas[i].setAttribute("onclick",`agregarFicha(${i})`);
    }
    combinacionO=[];
    combinacionX=[];
    turno=true;
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