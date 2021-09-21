<template>
  <div>
    <nav class="nav">
      <router-link exact active-class="active" to="/">Список валют</router-link>
      <router-link active-class="active" to="/currencyConverter">
        Конвертер валют
      </router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss">
.nav {
  display: flex;
  justify-content: center;

  a {
    margin: 0 10px;
    &:hover {
      opacity: 0.5;
      text-decoration: underline;
    }
  }
}

.currencyBlockItem {
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 15px;
}
</style>
