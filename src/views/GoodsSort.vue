<template>
  <div id="sort">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="content">
      <div class="item" v-for="item in listData">
        <router-link :to="{ path: '/goodsDetail', query: { id: item.id } }">
          <div class="left">
            <img :src="item.photos[0]" />
          </div>
          <div class="right">
            <div class="info">{{ item.idleName }}</div>
            <div class="price">￥{{ item.idlePrice }}</div>
          </div>
        </router-link>
      </div>
      <div v-if="(3 - listData.length % 3) != 3" class="block">
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
export default {
  data() {
    return {
      labelName: '',
      listData: [],
      photos: []
    }
  },
  mounted() {
    this.getSortGood()
  },
  watch: {
    $route(to, from) {
      this.getSortGood()
    }
  },
  methods: {
    async getSortGood() {
      var that = this
      this.labelName = this.$route.query.labelName;
      console.log(this.labelName);
      if (this.labelName > 0) {
        this.$api.findIdleTiemByLable({
          idleLabel: this.labelName,
          page: 1,
          nums: 100
        }).then(res => {
          console.log("分类列表的数据", res);
          that.listData = res.data.list
          console.log(that.listData);
          this.listData.forEach(item => {
            item.photos = JSON.parse(item.pictureList.split(','))
          })
        }).catch(e => {
          console.log(e)
        })
      }
      // //更多商品
      else {
        this.$api.findIdleTiem({
          page: 1,
          nums: 1000
        }).then(res => {
          const list = res.data.list
          this.listData=list.filter(item=>item.idleLabel!==5)
          console.log("全部商品", this.listData);
          this.listData.forEach(item => {
            item.photos = JSON.parse(item.pictureList.split(','))
          })
        })
      }
    }
  },
  components: {
    TopNav,
    TopSearch,
  },
}
</script>

<style lang="less" scoped>
#sort {
  height: 100vh;
  background-image: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png);
  background-size: cover;
  overflow-x: hidden;

  .content {
    padding-top: 50px;
    width: 80%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .block {
      width: 30%;
      height: 150px;
    }

    //小于880px时
    @media screen and(max-width:880px) {
      .item {
        width: 40%;
        height: 150px;
        // display: ;
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

          .left {
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

    //大于880px时
    @media screen and(min-width:880px) {
      .item {
        width: 30%;
        height: 150px;
        display: flex;
        // justify-content: left;
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

          .left {
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
      position: relative;
      margin-left: 15px;

      .info {
        font-size: 16px;
      }

      .price {
        position: absolute;
        bottom: 0px;
        color: red;
      }

    }
  }

}
</style>