<template>
  <main>
    <div class="profile">
      <h2>Регистрация</h2>
      <div>
        <input type="text" v-model="login" placeholder="Login">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <div>
        <input type="password" v-model="passwordConfirmation" placeholder="Confirm password">
      </div>
      <button class="btn-cart" @click="register">Продолжить</button>
      <p>Если у вас есть аккаунт, вы можете перейти на страницу <router-link to="/login" class="link">входа</router-link></p>
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
      password: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirmation) {
        alert('Пароли не совпадают');
        return;
      }

      try {
        const response = await axios.post('register', {
          login: this.login,
          password: this.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.item));

        alert("Вы успешно зарегистрированы!");
        console.log('Ответ от сервера:', response.data);
        this.$router.push('/profile');
      } catch (error) {
        console.error('Ошибка при регистрации:', error.response.data);
        alert('Ошибка регистрации: ' + error.response.data.message);
      }
    }
  }
}
</script>