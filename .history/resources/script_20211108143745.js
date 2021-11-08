let apiKey = '460522f216939cb477f8b66006be7948' // jusu api key
let lang = 'lt' // kalba
let units = 'metric' // naudojama metrine sistema
let city = 'Vilnius' // miestas irasytas inpute

let cityName = document.getElementById('city')
let searchButton = document.getElementById('search')

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener('click', getDataFromApi)

// funkcija kuri gauna duomenis is API
function getDataFromApi() {
    // paimu irasyta miesta is input ir nustatau
    city = cityName.value

    // url yra skirtas pasiimti duomenis is api
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city +
        '&units=' + units +
        '&lang=' + lang +
        '&appid=' + apiKey

    // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
    fetch(url)
        .then(response => response.json())
        // data => jusu kodas
        .then(function (data) {
            //paduodu gautus duomenis i funkcija
            showWeatherInDom(data)
        });
}


document.getElementById("wrapper2").style.display = 'none';



// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
    // tikrinu ar mano response yra geras
    if (data.cod === '200') {

    // /prognoze siai dienai

        document.getElementById("pirmas").innerHTML =  data.city.name;
        document.getElementById("antras").innerHTML = "Temperatūra: " + Math.round(data.list[0].main.temp) +" °C / " + "Jaučiama:  " + Math.round(data.list[0].main.feels_like) +" °C";
        document.getElementById("trecias").innerHTML = "Vėjo greitis: " + data.list[0].wind.speed + " m/s";
        document.getElementById("ketvirtas").innerHTML = data.list[0].weather[0].description;


        let iconCode =  data.list[0].weather[0].icon;
        let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        let image = document.getElementById("penktas");
        image.src = iconUrl;

        console.log(data.list)

        //prognoze rytoj

        document.getElementById("sestas").innerHTML =  "Temperatūra: " + Math.round(data.list[6].main.temp) +" °C / " + "Jaučiama:  " + Math.round(data.list[6].main.feels_like) +" °C";
        document.getElementById("septintas").innerHTML = "Vėjo greitis: " + data.list[6].wind.speed + " m/s";
        document.getElementById("astuntas").innerHTML = data.list[6].weather[0].description;

        let iconCode2 =  data.list[6].weather[0].icon;
        let image2 = document.getElementById("sesto-icon");
        let iconUrl2 = 'http://openweathermap.org/img/wn/' + iconCode2 + '@2x.png';
        image2.src = iconUrl2;

     //prognoze poryt

        document.getElementById("devintas").innerHTML =  "Temperatūra: " + Math.round(data.list[14].main.temp) +" °C / " + "Jaučiama:  " + Math.round(data.list[14].main.feels_like) +" °C";
        document.getElementById("desimtas").innerHTML = "Vėjo greitis: " + data.list[14].wind.speed + " m/s";
        document.getElementById("vienuoliktas").innerHTML = data.list[14].weather[0].description;

        let iconCode3 =  data.list[14].weather[0].icon;
        let image3 = document.getElementById("devinto-icon");
        let iconUrl3 = 'http://openweathermap.org/img/wn/' + iconCode3 + '@2x.png';
        image3.src = iconUrl3;

     //prognoze po 2 dienu

        document.getElementById("dvyliktas").innerHTML =  "Temperatūra: " + Math.round(data.list[22].main.temp) +" °C / " + "Jaučiama:  " + Math.round(data.list[22].main.feels_like) +" °C";
        document.getElementById("tryliktas").innerHTML = "Vėjo greitis: " + data.list[22].wind.speed + " m/s";
        document.getElementById("keturioliktas").innerHTML = data.list[22].weather[0].description;

        let iconCode4 =  data.list[22].weather[0].icon;
        let image4 = document.getElementById("dvylikto-icon");
        let iconUrl4 = 'http://openweathermap.org/img/wn/' + iconCode4 + '@2x.png';
        image4.src = iconUrl4;

        let prognozemygtukas = document.createElement('<button id="prognoze">Prognozė</button>')
        document.getElementById("wrapper1").appendChild(prognozemygtukas)

        
        document.getElementById("wrapper1").appendChild('div')
        document.getElementById("h1").textContent = "Prognozė";
        document.getElementById("h4-1").innerHTML = data.list[6].dt_txt;
        document.getElementById("h4-2").textContent = data.list[14].dt_txt;
        document.getElementById("h4-3").textContent = data.list[22].dt_txt;

        //Šios dienos data
        let dt = new Date();
        document.getElementById("datetime").innerHTML = "Data: " + dt.toLocaleString();

    } else {
        console.log('Kazkas negerai', data)
    }
}

//miesto pasirinkimas Enter mygtuku

let input = document.getElementById("city");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search").click();
    }
});

//prognozes langas appear/dissapear

function tomorrowWeatherDiv() {

    const wrapperis = document.getElementById('wrapper2');
    if (wrapperis.style.display !== "none") {
        wrapperis.style.display = "none";
    }else {
        wrapperis.style.display = "block";
        }
    }
document.getElementById("prognoze").addEventListener('click', tomorrowWeatherDiv)

