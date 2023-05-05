<template>
  <div>
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="content">
      <div class="sellBody" v-for="item in dataList" v-if="item.orderStatus!==6">
        <!-- {{ item }} -->
        <div class="order">
          <div class="img"><img :src="JSON.parse(item.idleItem.pictureList)" /></div>
          <div class="info">
            <div class="title">{{ item.idleItem.idleName }}</div>
            <div class="mes">详细信息：{{ item.idleItem.idleDetails }}</div>
            <div class="time">购买时间：{{ item.createTime }}</div>
            <div class="price">￥{{ item.orderPrice }}</div>
          </div>
          <div class="status">
            {{ orderStatus[item.orderStatus] }}
          </div>
        </div>
        <div class="base">
          <div class="address">
            收货地址：
          </div>
          <div class="btns">
            <div class="btn1" v-if="item.orderStatus === 0">
              <el-button round @click="changeOrderStatus(4, item)">取消订单</el-button>
              <el-button round @click="changeOrderStatus(1, item)">立即支付</el-button>
            </div>
            <div class="btn2" v-if="item.orderStatus === 2">
              <el-button round>确认收货</el-button>
            </div>
            <div class="btn3" v-if="item.orderStatus==4">
              <el-button round @click="del(item)">删除订单</el-button>
            </div>
            <div class="btn4" v-if="item.orderStatus==1">
              <el-button round @click="">申请退款</el-button>
            </div>
          </div>
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
      dataList: [],
      //已取消：4；待发货：1；待付款：0；订单隐藏：6；
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],
    }
  },
  created() {
    this.getMyOrder()
  },
  methods: {
    getMyOrder() {
      this.$api.getMyOrder().then(res => {
        if (res.status_code === 1) {
          console.log('getMyOrder', res.data);
          this.dataList = res.data
        }
      })
    },
    //改变订单状态
    changeOrderStatus(orderStatus, orderInfo) {
      //支付
      if (orderStatus === 1) {
        console.log('zhifu');
        this.$confirm('模拟支付宝支付，是否确认支付', '支付订单', {
          confirmButtonText: '支付',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$api.updateOrder({
            id: orderInfo.id,
            orderStatus: orderStatus,
            paymentStatus: 1,
            paymentWay: '支付宝',
          }).then(res => {
            var address = "http://localhost:8080/alipay/pay?name=" + orderInfo.id + "&no=" +
              Math.random().toString(36).substr(2) + "&price=" + orderInfo.idleItem.idlePrice;

            console.log(res.data[0]);
            // res.data.
            window.open(address)

            if (res.status_code === 1) {
              this.$message({
                message: '支付成功！',
                type: 'success'
              });
              this.getMyOrder()
              this.orderInfo.orderStatus = orderStatus;
              this.orderInfo.paymentStatus = 1;
              this.orderInfo.paymentWay = '支付宝';
              this.orderInfo.paymentTime = res.data.paymentTime;
            }
          })
        }).catch(() => {
        });
      } else {
        this.$api.updateOrder({
          id: orderInfo.id,
          orderStatus: orderStatus,
        }).then(res => {
          if (res.status_code === 1) {
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.getMyOrder()
            // this.orderInfo.orderStatus = orderStatus;
          }
        })
      }
    },
    //删除订单信息
    del(i){
      console.log("删除");
      this.$api.updateOrder({
          id: i.id,
          orderStatus:6,
        }).then(res => {
          if (res.status_code === 1) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.getMyOrder()
            // this.orderInfo.orderStatus = orderStatus;
          }
        })

    }
  },
  components: {
    TopNav,
    TopSearch,
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 80%;
  max-width: 1200px;
  margin: auto;
  position: relative;

  .sellBody {
    display: flex;
    height: 200px;
    align-items: center;
    position: relative;
    border-bottom: 12px solid #eee;
    // border-right: 3px solid #eee;
    border-radius: 20px;

    .base {
      height: 50px;

      .address {
        position: absolute;
        left: 20px;
        bottom: 20px;
      }

      .btns {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }

    }

    .order {
      height: 150px;
      text-decoration: none;
      display: flex;
      color: black;
    }

    .img {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
      }
    }

    .info {
      margin-left: 50px;

      .title {
        font-size: 17px;
        font-weight: bold;
      }

      .mes {
        font-size: 14px;
        margin-top: 5px;
      }

      .time {
        font-size: 14px;
        margin-top: 5px;
      }

      .price {
        font-size: 15px;
        color: red;
        margin-top: 5px;
      }
    }

    .status {
      color: red;
      position: absolute;
      right: 20%;
    }

  }
}
</style>