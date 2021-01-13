<template>
  <div class="weatherWrapper">
    <NuxtLink to="/">Go Back</NuxtLink>
    <h3 v-if="$fetchState.pending">Loading</h3>
    <div v-else class="weather">
      <div class="weatherTop">
        <div class="locationInfo">
          <h2 class="location">
            {{ $store.state.currentLocation.name }}
          </h2>
          <h4 class="weather">
            {{
              $store.state.weatherData.current.weather[0].description
                | titleCase
            }}
          </h4>
        </div>
      </div>
      <WeatherDetails />
      <div class="forecast">
        <WeatherForecastCard
          v-for="(weather, index) in $store.state.weatherData.daily"
          :key="index"
          v-bind:weather="weather"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import weatherDetails from '../../components/weather/weatherDetails.vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    weatherData: {},
    currentLocation: {
      id: 2158177,
      name: 'Melbourne',
      state: '',
      country: 'AU',
      coord: {
        lon: 144.963318,
        lat: -37.813999,
      },
    },
  },
  mutations: {
    setWeatherData(state, payload) {
      state.weatherData = payload.weatherData
    },
  },
})

export default {
  components: { weatherDetails },
  store: store,

  async fetch() {
    const { lon, lat } = store.state.currentLocation.coord
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${'d1e482dcfd9f8bf42f1f8153de6342d0'}`
    )
    const response = await weatherData.json()
    store.commit('setWeatherData', { weatherData: response })
    console.log(response)
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    titleCase: function (value) {
      let splitStr = value.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
  },
}
</script>

<style>
.weatherWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.weatherWrapper .weatherTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.weather .weatherTop .locationInfo {
  display: flex;
  flex-direction: column;
}

.weatherWrapper .location {
  margin: 0;
  color: #9b9b9b;
  font-weight: 400;
}
</style>
