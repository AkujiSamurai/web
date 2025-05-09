<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue'
import Header from './components/Site/Header.vue'
import Footer from './components/Site/Footer.vue'
</script>

<template>
  <div>
    <Header />
    <div class="wrap">
      <RouterView/>
    </div>

    <Footer />
  </div>
</template>