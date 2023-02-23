

addEventListener('message', e => {
    console.log('Worker lanzado');
    console.log(`Datos  ${e.data}`);
    fetch(e.data)
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(datos_provincias => {
            console.log(datos_provincias);
            //TODO: Extraer el nombre y las coordenadas
            //y compongo un mapa con ello
            let mapa_provincias = new Map();
            //mapa_provincias.set('Pontevedra', [30.3, 20.2]);
            //x cada records
            let nombre_p_aux;
            let lat_aux;
            let long_aux;

            datos_provincias.records.forEach(registro => {
                nombre_p_aux = registro.fields.texto;
                long_aux = registro.geometry.coordinates[0];
                lat_aux = registro.geometry.coordinates[1];
                mapa_provincias.set(nombre_p_aux, [lat_aux, long_aux]);
            });
            postMessage(mapa_provincias);//retorno el flujo a eltiempo.js    
        });

});