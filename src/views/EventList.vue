<script setup>
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router';

const props = defineProps(["page"]);
const page = computed(() => props.page);
const router = useRouter();
const events = ref(null);
const totalEvents = ref(0);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2);
  return page.value < totalPages;
});

onMounted(async () => {
  events.value = null
  watchEffect(() => {
    EventService.getEvents(2, page.value)
    .then(response => {
      events.value = response.data
      totalEvents.value = response.headers["x-total-count"];
    })
    .catch(error => {
      router.push({ name: "NetworkError" });
      console.error('There was an error!', error)
    })
  })
})

</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
     <span>{{page.value}}</span>
    <EventCard v-for="event in events" :event="event" :key="event.id" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
