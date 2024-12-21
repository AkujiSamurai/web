<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";

const id = useRoute().params.id
const product = ref({})
const load = ref(true)
const download = ref(false)

axios.get('product/' + id)
    .then((response) => product.value = response.data)
    .finally(() => load.value = false)
    .finally(() => download.value = true)
</script>

<template>
  <main>
    <h2>Смартфон Samsung Galaxy Z Fold6</h2>
    <div class="preloader" v-if="load">
      <img src="@/assets/img/preloader.gif" />
    </div>
    <div class="item-info" v-if="download">
      <img :src="product.img">
      <div>
        <div>{{ product.name }}</div>
        <div class="price"><p>{{ product.price }} ₽ </p>
          <button class="btn-cart">Купить</button>
        </div>
        <div>
          <h3>Описание</h3>
          <p>Смартфон Samsung Galaxy Z Fold6 оборудован складным 7.6-дюймовым дисплеем, который создает эффект полного
            погружения при просмотре фильмов или прохождении игровых баталий. Матрица Dynamic AMOLED 2X автоматически
            подбирает частоту обновления в соответствии с динамикой сюжета. Оперативная память объемом 12 ГБ гарантирует
            быстрый запуск и навигацию между приложениями. Опции на базе искусственного интеллекта позволяют переводить
            фрагменты текста и создавать заметки одним касанием.
            Samsung Galaxy Z Fold6 в корпусе из металла и стекла серого цвета имеет 3-модульную камеру с фазовым
            автофокусом, не допускающим размытия при съемке быстро передвигающихся объектов. Для многомерности и чистоты
            звучания предусмотрены стереодинамики. Хранение файлов осуществляется во встроенной памяти объемом 512 ГБ.
            Слушать треки без подзарядки аккумулятора можно на протяжении 77 ч.</p>
        </div>
      </div>
    </div>
  </main>
</template>