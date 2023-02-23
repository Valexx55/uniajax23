var xhr = new XMLHttpRequest();
const URL_GET_ALUMNOS = "http://localhost:3000/alumno";
let lista_alummos;

//cd se cargue el html, se ejecute esta f() que recupere los alumnos
onload = obtenerAlumnos;


//GET- de los ALUMOS por AJAX
function obtenerAlumnos() {
    fetch(URL_GET_ALUMNOS)
        .then(lalumnos => lalumnos.json())
        .then(lista => {
            lista_alummos = lista;
            mostrarAlumnos(lista_alummos);
        })
        .catch(error => {
            console.error("NO se ha podido recuperar los datos");
            alert("NO se ha podido recuperar los datos");
        });

}

function mostrarAlumnos(lista_alummos) {
    lista_alummos.forEach(alumno => {
        mostrarAlumno(alumno);
    });
}

function mostrarAlumno(alumno) {
    console.log(alumno);

    let imagen = document.createElement("img");
    //<img  class="card-img-top" alt="Foto Alumno"src="https://randomuser.me/api/portraits/women/1.jpg">
    //TODO si es par una mujer si no un hombre
    imagen.className = "card-img-top";
    imagen.alt = "Foto Alumno";
    if ((alumno.id % 2) == 0) {
        imagen.src = "https://randomuser.me/api/portraits/men/" + alumno.id + ".jpg";
    } else {
        imagen.src = "https://randomuser.me/api/portraits/women/" + alumno.id + ".jpg";
    }

    let carta = document.createElement('div');
    carta.className = "card"
    carta.style = "width: 18rem";

    let cuerpo = document.createElement('div');
    cuerpo.className = "card-body";

    let h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerHTML = alumno.id + " " + alumno.nombre + " " + alumno.apellido;

    let ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";

    let li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.innerHTML = "Email: " + alumno.email;

    let li2 = document.createElement("li");
    li2.className = "list-group-item";
    li2.innerHTML = "Edad:" + alumno.edad;

    ul.append(li1, li2);
    cuerpo.append(h5, ul);

    let botonborrar = document.createElement('button');
    botonborrar.title = "botonborrar";
    botonborrar.type = "button";
    botonborrar.innerHTML = "BORRAR";
    botonborrar.className = "btn btn-danger";
    botonborrar.addEventListener('click', borrarAlumno);
    botonborrar.dataset.id = alumno.id;

    //cuerpo.append(botonborrar);

    let botoneditar = document.createElement('button');
    botoneditar.title = "botoneditar";
    botoneditar.type = "button";
    botoneditar.innerHTML = "EDITAR";
    botoneditar.className = "btn btn-success";
    botoneditar.addEventListener('click', editarAlumno);
    botoneditar.dataset.id = alumno.id;

    cuerpo.append(botonborrar, botoneditar);



    carta.append(imagen, cuerpo);

    document.getElementById("lista").appendChild(carta);

}

function borrarAlumno(event) {
    console.log("BORRAR ALUMNO!");

    console.log(event.target.dataset.id);
    deleteAlumnos(event.target.dataset.id);
}

function eliminarIdArray(id) {
    lista_alummos = lista_alummos.filter(alumno => alumno.id != id);
    console.log(lista_alummos);
}

function deleteAlumnos(id) {

    let url = URL_GET_ALUMNOS + '/' + id;
    console.log(`llamando a DELETE con ${url}`);
    fetch(url, {
        method: 'DELETE',
    })
        .then(res => {
            eliminarIdArray(id);//2 eliminar la lista acutal
            document.getElementById("lista").innerHTML = "";//3 repintar llamando a mostrar alumnos
            mostrarAlumnos(lista_alummos);
        }) 
        .catch(error => {
            console.error("NO se ha  borrar el alumno " + xhr.status);
            alert("NO se ha podido recuperar los datos " + xhr.status);
        });
   
}

function editarAlumno(event) {
    let id_alumno_editar = event.target.dataset.id;
    console.log("Editando a " + id_alumno_editar);
    //OBTENGO EL OBJETO QUE VOY A EDITAR 
    let lista_alumno_ed = lista_alummos.filter(alumno => alumno.id == id_alumno_editar);
    console.log(lista_alumno_ed[0]);
    let alumno_editar = lista_alumno_ed[0];
    let alumno_json = JSON.stringify(alumno_editar);

    //Y LO GUARDO EN EL LOCAL STORAGE
    localStorage.setItem('alumno_edicion', alumno_json);
    //NAVEGO A AL FORMULARIO
    window.location.href = 'formulario.html?id=' + id_alumno_editar;
}

function ordenarListadoPorEdad() {
    console.log("ordenarListadoPorEdad()");
    console.log("ANTES ");
    lista_alummos.forEach(a => console.log(a));

    lista_alummos.sort(
        (alumno1, alumno2) => {
            return alumno1.edad - alumno2.edad;
        }
    );
    //2 eliminar la lista acutal
    document.getElementById("lista").innerHTML = "";
    //3 repintar llamando a mostrar alumnos ordenados
    mostrarAlumnos(lista_alummos);

    console.log("DESPUÉS ");
    lista_alummos.forEach(a => console.log(a));
}

function ordenarListadoPorId() {
    console.log("ordenarListadoPorId()");

    console.log("ANTES ");
    lista_alummos.forEach(a => console.log(a));
    lista_alummos.sort(
        (alumno1, alumno2) => {
            return alumno1.id - alumno2.id;
        }
    );

    //2 eliminar la lista acutal
    document.getElementById("lista").innerHTML = "";
    //3 repintar llamando a mostrar alumnos ordenados
    mostrarAlumnos(lista_alummos);
    console.log("DESPUÉS ");
    lista_alummos.forEach(a => console.log(a));
}