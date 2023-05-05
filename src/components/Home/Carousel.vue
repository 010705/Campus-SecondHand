<template>
  <div class="carousel">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in coverImg" :alt="item.imgUrl">
        <router-link :to="{path:'/notice' , query: { id: item.id } }">
          <img :src="item.imgUrl" class="img" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverImg: [
      {
          id:200000,
          imgUrl: require("@/assets/Carousel/safe.png"),
        },
        {
          id:200001,
          imgUrl: require("@/assets/Carousel/kaixue.png"),
        },
        {
          id:200002,
          imgUrl: require("@/assets/Carousel/youth.png"),
        },
        {
          id:200003,
          imgUrl: require("@/assets/Carousel/network_safe.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.carousel {
  margin: auto;
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
  // height: 800px;
  .el-carousel__item {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 20px;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .el-carousel__container {
    height: 400px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
