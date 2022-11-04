const db= firebase.firestore();
const loginForm= document.getElementById("login-form");

loginForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const usuario= loginForm['inputUsuario']
    const documento= loginForm['inputDocumento']

    localStorage.setItem("usuario", usuario.value);
    localStorage.setItem("documento", documento.value);

    setTimeout(function(){
        location.href="Nivel1/index.html";
    }, 2000);
})



