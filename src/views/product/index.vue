<template>
  <div v-if="product">
    <div class="product">
      <div class="product-img">
        <img :src="product.image" alt="">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{product.name}}</h1>
        <div class="product-cost">￥{{product.cost}}</div>
        <div class="product-add-cart" @click="handleAddCart(product)">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import productData from '../../../static/data/product'
export default {
  name: 'index',
  data () {
    return {
      id: parseInt(this.$route.params.id),
      product: null
    }
  },
  methods: {
    handleAddCart () {
      this.$store.commit('addCart', this.id)
    },
    getProduct () {
      setTimeout(() => {
        this.product = productData.find(item => item.id === this.id)
      }, 500)
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
.product {
  margin: 32px;
  padding: 32px;
  background-color: #fff;
  border: 1px solid #dddee1;
  border-radius: 10px;
  overflow: hidden;
}
  .product-img {
    width: 50%;
    height: 550px;
    float: left;
    text-align: center;

  }
  .product-img img{
    height: 100%;

  }
  .product-info{
    width: 50%;
    padding: 150px 0 250px;
    height: 150px;
    float: left;
    text-align: center;

  }
  .product-cost{
    color: #f2352e;
    margin: 8px 0;
  }
  .product-add-cart {
    display: inline-block;
    padding: 8px 64px;
    margin: 8px 0;
    background-color: #2d8cf0;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
