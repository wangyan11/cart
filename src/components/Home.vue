<template>
  <div class="home page">
      <mt-cell
        v-for="prod in products"
        :key="prod.id"
        :title="prod.title"
        :label="'价格：' + prod.price">
        <mt-button type="danger" size="small" @click="_addToCart(prod)">加入购物车</mt-button>
      </mt-cell>

      {{ JSON.stringify(cart) }}
  </div>
</template>

<script>
  import {mapState} from "vuex";
export default {
  name: 'Home',
  data() {
    return {
      products : [
        {id:1, title:"苹果", price:"9.9"},
        {id:2, title:"鸭梨", price:"6.9"},
        {id:3, title:"牛奶", price:"69.9"},
        {id:4, title:"糖", price:"19.9"},
      ]
    }
  },
  computed : {
    ...mapState(["cart"])
  },
  methods : {
    _addToCart(currentProduct) {
      this.$store.dispatch("addToCart", currentProduct);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
