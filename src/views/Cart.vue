<template>
  <div id="cart">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="lists">
      <div class="item" v-for="item in cartGoods">
        <!-- {{ item }} -->
        <div class="left">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="main">
          <el-image style="width: 100px; height: 100px;" :src="item.imgUrl" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline">无图</i>
            </div>
          </el-image>
        </div>
        <div class="right">
          <div class="info">{{ item.idleName }}</div>
          <div class="price">￥{{ item.idlePrice }}</div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="buy(item)">购买</el-button>
          <el-button type="danger" @click="remove(item)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
// import { getGoodsDetail } from "@/api/api";
export default {
  data() {
    return {
      cartGoods: [],
      dataList: [],
      removeData: [],
      checked: false,
      userInfo: {
        accountNumber: "",
        avatar: "",
        nickname: "",
        signInTime: "",
      },
    };
  },
  created() {
    if (!this.$globalData.userInfo.nickname) {
      this.$api.getUserInfo().then(res => {
        if (res.status_code === 1) {
          res.data.signInTime = res.data.signInTime.substring(0, 10);
          console.log(res.data);
          this.$globalData.userInfo = res.data;
          this.userInfo = this.$globalData.userInfo;
          console.log("用户信息为", this.userInfo);
        }
      })
    } else {
      this.userInfo = this.$globalData.userInfo;
      console.log(this.userInfo);
    }
    this.getCart();
  },
  methods: {
    getCart() {
      this.dataList = JSON.parse(localStorage.getItem('goods'))
      for (let i = 0; i < this.dataList.length; i++) {
        // console.log(i);
        let pictureList = JSON.parse(this.dataList[i].pictureList)
        this.cartGoods.push({
          id: this.dataList[i].id,
          imgUrl: pictureList.length > 0 ? pictureList[0] : '',
          idleName: this.dataList[i].idleName,
          idleDetails: this.dataList[i].idleDetails,
          timeStr: this.dataList[i].releaseTime.substring(0, 10) + " " + this.dataList[i].releaseTime.substring(11, 19),
          idlePrice: this.dataList[i].idlePrice
        })
      }
      // console.log("--------------------");
      // console.log("购物车商品信息", this.cartGoods);
    },
    buy(e) {
      this.$router.push('/buying')
      console.log("购买的商品信息", e);
      this.$store.commit("BuyGoods", e)
    },
    remove(e) {
      // console.log("删除的数据",e);
      const arr = JSON.parse(localStorage.getItem('goods'))
      this.removeData = arr.filter(item => item.id !== e.id)
      // console.log("过滤后的数据",this.removeData);
      this.$store.commit("RemainGoods", this.removeData);
      this.$router.go(0)
    }
  },
  components: {
    TopNav,
    TopSearch,
  },
};
</script>

<style lang="less" scoped>
#cart {
  width: 100%;

  .lists {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    margin-top: 30px;
    background-color: #fff;

    .item {
      width: 80%;
      margin: auto;
      display: flex;
      position: relative;

      .left {
        width: 30px;
        display: flex;

        .el-checkbox {
          margin: auto;
        }
      }

      .main {
        width: 150px;
        height: 150px;
        display: flex;

        img {
          width: 80%;
          height: 80%;
          margin: auto;
          border-radius: 20px;
          object-fit: cover;
        }
      }

      .right {
        margin: 20px;
        position: relative;

        .info {
          font-size: 16px;
        }

        .price {
          position: absolute;
          bottom: 5px;
          color: red;
        }
      }

      .btn {
        position: absolute;
        right: 50px;
        display: flex;
        height: 100%;

        button {
          margin: auto;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
