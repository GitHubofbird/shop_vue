import Vuex from 'vuex'
import product_data from '../../static/data/product' // eslint-disable-line camelcase
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 商品列表数据
    productList: [],
    // 购物车数据
    cartList: []

  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => item.brand)
      return getFilterArray(brands)
    },
    colors: state => {
      const colors = state.productList.map(item => item.color)
      return getFilterArray(colors)
    },
    florescences: state => {
      const florescences = state.productList.map(item => item.florescence)
      return getFilterArray(florescences)
    }
  },
  mutations: {
    // 添加商品列表
    setProductList (state, data) {
      state.productList = data
    },
    // 添加到购物车
    addCart (state, id) {
      // 判断购物车中是否已存在,若存在数量+1
      const isAdded = state.cartList.find(item => item.id === id)
      if (isAdded) {
        isAdded.count++
      } else {
        this.state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    // 修改购物项数量
    editCartCount (state, payload) {
      const product = this.state.cartList.find(item => item.id === payload.id)
      product.count += payload.count
    },
    // 删除商品
    deleteCart (state, id) {
      const index = state.cartList.findIndex(item => item.id === id)
      state.cartList.splice(index, 1)
    },
    // 清空购物车
    emptyCart (state) {
      state.cartList = []
    }
  },
  actions: {
    // 请求商品列表
    getProductList (context) {
      setTimeout(() => {
        context.commit('setProductList', product_data)
      }, 500)
    },
    buy (context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('emptyCart')
          resolve()
        }, 500)
      })
    }
  }

})
function getFilterArray (array) {
  const res = []
  const json = {}
  for (let i = 0; i < array.length; i++) {
    const _self = array[i]
    if (!json[_self]) {
      res.push(_self)
      json[_self] = 1
    }
  }
  return res
}
export default store
