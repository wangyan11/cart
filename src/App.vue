<template>
  <div id="app">
    <mt-header fixed title="固定在顶部"></mt-header>

    <router-view/>

    <mt-tabbar>
      <mt-tab-item
        v-for="nav in navs"
        :key="nav.id">
        <router-link
          :to="{name: nav.name}">
          <i class="fa" :class="['fa-' + nav.icon]"></i>
          {{nav.title}}
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      navs : [
        {id:1, title:"首页", name:"home", icon: "home"},
        {id:2, title:"购物车", name:"cart", icon: "shopping-cart"}
      ]
    }
  },
  created() {
    this.$store.dispatch("init");
  }
}
</script>

<style>

</style>
