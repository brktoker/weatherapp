<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6">
      <router-link :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-cloud-sun text-2xl sun"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </router-link>
      <div class="flex justify-end ml-auto gap-3">
        <i class="fa-solid fa-circle-info text-2xl info" @click="modalOpen"></i>
        <i
          class="fa-solid fa-circle-plus text-2xl plus"
          @click="addCityToStorage"
          v-if="$route.query.preview"
        ></i>
      </div>
    </nav>
    <Modal :modal-active="modalActive" @modal-close="modalActive = false">
      <div class="text-black">
        <h1 class="text-2xl mb-1">About:</h1>
        <p class="mb-4">
          The Local Weather allows you to track the current and future weather of cities of your
          choosing.
        </p>
        <h2 class="text-2xl">How it works:</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>Search for your city by entering the name into the search bar.</li>
          <li>
            Select a city within the results, this will take you to the current weather for your
            selection.
          </li>
          <li>
            Track the city by clicking on the "+" icon in the top right. This will save the city to
            view at a later time on the home page.
          </li>
        </ol>

        <h2 class="text-2xl">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select the city within the home page. At the
          bottom of the page, there will be am option to delete the city.
        </p>
      </div>
    </Modal>
  </header>
</template>

<script setup>
// import { uid } from 'uid'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Modal from './Modal.vue'

const $route = useRoute()
const $router = useRouter()

const modalActive = ref(false)
const savedCities = ref([])

const addCityToStorage = () => {
  const locationObj = {
    id: Date.now(),
    state: $route.params.state,
    city: $route.params.city,
    coords: {
      lat: $route.query.lat,
      lng: $route.query.lng
    }
  }

  const storageCities = JSON.parse(localStorage.getItem('savedCities'))
  if (
    storageCities &&
    storageCities?.find((c) => c.state == locationObj.state && c.city == locationObj.city)
  ) {
    alert('This City & State added to storage before')
    return
  }

  savedCities.value = JSON.parse(localStorage.getItem('savedCities')) || []
  savedCities.value.push(locationObj)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
  alert('Weather of city added successfully to storage')
}

const modalOpen = () => {
  modalActive.value = !modalActive.value
}
</script>

<style scoped>
.sun {
  transition: all 0.9s;
}
.sun:hover {
  color: #ffd43b;
  transform: scale(1.5);
}
.info {
  transition: all 0.9s;
}
.info:hover {
  color: #ffd43b;
  cursor: pointer;
  transform: scale(1.2);
}
.plus {
  transition: all 0.9s;
}
.plus:hover {
  color: rgb(48, 7, 144);
  cursor: pointer;
}
</style>
