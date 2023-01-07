const apiKey = '7a8503677fe4d816592c7b014b3e2cdc'
const savedCities = [];
//run clock at header of page
function clock() {
    var realDateAndTime = dayjs().format("MMMM DD, YYYY - HH:mm:ss");
    $('#currentDay').text(realDateAndTime);
}
//run function to call weather API and dynamically call HTML
$('form').submit(function (event) {
    event.preventDefault();
    var citySearch = $(this).find('.form-control').val();
    savedCities.push($.trim(citySearch));
    localStorage.setItem("Cities", JSON.stringify(savedCities));
    var storedCities = JSON.parse(localStorage.getItem('Cities'));
    //fetch for the 5day forecast
    callWeather(citySearch);
})
function callWeather(citySearch) {
    $('.5dayForecast').empty();
    $('.city-weather').empty();
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=' + apiKey + '&units=imperial').then(response => response.json())
        .then(apiResults => {
            console.log(apiResults)
            var lat = apiResults.city.coord.lat
            var lon = apiResults.city.coord.lon
            console.log(lat, lon)
            //adds the previous search cities as a button 
            if (apiResults.cod == 200) {
                renderCities(citySearch);
            }
            //creates the cards for the 5day forecast
            const liTemp = $("<li>").addClass("list-group-item temp")
            const liWind = $("<li>").addClass("list-group-item wind")
            const liHumidity = $("<li>").addClass("list-group-item humidity")
            const fiveDayHeader = $("<div>").addClass("card-header")
            const fdcContainer = $("<div>").addClass("fivecard row")
            $('.5dayForecast').text("5 Day Forecast")
            $('.5dayForecast').append("<div>")

            for (var i = 1; i < apiResults.list.length; i = i + 8) {
                var tempID = ("temp-" + [i])
                var windID = ("wind-" + [i])
                var humidityID = ("humidity-" + [i])
                var headerID = ("header-" + [i])
                console.log(tempID, windID, humidityID, headerID)
                // console.log(apiResults.list[i].main.temp)
                $('.fivecard').append(fiveDayHeader).append(liTemp).append(liWind).append(liHumidity).wrap(fdcContainer)
                $('.5dayForecast').append(fdcContainer)
                
                $('.card-header').text(apiResults.city.name)
                $('.temp').text(`Temp: ${apiResults.list[i].main.temp}`)
                $('.wind').text(`Wind: ${apiResults.list[i].wind.speed}`)
                $('.humidity').text(`Humidity: ${apiResults.list[i].main.humidity}`)  

            }
            //fetch for the current forecast
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`).then(res => res.json())
                .then(apiRezz => {
                    console.log(apiRezz)
                    $('.city-weather').append("<div class='card-header' id='header-0' style='width: 100%'></div").append("<li class='list-group-item' id='temp-0'></li>").append("<li class='list-group-item' id='wind-0'></li>").append("<li class='list-group-item' id='humidity-0' </li>").wrapInner("<ul class='list-group list-group-flush'> </ul").wrapInner("<div class='card EXTREME'> </div>")
                    const icon = apiRezz.weather[0].icon
                    const iconLink = $("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png></img>")
                    const div = $("<div>").addClass("headerDiv")
                    console.log(apiRezz.weather[0].main)
                    $('#header-0').text(`${apiRezz.name}`).append(div)
                    $('.headerDiv').text(`Current Weather: ${apiRezz.weather[0].main}`).append(iconLink)
                    $('#temp-0').text(`Temperature: ${apiRezz.main.temp}F `)
                    $('#wind-0').text(`Wind: ${apiRezz.wind.speed} MPH`)
                    $('#humidity-0').text(`Humidity: ${apiRezz.main.humidity}`)
                })
        })
}
function renderCities(citySearch) {
    // Render a new li for each city
    $(document).ready(function () {
        var savedCityBtn = $('<li class="savedCityBtn"><button class="btn-styled" type="button" data-city= " ' + citySearch + '">' + citySearch + '</button></li>');
        savedCityBtn.appendTo('.savedCities')
        savedCityBtn.click(function (event) {
            callWeather($(this).find('button').data('city'))
        })
    });
}
setInterval(clock, 1000);