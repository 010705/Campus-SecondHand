<template>
  <div >
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <!-- <AddressLists></AddressLists> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
import AddressLists from "@/components/Address/AddressLists.vue";
export default{
  data(){
    return{
      
    }
  },
  components: {
    TopNav,
    TopSearch,
    AddressLists
  },
}
</script>

<style lang="less" scoped>

</style>