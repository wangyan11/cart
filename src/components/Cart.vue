<template>
  <div class="cart page">
      <mt-cell
        v-for="prod in cart"
        :key="prod.id"
        :title="prod.title"
        :label="'价格：' + prod.price + '，数量：' + prod.amount">
        <mt-button type="danger" size="small" @click="decrement(prod)">-</mt-button>  
        <mt-button type="danger" size="small" @click="increment(prod)">+</mt-button>
      </mt-cell>

      <div class="total">
      	总金额：{{totalMoney}}，总数量：{{totalAmount}}
      </div>
  </div>
</template>

<script>
	import {mapState, mapGetters} from "vuex";
	export default {
	  name: 'Cart',
	  computed : {
	  	...mapState(["cart"]),
	  	...mapGetters(["totalMoney", "totalAmount"])
	  },
	  methods : {
	  	increment(currentProduct) {
	  		this.$store.dispatch("increment", currentProduct);
	  	},
	  	decrement(currentProduct) {
	  		this.$store.dispatch("decrement", currentProduct);
	  	}
	  }
	}
</script>

<style scoped lang="scss">

</style>
