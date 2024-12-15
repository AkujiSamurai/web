<script setup>
import Product from "@/components/Products/Product.vue";

const products = [
  {
    id: 1,
    img: 'https://c.dns-shop.ru/thumb/st1/fit/200/200/30ccf81bb30a6887cc4dbed37ae9031c/4d6a1d2ff6f2bb61fbfa0ed9d27ae9339c9782337456b7eccf307340fcd10767.jpg.webp',
    name: '7.6" Смартфон Samsung Galaxy Z Fold6 1024 ГБ серый [ядер - 8x(3.3 ГГц), 12 ГБ, 2 SIM, Dynamic AMOLED 2X, 1856х2120, камера 50+12+10 Мп, NFC, 5G, GPS, 4400 мА*ч]',
    price: 229999
  },
  {
    id: 2,
    img:'https://c.dns-shop.ru/thumb/st1/fit/200/200/206e9e9e6ddedbdee7e8d5f6a3aa2b95/2d7a8da410583cad3c975ca8659b15bfdecfe066a2e3eca329357f8c5d646528.jpg.webp',
    name:'7.6" Смартфон Samsung Galaxy Z Fold6 1024 ГБ синий [ядер - 8x(3.3 ГГц), 12 ГБ, 2 SIM, Dynamic AMOLED 2X, 1856х2120, камера 50+12+10 Мп, NFC, 5G, GPS, 4400 мА*ч]',
    price: 219999
  },
  {
    id: 3,
    img:'https://c.dns-shop.ru/thumb/st1/fit/200/200/a0f7ef04a39adc3a5630021c8e98199e/7c3741b5c01f6be5a6f15b4bfb73786e56eff52608b3a3a64343a26f8bce2e8e.jpg.webp',
    name:'7.6" Смартфон Samsung Galaxy Z Fold6 512 ГБ розовый [ядер - 8x(3.3 ГГц), 12 ГБ, 2 SIM, Dynamic AMOLED 2X, 1856х2120, камера 50+12+10 Мп, NFC, 5G, GPS, 4400 мА*ч]',
    price: 199999
  },
  {
    id: 4,
    img:'https://c.dns-shop.ru/thumb/st1/fit/200/200/30ccf81bb30a6887cc4dbed37ae9031c/4d6a1d2ff6f2bb61fbfa0ed9d27ae9339c9782337456b7eccf307340fcd10767.jpg.webp',
    name:'7.6" Смартфон Samsung Galaxy Z Fold6 256 ГБ серый [ядер - 8x(3.3 ГГц), 12 ГБ, 2 SIM, Dynamic AMOLED 2X, 1856х2120, камера 50+12+10 Мп, NFC, 5G, GPS, 4400 мА*ч]',
    price: 189999
  }
]
</script>

<template>
  <main>
    <h2>Смартфоны</h2>
    <section>
      <div class="item" v-for="product in products">
        <Product :product="product" />
      </div>
    </section>
  </main>
</template>
