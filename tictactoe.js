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
let pipo=true;
let comprobacion;
let p;
let num2=0
let num3=0;
let div;
let combinacion=[[],[]];
function agregarFicha(numero){    
    console.log('Has hecho un click en la casilla ' + numero);
    if (pipo){
        casillas[numero].textContent="X";
        combinacion[0].push(numero);
        pipo=false;
    }else{
        casillas[numero].textContent="O";
        pipo=true;
        combinacion[1].push(numero);
    }
    
    for(let i=0;i<combinacionesGanadoras.length;i++){
        console.log(combinacionesGanadoras[i][0]);
        console.log(combinacion[0][0]);
        if(combinacionesGanadoras[i][0].includes(combinacion[0][0])){
            for(let j=0;j<3;j++){
                if(combinacionesGanadoras[i][j]==combinacion[i][j]){
                    num2=num2+1;
                }
            }
            num3++;
        }else if(combinacionesGanadoras[i][0]==combinacion[1][0]){

        }
        
    }
    
    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el click del div
     */
    
    casillas[numero].removeAttribute('onclick')
    console.log(combinacion[0]);
    console.log(combinacion[1]);
    console.log(num3);
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