//onload = cargarDatos;
const URL_DATOS_MUNICIPIOS = "https://datos.comunidad.madrid/catalogo/dataset/7da43feb-8d4d-47e0-abd5-3d022d29d09e/resource/877fa8f5-cd6c-4e44-9df5-0fb60944a841/download/covid19_tia_muni_y_distritos_s.json";
cargarDatos();//lo voy a ejecutar desde node

/**
 *   "data": [
        {
            "municipio_distrito": "Madrid-Retiro",
            "codigo_geometria": "079603",
            "tasa_incidencia_acumulada_ultimos_14dias": 301.6,
            "tasa_incidencia_acumulada_total": 22360.42,
            "casos_confirmados_totales": 26913,
            "casos_confirmados_ultimos_14dias": 363,
            "fecha_informe": "2022/03/29 11:51:00"
        },

 */
function cargarDatos ()
{
fetch (URL_DATOS_MUNICIPIOS)
.then (respuesta=>  
    {if (respuesta.ok)
        {
            return respuesta.json()
        }
} )
.then ((datos) => 
{
    console.log(datos.data.length);
    console.log(datos.data[0].municipio_distrito);
    let array_localidades = extraerLocalidades(datos.data);
    //let array_localidades2 = extraerLocalidades2(datos.data);
    console.log(`LOCALIDADES = ${array_localidades} TOTAL LOCALIDADES = ${array_localidades.length}`);
    //console.log(`LOCALIDADES = ${array_localidades2} TOTAL LOCALIDADES = ${array_localidades2.length}`);
    extraerFechas(datos.data);
    //TODO: 
    //3 selector con localidades
    dibujarSelect(array_localidades);
    //seleccionar una localidad
    //ESTADÍSTICOS
        //máximo Tasa Incidencia 
        //mínimo Tasa Incidencia
        //media Tasa Incidencia

        
})
.catch(error=> {console.log(error);});
}

function extraerLocalidades (datos)
{
    let array_localidades = [];
    //OBTENER UNA FECHA INICIAL
    let fecha_inicial = datos [0].fecha_informe;
    let fecha_nueva=false;
    let contador = 0;
    let localidad_aux;
        //TODO: extraer todas las localidades distitnas de datos
        do{
             localidad_aux = datos[contador].municipio_distrito; //RECORRER EL ARRAY DE DATOS
             array_localidades.push(localidad_aux);//EXTRAYENDO LA LOCALIDAD
             contador++;
             fecha_nueva = datos[contador].fecha_informe != fecha_inicial;
        }while (!fecha_nueva) //HASTA QUE CAMBIE LA FECHA

    return array_localidades;
}

function extraerLocalidades2 (datos)
{
    let array_localidades = [];
    let fecha_inicial = datos [0].fecha_informe;
        //1 me quedo con los registros que sean de esta fecha -filter
        //2 transformo "adelgazo" los registros, extrayendo sólo el municipio_distrito - map
        array_localidades = datos.filter(registro => registro.fecha_informe==fecha_inicial).map(registro=>registro.municipio_distrito);

    return array_localidades;
}

function extraerFechas (datos)
{
    let listado_fechas = [];
    let listado_fechas_unico = [];

        //1 me voy a quedar con las fechas "fecha_informe": "2022/03/29 11:51:00"
        listado_fechas = datos.map(registro => registro.fecha_informe.substr(0,10));
        console.log('long fechas repes ' + listado_fechas.length);
        //2 voy a filtrar las distintas
        listado_fechas_unico = [...new Set(listado_fechas)];//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax sintaxis extendida array a parámetros sueltos
        console.log('long fechas unicas ' + listado_fechas_unico.length);

    return listado_fechas_unico;
}

function dibujarSelect(array_localidades)
{
    //TODO: desplegar localidades
    let select_element = document.createElement('select');
    let elemento_option_aux;
    array_localidades.forEach (
        localidad =>
        {
            elemento_option_aux=  document.createElement('option');
            elemento_option_aux.value = localidad;
            elemento_option_aux.innerHTML = localidad;
            select_element.append(elemento_option_aux);
        }
    );
    let elemento_div_padre = document.getElementById('div_localidades');
    elemento_div_padre.append(select_element);
    //recorrer el array de localidades
        //para cada localidad, 
        //creo un option
        //lo añado al select
}

function calcular()
{
    //obtener la localidad seleccionada
    let localidad_seleccionada = document.getElementsByTagName('select')[0].value;
    console.log(localidad_seleccionada);
    //sacar el radio seleccionado
    //hacer el cáclculo correspondiente
    //mostrar
}

function mediaTia ()
{
    let media = 0;

    return media;
}

function maxTia ()
{
    let maximo = 0;

    return maximo;
}

function minTia ()
{
    let minimo = 0;

    return minimo;
}