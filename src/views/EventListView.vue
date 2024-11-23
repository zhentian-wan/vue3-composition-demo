<script setup>
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'

const events = ref(null)
onMounted(async () => {
  EventService.getEvents()
    .then(response => {
      events.value = response.data
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
})

</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<style scoped>
  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
