const db= firebase.firestore();
//medidas canvas
const WIDTH = 500;
const HEIGHT = 500;

//medidas matriz
const COLUMNAS = 5;
const FILAS = 5;

//medidas celdas
const CELL_WIDTH = WIDTH / COLUMNAS;
const CELL_HEIGHT = HEIGHT / FILAS;

//elemento canvas
const $canvas = document.getElementById("canvas");
const ctx = $canvas.getContext('2d');

//imagenes
var img1 = new Image();
img1.src = "../img/conejoNivel3.png";

var img2 = new Image();
img2.src = "../img/zanahoriaNivel2.png";

var img3 = new Image();
img3.src = "../img/perroNivel2.png";

var img4 = new Image();
img4.src = "../img/huellaNivel3.png";

var img5 = new Image();
img5.src = "../img/pasto.webp";

//audios
var audio = new Audio('../audios/paso.wav');
var audio2 = new Audio('../audios/ladrido.wav');
var audio3 = new Audio('../audios/win.wav');
var audio4 = new Audio('../audios/incorrecto.wav');

//colores
const theme = {
    dark: '#FFFAFA',
}

//ancho y alto del canvas
$canvas.width = WIDTH;
$canvas.height = HEIGHT;

//matriz
const boardMatrix = [];
const posiciones = [];
const direcciones=[];
let intervalo = 0;
let cont = 0;


//flechas
let numFlechas = 0;

//inicializar matriz
for (let x = 0; x < FILAS; x++) {
    boardMatrix[x] = [];
    for (let y = 0; y < COLUMNAS; y++) {
        boardMatrix[x][y] = null;
    }
}

//Estado de inicio y fin
boardMatrix[0][4] = 0;
boardMatrix[4][0] = 1;
boardMatrix[0][1] = 3;
boardMatrix[2][2] = 3;
boardMatrix[4][3] = 3;


//dibujarmatriz
function dibujarMatriz() {

    for (let x = 0; x < FILAS; x++) {
        for (let y = 0; y < COLUMNAS; y++) {
            ctx.fillStyle = theme.dark;
            ctx.fillRect(x * CELL_HEIGHT, y * CELL_WIDTH, CELL_HEIGHT, CELL_WIDTH);
            ctx.drawImage(img5, x * CELL_HEIGHT, y * CELL_WIDTH);
            ctx.strokeRect(x * CELL_HEIGHT, y * CELL_WIDTH, CELL_HEIGHT, CELL_WIDTH);
        }
    }

    //se dibujan los muñecos
    ctx.drawImage(img1, 4 * CELL_HEIGHT + CELL_HEIGHT/18 , 0 * CELL_WIDTH +CELL_HEIGHT/18);
    ctx.drawImage(img2, 0 * CELL_HEIGHT , 4 * CELL_WIDTH);
    ctx.drawImage(img3, 2 * CELL_HEIGHT , 2 * CELL_WIDTH);
    ctx.drawImage(img3, 1 * CELL_HEIGHT , 0 * CELL_WIDTH);
    ctx.drawImage(img3, 3 * CELL_HEIGHT , 4 * CELL_WIDTH);

}


document.body.onload = function () {
    dibujarMatriz();
}

//valida si el camino fue correcto o incorrecto
function moverse(i, j) {
    intervalo = 1000;
    if (paso(i, j)) {
        myTimer = setInterval("dibujar()", intervalo);
    }
    else {
        myTimer =setInterval("dibujar()", intervalo);
    }
}

//dibuja el camino recorrido
function dibujar() {
    try {

        x1= posiciones[cont][0];
        y1= posiciones[cont][1];

        if(boardMatrix[x1][y1]!=1 & boardMatrix[x1][y1]!=3)
        {
            ctx.drawImage(img4, posiciones[cont][1] * CELL_HEIGHT, posiciones[cont][0] * CELL_WIDTH);
            audio.play();
        }

        if(boardMatrix[x1][y1]==1)
        {
            
            if(direcciones.length>posiciones.length)
            {
                mandarRespuestaIncorrectaBD();
                audio4.play();
                clearInterval(myTimer);
                $('#md-pierde').modal('show');
                localStorage.setItem("nivel3", 0);
                return false;
            }
            else{
                localStorage.setItem("nivel3", 1);
                mandarRespuestaCorrectaBD();
                audio3.play();
                clearInterval(myTimer);
                $('#md-gana').modal('show');
               
                return false;
            }
            return false;
        }

        if(boardMatrix[x1][y1]==3)
        {
            mandarRespuestaIncorrectaBD();
            audio2.play();
            clearInterval(myTimer);
            $('#md-pierde').modal('show');
            localStorage.setItem("nivel3", 0);
            return false;
        }
        
        cont = cont + 1;        
    } catch (error) {
        mandarRespuestaIncorrectaBD();
        intervalo = 0;
        audio4.play();
        clearInterval(myTimer);
        $('#md-pierde').modal('show');
        localStorage.setItem("nivel3", 0);
    }
}

