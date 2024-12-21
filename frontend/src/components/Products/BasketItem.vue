<script setup>
import axios from 'axios';
import {defineProps} from 'vue'

defineProps({
  BasketItem: Object
})
</script>

<script>
export default {
  data() {
    return {
      id: null,
      id_user: '',
      id_product: ''
    };
  },
  methods: {
    async increase() {
      let userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      try {
        const response = await axios.put('increaseCount', {
          id_user: user.id,
          id_product: this.BasketItem.product.id
        });

        window.location.reload();
        console.log('Ответ от сервера:', response.data);
      } catch (error) {
        console.error('Ошибка :', error.response.data);
        alert('Ошибка : ' + error.response.data.message);
      }
    },
    async decrease() {
      let userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      if (this.BasketItem.count === 1) {
        await this.deleteItem();
      } else {
        try {
          const response = await axios.put('decreaseCount', {
            id_user: user.id,
            id_product: this.BasketItem.product.id
          });

          window.location.reload();
          console.log('Ответ от сервера:', response.data);
        } catch (error) {
          console.error('Ошибка :', error.response.data);
          alert('Ошибка : ' + error.response.data.message);
        }
      }
    },
    async deleteItem() {
      try {
        const response = await axios.delete(`delete/${this.BasketItem.id}`);

        window.location.reload();
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
    <div class="product-img"><img :src="BasketItem.product.img">
    </div>
    <router-link :to="{name: 'product-info', params: {id: BasketItem.product.id}}">{{
        BasketItem.product.name
      }}
    </router-link>
    <div class="price-container">
      <div class="price">{{ BasketItem.product.price * BasketItem.count }} ₽</div>
      <p class="count">Количество: {{ BasketItem.count }}</p>
      <div class="count-container">
        <button class="btn-basket" @click="increase">+</button>
        <button class="btn-basket" @click="decrease">-</button>
      </div>
      <button class="btn-basket" @click="deleteItem">Удалить</button>
    </div>
  </div>
</template>