//https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=40.233004&lon=-3.75266&appid=8f569316277558a9fd34faf095e65f12

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
}

function fracaso ()
{
    alert("No es posible determinar su ubicación en este dispositivo");
}