const db = firebase.firestore();
var cantTotalDocs = 0;
var cantTotalRespuestasE = 0;

let contN1A = 0;
let contN1D = 0;
let contN2A = 0;
let contN2D = 0;
let contN3A = 0;
let contN3D = 0;
let contN4A = 0;
let contN4D = 0;
let contN5A = 0;
let contN5D = 0;

let promN1A = 0;
let promN1D = 0;
let promN2A = 0;
let promN2D = 0;
let promN3A = 0;
let promN3D = 0;
let promN4A = 0;
let promN4D = 0;
let promN5A = 0;
let promN5D = 0;

let sumaP1=0;
let sumaP2=0;
let sumaP3=0;
let promP1=0;
let promP2=0;
let promP3=0;

//funcion que trae los datos de la coleccion puntajeglobal y llama a las funciones llenar tabla puntaje global y tabla de correctas e incorrectas
async function mostrar() {
    db.collection("PuntajeGlobal").onSnapshot((resultados) => {
        const datos = resultados.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }));

        datos.forEach(dato => {
            cantTotalDocs = cantTotalDocs + 1;
        })
        sacarPuntajesGlobales(datos);
        llenarTablaPuntajeGlobal();
        llenarTablacantCorrectasIncorrectas();
    })
}

//funcion que trae los datos de la coleccion puntajeindividual y llama a las funciones sacarpuntajeindividual
async function mostrar2() {
    db.collection("PuntajeIndividual").onSnapshot((resultados) => {
        const datos = resultados.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }));

        sacarPuntajeIndividual(datos);
    })
}

//funcion que cuenta y promedia la cantidad de buenas y malas por nivel
function sacarPuntajesGlobales(datos) {
    datos.forEach(dato => {
    if (dato.nivel == 1) {
        if (dato.aprobado == true) {
            contN1A = contN1A + 1;
        }
        else {
            contN1D = contN1D + 1;
        }
    }

    if (dato.nivel == 2) {
        if (dato.aprobado == true) {
            contN2A = contN2A + 1;
        }
        else {
            contN2D = contN2D + 1;
        }
    }

    if (dato.nivel == 3) {
        if (dato.aprobado == true) {
            contN3A = contN3A + 1;
        }
        else {
            contN3D = contN3D + 1;
        }
    }

    if (dato.nivel == 4) {
        if (dato.aprobado == true) {
            contN4A = contN4A + 1;
        }
        else {
            contN4D = contN4D + 1;
        }
    }

    if (dato.nivel == 5) {
        if (dato.aprobado == true) {
            contN5A = contN5A + 1;
        }
        else {
            contN5D = contN5D + 1;
        }
    }
  })
    promN1A = (contN1A / cantTotalDocs);
    promN1D = (contN1D / cantTotalDocs);
    promN2A = (contN2A / cantTotalDocs);
    promN2D = (contN2D / cantTotalDocs);
    promN3A = (contN3A / cantTotalDocs);
    promN3D = (contN3D / cantTotalDocs);
    promN4A = (contN4A / cantTotalDocs);
    promN4D = (contN4D / cantTotalDocs);
    promN5A = (contN5A / cantTotalDocs);
    promN5D = (contN5D / cantTotalDocs);
}

//funcion que marca x o ✔ en la tabla dependiendo de la respuesta del usuario
function sacarPuntajeIndividual(datos) {
    datos.forEach(dato => {
    if (dato.docUsuario == localStorage.getItem("documento")) {

        if(dato.nivel1==1)
        {
          document.getElementById("min1C").innerHTML= "✔";
        }
        else{
            document.getElementById("min1I").innerHTML="✘";
        }

        if(dato.nivel2==1)
        {
          document.getElementById("min2C").innerHTML= "✔";
        }
        else{
            document.getElementById("min2I").innerHTML="✘";
        }
 
        if(dato.nivel3==1)
        {
          document.getElementById("min3C").innerHTML= "✔";
        }
        else{
            document.getElementById("min3I").innerHTML="✘";
        }
 
        if(dato.nivel4==1)
        {
          document.getElementById("min4C").innerHTML= "✔";
        }
        else{
            document.getElementById("min4I").innerHTML="✘";
        }
 
        if(dato.nivel5==1)
        {
          document.getElementById("min5C").innerHTML=" ✔";
        }
        else{
            document.getElementById("min5I").innerHTML="✘";
        }
    }
  })
}

