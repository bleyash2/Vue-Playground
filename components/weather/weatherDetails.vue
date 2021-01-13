<template>
  <div class="weatherDetails">
    <div class="detailsLeft">
      <img
        alt=""
        v-bind:src="`http://openweathermap.org/img/wn/${$store.state.weatherData.current.weather[0].icon}@4x.png`"
      />
      <h1 class="temperature">
        {{ $store.state.weatherData.current.temp | celcius }}
      </h1>
    </div>
    <div class="detailsRight">
      <h5>
        {{ `Precipitation: ${$store.state.weatherData.current.clouds}%` }}
      </h5>
      <h5>{{ `Humidity: ${$store.state.weatherData.current.humidity}%` }}</h5>
      <h5>
        Wind: {{ $store.state.weatherData.current.wind_speed | windSpeed }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    celcius: function (value) {
      return `${Math.round(parseFloat(value) - 273.15)}°C`
    },
    windSpeed: function (value) {
      return `${(parseFloat(value) * 3.6).toPrecision(2)} km/h`
    },
  },
}
</script>

<style>
.weatherWrapper .day {
  margin: 0;
  color: #9b9b9b;
  font-weight: 400;
}

.weatherWrapper .weather {
  margin: 0;
  color: #9b9b9b;
  font-weight: 400;
  text-transform: capitalize;
}

.weatherWrapper .weatherDetails {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1rem;
}

.weatherWrapper .weatherDetails .detailsLeft {
  flex-direction: row;
  display: flex;
}

.weatherWrapper .weatherDetails .detailsRight {
  flex-direction: column;
  display: flex;
  justify-content: space-around;
}

.weatherWrapper .weatherDetails .detailsRight h5 {
  margin: 5px;
  font-weight: 500;
}
</style>
