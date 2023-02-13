onload=cargarPerroAleatorio;

let xhr = new XMLHttpRequest();
const URL_PERRO_ALEATORIOS = "https://dog.ceo/api/breeds/image/random";

function cargarPerroAleatorio ()
{

    //antes de lanzar la petición, preparlo la vuelta "el callback"
    xhr.onreadystatechange = gestionarEventos;//!ojo sin paréntesis, programo el callback

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
            let info_perro_json =  JSON.parse(xhr.responseText);//DESERIALIZO, PARA ACCEDER A LA INFO
            console.log(` STATUS = ${info_perro_json.status} URL_FOTO = ${info_perro_json.message}`);
            //TODO: REPRESENTAR LA INFO AL PERRO
        } else {
            console.log(`La cosa no ha acabado bien ${xhr.status}`);
        }
    } else {
        console.log(`READY STATE = ${xhr.readyState} DE MOMENTO`);//template operador plantilla
    }
}