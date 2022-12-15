//need lat and long re city from user
//change link to pass in variable for lat and long and add in API Key
//7a8503677fe4d816592c7b014b3e2cdc --API KEY 


var apiKey = '7a8503677fe4d816592c7b014b3e2cdc'


//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//use dayJS for the date and time at the top 

//use bootstrap for the layout 

// link for weather icon http://openweathermap.org/img/wn/10d@2x.png sub out '10d' for 

// fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid='+apiKey+'&units=imperial').then(response => response.json()) 
// .then(apiResults => {
//     console.log(apiResults);
    // var body = ""
    // for (var i = 0; i < apiResults.list.length; i = i+8) {
    //    body += `<div><li>${apiResults.list[i].main.temp}</li>
    //    <li>${apiResults.list[i].weather[0].icon}</li><div>`
    // }
    // document.getElementById("display").innerHTML = body
// })

function clock() {
    var realDateAndTime = dayjs().format("MMMM DD, YYYY - HH:mm:ss");
    $('#currentDay').text(realDateAndTime);
    }

    var savedCities = [];

    $('form').submit(function(event) {
        event.preventDefault();
        var citySearch = $(this).find('.form-control').val();
        console.log(citySearch);
        savedCities.push(citySearch);
        localStorage.setItem("Cities", JSON.stringify(savedCities));

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid='+apiKey+'&units=imperial').then(response => response.json()) 
    .then(apiResults => {
        $('.results').append("<div class='card'></div>").append("<div class='card-header>test</div")
    console.log(apiResults);
    console.log(apiResults.list[0].main.temp)//temp
    console.log(apiResults.list[0].weather[0].icon)//icon
    console.log(apiResults.list[0].wind.speed)//wind
    console.log(apiResults.list[0].main.humidity)//humidity


    })
    })

    setInterval(clock, 1000);

    //one call API in a function 
    //5 call for the forecast 