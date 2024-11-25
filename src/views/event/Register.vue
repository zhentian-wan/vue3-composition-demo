<script setup>
import { useRouter } from "vue-router";
import { defineProps, inject } from "vue";

const {event} = defineProps(["event"]);
const router = useRouter();
const GStore = inject("GStore");
const register = () => {
  // Call to API
  // If registered then redirect to event details
  GStore.flashMessage = "You are registered for the event: " + event.title;
  setTimeout(() => {
    GStore.flashMessage = "";
  }, 3000)
  router.push({
    name: "event-details",
  });
};
</script>
<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>