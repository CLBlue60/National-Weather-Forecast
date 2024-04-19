# National-Weather-Forecast

This application serves as a weather dashboard, providing users with the ability to search for a city and view its weather forecast.

The weather data is sourced from the OpenWeatherMap API.

User search history is conveniently presented in the left column. The current weather conditions are showcased prominently at the top-right section, while the forecast for the next 5 days is displayed below.

The current weather snapshot encompasses various details such as an icon representing the weather condition, the current temperature, humidity, wind speed, and UV index. The UV index is color-coded to indicate the severity level, ranging from low to severe conditions.

For the 5-day forecast, users can expect to see the date, weather icon, daily temperature, and humidity.

To enhance user experience, the application stores the last searched city in local storage. Upon revisiting the weather dashboard, users will find their last searched city preloaded with the latest weather information.

In case of an unsuccessful API call, an error message prompts users to retry their search with a valid city name. Additionally, any corresponding city buttons associated with unsuccessful searches are automatically removed.



![FireShot Capture 009 - Weather Forecast - 127 0 0 1](https://github.com/CLBlue60/National-Weather-Forecast/assets/163502624/4ec42f30-570d-4292-89f1-b5c8888bc1eb)
