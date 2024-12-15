import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Basket from "@/views/Basket.vue";
import Profile from "@/views/Profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ],
})

export default router