//funcion que llena la cantidad de respuestas correctas e incorrectas por nivel
function llenarTablacantCorrectasIncorrectas (){
    document.getElementById("n1CantC").innerHTML=contN1A;
    document.getElementById("n1CantI").innerHTML=contN1D;
    document.getElementById("n2CantC").innerHTML=contN2A;
    document.getElementById("n2CantI").innerHTML=contN2D;
    document.getElementById("n3CantC").innerHTML=contN3A;
    document.getElementById("n3CantI").innerHTML=contN3D;
    document.getElementById("n4CantC").innerHTML=contN4A;
    document.getElementById("n4CantI").innerHTML=contN4D;
    document.getElementById("n5CantC").innerHTML=contN5A;
    document.getElementById("n5CantI").innerHTML=contN5D;
}

function llenarTablaPuntajeGlobal() {
    document.getElementById("n1C").innerHTML=promN1A.toFixed(3);
    document.getElementById("n1I").innerHTML=promN1D.toFixed(3);
    document.getElementById("n2C").innerHTML=promN2A.toFixed(3);
    document.getElementById("n2I").innerHTML=promN2D.toFixed(3);
    document.getElementById("n3C").innerHTML=promN3A.toFixed(3);
    document.getElementById("n3I").innerHTML=promN3D.toFixed(3);
    document.getElementById("n4C").innerHTML=promN4A.toFixed(3);
    document.getElementById("n4I").innerHTML=promN4D.toFixed(3);
    document.getElementById("n5C").innerHTML=promN5A.toFixed(3);
    document.getElementById("n5I").innerHTML=promN5D.toFixed(3);
}

//funcion que llena la tabla de lista de usuarios ordenados por puntaje
async function mostrar3() {
    let i=1;
    db.collection("PuntajeIndividual").orderBy("puntaje", "desc").onSnapshot((resultados) => {
        const datos = resultados.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }));
        const $cuerpoTabla = document.querySelector("#tabla");
        datos.forEach(dato => {
            const $tr = document.createElement("tr");

            let $tdNum = document.createElement("td");
            $tdNum.textContent = i; 
            $tr.appendChild($tdNum);

            let $tdNombre = document.createElement("td");
            $tdNombre.textContent = dato.nombreUsuario; 
            $tr.appendChild($tdNombre);

            let $tdPuntaje = document.createElement("td");
            $tdPuntaje.textContent = dato.puntaje; 
            $tr.appendChild($tdPuntaje);
            $cuerpoTabla.appendChild($tr)
            i=i+1;
        }) 
    })
}

//funcion que trae los datos de la encuesta y llama a las funciones sacar promedio y llenar tabla
function mostrar4() {
    db.collection("Encuesta").onSnapshot((resultados) => {
        const datos = resultados.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }));

        datos.forEach(dato => {
            cantTotalRespuestasE = cantTotalRespuestasE + 1;
        })
        console.log("cant "+ cantTotalRespuestasE);
        sacarPromedioEncuestas(datos);
        llenarTablaEncuesta();
        cantTotalRespuestasE=0;
    })
}

//funcion que llena la tabla con los datos de los promedios de las preguntas de la encuesta
function llenarTablaEncuesta() {
    document.getElementById("ep1").innerHTML=promP1.toFixed(2);
    document.getElementById("ep2").innerHTML=promP2.toFixed(2);
    document.getElementById("ep3").innerHTML=promP3.toFixed(2);
}

//funcion que saca el promedio de cada una de las respuestas de la encuesta
function sacarPromedioEncuestas(datos) {
    sumaP1=0;
    sumaP2=0;
    sumaP3=0;
    promP1=0;
    promP2=0;
    promP3=0;

    datos.forEach(dato => {
        sumaP1=sumaP1+dato.pregunta1;
        sumaP2=sumaP2+dato.preguntaDos;
        sumaP3=sumaP3+dato.preguntaTres;
    })

    promP1=sumaP1/cantTotalRespuestasE;
    promP2=sumaP2/cantTotalRespuestasE;
    promP3=sumaP3/cantTotalRespuestasE;
}

document.body.onload = function () {
    mostrar();
    mostrar2();
    mostrar3();
    mostrar4();
}

