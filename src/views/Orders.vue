<template>
  <div id="myOrder">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="info">
      <div></div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
export default {
  data() {
    return {
      order: []
    }
  },
  created() {
    const id = this.$route.query.id;
    this.$api.getOrder({
      id: id
    }).then(res => {
      console.log(res);
      if (res.status_code === 1) {
        if (res.data.idleItem) {
          let imgList = JSON.parse(res.data.idleItem.pictureList);
          if (imgList.length > 0) {
            res.data.idleItem.imgUrl = imgList[0];
          } else {
            res.data.idleItem.imgUrl = '';
          }
        } else {
          res.data.idleItem = {
            idleName: '',
            imgUrl: ''
          }
        }
        this.order = res.data;
        this.$api.getOrderAddress({
          orderId: this.order.id
        }).then(res => {
          if (res.data) {
            this.addressInfo = res.data;
            this.addressInfo.update = true;
          } else {
            this.getAddressData();
          }
        })
      }
    })
  },
  methods: {
    getAddressData() {
      this.$api.getAddress().then(res => {
        console.log(res);
        // if (res.status_code === 1) {
        //   let data = res.data;
        //   for (let i = 0; i < data.length; i++) {
        //     data[i].detailAddressText = data[i].provinceName + data[i].cityName + data[i].regionName + data[i].detailAddress;
        //   }
        //   console.log(data);
        //   this.addressData = data;
        //   if (!this.addressInfo.update) {
        //     for (let i = 0; i < data.length; i++) {
        //       if (data[i].defaultFlag) {
        //         this.selectAddress(i, data[i]);
        //       }
        //     }
        //   }
        // }
      })
    },
  },
  components: {
    TopNav,
    TopSearch,
  },
}
</script>

<style lang="less" scoped>
#myOrder {
  width: 100%;
  height: 100vh;
  // max-width: 1200px;
  margin: auto;
  background-image: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png);
  background-size: cover;
  overflow-x: hidden;
  .info{
    width: 800px;
    height: 600px;
    background-color: #fff;
    margin: auto;
    margin-top: 50px;
    border-radius: 20px;
  }
}
</style>