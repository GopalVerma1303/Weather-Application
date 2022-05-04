const date = new Date();

const currentYear = date.getFullYear();
console.log(currentYear); //2020

const currentDate = date.getDate();
const currentMonthIndex = date.getMonth();
console.log(currentMonthIndex);

const currentDayIndex = date.getDay();
console.log(currentDayIndex);

days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currentDay = (days[currentDayIndex]);
const currentMonth = (months[currentMonthIndex]);

document.querySelector(".day").innerHTML = currentDay;

DMYstring = currentDate + " " + currentMonth + " " + currentYear;

document.querySelector(".dmy").innerHTML = DMYstring;

// get hour value.
var hours = date.getHours();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
var minutes = date.getMinutes();
minutes = minutes < 10 ? '0' + minutes : minutes;
var myTime = hours + ":" + minutes + " " + ampm;
console.log(myTime);
document.querySelector(".hm").innerHTML = myTime;

//getting user location
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = src = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=6f723d3721bb43aa8f1f94e4483820f6`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const cityNameByApi = data.results[0].components.city;
                const address = (data.results[0].components.city) + ", " + (data.results[0].components.state);
                document.getElementById("address").innerHTML = "<i class=\"fa-solid fa-location-dot\"></i>" + " " + address;
                console.log(data);

                //updating all the info according to api
                document.getElementById("myText").value = cityNameByApi;

                //fetching weather information
                const apiKey = "e65d72a546f500e586481b8ce2477afe"
                const unit = "metric"
                const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameByApi + "&units=" + unit + "&appid=" + apiKey
                fetch(urlWeather)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const weatherID = data.weather[0].id;
                        if (weatherID >= 200 && weatherID <= 232) iconString = "<i class=\"fa-solid fa-cloud-bolt\"></i>";
                        if (weatherID >= 300 && weatherID <= 321) iconString = "<i class=\"fa-solid fa-cloud-drizzle\"></i>";
                        if (weatherID >= 500 && weatherID <= 531) iconString = "<i class=\"fa-solid fa-cloud-showers-heavy\"></i>";
                        if (weatherID >= 600 && weatherID <= 622) iconString = "<i class=\"fa-solid fa-snowflake\"></i>";
                        if (weatherID >= 701 && weatherID <= 781) iconString = "<i class=\"fa-solid fa-smog\"></i>";
                        if (weatherID == 800) iconString = "<i class=\"fa-solid fa-sun\"></i>";
                        if (weatherID >= 801 && weatherID <= 804) iconString = "<i class=\"fa-solid fa-clouds\"></i>";

                        const cityLon = data.coord.lon;
                        const cityLat = data.coord.lat;
                        const cityTemp = data.main.temp + " °C";
                        const weatherDescription = data.weather[0].description;
                        const cityHumidity = data.main.humidity + " %";
                        const cityWindspeed = data.wind.speed + " km/h";
                        const icon = data.weather[0].icon
                        const cityPressure = data.main.pressure + " hPa";
                        const cityMintemp = data.main.temp_min + " °C";
                        const cityMaxtemp = data.main.temp_max + " °C";
                        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                        document.getElementById("hum").textContent = cityHumidity;
                        document.getElementById("win").textContent = cityWindspeed;
                        document.getElementById("pre").textContent = cityPressure;
                        document.getElementById("minT").textContent = cityMintemp;
                        document.getElementById("maxT").textContent = cityMaxtemp;
                        document.getElementById("temp").textContent = cityTemp;
                        document.getElementById("disc").innerHTML = iconString + " " + weatherDescription;
                    })
            })
            .catch(err => console.warn(err.message));
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;
    });
} else {
    console.log('geolocation not available');
}

function myFunction() {
    const cityName = document.querySelector("input").value;
    const apiKey = "e65d72a546f500e586481b8ce2477afe"
    const unit = "metric"
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=" + apiKey
    fetch(urlWeather)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const weatherID = data.weather[0].id;
            if (weatherID >= 200 && weatherID <= 232) iconString = "<i class=\"fa-solid fa-cloud-bolt\"></i>";
            if (weatherID >= 300 && weatherID <= 321) iconString = "<i class=\"fa-solid fa-cloud-drizzle\"></i>";
            if (weatherID >= 500 && weatherID <= 531) iconString = "<i class=\"fa-solid fa-cloud-showers-heavy\"></i>";
            if (weatherID >= 600 && weatherID <= 622) iconString = "<i class=\"fa-solid fa-snowflake\"></i>";
            if (weatherID >= 701 && weatherID <= 781) iconString = "<i class=\"fa-solid fa-smog\"></i>";
            if (weatherID == 800) iconString = "<i class=\"fa-solid fa-sun\"></i>";
            if (weatherID >= 801 && weatherID <= 804) iconString = "<i class=\"fa-solid fa-clouds\"></i>";

            const cityLon = data.coord.lon;
            const cityLat = data.coord.lat;
            const cityTemp = data.main.temp + " °C";
            const weatherDescription = data.weather[0].description;
            const cityHumidity = data.main.humidity + " %";
            const cityWindspeed = data.wind.speed + " km/h";
            const icon = data.weather[0].icon
            const cityPressure = data.main.pressure + " hPa";
            const cityMintemp = data.main.temp_min + " °C";
            const cityMaxtemp = data.main.temp_max + " °C";
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            document.getElementById("hum").textContent = cityHumidity;
            document.getElementById("win").textContent = cityWindspeed;
            document.getElementById("pre").textContent = cityPressure;
            document.getElementById("minT").textContent = cityMintemp;
            document.getElementById("maxT").textContent = cityMaxtemp;
            document.getElementById("temp").textContent = cityTemp;
            document.getElementById("disc").innerHTML = iconString + " " + weatherDescription;

            const url = src = `https://api.opencagedata.com/geocode/v1/json?q=${cityLat}+${cityLon}&key=6f723d3721bb43aa8f1f94e4483820f6`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const cityNameByApi = data.results[0].components.city;
                    const address = (data.results[0].components.city) + ", " + (data.results[0].components.state);
                    document.getElementById("address").innerHTML = "<i class=\"fa-solid fa-location-dot\"></i>" + " " + address;
                    console.log(data);
                    //updating all the info according to api
                    document.getElementById("myText").value = cityNameByApi;
                    const timeStamp = data.timestamp.created_http;
                    const dayoftheplace = timeStamp.slice(0, 3);
                    const dmy = timeStamp.slice(4, timeStamp.length-13);
                    const timeZone = timeStamp.slice(timeStamp.length-12, timeStamp.length);
                    document.getElementById("dayoftheplace").innerHTML = dayoftheplace;
                    document.getElementById("dmyoftheplace").innerHTML = dmy;
                    document.getElementById("timeoftheplace").innerHTML = timeZone;
                })

        })

    // const forwardGeolocationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;
    // fetch(forwardGeolocationUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
}