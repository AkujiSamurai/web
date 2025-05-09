<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    let userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
};
</script>

<template>
<main>
<div class="profile">
  <h3>Вы вошли в аккаунт: {{ user.login }}</h3>
</div>
</main>
</template>

<style scoped>
h3 {
  margin-top: 120px;
}
</style>