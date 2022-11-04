const db = firebase.firestore();
let nivel=0;
let pregunta=0;
const arrayX=[];
const arrayY=[];
const arrayDocs=[];
let x=0;
let y=0;

//funcion que desmarca el checbox de los niveles
function deshabilitar(indice) {
    for (let i = 0; i < document.parteUno.p1.length; i++) {
         const element = document.parteUno.p1[i];
         if(element.value==indice)
         {
           element.checked=true;
         } else{
           element.checked=false;
         }
     }
 }

 //funcion que desmarca el checbox de las preguntas
 function deshabilitar2(indice) {
    for (let i = 0; i < document.parteDos.p2.length; i++) {
         const element = document.parteDos.p2[i];
         if(element.value==indice)
         {
           element.checked=true;
         } else{
           element.checked=false;
         }
     }
 }

 //funcion que obtiene el nivel y pregunta seleccionado y los guarda
 function obtenerNivelYPregunta() {
    for (let i = 0; i < document.parteUno.p1.length; i++) {
        const element = document.parteUno.p1[i];
        if(element.checked)
        {
          nivel=parseInt(element.value);
        }  
    }
    for (let i = 0; i < document.parteDos.p2.length; i++) {
        const element = document.parteDos.p2[i];
        if(element.checked)
        {
          pregunta=parseInt(element.value);
        }  
    }
}

//funcion que saca el coeficiente correlacional
function sacarCoeficiente() {

  let sumatoria=0;
  let sumaX=0;
  let sumaY=0;
  let sumaX2=0;
  let sumaY2=0;
  let mediaX=0;
  let mediaY=0;
  let covarianza=0;
  let desviacionX=0;
  let desviacionY=0;
  var coeficiente;
  let num=0;
  
    obtenerNivelYPregunta();
    traerDatosx();
    traerDatosy();

    setTimeout(function(){
 
      for (let i = 0; i < arrayX.length; i++) {
        sumatoria=sumatoria+(arrayX[i]*arrayY[i]);
        sumaX= sumaX+arrayX[i];
        sumaY= sumaY+arrayY[i];
        sumaX2=sumaX2+Math.pow(arrayX[i],2);
        sumaY2=sumaY2+Math.pow(arrayY[i],2);
      }

      mediaX=sumaX/arrayX.length;
      mediaY=sumaY/arrayY.length;

      //numerador
      covarianza= (sumatoria/arrayX.length)-(mediaX*mediaY);

      //denominador Desviación tipica
      desviacionX=Math.sqrt((sumaX2/arrayX.length)-(Math.pow(mediaX,2)));
      desviacionY=Math.sqrt((sumaY2/arrayY.length)-(Math.pow(mediaY,2)));


      coeficiente= (covarianza/(desviacionX*desviacionY));
      
      if(isNaN(coeficiente))
      {
        document.getElementById("h").innerHTML="El coeficiente de correlación es invalido";
      }
      else{
        document.getElementById("h").innerHTML="El coeficiente de correlación es: "+coeficiente;
      }
  }, 5000);
}

//funcion que trae los puntajes del nivel que corresponden a los datos de x
 function traerDatosx() {
  db.collection("PuntajeIndividual").onSnapshot((resultados) => {
    const datos = resultados.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),

    }));

    datos.forEach(dato => { 
      if(nivel==1)
      {
        arrayX[x]=dato.nivel1;
        arrayDocs[x]=dato.docUsuario;
      }
      if(nivel==2)
      {
        arrayX[x]=dato.nivel2;
        arrayDocs[x]=dato.docUsuario;
      }
      if(nivel==3)
      {
        arrayX[x]=dato.nivel3;
        arrayDocs[x]=dato.docUsuario;
      }
      if(nivel==4)
      {
        arrayX[x]=dato.nivel4;
        arrayDocs[x]=dato.docUsuario;
      }
      if(nivel==5)
      {
        arrayX[x]=dato.nivel5;
        arrayDocs[x]=dato.docUsuario;
      }
      x=x+1;
   })
  })
  
}

//funcion que trae los puntajes del nivel que corresponden a los datos de y
function traerDatosy() {
  db.collection("Encuesta").onSnapshot((resultados) => {
    const datos = resultados.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),

    }));

    datos.forEach(dato => { 
      y=arrayDocs.indexOf(dato.docUsuario);
      if(pregunta==1)
      {
        arrayY[y]=dato.pregunta1;
      }
      if(pregunta==2)
      {
        arrayY[y]=dato.preguntaDos;
      }
      if(pregunta==3)
      {
        arrayY[y]=dato.preguntaTres;
      }
   })
  })
}