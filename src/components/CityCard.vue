<template>
  <div class="flex py-3 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer items-center">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex items-center">
      <img
        class="w-[100px] h-auto"
        :src="`http://openweathermap.org/img/wn/${city?.weather?.weather[0].icon}@2x.png`"
        alt=""
        height="100"
        width="100"
      />

      <div class="flex flex-col gap-1">
        <p class="text-3xl self-end" style="font-size: 3rem !important">
          {{ Math.round(city.weather.main.temp) }}&deg;
        </p>
        <hr />
        <div class="flex gap-2">
          <span class="text-xs">
            H:
            {{ Math.round(city.weather.main.temp_max) }}&deg;
          </span>
          <span class="text-xs">
            L:
            {{ Math.round(city.weather.main.temp_min) }}&deg;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {}
  }
})
</script>
