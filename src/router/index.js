import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: route => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {path: '', name: 'event-details', component: EventDetails},
        {path: 'edit', name: 'event-edit', component: EventEdit},
        {path: 'register', name: 'event-register', component: EventRegister},
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return {path: '/events/' + to.params.afterEvent}
      }
    },
    {
      path: '/about-us',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
      alias: '/about'
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/404/:resource",
      name: "404Resource",
      component: NotFound,
      props: true,
    },
    {
      path: "/network-error",
      name: "NetworkError",
      component: NetworkError,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
