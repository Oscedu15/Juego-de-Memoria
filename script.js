//Inicializacion de variables

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoId = null;


let ganadorAudio = new Audio("/sonidos/completado.wav");
let perdedorAudio = new Audio("/sonidos/gameover.wav");
let clickAudio = new Audio("/sonidos/continuacion.wav")
let errorAudio = new Audio("/sonidos/erro.wav");
let acertoAudio = new Audio("/sonidos/acerto.wav");

//Apuntando a documento HTML

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restantes");
let $nombre = document.getElementById("nombre");

//Generacion de Numeros Aleatorios

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
//La cantidad de numeros pares que tendra el juego
numeros = numeros.sort(()=> {return Math.random()-0.5})
//sort ordena los numeros mediante una funcion
//Con math.random originamos numeros aleatorios, pero lo multiplicamos 
// con -0.5 para que nos de numeros negativos
console.log(numeros);

//Recibiendo nombre del jugador
let nombre = prompt("Hola, como te llamas?");
if (nombre == null || nombre ==""){
	alert("No has introducido nada. Recarga la página para intentarlo de nuevo.");
} else {
    nombre = nombre[0].toUpperCase() + nombre.substring(1);
    $nombre.innerHTML = `Hola ${nombre}! Mucha Suerte.`	
}

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {weekday: "long", month: "short", day:"numeric"})


//Funciones 
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{    
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            perdedorAudio.play();
        }
    },1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        console.log(i)
        tarjetaBloqueada.innerHTML = `<img src="/imagenes/${numeros[i]}.png" alt="">` ;
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Mostrar primer Numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="/imagenes/${primerResultado}.png" alt="">` ;
        clickAudio.play(); 
        
        //Deshabilitar primer boton
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="/imagenes/${segundoResultado}.png" alt="">`

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Resetear Contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos ++;
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;
            acertoAudio.play();

            if(aciertos == 8){
                ganadorAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos ${aciertos} 🥳`
                mostrarTiempo.innerHTML = `Fantastico, demoraste ${timerInicial - timer} Segundos`;
                mostrarMovimientos.innerHTML = `Movimientos ${movimientos} 🎉`
            }

        }else{
            errorAudio.play();
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
            tarjeta1.innerHTML = " ";
            tarjeta2.innerHTML = " ";
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },800);
        }
    }
}