//algoritmo de camino recorrido retorna true si llego a la meta y false de lo contrario
function paso(i, j) {
    let posx = i;
    let posj = j;

    for (let k = 0; k < direcciones.length; k++) {

        if (direcciones[k] == 0) {
            posx = posx - 1;
        }

        if (direcciones[k] == 1) {
            posx = posx + 1;
        }

        if (direcciones[k] == 2) {
            posj = posj - 1;
        }

        if (direcciones[k] == 3) {
            posj = posj + 1;
        }

        if ((posx >= 0 & posx < boardMatrix.length) & (posj >= 0 & posj < boardMatrix.length)) {
            if (!esEstadoFinal(posx, posj)) {
                if (!esObstaculo(posx, posj)) {
                    boardMatrix[posx][posj] = 2;
                    posiciones[k] = [posx, posj];
                }
                else {
                    posiciones[k] = [posx, posj]
                     return false }
            } else {
                 posiciones[k] = [posx, posj]
                 return true }
        }
        else {
            return false;
        }
    }
    return false;
}

//Establecer estado final
function esEstadoFinal(posx, posj) {
    return (boardMatrix[posx][posj] == 1)
}

//Establecer obstaculo
function esObstaculo(posx, posj) {
    return (boardMatrix[posx][posj] == 3)
}


//Dubujar flechas seleccionadas
function seleccion(indice) {

    if (numFlechas < 15) {
        if (indice == 0) {
            document.getElementById("camino").innerHTML += " <i class='fa-solid fa-arrow-up' style='font-size:50px; width:40px'></i>";
            direcciones[numFlechas]=indice;
            numFlechas+=1;
        }

        if (indice == 1) {
            document.getElementById("camino").innerHTML += " <i class='fa-solid fa-arrow-down' style='font-size:50px; width:40px'></i>";
            direcciones[numFlechas]=indice;
            numFlechas+=1;
        }

        if (indice == 2) {
            document.getElementById("camino").innerHTML += " <i class='fa-solid fa-arrow-left' style='font-size:50px; width:40px'></i>";
            direcciones[numFlechas]=indice;
            numFlechas+=1;
        }

        if (indice == 3) {
            document.getElementById("camino").innerHTML += " <i class='fa-solid fa-arrow-right' style='font-size:50px; width:40px'></i>";
            direcciones[numFlechas]=indice;
            numFlechas+=1;
        }
    }

}

function mandarRespuestaCorrectaBD() {

    db.collection('PuntajeGlobal').doc().set({ nivel:3, aprobado:true})
  }
  
  function mandarRespuestaIncorrectaBD() {
  
      db.collection('PuntajeGlobal').doc().set({ nivel:3, aprobado:false})
  }

  function mandarPuntajeBD() {
    localStorage.setItem("puntaje", parseInt(localStorage.getItem("nivel1"))+parseInt(localStorage.getItem("nivel2"))
                                    +parseInt(localStorage.getItem("nivel3")));
    db.collection('PuntajeIndividual').doc().set({docUsuario: localStorage.getItem("documento"), nombreUsuario: localStorage.getItem("usuario"), nivel1:parseInt(localStorage.getItem("nivel1"))
    ,nivel2:parseInt(localStorage.getItem("nivel2")),nivel3:parseInt(localStorage.getItem("nivel3")),nivel4:0,nivel5:0,puntaje:parseInt(localStorage.getItem("puntaje"))})
    setTimeout(function(){
        location.href="../PaginaEncuesta/index.html";
    }, 3000);
}

function abandonar() {
    mandarPuntajeBD();
    setTimeout(function(){
        location.href="../PaginaEncuesta/index.html";
    }, 3000);
}