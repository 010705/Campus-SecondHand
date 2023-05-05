<template>
  <div id="sort-square">
    <div class="title">
      <img
        src="https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/floor_hd/sprite.png"
      />
      频道广场
      <img
        src="https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/floor_hd/sprite.png"
      />
    </div>
    <div class="sort-content">
      <div class="item" v-for="item in sorts">
        <router-link :to="{path:'/goodsSort',query:{labelName:item.labelName}}">
           <img :src="item.coverImg" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sorts: [
        {
          labelName: 1,
          name: "电子产品",
          coverImg: require("../../assets/ele.png"),
        },
        {
          labelName:3,
          name: "运动相关",
          coverImg: require("../../assets/sport.png"),
        },
        {
          labelName: 2,
          name: "生活用品",
          coverImg: require("../../assets/wash.png"),
        },
        {
          labelName: 4,
          name: "图书笔记",
          coverImg: require("../../assets/book.png"),
        },
        {
          labelName: 0,
          name: "更多商品",
          coverImg: require("../../assets/more.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#sort-square {
  width: 100%;
  margin: auto;
  margin-top: 30px;
  .title {
    font-size: 30px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 25px;
      height: 20px;
      overflow: hidden;
      object-fit: cover;
      margin: 0 10px;
    }
  }
  .sort-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    margin-top: 10px;
    .item{
      width: 18%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // @media screen and (max-width: 960px) {
  //   .item {
  //     width: 150px;
  //     height: 150px;
  //     margin: 20px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
  // @media screen and (min-width: 960px) {
  //   .item {
  //     width: 180px;
  //     height: 180px;
  //     margin: 20px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
  // @media screen and (min-width: 1115px) {
  //   .item {
  //     width: 230px;
  //     height: 230px;
  //     margin: 20px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
}
</style>
