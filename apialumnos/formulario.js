var xhr = new XMLHttpRequest();
//const URL_SERVIDOR_POST = "http://localhost:3000/alumno";
const URL_SERVIDOR_POST = "https://my-json-server.typicode.com/valexx55/alumnostardes/alumno";


console.log("fecha actual " + new Date());

//TODO: GET PUT DELETE - CRUD / REST

function postAlumno()
{
    //1 OBTENER LOS DATOS DEL FORMULARIO INTRODUCIDOS
    let formulario =  document.getElementById("forma");
    let controles_form =  formulario.elements;
    /*controles_form.forEach(element => {
        console.log(element.value);
    });
    */
    console.log(` Nombre = ${controles_form[0].value}`);
    
    let alumno = {
        nombre: controles_form[0].value,
        apellido: controles_form[1].value,
        edad: controles_form[2].value,
        email: controles_form[3].value
    }

    console.log("alumno a enviar ");
    console.log(alumno);

    //2 COMPONER PREPAR LA LLAMADA
    xhr.onreadystatechange = () => {
        //TODO: GESTIONAR LOS EVENTOS
        if (xhr.readyState == xhr.DONE) //4 DONE - completado
        {
            if (xhr.status==201)
            {
                console.log('Alumno creado');
            }
            else {
                console.error ('Error haciendo post de alumno');
            }
        }
    }

    xhr.open("POST", URL_SERVIDOR_POST, true);
    //DE objeto JS a texto JSON
    let alumno_json = JSON.stringify(alumno);
    console.log( ` Alumno JSON a enviar ${alumno_json} `);
    //indicar el tipo mime - Content-Type
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(alumno_json);
    //3 HACE EL POST
}