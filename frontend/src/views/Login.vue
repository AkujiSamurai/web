<template>
  <main>
    <div class="profile">
      <h2>Войти</h2>
      <div>
        <input type="text" v-model="login" placeholder="Login">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <button class="btn-cart" @click="loginUser">Продолжить</button>
      <p>Если у вас нет аккаунта, вы можете перейти на страницу <router-link to="/register" class="link">регистрации</router-link></p>
    </div>
  </main>
</template>

<style>
input {
  margin: 5px;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('login', {
          login: this.login,
          password: this.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.item));

        alert("Вы успешно вошли в систему!");
        console.log('Ответ от сервера:', response.data);
        this.$router.push('/profile');
      } catch (error) {
        console.error('Ошибка при входе:', error.response.data);
        alert('Ошибка входа: ' + error.response.data.message);
      }
    }
  }
}
</script>