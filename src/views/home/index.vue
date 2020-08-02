<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>花期:</span>
        <span class="list-control-filter-item" :class="{on: item === filterFlorescence}" v-for="item in florescences" :key="item.id"
              @click="handleFilterFlorescence(item)">{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>品种:</span>
        <span class="list-control-filter-item" :class="{on: item === filterBrand}" v-for="item in brands" :key="item.id"
              @click="handleFilterBrand(item)">{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色:</span>
        <span class="list-control-filter-item" :class="{on: item === filterColor}" v-for="item in colors" :key="item.id"
              @click="handleFilterColor(item)">{{item}}</span>
      </div>
      <div class="list-control-order">
        <span>排序:</span>
        <span class="list-control-order-item" :class="{on: order===''}" @click="handleOrderDefault">默认</span>
        <span class="list-control-order-item" :class="{on: order === 'sales'}" @click="handleOrderSales">销量
          <template v-if="order === 'sales'">↓</template>
        </span>
        <span class="list-control-order-item" :class="{on: order.indexOf('cost') > -1}" @click="handleOrderCost">
        价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <Product v-for="item in filteredAndOrderedList" :key="item.id" :info="item"></Product>
    <div class="product-not-found"
         v-show="!filteredAndOrderedList.length">
      暂无相关商品
    </div>
  </div>

</template>

<script>
import Product from '../../components/product'

export default {
  components: {
    Product
  },
  name: 'index',
  computed: {
    list () {
      // 从Vuex获取获取商品列表数据
      return this.$store.state.productList
    },
    brands () {
      return this.$store.getters.brands
    },
    colors () {
      return this.$store.getters.colors
    },
    florescences () {
      return this.$store.getters.florescences
    },
    filteredAndOrderedList () {
      // 赋值原始数据
      let list = [...this.list]
      if (this.filterFlorescence !== '') {
        list = list.filter(item => item.florescence === this.filterFlorescence)
      }
      if (this.filterBrand !== '') {
        list = list.filter(item => item.brand === this.filterBrand)
      }
      if (this.filterColor !== '') {
        list = list.filter(item => item.color === this.filterColor)
      }
      if (this.order !== '') {
        if (this.order === 'sales') {
          list = list.sort((a, b) => b.sales - a.sales)
        } else if (this.order === 'cost-desc') {
          list = list.sort((a, b) => b.cost - a.cost)
        } else if (this.order === 'cost-asc') {
          list = list.sort((a, b) => a.cost - b.cost)
        }
      }

      return list
    }

  },
  data () {
    return {
      /* 排序依据:
        sales:按销量排
        cost-desc:按价格降序排
        cost-asc:按价格升序排 */
      order: '',
      filterBrand: '',
      filterColor: '',
      filterFlorescence: ''
    }
  },
  mounted () {
    // 初始化时,通过Vuex的action请求数据
    this.$store.dispatch('getProductList')
  },
  methods: {
    handleFilterBrand (item) {
      if (this.filterBrand === item) {
        this.filterBrand = ''
      } else {
        this.filterBrand = item
      }
    },
    handleFilterColor (color) {
      if (this.filterColor === color) {
        this.filterColor = ''
      } else {
        this.filterColor = color
      }
    },
    handleFilterFlorescence (florescence) {
      if (this.filterFlorescence === florescence) {
        this.filterFlorescence = ''
      } else {
        this.filterFlorescence = florescence
      }
    },
    handleOrderDefault () {
      this.order = ''
    },
    handleOrderSales () {
      this.order = 'sales'
    },
    handleOrderCost () {
      if (this.order === 'cost-desc') {
        this.order = 'cost-asc'
      } else {
        this.order = 'cost-desc'
      }
    }
  }
}
</script>

<style scoped>
  .product-not-found {
    text-align: center;
    padding: 32px;
  }

  .list-control {
    background-color: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    text-align: left;
  }

  .list-control-filter {
    margin:16px 0;
  }

  .list-control-order-item,
  .list-control-filter-item {
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eace;
    margin-right: 6px;
    padding: 2px 6px;
  }

  .list-control-filter-item.on,
  .list-control-order-item.on {
    background-color: #f2352e;
    border: 1px solid #23552e;
    color: #fff;
  }
</style>
