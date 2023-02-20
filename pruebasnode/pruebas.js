

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


function contineMayusculas (pwd)
{
    let p = new Promise ( (ok, ko) =>
    {
        setTimeout(
            ()=> {
                if (/[A-Z]/.test(pwd)) //pwd contiene alguna mayúscula
                {
                    console.log("ok mayus");
                    ok(pwd);
                } else 
                {
                    console.log("KO mayus");
                    ko();
                }
            }  ,1500);
    });

    return p;
}


function contineNumeros (pwd)
{
    let p = new Promise ( (ok, ko) =>
    {
        setTimeout(
            ()=> {
                if (/[0-9]/.test(pwd)) //pwd contiene algún numero
                {
                    console.log("ok NUM");
                    ok(pwd);
                } else 
                {
                    console.log("KO NUM");
                    ko();
                }
            }  ,1500);
    });

    return p;
}

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
console.log("HOLA estoy en pruebas INICIO");

tamanioSuperiorA8("Holahola7")
.then (p => contineMayusculas(p))
.then (p => contineNumeros(p))
.then(pwdCorrecta)
.catch(pwdInCorrecta);

//.then (pwdCorrecta)
//.catch (pwdInCorrecta);
//.then(pwdCorrecta, pwdInCorrecta);
console.log("HOLA estoy en pruebas FINAL");

function pwdCorrecta ()
{
    console.log("La contraseña ES BUENA");
}

function pwdInCorrecta ()
{
    console.log("La contraseña ES MALA");
}