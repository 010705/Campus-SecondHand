<template>
  <div id="search">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="content">
      <div class="lists">
      <div class="item" v-for="(item, index) in idleList" v-if="item.idleLabel!=5">
        <router-link :to="{ path: '/goodsDetail', query: { id: item.id } }">
          <div class="coverImg" v-for="(i, index) in JSON.parse(item.pictureList)" v-if="index < 1">
            <img :src="i" />
          </div>
          <div class="right">
            <div class="info">{{ item.idleName }}</div>
            <div class="price">￥{{ item.idlePrice }}</div>
            <!-- <div class="tag">
              <el-tag>{{ item.exist?'待卖出':'已卖出' }}</el-tag>
            </div> -->
          </div>
        </router-link>
      </div>
      <div v-if="(3 - idleList.length % 3) != 3" class="block">
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue';
import TopSearch from '@/components/Home/TopSearch.vue';
export default {
  data() {
    return {
      idleList:[]
    }
  },
  components: {
    TopNav,
    TopSearch,
  },
  created(){
    this.findIdleTiem(1, this.$route.query.searchValue);
  },
  methods: {
    findIdleTiem(page, findValue) {
      this.$api.findIdleTiem({
        page: page,
        nums: 8,
        findValue: findValue
      }).then(res => {
        let list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          list[i].timeStr = list[i].releaseTime.substring(0, 10) + " " + list[i].releaseTime.substring(11, 19);
          let pictureList = JSON.parse(list[i].pictureList);
          list[i].imgUrl = pictureList.length > 0 ? pictureList[0] : '';
        }
        this.idleList = list;
        console.log("this.idleList",this.idleList);
      }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="less">
#search{
  height: 100vh;
  background-image: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png);
  background-size: cover;
  overflow-x: hidden;
  margin: auto;
  // max-width: 1200px;
  .content{
    width: 80%;
    margin: auto;
  }
  .lists {
    margin: auto;
    padding-top: 30px;
    width: 100%;
    max-width: 1200px;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .block {
      width: 30%;
      height: 150px;
    }

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
}
</style>