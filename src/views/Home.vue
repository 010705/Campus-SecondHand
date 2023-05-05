<template>
  <div id="home">
   <TopNav></TopNav>
   <TopSearch></TopSearch>
   <Carousel></Carousel>
   <SortSquare></SortSquare>
   <Recon></Recon>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue';
import TopSearch from '@/components/Home/TopSearch.vue';
import Carousel from '@/components/Home/Carousel.vue';
import SortSquare from '@/components/Home/SortSquare.vue'
import Recon from '@/components/Home/Recon.vue'
export default{
  data(){
    return{
      
    }
  },
  components:{
    TopNav,
    TopSearch,
    Carousel,
    SortSquare,
    Recon
  }
}
</script>

<style lang="less" scoped>
#home{
  background-image: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png);
  background-size: cover;
  overflow-x: hidden;
}
</style>