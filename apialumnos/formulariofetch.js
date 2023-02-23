var xhr = new XMLHttpRequest();
const URL_SERVIDOR_POST = "http://localhost:3000/alumno";
//const URL_SERVIDOR_POST = "https://my-json-server.typicode.com/valexx55/alumnostardes/alumno";

let edicion = false;
let alumno_edicion;//guardo globalmente el alumno para luego poder acceder a su id en el PUT
onload = () => {

    if (location.href.indexOf('id') != -1) {
        edicion = true;
        console.log('el id está --> viene a editar');
        //LEER DEL LOCAL
        let alumno_edicion_json = localStorage.getItem('alumno_edicion');
        console.log("alumno en edicion " + alumno_edicion_json);
        //TODO: Actualizar el formualrio con los datos del alumno - boton incluido
        alumno_edicion = JSON.parse(alumno_edicion_json);
        rellenarFormulario(alumno_edicion);
        modificarBotonAEditar();

    } else {
        console.log('el id NO está --> viene a crear');
    }
}


function rellenarFormulario(alumno) {
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('apellido').value = alumno.apellido;
    document.getElementById('edad').value = alumno.edad;
    document.getElementById('email').value = alumno.email;

}

function modificarBotonAEditar() {
    document.getElementsByTagName("button")[0].innerHTML = "ACTUALIZAR";
}

console.log("fecha actual " + new Date());



function postAlumno() {

    if (edicion) {
        putAlumno();
    } else {
        let alumno = obtenerDatosFormulario();
        console.log("alumno a enviar ");
        console.log(alumno);

        fetch(url_put, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'//,
              //'Authorization': 'TOKENASFBVSAFGBSDF'
            },
            body: JSON.stringify(alumno) // body data type must match "Content-Type" header
          }).then( resp => {
                console.log('Alumno insertado correctamente ');
                alert("Alumno insertado correctamente");
                    document.getElementById("botonlistado").hidden=false;
        }).catch (error =>  console.error('Error haciendo post de alumno'));
    }


}

function putAlumno() {
    let alumno = obtenerDatosFormulario();

    console.log("alumno a enviar ");
    console.log(alumno);
    let url_put = URL_SERVIDOR_POST + "/" + alumno_edicion.id;
    console.log("PUT " + url_put);

    fetch(url_put, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumno) // body data type must match "Content-Type" header
      }).then( resp => {
            console.log('Alumno modifacdo ');
            alert("Alumno modifacdo correctamente");
                document.getElementById("botonlistado").hidden=false;
    }).catch (error =>  console.error('Error haciendo post de alumno'));
}


function obtenerDatosFormulario() {
    let alumno_form;
    let formulario = document.getElementById("forma");
    let controles_form = formulario.elements;
    /*controles_form.forEach(element => {
        console.log(element.value);
    });
    */
    console.log(` Nombre = ${controles_form[0].value}`);

    alumno_form = {
        nombre: controles_form[0].value,
        apellido: controles_form[1].value,
        edad: controles_form[2].value,
        email: controles_form[3].value,
        id: (edicion) ? alumno_edicion.id : 0
    }
    return alumno_form;
}