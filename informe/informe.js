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
.then (respuesta=> respuesta.json())
.then ((datos) => 
{
    console.log(datos.data.length);
    console.log(datos.data[0].municipio_distrito);
    //TODO: 1) extrar un array con las localidades / distritos
    //2 otra array con las fechas
    //seleccionar una localidad
    //ESTADÍSTICOS
        //máximo Tasa Incidencia 
        //mínimo Tasa Incidencia
        //media Tasa Incidencia

        
})
.catch(error=> {console.log(error);});
}
