$(document).ready(() => {
  // Initialize variables
  let cityName = "";
  let lat = "";
  let lon = "";

  // Function to fetch weather data from the One Call API
  const getWeatherOneAPI = (a, b) => {
    const queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&exclude=minutely,hourly&appid=a09e97532615886e279946fa86153a71&units=imperial`;

    // Make AJAX request to fetch weather data
    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then((response) => {
      console.log(response);
      $(".card-deck").empty();

      // Display current weather data
      const icon = response.current.weather[0].icon;
      const iconImg = $("<img>")
        .addClass("img-fluid")
        .attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
      $("#city").append(iconImg);
      const uvi = parseInt(response.current.uvi);
      const color = $(".color");
      // Set UV Index color based on value
      if (uvi <= 2) {
        color.css({ "background-color": "green", color: "white" });
      } else if (uvi >= 3 && uvi <= 5) {
        color.css({ "background-color": "yellow", color: "black" });
      } else if (uvi >= 6 && uvi <= 7) {
        color.css({ "background-color": "orange" });
      } else if (uvi >= 8 && uvi <= 10) {
        color.css({ "background-color": "red", color: "white" });
      } else if (uvi >= 11) {
        color.css({ "background-color": "violet", color: "white" });
      }
      $("#temp").text(`Temperature: ${response.current.temp}° F`);
      $("#humidity").text(`Humidity: ${response.current.humidity}%`);
      $("#wind").text(`Wind Speed: ${response.current.wind_speed} MPH`);
      color.text(response.current.uvi);
      $("#current").css({ display: "block" });

      // Display 5-day forecast
      const daily = response.daily;
      for (let i = 1; i < daily.length - 2; i++) {
        const dailyDate = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
        const dailyTemp = daily[i].temp.day;
        const dailyHum = daily[i].humidity;
        const dailyIcon = daily[i].weather[0].icon;

        const dailyDiv = $("<div class='card text-white bg-primary p-2'>");
        const pTemp = $("<p>").text(`Temp: ${dailyTemp}° F`);
        const pHum = $("<p>").text(`Humidity: ${dailyHum}%`);
        const imgIcon = $("<img>")
          .attr("src", `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`)
          .addClass("img-fluid")
          .css({ width: "100%" });
        const hDate = $("<h6>").text(dailyDate);

        dailyDiv.append(hDate);
        dailyDiv.append(imgIcon);
        dailyDiv.append(pTemp);
        dailyDiv.append(pHum);
        $(".card-deck").append(dailyDiv);
        $("#five-day").css({ display: "block" });
      }
    });
  };

  // Function to fetch current weather data
  const getWeather = () => {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=a09e97532615886e279946fa86153a71`;

    // Make AJAX request to fetch current weather data
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then((response) => {
      lat = response.coord.lat;
      lon = response.coord.lon;
      $("#city").text(response.name);
      $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));
      localStorage.setItem("cityname", response.name);
      getWeatherOneAPI(lat, lon);
    });
  };

  // Function to initialize the app
  const init = () => {
    cityName = localStorage.getItem("cityname");
    if (cityName !== null) {
      const cityList = $("<button>")
        .addClass("list-group-item list-group-item-action")
        .text(cityName);
      $("ul").prepend(cityList);
      getWeather();
    }
  };

  // Function to handle search button click
  const searchButton = () => {
    cityName = $("input").val().trim();
    const cityList = $("<button>")
      .addClass("list-group-item list-group-item-action")
      .text(cityName);
    $("ul").prepend(cityList);
    $("input").val("");
    getWeather();
  };

  // Initialize the app
  init();

  // Event listener for form submission
  $("#city-form").submit((event) => {
    event.preventDefault();
    searchButton();
  });

  // Event listener for search button click
  $("#form-submit").click((event) => {
    event.preventDefault();
    searchButton();
  });

  // Event listener for city list button click
  $("ul").on("click", "button", function () {
    cityName = $(this).text();
    getWeather();
  });

  // Error handling for AJAX requests
  $(document).ajaxError(() => {
    const error = $("<p>")
      .addClass("error")
      .css({ color: "red" })
      .text("Please try again with a valid city");
    $("ul").prepend(error);
    const p = $(this).find("button");
    p[1].remove();
    setTimeout(() => {
      error.remove();
    }, 2000);
  });
});
