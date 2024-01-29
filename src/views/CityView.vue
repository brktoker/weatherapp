<template>
  <div>
    <Suspense>
      <AsynCityView />
      <template #fallback>
        <h2 class="text-center">...loading</h2>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsynCityView from '@/components/AsynCityView.vue'
</script>
