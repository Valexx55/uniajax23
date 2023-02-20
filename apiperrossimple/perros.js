//onload=cargarPerroAleatorio;
//onload=pedirPerroAleatorioConFetch;


let xhr = new XMLHttpRequest();
const URL_PERRO_ALEATORIOS = "https://dog.ceo/api/breeds/image/random";

function cargarPerroAleatorio ()
{

    //antes de lanzar la petición, preparlo la vuelta "el callback"
    xhr.onreadystatechange = gestionarEventos;//!ojo sin paréntesis, programo el callback
    //con funcion anónima - funciones flecha

   /* xhr.onreadystatechange = () => {
        if (xhr.readyState==4)//xhr.DONE
    {
        console.log("la comunicación ha finalizado, el servidor ha enviado su respuesta");
        if (xhr.status==200)
        {
            console.log("la comunicación ha terminado con éxito");
            console.log(xhr.responseText);//accedo al cuerpo de la petición 
            console.log("CABECERA INFO " +xhr.getAllResponseHeaders());
            console.log("CABECERA MIME " +xhr.getResponseHeader('Content-Type'));
            let info_perro_json =  JSON.parse(xhr.responseText);//DESERIALIZO, PARA ACCEDER A LA INFO
            console.log(` STATUS = ${info_perro_json.status} URL_FOTO = ${info_perro_json.message}`);
            //TODO: REPRESENTAR LA INFO AL PERRO
            mostrarPerro(info_perro_json);
        } else {
            console.log(`La cosa no ha acabado bien ${xhr.status}`);
        }
    } else {
        console.log(`READY STATE = ${xhr.readyState} DE MOMENTO`);//template operador plantilla
    }
    };*/


    xhr.open("GET", URL_PERRO_ALEATORIOS, true);//preparo la peticion
    xhr.send(null); //la lanzo y el cuerpo va vacío: no adjunto info en la petición
    //RECIBO EL PERRRO
}

function gestionarEventos () //esta función, va a ser invocada, según cambie readyState - avace la comunicación-
{
    if (xhr.readyState==4)//xhr.DONE
    {
        console.log("la comunicación ha finalizado, el servidor ha enviado su respuesta");
        if (xhr.status==200)
        {
            console.log("la comunicación ha terminado con éxito");
            console.log(xhr.responseText);//accedo al cuerpo de la petición 
            console.log("CABECERA INFO " +xhr.getAllResponseHeaders());
            console.log("CABECERA MIME " +xhr.getResponseHeader('Content-Type'));
            let info_perro_json =  JSON.parse(xhr.responseText);//DESERIALIZO, PARA ACCEDER A LA INFO
            console.log(` STATUS = ${info_perro_json.status} URL_FOTO = ${info_perro_json.message}`);
            //TODO: REPRESENTAR LA INFO AL PERRO
            mostrarPerro(info_perro_json);
        } else {
            console.log(`La cosa no ha acabado bien ${xhr.status}`);
        }
    } else {
        console.log(`READY STATE = ${xhr.readyState} DE MOMENTO`);//template operador plantilla
    }
}
function mostrarPerro(info_perro_json)
{
    //obntego acceso a la imagen
    let imagen = document.getElementById('img_can');
    imagen.src = info_perro_json.message;
    let url_perro = info_perro_json.message;
    let array_split =  url_perro.split("/");
    let raza = array_split[array_split.length-2];
    console.log(raza);
    document.getElementsByTagName("p")[0].innerHTML=raza.toUpperCase();
}

function pedirPerroAleatorioConFetch ()
{
    console.log("USANDO FETCH");
    fetch(URL_PERRO_ALEATORIOS) //SI NO PONGO MÉTODO, POR DEFECTO ES GET
    .then((respuesta)=> {
        console.log(respuesta.ok);
        console.log(respuesta.statusText);
        console.log(respuesta.status);
        console.log(respuesta.body);

        for (const cabecera of respuesta.headers.entries()) {
            console.log(`${cabecera[0]}: ${cabecera[1]}`);
         }
        
        
        return respuesta.json();
    } )
    .then((perrojson) => {
        console.log(perrojson);
        console.log("EL PERRO VOLVIO CON FETCH");
        mostrarPerro (perrojson);

    });
    console.log("FIN DE USANDO FETCH");
}

