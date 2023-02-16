var xhr = new XMLHttpRequest();
const URL_GET_ALUMNOS = "http://localhost:3000/alumno";
let lista_alummos;

//cd se cargue el html, se ejecute esta f() que recupere los alumnos
onload=obtenerAlumnos;


//GET- de los ALUMOS por AJAX
function obtenerAlumnos ()
{
    xhr.onreadystatechange = () =>
    {
        if (xhr.readyState==4)
         if (xhr.status==200)
         {
            console.log(" ha llegado la respuesta al GET y bien!");
            lista_alummos = JSON.parse(xhr.responseText);
            console.log(lista_alummos);
            
            mostrarAlumnos (lista_alummos);
         } else {
            console.error("NO se ha podido recuperar los datos");
            alert("NO se ha podido recuperar los datos");
         }
    }
    xhr.open('GET', URL_GET_ALUMNOS, true );
    xhr.send(null);
}

function mostrarAlumnos (lista_alummos)
{
    lista_alummos.forEach(alumno => {
        mostrarAlumno (alumno);
    });
}

function mostrarAlumno (alumno)
{
    console.log(alumno);
    
    let imagen = document.createElement("img");
    //<img  class="card-img-top" alt="Foto Alumno"src="https://randomuser.me/api/portraits/women/1.jpg">
    //TODO si es par una mujer si no un hombre
    imagen.className="card-img-top";
    imagen.alt="Foto Alumno";
    if ((alumno.id%2)==0)
    {
        imagen.src="https://randomuser.me/api/portraits/men/"+alumno.id+".jpg";
    } else {
        imagen.src="https://randomuser.me/api/portraits/women/"+alumno.id+".jpg";
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
    ul.className="list-group list-group-flush";
   
    let li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.innerHTML="Email: " + alumno.email;
    
    let li2 = document.createElement("li");
    li2.className = "list-group-item";
    li2.innerHTML="Edad:" + alumno.edad;

    ul.append(li1,li2);
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



    carta.append(imagen,cuerpo);

    document.getElementById("lista").appendChild(carta);
    
}

function borrarAlumno (event)
{
    console.log("BORRAR ALUMNO!");
   
    console.log(event.target.dataset.id);
    deleteAlumnos (event.target.dataset.id);
}

function eliminarIdArray (id)
{
    lista_alummos =  lista_alummos.filter(alumno => alumno.id!=id);
    console.log(lista_alummos);
}

function deleteAlumnos (id)
{
    xhr.onreadystatechange = () =>
    {
        if (xhr.readyState==4)
         if (xhr.status==200)
         {
            console.log(" Se ha borrado el alumno");
            alert(" Se ha borrado el alumno");
            //REFESCO!  - ALTERNATIVA 1
           // window.location.reload();
            //TODO: ALTERNATIVA 2
            //modificar los datos localmente
            //1 eliminar a ese alumno de la lista de alumnos (con ese id)
                //haced el método 1 y que devuelva la lista modificada
            eliminarIdArray(id);
            //2 eliminar la lista acutal
            document.getElementById("lista").innerHTML ="";
            //3 repintar llamando a mostrar alumnos
            mostrarAlumnos(lista_alummos);
         } else {
            console.error("NO se ha  borrar el alumno " +xhr.status);
            alert("NO se ha podido recuperar los datos " +xhr.status);
         }
    }
    let url = URL_GET_ALUMNOS+'/'+id;
    console.log(`llamando a DELETE con ${url}`);
    xhr.open('DELETE',url, true );
    xhr.send(null);
}

function editarAlumno (event) 
{
    let id_alumno_editar =  event.target.dataset.id;
    console.log("Editando a " + id_alumno_editar);
    //OBTENGO EL OBJETO QUE VOY A EDITAR 
    let lista_alumno_ed = lista_alummos.filter(alumno=> alumno.id==id_alumno_editar);
    console.log(lista_alumno_ed[0]);
    let alumno_editar = lista_alumno_ed[0];
    let alumno_json = JSON.stringify(alumno_editar);
   
    //Y LO GUARDO EN EL LOCAL STORAGE
    localStorage.setItem('alumno_edicion', alumno_json);
    //NAVEGO A AL FORMULARIO
    window.location.href = 'formulario.html?id='+id_alumno_editar;
}