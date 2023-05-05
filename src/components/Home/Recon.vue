<template>
  <div id="recon">
    <div class="title">
      <img src="https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/floor_hd/sprite.png" />
      为您推荐
      <img src="https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/floor_hd/sprite.png" />
    </div>
    <div class="lists">
      <div class="item" v-for="(item, index) in lists" v-if="index<count">
        <router-link :to="{ path: '/goodsDetail', query: { id: item.id } }">
          <div class="coverImg" v-for="(i, index) in JSON.parse(item.pictureList)" v-if="index < 1">
            <img :src="i" />
          </div>
          <div class="right">
            <div class="info">{{ item.idleName }}</div>
            <div class="price">￥{{ item.idlePrice }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reconData: [],
      tag: '',
      lists:[]
    };
  },
  created() {
    this.getReconGoods();
  },
  methods: {
    async getReconGoods() {
      // console.log("调用");
      this.$api.findIdleTiem({
        page: 1,
        nums: 100
      }).then((res) => {
        console.log(res);
        this.reconData = res.data.list
        console.log(this.reconData);
        this.lists=this.reconData.filter(item=>item.idleLabel!==5)
       this.count=this.lists.length-(this.lists.length%3)
      })
    },
  }
}
</script>

<style lang="less" scoped>
#recon {
  margin: auto;
  margin-top: 30px;
  max-width: 1200px;

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

  .lists {
    width: 100%;
    max-width: 1200px;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @media screen and(max-width:880px) {
      .item {
        width: 40%;
        height: 150px;
        display: flex;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 20px;
        padding: 15px;
        box-sizing: border-box;

        a {
          text-decoration: none;
          display: inline-block;
          width: 100%;
          height: 100%;
          display: flex;
          color: #000;

          .coverImg {
            width: 40%;
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
    }

    @media screen and(min-width:880px) {
      .item {
        width: 30%;
        height: 150px;
        display: flex;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 20px;
        padding: 15px;
        box-sizing: border-box;

        a {
          text-decoration: none;
          display: inline-block;
          width: 100%;
          height: 100%;
          display: flex;
          color: #000;

          .coverImg {
            width: 40%;
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 15px;
      position: relative;

      .info {
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        color: red;
        position: absolute;
        bottom: 5px;
      }

      .tag {
        position: absolute;
        right: 0;
        bottom: 5px;
      }
    }
  }
}</style>