//onload=pedirPerroAleatorioConFetch2().then((perro)=>mostrarPerro(perro));

async function pedirPerroAleatorioConFetch2()
{
    // let cuerpo = await fetch(URL_PERRO_ALEATORIOS);
    // let resutaldo = await cuerpo.json();
    //SIN AWIT, NO ESPERA EL RESULTADO
    //let resutaldo = fetch(URL_PERRO_ALEATORIOS).then((respuesta)=> respuesta.json());
    //CON AWAIT, ESPERAMOS HASTA QUE LA PROMESA SE CUMPLE
    let resutaldo = await fetch(URL_PERRO_ALEATORIOS).then((respuesta)=> respuesta.json());
   /* console.log('resutaldo = ');
    console.log(resutaldo);*/
    return resutaldo;
   // mostrarPerro(resutaldo);
}



 //pido perros mientras arrayperros-lenght < nperros
        //obtengo perro
        //pregunto raza
        //¿es de la raza buscada?
            //si, lo add al array
            //no, paso

async function pedirPerrosRaza (nperros, raza)
{
    let array_perros = [];

    let perro_aux;
    while (array_perros.length < nperros)        
    {
         perro_aux = await fetch(URL_PERRO_ALEATORIOS).then(cuerpo=> cuerpo.json());
         console.log("perro aux ");
         console.log(perro_aux);
         if (perro_aux.message.indexOf(raza)!=-1)
         { //este perro es de la raza que busco
            array_perros.push(perro_aux);
            console.log("PERRO DE LA RAZA BUSCADA");
         }
    }

    return array_perros;
}

async function pedirPerrosRazaConIntentos (nperros, raza, maxintentos)
{
    let array_perros = [];

    let intentos =0;
    let perro_aux;
    while (array_perros.length < nperros)        
    {
         perro_aux = await fetch(URL_PERRO_ALEATORIOS).then(cuerpo=> cuerpo.json());
         console.log("perro aux ");
         console.log(perro_aux);
         if (perro_aux.message.indexOf(raza)!=-1)
         { //este perro es de la raza que busco
            array_perros.push(perro_aux);
            console.log("PERRO DE LA RAZA BUSCADA");
         }
         intentos++;
         if (intentos>maxintentos)
         {
            throw new Error('Número de intentos superado');
         }
    }

    return array_perros;
}


function selPerro(evento) {
    console.log(evento.value);
    let raza = evento.value;
    console.log("sel perro " + raza);
    //MOSTRAR GIF/ESPERA
    // document.getElementById('cajaespera').hidden=false;
    // pedirPerrosRaza (3, raza).then((arrayp) => {
    //     //QUITAR GIF ESPERA
    //     document.getElementById('cajaespera').hidden=true;
    //     alert("perros recuperados");
    //     arrayp.forEach((perro)=>{console.log(perro);})
    // });
    // console.log("fin sel perro " + raza);

    //PARA USAR OPCIÓN ONREJECTED --> 
    pedirPerrosRazaConIntentos (3, raza, 100)
    .then((arrayp) => 
      {
        alert("perros recuperados");
        arrayp.forEach((perro)=>{console.log(perro);})
      }  
    ).catch((error)=> {console.log("numero de intentos supertado " +error);});
    
}

//PROMISE ALL
//console.log("usando Promise ALL");
/*pedirPerros(50).
then(
    (ap) => console.log(ap.length)
);
async function pedirPerros (nperros)
{
    let array_perros = [];
    let array_requests = [];

    for (let i=0; i < nperros; i++)
    {
        array_requests.push(URL_PERRO_ALEATORIOS);
    }

    //para cada req, genero una promesa

    array_perros = await Promise.all (array_requests.map( async (peticion) =>
    {
        let respuesta = await fetch(peticion).then(res => res.json());
        return respuesta;
    }) )


    return array_perros;
}*/

//PROMISE RACE
console.log("usando Promise RACE");
let promesa2 = new Promise ((ok, ko) => {
    setTimeout(ok, 200, 'timeout'); //ok ('timeout')
})

Promise.race( [pedirPerroAleatorioConFetch2(), promesa2])
.then((value)=> {
    console.log("GANADOR ");
    console.log(value);
});