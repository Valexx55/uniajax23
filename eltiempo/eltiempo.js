//https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=40.233004&lon=-3.75266&appid=8f569316277558a9fd34faf095e65f12
//JSONP
//https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=40.233004&lon=-3.75266&appid=8f569316277558a9fd34faf095e65f12&callback=test

const URI_TIEMPO = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&appid=8f569316277558a9fd34faf095e65f12";

//1 DIBUJAR UN MAPA MUNDI en el navegador - LEAFLET
//2 UBICAR AL USUARIO DE LA PÁGINA - dibujamos en el mapa - GEOLOCATION API
//3 OBTENER EL TIEMPO DE ESE MAPA - OPEN WATHER -TOKEN

var map;

onload = () => {
    //iniciamos el mapa

    //coordenadas bernabeu 40.4530387,-3.6883337,15
    map = L.map('map').setView([40.4530387, -3.6883337,15], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

function encuentrame()
{
    //VAMOS A UBICAR USUARIO
    if (navigator.geolocation)
    {
        console.log("estamos en un navegdor con acceso a Geolocation API");
        navigator.geolocation.getCurrentPosition((posicionObtenida)=>exito(posicionObtenida), ()=> fracaso());
    } else {
        console.log("estamos en un navegdor SIN la Geolocation API");
        fracaso();
    }
}

function dibujarUbicacion (lat, long)
{
    map.setView([lat, long], 13);
    L.marker([lat, long]).addTo(map);

}

function exito (posicion)
{
 console.log(`LATITUD ${posicion.coords.latitude} LONGITUD ${posicion.coords.longitude}`);
 console.log(`PRECISIÓN  ${posicion.coords.accuracy} TIEMPO MS ${posicion.timestamp}`);
 dibujarUbicacion (posicion.coords.latitude, posicion.coords.longitude);
 obtenerElTiempo (posicion.coords.latitude, posicion.coords.longitude);
}

function fracaso ()
{
    alert("No es posible determinar su ubicación en este dispositivo");
}

function obtenerElTiempo (latitude, longitude)
{
    let url = URI_TIEMPO + '&lat='+latitude+'&lon='+longitude;
    console.log('PETICION GET A ' + url);

    fetch(url)
    .then(respuesta=> {
        if (respuesta.ok)
        {
            return respuesta.json();
        }
    })
    .then (info_tiempo=> {
        console.log(info_tiempo);
        mostarInfoTiempo (info_tiempo);
    })
    .catch (error=>{
        console.error(error);
        alert("No se ha podido recibir la info del TIEMPO");
    });

    //let info_tiempo = obtenerInfoTiempo();
    mostarInfoTiempo(info_tiempo);
}

function mostarInfoTiempo (info_tiempo)
{
    //TODO: mostrar en el DOM la info recibida

    //
    console.log(`mostarInfoTiempo`);
    console.log(info_tiempo.weather[0].description);
    let descripcion = info_tiempo.weather[0].description;
    let icono = info_tiempo.weather[0].icon;
    let temperatura = info_tiempo.main.temp;
    let sensacion_termica = info_tiempo.main.feels_like;
    let humedad = info_tiempo.main.humidity;
    let viento = info_tiempo.wind.speed;
    let tamanecer = info_tiempo.sys.sunrise;
    let tanochecer = info_tiempo.sys.sunset;
    let localidad = info_tiempo.name;
    console.log("mostrando datos");
    let lista_spans = document.getElementsByTagName('span');
    lista_spans[4].innerHTML = descripcion.toUpperCase();
    lista_spans[3].firstChild.src = "https://openweathermap.org/img/wn/"+icono+"@2x.png";
    lista_spans[5].innerHTML = "Temperatura " + temperatura + " Cº";
    lista_spans[6].innerHTML = "Sensación terminca " + sensacion_termica +" Cº";
    lista_spans[7].innerHTML = "Humedad " +humedad;
    lista_spans[8].innerHTML = "Viento " +viento;
    lista_spans[9].innerHTML = "Hora amanecer " +tamanecer;
    lista_spans[10].innerHTML = "Hora anochecer " +tanochecer;

    document.getElementById("info_tiempo").hidden=false;
    //TODO: MEJORAR LA PRESETANCIÓN DE LOCALIDAD Y EL ICONO
    //TODO: TRADUCIR A FECHA ACTUAL LOS TIMESTAMP DE UNIX

}

function obtenerInfoTiempo ()
{
    let eltiempo =  
        {
            "coord": {
                "lon": -3.7526,
                "lat": 40.2331
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "algo de nubes",
                    "icon": "02d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 16.18,
                "feels_like": 14.92,
                "temp_min": 14.72,
                "temp_max": 17.01,
                "pressure": 1016,
                "humidity": 41
            },
            "visibility": 10000,
            "wind": {
                "speed": 3.09,
                "deg": 170
            },
            "clouds": {
                "all": 20
            },
            "dt": 1677082612,
            "sys": {
                "type": 1,
                "id": 6409,
                "country": "ES",
                "sunrise": 1677049179,
                "sunset": 1677088669
            },
            "timezone": 3600,
            "id": 3114256,
            "name": "Parla",
            "cod": 200
        }

        return eltiempo;
 
}