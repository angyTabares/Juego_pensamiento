const db= firebase.firestore();
let puntajep1;
let puntajep2;
let puntajep3;

function mandarInfoaBD() {

    obtenerPuntajes();

    db.collection('Encuesta').doc().set({docUsuario: localStorage.getItem("documento"), 
                                        pregunta1: puntajep1,preguntaDos:puntajep2,preguntaTres:puntajep3});
    setTimeout(function(){
        location.href="../Pagina/index.html";
    }, 3000);
}

//funcion que obtiene el puntaje de cada pregunta
function obtenerPuntajes() {
    
    for (let i = 0; i < document.preguntaUno.p1.length; i++) {
        const element = document.preguntaUno.p1[i];
        if(element.checked)
        {
          puntajep1= parseInt(element.value);
        }  
    }
    for (let i = 0; i < document.preguntaDos.p2.length; i++) {
        const element = document.preguntaDos.p2[i];
        if(element.checked)
        {
          puntajep2=parseInt(element.value);
        }  
    }
    for (let i = 0; i < document.preguntaTres.p3.length; i++) {
        const element = document.preguntaTres.p3[i];
        if(element.checked)
        {
          puntajep3=parseInt(element.value);
        }  
    }
}

//funcion que deshabilita los checbox de la pregunta1
function deshabilitar(indice) {
   for (let i = 0; i < document.preguntaUno.p1.length; i++) {
        const element = document.preguntaUno.p1[i];
        if(element.value==indice)
        {
          element.checked=true;
        } else{
          element.checked=false;
        }
    }
}

//funcion que deshabilita los checbox de la pregunta 2
function deshabilitar2(indice) {
    for (let i = 0; i < document.preguntaDos.p2.length; i++) {
         const element = document.preguntaDos.p2[i];
         if(element.value==indice)
         {
           element.checked=true;
         } else{
           element.checked=false;
         }
     }
 }

 //funcion que deshabilita los checbox de la pregunta 3
 function deshabilitar3(indice) {
    for (let i = 0; i < document.preguntaTres.p3.length; i++) {
         const element = document.preguntaTres.p3[i];
         if(element.value==indice)
         {
           element.checked=true;
         } else{
           element.checked=false;
         }
     }
 }