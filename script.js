const APIKEY = `a78b7f83a1c6862c50bfe503c1960ca6`;
const dias =  [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
];
const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

let weather = {
    fetchWeather: function (ciudad) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKEY}`;
        fetch(URL).then((response) => {
            if (!response.ok) {
                alert("No se ha encontrado información del clima.");
                throw new Error("No se ha encontrado información del clima!");
            }
            return response.json();
        }).then((data) => this.MostrarClima(data));
    },
    mostarFecha: function () {
        const fecha = new Date();
        const hoy = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const dia = dias[fecha.getDay()];
        document.querySelector(".date").innerText = dia + ", " + mes + " " +  hoy;
    },
    MostrarClima: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, temp_min, temp_max, pressure, humidity } = data.main;
        const {speed, gust } = data.wind;
        document.querySelector(".city").innerText = "Estado del tiempo en " + name;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C ";
        document.querySelector(".max").innerText = "Max: " + temp_max + "°C";
        document.querySelector(".min").innerText = "Min: " + temp_min + "°C";
        document.querySelector(".termic-sensation").innerText = "Sensación térmica: " + feels_like + "°C";
        document.querySelector(".pressure").innerText = pressure + " hPa";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed + " km/h";
        document.querySelector(".gust").innerText = gust;
        document.body.style.backgroundImage = 
            "url('https://source.unsplash.com/1600x900/?" + description + "')";
        this.mostarFecha();
    },
    search: function() { 
        this.fetchWeather(document.querySelector(".srch-bar").value);
    }
}

document.querySelector(".search i").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".srch-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Tokyo");