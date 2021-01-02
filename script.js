$(document).ready(function () {

  function cityWeather(city) {
    //API, key, url and enabling code
    var APIKey = "7eff741c1a94b0f8bcc6b8b9830f7777";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


    // for today's forecast
    $.ajax({
      method: "GET",
      url: queryURL,
    }).then(function (response) {

      if (history.indexOf(city) === -1) {
        history.push(city);
        window.localStorage.setItem("history", JSON.stringify(history));
        makeRow(city);
      }
      console.log(localStorage);


      // stores data from API here
      var cityName = $("<h1>").text(response.name);
      var wind = $("<h4>").text("Wind Speed: " + response.wind.speed);
      var humidity = $("<h4>").text("Humidity: " + response.main.humidity);
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $("<h4>").text("Temperature" + tempF);
      // var uvData = coming soon


      //pushes to index
      $(".city-info").empty();
      $(".city-info").append(cityName, wind, humidity, tempF);
      getForecast(response.coord.lat, response.coord.lon)
    });
  }


  // onclick function makes the city search button work
  $("#city-search").on("click", function (event) {
    event.preventDefault();
    var searchedCity = $("#searchable").val().trim();
    cityWeather(searchedCity);

  });
  function makeRow(city) {
    var li = $("<li>").addClass("list-group-item list-group-item-active").text(city);
    $(".history").append(li)
  }

  $(".history").on("click", "li", function () {
    cityWeather($(this).text())
  });
  //Function for five day forecast
  function getForecast(lat, lon) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=7eff741c1a94b0f8bcc6b8b9830f7777&units=imperial"

    // for five day forcast
    $("#five-days > div").remove();
    $.ajax({
      url: fiveDayURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      for (var i = 1; i < 6; i++) {
        console.log(response.daily[i]);
        var res = response.daily[i]

        // build cards here
        
        var temp2 = $("<p>").text("Temperature: " + res.temp.day);
        var hum2 = $("<p>").text("Humidity: " + res.humidity);
        var fiveDayCard = $("<div class='card col-2'>");


        //fiveDayCard.append(today);
       
        fiveDayCard.append(temp2);
        fiveDayCard.append(hum2);
        $("#five-days").append(fiveDayCard);
      }
    })
  }

  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }

});