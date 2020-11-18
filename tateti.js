const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// tablero: DEFINIR EL TAD (tipo abstracto de dato)

var TABLERO = [[0,0,0],[0,0,0],[0,0,0]];
var est_jugador = true;
var validado = true;
// modulracionacion: todas las funciones que hacen al proyecto

function dibujar(tabler, estado){
    //console.clear();
    if(estado)
    console.log("Player 1:")
    else
    console.log("Player 2:")
    for (let f = 0; f < 3; f++) {    
        console.log(tabler[f][0] + "|"+ tabler[f][1] + "|" + tabler[f][2] );
    }
}

function cargarDato(dato,estado)
{
    switch(dato){
        case '1': TABLERO[0][0] = distintoCero(TABLERO[0][0]); ; break;
        case '2': TABLERO[0][1] = distintoCero(TABLERO[0][1]);break;
        case '3': TABLERO[0][2] = distintoCero(TABLERO[0][2]); break;
        case '4': TABLERO[1][0] = distintoCero(TABLERO[1][0]); break;
        case '5': TABLERO[1][1] = distintoCero(TABLERO[1][1]); break;
        case '6': TABLERO[1][2] = distintoCero(TABLERO[1][2]); break;
        case '7': TABLERO[2][0] = distintoCero(TABLERO[2][0]); break;
        case '8': TABLERO[2][1] = distintoCero(TABLERO[2][1]); break;
        case '9': TABLERO[2][2] = distintoCero(TABLERO[2][2]); break;

        case 'exit':break;
        default: console.log("Ingese un valor valido (numero entre 1 y 6)");
                 validado = false ; break;
    }
    console.log(typeof dato);
    let y = (dato - 1) % 3;
    console.log(y);
    function distintoCero(pos)
    {
        if(pos == 0)
        {
        pos = simbolo(estado); //simbolo puede ser x - o dependiendo del jugador
        console.log(pos);
        return pos;
        }
        else
        {
            console.log ("Casillero ocupado, ingrese otra posicion");
            validado = false;
            return pos;
        }
        
    }
}

function simbolo(estado)
{
    if(estado)
    return  "x";
    else
    return "o";
}

function checkGanador(tabler,estado)
{
    let v1 = 1,v2 = 2,v3 = 3;
    
    for (let f = 0; f < tabler.length; f++)  //Busca coincidencias horizontales
    {
        for (let c = 0; c < tabler.length; c++) {
            switch(c)
            {
                case 0: if(tabler[f][c] != 0) v1 = tabler[f][c] ; break;
                case 1: if(tabler[f][c] != 0) v2 = tabler[f][c] ; break;
                case 2: if(tabler[f][c] != 0) v3 = tabler[f][c] ; break;
            }            
        }
        //console.log(v1,v2,v3)
        corroborar();
    }

    for (let c = 0; c < tabler.length; c++)  //Busca coincidencias verticales
    {
        for (let f = 0; f < tabler.length; f++) {
            switch(f)
            {
                case 0: if(tabler[f][c] != 0) v1 = tabler[f][c] ; break;
                case 1: if(tabler[f][c] != 0) v2 = tabler[f][c] ; break;
                case 2: if(tabler[f][c] != 0) v3 = tabler[f][c] ; break;
            }            
        }
        //console.log(v1,v2,v3)
        corroborar();
    }

    for (let f = 0; f < tabler.length; f++) { //Busca coincidencias diagonal derecha 
        switch(f)
        {
            case 0: if(tabler[f][0] != 0) v1 = tabler[f][0] ; break;
            case 1: if(tabler[f][1] != 0) v2 = tabler[f][1] ; break;
            case 2: if(tabler[f][2] != 0) v3 = tabler[f][2] ; break;
        }            
    }
    corroborar();


    for (let f = 0; f < tabler.length; f++) { //Busca coincidencias diagonal izquierda
        switch(f)
        {
            case 0: if(tabler[f][2] != 0) v1 = tabler[f][2] ; break;
            case 1: if(tabler[f][1] != 0) v2 = tabler[f][1] ; break;
            case 2: if(tabler[f][0] != 0) v3 = tabler[f][0] ; break;
        }            
    }
    corroborar();


    function corroborar()
    {
        if(v1 == v2 && v2 == v3)
        {
            if(!estado)
            console.log("Player 1 ganador")
            else
            console.log("Player 2 ganador")
            console.log("Fin del Juego");
            return 'Exit';
        }
        v1 = 1;
        v2 = 2;
        v3 = 3;
    }

    //console.log("Ganador")
}


// juego : software (interactuan la modulari[csz]acion)


const start = async () =>{
    dibujar(TABLERO,est_jugador);

    for await (const dato of rl) {
        cargarDato(dato,est_jugador);

        if(dato =='exit'){
            console.log('fin de juego')
            return 'Exit';
        }
        else{
            if(validado)
            {
                est_jugador = !est_jugador; 
            }
            dibujar(TABLERO,est_jugador);
            validado = true;
            checkGanador(TABLERO,est_jugador);
	    }
    }
}


start()