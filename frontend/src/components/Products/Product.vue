<script setup>
import {defineProps} from 'vue'

defineProps({
  product: {}
})
</script>

<template>
  <div class="item">
    <div class="product-img"><img :src="product.img">
    </div>
    <a href=""> {{ product.name }}
    </a>
    <div class="price-container">
      <div class="price">{{ product.price }} ₽</div>
      <div>
        <button class="btn-cart">В&nbsp;корзину</button>
      </div>
    </div>
  </div>
</template>