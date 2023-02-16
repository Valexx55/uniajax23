console.log("HOLA estoy en pruebas");

/*const URL_PERRO_ALEATORIOS = "https://dog.ceo/api/breeds/image/random";
fetch(URL_PERRO_ALEATORIOS) //SI NO PONGO MÉTODO, POR DEFECTO ES GET
    .then((respuesta)=> respuesta.json())
    .then((perrojson) => {
        console.log(perrojson);
        console.log("EL PERRO VOLVIO CON FETCH");
    });*/

//VAMOS A VALIDAR UNA CONTRASEÑA CON PROMESAS
//UNA PASSWORD ES VÁLIDA SI
    /*
    - LONGUITUD SUPERIOR O IGUAL A 8
    - SI TIENE ALGUNA MAYÚSCULA
    - SI TIENE ALGÚN NÚMERO
    */


function tamanioSuperiorA8 (pwd)
{
    let p = new Promise ( (ok, ko) =>
    {
        setTimeout(
            ()=> {
                if ((pwd.length >= 8))
                {
                    console.log("ok tamanio");
                    ok(pwd);
                } else 
                {
                    console.log("KO tamanio");
                    ko();
                }
            }  ,1500);
    });

    return p;
}

tamanioSuperiorA8("holahol")
.then (pwdCorrecta)
.catch (pwdInCorrecta);
//.then(pwdCorrecta, pwdInCorrecta);

function pwdCorrecta ()
{
    console.log("La contraseña ES BUENA");
}

function pwdInCorrecta ()
{
    console.log("La contraseña ES MALA");
}