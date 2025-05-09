<script setup>
import axios from 'axios';
import {defineProps} from 'vue'

defineProps({
  product: {}
})
</script>

<script>
export default {
  data() {
    return {
      id_user: '',
      id_product: ''
    };
  },
  methods: {
    async addBasket() {
      let userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      try {
        const response = await axios.post('create', {
          id_user: user.id,
          id_product: this.product.id
        });

        alert("Товар успешно добавлен!");
        console.log('Ответ от сервера:', response.data);
      } catch (error) {
        console.error('Ошибка :', error.response.data);
        alert('Ошибка : ' + error.response.data.message);
      }
    }
  }
}
</script>

<template>
  <div class="item">
    <div class="product-img"><img :src="product.img">
    </div>
    <router-link :to="{name: 'product-info', params: {id: product.id}}">{{ product.name }}</router-link>
    <div class="price-container">
      <div class="price">{{ product.price }} ₽</div>
      <div>
        <button class="btn-cart" @click="addBasket">В&nbsp;корзину</button>
      </div>
    </div>
  </div>
</template>