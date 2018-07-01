var currentLocation = undefined;

function getWeather() {
    if (currentLocation == undefined) {
        console.info("Info: Location is unknown, try to retrive it");
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    currentLocation = position.coords.latitude + "," + position.coords.longitude;
                    console.log("Retrived location: " + currentLocation);
                },
                function(error){
                    console.log("Error: " + error);
                }
            );
        } else {
            currentLocation = "Austin, TX";
        }
    }
    
/*    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadWeather(position.coords.latitude + "," + position.coords.longitude, "");
        });
    } else {
        loadWeather("Austin, TX", "");
    }
*/
    if (currentLocation != undefined) {
        loadWeather(currentLocation, "");
    } else {
        console.warn("Can`t retrive weather information until I know my location")
    }
}


function loadWeather(location, woeid) {
    console.log("Location: " + location);
    
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: "c",
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + "&deg";
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg" />';
            wind = "<p>" + weather.wind.speed + "</p><p>" + weather.units.speed + "</p>";
            humidity = weather.humidity + " %";
            
            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        
        error: function(error) {
            console.log("Error: " + error);
        }
    });
}

$(document).ready(function() {
    getWeather();
    window.setInterval(getWeather, 10000);
});
