<template>
  <header>
    <div>
      <img class="logo"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxnNZk2ft5v45xeaoxqyl_TcBRfuhx4qVUw&s"/>
    </div>
    <div class="search">
      <input type="text" placeholder="Найти товары">
    </div>
    <nav>
      <ul class="row">
        <li>
          <router-link to="/"><img width="25px"
                                   src="@/assets/img/home.png">
            &nbsp;Главная
          </router-link>
        </li>
        <li>
          <router-link to="/basket"><img width="25px"
                                         src="@/assets/img/basket.png">
            &nbsp;Корзина
          </router-link>
        </li>
        <li>
          <router-link to="/profile"><img width="25px"
                                          src="@/assets/img/profile.png"/>
            &nbsp;Войти
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>