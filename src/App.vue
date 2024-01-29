<script setup>
import Nav from '@/components/Nav.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    class="flex flex-col min-h-screen font-Poor_Story bg-weather-primary text-fontSize text-white"
  >
    <Nav />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
/* body {
  font-family: 'Poor Story', system-ui !important;
  font-weight: 600;
  font-style: normal;
  font-size: 1.2rem !important;
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
