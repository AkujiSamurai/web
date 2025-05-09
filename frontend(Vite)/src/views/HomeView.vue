<script setup>
import Product from "@/components/Products/Product.vue";
import axios from "axios";
import {ref} from "vue";

const products = ref([])
const load = ref(true)

axios.get('home')
    .then((response) => products.value = response.data)
    .finally(() => load.value = false)
</script>

<template>
  <main>
    <h2>Смартфоны</h2>
    <div class="preloader" v-if="load">
      <img src="@/assets/img/preloader.gif" />
    </div>
    <section>
      <div class="item" v-for="product in products">
        <Product :product="product"/>
      </div>
    </section>
  </main>
</template>
