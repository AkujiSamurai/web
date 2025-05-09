<script setup>
import {ref} from 'vue';
import axios from "axios";
import Product from "@/components/Products/BasketItem.vue";

const products = ref([])
const load = ref(true)

let userData = localStorage.getItem('user');
const user = JSON.parse(userData);

axios.get('basket', {
  params: {id_user: user.id}
})
    .then((response) => products.value = response.data)
    .finally(() => load.value = false)

</script>

<template>
    <main>
      <h2>Корзина</h2>
      <div class="preloader" v-if="load">
        <img src="@/assets/img/preloader.gif"/>
      </div>
      <div v-else>
        <div v-if="products.length > 0">
          <div class="item" v-for="BasketItem in products">
            <Product :BasketItem="BasketItem"/>
          </div>
        </div>
        <div v-else class="basket">
          <img src="@/assets/img/emptyBasket.jpg" width="20%">
          <h3>Пока пусто</h3>
          <p>Воспользуйтесь
            <router-link to="/" class="link">&nbsp;каталогом&nbsp;</router-link>
            или поиском
          </p>
        </div>
      </div>
    </main>
</template>