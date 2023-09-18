document.addEventListener(`DOMContentLoaded`, function() {

    const email = {
        email: ``,
        asunto: ``,
        mensaje: ``
    }

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector(`#email`);
    const inputAsunto = document.querySelector(`#asunto`);
    const inputMensaje = document.querySelector(`#mensaje`);
    const formulario = document.querySelector(`#formulario`);
    const btnSubmit = document.querySelector(`#formulario button[type="submit"]`);
    const btnReset = document.querySelector(`#formulario button[type="reset"]`);
    const spinner = document.querySelector(`#spinner`);
    const CC = document.querySelector(`#cc`);
    
    // asignar eventos
    inputEmail.addEventListener(`input`, validar);
    inputAsunto.addEventListener(`input`, validar);
    inputMensaje.addEventListener(`input`, validar);
    CC.addEventListener(`input`, validarCC);
    formulario.addEventListener(`submit`, enviarEmail);

    btnReset.addEventListener(`click` , function(e) {
        e.preventDefault();
        resetFormulario();
    })

    function validarCC() {
        if(e.target.value.trim() === ``){

        } else {
            
        }
    };

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add(`flex`);
        spinner.classList.remove(`hidden`);

        setTimeout(() => {
            spinner.classList.remove(`flex`);
            spinner.classList.add(`hidden`);

            resetFormulario();

            //crear una alerta
            const alertaExisto = document.createElement(`p`)
            alertaExisto.classList.add(`bg-green-500`,`text-white`,`p-2`, `text-center`, `rounder-lg`, `mt-10`, `font-bold`, `text-sm`, `uppercase`);
            alertaExisto.textContent= `Mensaje enviado correctamente`;

            formulario.appendChild(alertaExisto);

            setTimeout(() => {
                alertaExisto.remove();
            },4000)
        },3000)
    }

    function validar(e) {
        if(e.target.value.trim() === ``){ // trimelimina espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = ``;
            comprobarEmail();
            return;
        } 

        if(e.target.id === `email` && !validarEmail(e.target.value)){
            mostrarAlerta(`el email no es valido`, e.target.parentElement);
            email[e.target.name] = ``;
            comprobarEmail();
            return;
        }

        LimpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // //comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        LimpiarAlerta(referencia)
        //generar una alerta en HTML
        const error = document.createElement(`P`);
        error.textContent = mensaje;
        error.classList.add(`bg-red-600`, `text-white`, `p-2`, `text-center`);

        //inyecyar la alerta en el formulario
        referencia.appendChild(error)//agregar un hijo a formulario
    }

    function LimpiarAlerta(referencia){
        //comprobar sin una alerta ya existe
        const alerta = referencia.querySelector(`.bg-red-600`)
        
        if(alerta){
            alerta.remove();
        }
    }
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    
    function comprobarEmail() {
        console.log(email);

        if(Object.values(email).includes(``)) {
            btnSubmit.classList.add(`opacity-50`);
            btnSubmit.disabled = true;
            return

        }
        btnSubmit.classList.remove(`opacity-50`);
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        //reiniciar el objeto

        email.email = ``;
        email.asunto = ``;
        email.mensaje = ``;
        formulario.reset();
        comprobarEmail(); 
    }
});