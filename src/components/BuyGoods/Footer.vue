<template>
  <div id="my-footer">
    <!-- {{ goods }} -->
    <div class="price">
      价格：<span>￥{{ goods.idlePrice }}</span>
    </div>
    <div class="sub"><el-button type="danger" @click="submit">提交订单</el-button></div>
  </div>
</template>

<script>
export default {
  props:['goods'],
  data() {
    return {
      price: 0,
      orderSite: '',
      orderGoods: [],
      goodsInfo: '',
      currentTime: ''
    }
  },
  created(){
    console.log(this.goods);
  },
  methods: {
    //提交订单
    submit() {
      this.$message({
        message: '购买成功',
        type: 'success'
      });
      this.$router.push('/myBuy')
      // this.getCurrentTime()
      // this.$store.commit("OrderInfo", { infos: this.orderGoods, site: this.orderSite,time:this.currentTime})
      // this.$router.push('/order')
      // this.changeState()
    },
    // getCurrentTime() {
    //   //获取当前时间并打印
    //   let yy = new Date().getFullYear();
    //   let mm = new Date().getMonth() + 1;
    //   let dd = new Date().getDate();
    //   let hh = new Date().getHours();
    //   let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    //   let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    //   this.currentTime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
    //   console.log(this.currentTime)
    // }
  }
}
</script>

<style lang="less" scoped>
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
}</style>