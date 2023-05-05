<template>
  <div id="selectCard">
    <router-link to="/address/list">
      <div v-if="selectAdd.length==0">
        <div class="block">
          <i class="el-icon-location-outline"></i>
          <span>请添加地址</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="select" v-for="item in selectAdd">
        <!-- {{ item }} -->
        <i class="el-icon-location-outline"></i>
        <div class="detail">
          <div class="address">
            <span v-for="item in selectAdd">{{ item.provinceName+item.cityName+item.regionName}}</span>
          </div>
          <div class="name">
            {{ item.consigneeName}}
            <span class="tel">{{ item.consigneePhone}}</span>
          </div>
        </div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAdd: []
    }
  },
  mounted() {
    this.getAddressData()
    this.selectAdd=JSON.parse(localStorage.getItem('selectSite'))
  },
  methods: {
    //初始时地址为默认地址
    getAddressData() {
      this.$api.getAddress().then(res => {
        console.log("地址为", res);
        localStorage.setItem('selectSite', JSON.stringify(res.data.filter(item=>item.defaultFlag==true)))
      })
    },
  },
}
</script>

<style lang="less" scoped>
#selectCard {
  width: 100%;

  a {
    text-decoration: none;
    .block{
      margin-top: 30px;
      height: 80px;
      width: 400px;
      border: 1px solid #ddd;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span{
          font-size: 18px;
          color: black;
          font-weight: bold;
      }
    }
    .el-icon-location-outline {
        color: orange;
        font-size: 25px;
        position: absolute;
        left: 20px;
      }
      .el-icon-arrow-right{
        font-size: 25px;
        position: absolute;
        right: 20px;
      }

    .select {
      margin-top: 30px;
      height: 80px;
      width: 400px;
      border: 1px solid #ddd;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
     
      .detail{
        position: absolute;
          left: 80px;
        .address{
          font-size: 18px;
          color: black;
          font-weight: bold;
        }
        .name{
          margin-top: 10px;
          color: #888;
          font-size: 16px;
          .tel{
            color: #999;
            font-size: 14px;
            margin-left: 20px;
          }

        }
      }
     
    }
  }

}
</style>
</template>