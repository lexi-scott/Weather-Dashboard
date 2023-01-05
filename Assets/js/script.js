const apiKey = '7a8503677fe4d816592c7b014b3e2cdc'
const savedCities = [];
//run clock at header of page
function clock() {
    var realDateAndTime = dayjs().format("MMMM DD, YYYY - HH:mm:ss");
    $('#currentDay').text(realDateAndTime);
}
    //run function to call weather API and dynamically call HTML
    $('form').submit(function(event) {
        event.preventDefault();
        var citySearch = $(this).find('.form-control').val();
        savedCities.push($.trim(citySearch));

        localStorage.setItem("Cities", JSON.stringify(savedCities));
        var storedCities = JSON.parse(localStorage.getItem('Cities'));
        console.log(storedCities)

        $('.5dayForecast').empty();
        $('.city-weather').empty();
    //fetch for the 5day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid='+apiKey+'&units=imperial').then(response => response.json()) 
    .then(apiResults => {

        var lat = apiResults.city.coord.lat
        var lon = apiResults.city.coord.lon
        console.log(lat, lon)
    //adds the previous search cities as a button 
        if (apiResults.cod == 200) {
        function renderCities() {
            // Render a new li for each city
              var city = citySearch;
                $(document).ready(function() {
                    $('<li id="savedCityBtn"><button class="btn-styled" type="button">' + city + '</li></button>').appendTo('.savedCities');
                });
          }
        renderCities();
        }
           //creates the cards for the 5day forecast
           const liTemp = $("<li>").addClass("list-group-item temp")
           const liWind = $("<li>").addClass("list-group-item wind")
           const liHumidity = $("<li>").addClass("list-group-item humidity")
           const fiveDayHeader = $("<div>").addClass("card-header")
           const fdcContainer = $("<div>").addClass("fivecard row")
   
           for (var i = 1; i < apiResults.list.length; i = i+8) {
               console.log(apiResults.list[i].main.temp)
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
        
            $('#header-0').text(`${apiRezz.name} http://openweathermap.org/img/wn/${apiRezz.weather[0].icon}@2x.png`)
            $('#temp-0').text(`Temperature: ${apiRezz.main.temp}F `)
            $('#wind-0').text(`Wind: ${apiRezz.wind.speed} MPH`)
            $('#humidity-0').text(`Humidity: ${apiRezz.main.humidity}`)

        
        })

    })
  
    })

    setInterval(clock, 1000);
 