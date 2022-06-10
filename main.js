let city = document.querySelector("input");
let btn = document.querySelector(".search button");
let numMax = document.querySelector(".num .max");
let numMin = document.querySelector(".num .min");
let txt = document.querySelector(".city");
let icon = document.querySelector(".icon");
let cityValue = city.value;
let weather = {
    apiKey: "0e2f740fb3c72c42d7c19ef224fe684c",

    fetchData: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => response.json())
            .then((data) => {
                numMax.innerHTML = "Max temp. :" + data.main.temp_max.toFixed(0) + "c";
                numMin.innerHTML = "Min temp. :" + data.main.temp_min.toFixed(0) + "c";
                let desc = document.querySelector(".desc");
                desc.innerText = data.weather[0].description;
                let img = document.querySelector(".icon img");
                img.src =
                    "http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png";
            });
    },
};
btn.onclick = function() {
    if (city.value === "") {
        swal("warning", "The input value empty!", "warning");
    } else {
        weather.fetchData(city.value);
        txt.innerHTML = city.value.toUpperCase();
    }
    city.value = "";
};
let currentBtn = document.querySelector(".box .current");
currentBtn.onclick = function() {
    // get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            //get city name from lat and lon
            fetch(
                    "https://api.openweathermap.org/data/2.5/weather?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&appid=" +
                    weather.apiKey
                )
                .then((response) => response.json())
                .then((data) => {
                    txt.innerHTML = data.name.toUpperCase();
                    numMax.innerHTML =
                        "Max: " +
                        data.main.temp_max.toFixed(0).split("").slice(0, 2).join("") +
                        " c";
                    numMin.innerHTML =
                        "Min: " +
                        data.main.temp_min.toFixed(0).split("").slice(0, 2).join("") +
                        " c";
                    let desc = document.querySelector(".desc");
                    desc.innerText = data.weather[0].description;
                    let img = document.querySelector(".icon img");
                    img.src =
                        "http://openweathermap.org/img/wn/" +
                        data.weather[0].icon +
                        "@2x.png";
                });
        });
    }
};
