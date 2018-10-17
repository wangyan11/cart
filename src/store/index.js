import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state : { // 数据
		cart : []
	},
	getters : { // 派生数据
		// 总金额 
		totalMoney(state) {
			let sum = 0;
			state.cart.forEach(curr=>{
				sum += curr.price * curr.amount;
			})
			return sum.toFixed(2);
		},
		// 总数量
		totalAmount(state) {
			let sum = 0;
			state.cart.forEach(curr=>{
				sum += curr.amount;
			});
			return sum;
		}
	},
	mutations : { // 修改数据，同步
		updateCart(state, newCart) {
			state.cart = newCart;
		}
	},
	actions : { // 提交 mutation，可异步
		init({commit}) {
			setTimeout(()=>{
				let cart = JSON.parse(localStorage.cart ? localStorage.cart : "[]");
				commit("updateCart", cart);
			}, 200);
		},
		addToCart(context, currProduct) {
			// 模拟异步操作
			setTimeout(()=>{				
				// [{id, title, price, amount},{id, title, price, amount},{id, title, price, amount},]
				// 从 localStorage 中读取购物车数据
				let cart = JSON.parse(localStorage.cart ? localStorage.cart : "[]");
				// 判断是否有选购过当前的商品
				let has = cart.some((curr)=>{
					if (curr.id == currProduct.id) { // 已有选购过，修改数量
						curr.amount++;
						return true;
					}
				});
				if (!has){ // 未选购，追加到数组中
					currProduct.amount = 1; // 数量初始化为1
					cart.push(currProduct);
				}
				// 将 cart 存回 localStorage 中
				localStorage.cart = JSON.stringify(cart);
				// 提交修改数据
				context.commit("updateCart", cart)
			}, 500);
		},
		// 减数量
		decrement({commit}, currProduct) {
			setTimeout(() => {
				// 从 localStorage 中读取购物车数据
				let cart = JSON.parse(localStorage.cart ? localStorage.cart : "[]");
				// 将当前商品的数量在购物车所保存的数据中减1
				cart = cart.filter((curr)=>{
					if (curr.id == currProduct.id) {
						curr.amount--;
						if (curr.amount <= 0)
							return false;
						return true;
					}
					return true;
				});
				// 将 cart 存回 localStorage 中
				localStorage.cart = JSON.stringify(cart);
				// 提交修改数据
				commit("updateCart", cart);
			}, 300);
		},
		// 加数量
		increment({commit}, currProduct) {
			setTimeout(() => {
				// 从 localStorage 中读取购物车数据
				let cart = JSON.parse(localStorage.cart ? localStorage.cart : "[]");
				// 将当前商品的数量在购物车所保存的数据中减1
				cart.forEach((curr)=>{
					if (curr.id == currProduct.id)
						curr.amount++;
				});
				// 将 cart 存回 localStorage 中
				localStorage.cart = JSON.stringify(cart);
				// 提交修改数据
				commit("updateCart", cart);
			}, 300);
		}
	}
});

export default store;