<template>
  <div id="buy">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <MyFooter :goods="goodsInfo"></MyFooter>
    <div class="box">
      <div class="order">
        <div class="order-info">
          <!-- {{typeof(goodsData.idleItem.pictureList) }} -->
          <div class="left">
            <img :src="pictureList" />
          </div>
          <div class="right">{{ goodsData.idleName}}</div>
        </div>
        <div class="order-address">
          收货信息：
          <Select></Select>
        </div>
      </div>
    </div>
    <div id="my-footer">
    <!-- {{ goods }} -->
    <div class="price">
      价格：<span>￥{{ goodsData.idlePrice }}</span>
    </div>
    <div class="sub"><el-button type="danger" @click="submit">提交订单</el-button></div>
  </div>
    <!-- {{ goodsData }} -->
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
import MyFooter from "@/components/BuyGoods/Footer.vue";
import Select from "@/components/Address/Select.vue";
export default {
  data() {
    return {
      userId: '',
      goodsData: [],
      // selectAdd:[]
      img:[],
      goodsInfo:[],
      pictureList:''
    };
  },
  mounted() {
    this.userId = this.getCookie('shUserId');
    this.getDetail()
    // console.log('userId', this.userId, this.getCookie('shUserId'));
    // let orderId = this.$route.query.id;
    // console.log(orderId);
    // this.goodsData = this.$store.state.buyGoodsInfo;
    // this.$api.getOrder({
    //   id: orderId
    // }).then(res => {
    //   // console.log("数据为",res);
    //   if (res.status_code === 1) {
    //     if (res.data.idleItem) {
    //       let imgList = JSON.parse(res.data.idleItem.pictureList);
    //       if (imgList.length > 0) {
    //         res.data.idleItem.imgUrl = imgList[0];
    //       } else {
    //         res.data.idleItem.imgUrl = '';
    //       }
    //     } else {
    //       res.data.idleItem = {
    //         idleName: '',
    //         imgUrl: ''
    //       }
    //     }
    //     this.goodsData = res.data;
    //     this.img=JSON.parse(res.data.idleItem.pictureList)
    //     this.goodsInfo=res.data.idleItem
    //     console.log("goods",this.goodsData);
    //     // console.log("数据为",this.img);
    //   }
    // })
  },
  components: {
    TopNav,
    TopSearch,
    MyFooter,
    Select

  },
  methods: {
    async getDetail() {
      const id = this.$route.query.id;
      // console.log(id);
      this.$api.getIdleItem({
        id: id
      }).then(res => {
        console.log(res);
        this.goodsData=res.data
        // this.goodsDetail.push(res.data)
        this.pictureList = JSON.parse(res.data.pictureList)
        // console.log("this.goodsDetail", this.goodsDetail[0]);
        // // console.log(this.$globalData.userInfo);
        // let userId = this.$globalData.userInfo.id
        // console.log("userId", userId);
        // if (userId == this.goodsDetail[0].userId) {
        //   this.isMaster = true;
        // }
      })
    },
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "0";
    },
    submit(){
      this.$api.addOrder({
        idleId: this. goodsData.id,
        orderPrice: this. goodsData.idlePrice,
      }).then(res => {
        console.log("res",res.data.id);
        if (res.status_code === 1) {
          this.$router.push({ path: '/myBuy' });
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
      })
    }
  }
};
</script>

<style lang="less" scoped>
#buy {
  margin-bottom: 100px;
  width: 100%;

  .box {
    width: 100%;
    background-color: #fff;

    .order {
      width: 70%;
      margin: auto;
      max-width: 1200px;

      .order-info {
        display: flex;
        padding-top: 30px;

        .left {
          width: 120px;
          height: 120px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
          }
        }

        .right {
          margin-left: 30px;
          font-size: 18px;
          font-weight: bold;
        }
      }

      .order-address {
        margin-top: 30px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  #my-footer {
  position: fixed;
  bottom: 0px;
  height: 100px;
  background-color: #fff;
  width: 100%;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;

  .price {
    position: absolute;
    right: 30%;

    span {
      color: red;
    }
  }

  .sub {
    position: absolute;
    right: 10%;
  }
}
}
</style>
