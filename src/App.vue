<template>
  <div id="app">
    <div class="header">
      <router-link to="/"
                   class="header-logo">
        <img src="/static/images/logo/logo.png"
             alt="">
      </router-link>
      <router-link to="/register"
                   class="header-title">免费注册
      </router-link>
      <router-link to="/login"
                   class="header-title">您好!请登录
      </router-link>
      <div class="header-menu">
        <router-link to="/cart"
                     class="header-menu-cart">
          购物车
          <span v-if="cartList.length">{{cartList.length}}</span>
        </router-link>
      </div>
    </div>
    <router-view />
    <router-link to="/cart">
      <div class="header-cart-count">
        <img src="/static/images/cart/cart.png"
             alt=""><span v-if="cartList.length">{{cartList.length}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    cartList () {
      return this.$store.state.cartList
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

body {
  background-color: #f8f8f9;
}

.header {
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.header-logo {
  padding: 0 5px;
  width: 80px;
  height: 48px;
  float: left;
  color: #ffffff;
}
.header-logo img {
  width: 100%;
  height: 100%;
}
.header-title {
  float: left;
  padding: 0 32px;
  line-height: 48px;
  color: #ffffff;
}
.header-menu {
  float: right;
  margin-right: 32px;
  color: #ffffff;
}
.header-menu-cart {
  color: #ffffff;
}

.header-menu-cart span {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: #ff5500;
  color: #ffffff;
  font-size: 12px;
}

.header-cart-count {
  position: fixed;
  top: 60%;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}

.header-cart-count img {
  width: 100%;
  height: 100%;
}

.header-cart-count span {
  font-size: 12px;
  display: inline-block;
  width: 20px;
  line-height: 20px;
  border-radius: 50%;
  color: #ffffff;
  position: absolute;
  top: -5px;
  right: 0px;
  background-color: blue;
}
</style>
