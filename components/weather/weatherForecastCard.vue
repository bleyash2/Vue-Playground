<template>
  <div className="forecastCard">
    <img
      v-bind:src="`http://openweathermap.org/img/wn/${$props.weather.weather[0].icon}@2x.png`"
      alt=""
    />
    <h6>
      {{ $props.weather.temp.max | celcius }}
      <span className="low">| {{ $props.weather.temp.min }}</span>
    </h6>
  </div>
</template>

<script>
export default {
  props: {
    weather: {
      dt: Number,
      temp: {
        day: Number,
        min: Number,
        max: Number,
      },
      weather: {
        id: Number,
        main: String,
        description: String,
        icon: String,
      },
    },
  },
  filters: {
    celcius: function (value) {
      return `${Math.round(parseFloat(value) - 273.15)}°C`
    },
  },
}
</script>

<style>
.weatherWrapper .forecast .forecastCard {
  align-content: center;
  text-align: center;
  display: flex;
  margin: 0 1rem;
  width: 100px;
  flex-direction: column;
}

.weatherWrapper .forecast .forecastCard h6 {
  margin: 0;
}

.weatherWrapper .forecast .forecastCard .low {
  color: #9b9b9b;
}

.weatherWrapper .forecast {
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 1rem;
}
</style>
