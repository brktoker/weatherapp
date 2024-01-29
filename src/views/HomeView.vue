<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-2 w-full bg-transparent border-b search_input focus:shadow-[0px_1px_0_0_#004E71] focus:border-weather-secondary;"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-2 top-[66px]"
        v-if="mapSearchResult"
      >
        <p class="py-2" v-if="searchError">Sorry, something wen wrong, please try again</p>
        <p v-else-if="!searchError && mapSearchResult.length === 0">
          No results match your query, try different term
        </p>
        <li
          v-for="sr in mapSearchResult"
          :key="sr.id"
          class="cursor-pointer hover:bg-opacity-5 hover:bg-white"
          @click="selectedSearchResult(sr)"
          v-else
        >
          {{ sr.place_name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback> ...loading </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityList from '@/components/CityList.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

const searchQuery = ref('')
const queryTimeout = ref(null)
const mapSearchResult = ref(null)
const searchError = ref(false)
const mapboxAPIKey =
  'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q'

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value.length == 0) {
      mapSearchResult.value = null
    }
    if (searchQuery.value !== '' && searchQuery.value.length > 2) {
      const result = await axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        )
        .then((res) => {
          searchError.value = false
          if (res.data?.features) {
            mapSearchResult.value = res.data?.features
          } else {
            mapSearchResult.value = null
          }
        })
        .catch((err) => {
          searchError.value = true
          console.log(err)
        })
    }
  }, 300)
}

const selectedSearchResult = (sr) => {
  const [city, state, country] = sr?.place_name?.split(',')

  if (city && state) {
    $router.push({
      name: 'CityView',
      params: {
        state: state.replace(' ', ''),
        city: city.replace(' ', '')
      },
      query: {
        lat: sr?.geometry?.coordinates[1],
        lng: sr?.geometry?.coordinates[0],
        preview: true
      }
    })
  }
}
</script>

<style scoped>
.search_input {
  transition: all 0.5s;
}
.search_input:focus {
  outline: none;
  background-color: azure;
  color: black !important;
  opacity: 0.7;
  border-radius: 5px;
}
</style>
