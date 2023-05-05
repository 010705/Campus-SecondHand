<template>
  <div id="addressList">
    <!-- {{ addressList }} -->
    <div class="lists">
      <div class="list" v-for="item in addressList">
        <div class="check">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="adMain" @click="selectAddress(item)">
          <div class="name">{{ item.consigneeName }}
            <span>{{ item.consigneePhone }}</span>
            <el-tag size="mini" v-if="item.defaultFlag==true" >默认</el-tag>
          </div>
          <div class="address">
            <div class="addName">
              {{ item.detailAddressText }}
            </div>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(item)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delAdd(item)"></el-button>
        </div>
      </div>
    </div>
    <div class="adFoot">
      <el-button type="primary" round class="footBtn" @click="addAddress">新增地址</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      // address: this.$store.state.address,
      delData: '',
      addressList: []
    }
  },
  created() {
    this.getAddressData()
  },
  methods: {
    //获取地址信息
    getAddressData() {
      this.$api.getAddress().then(res => {
        console.log("地址为", res);
        if (res.status_code === 1) {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            data[i].detailAddressText = data[i].provinceName + data[i].cityName + data[i].regionName + data[i].detailAddress;
            data[i].defaultAddress = data[i].defaultFlag ? '默认地址' : '设为默认';
          }
          // console.log(data);
          this.addressList = data;
        }
      })
    },
    addAddress() {
      console.log("添加");
      this.$router.push('/address/add')

    },
    selectAddress(e) {
      console.log("选中", e);
      localStorage.setItem('selectSite', JSON.stringify([e]))
      this.$message({
        message: '选择成功',
        type: 'success'
      });
      this.$router.go(-1)
    },
    edit() {

    },
    delAdd(e) {
      console.log("删除", e);
      console.log("地址数据为", this.addressList);
      this.$api.deleteAddress(e).then(res => {
        if (res.status_code === 1) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          // this.addressList.splice(index, 1);
          this.addressList.filter(item => item != e)
          if (e.defaultFlag && this.addressList.length > 0) {
            this.addressList[0].defaultFlag = true;
            this.addressList[0].defaultAddress = '默认地址';
            // this.update({
            //   id: this.addressList[0].id,
            //   defaultFlag: true
            // });
          }
          this.getAddressData()
        }
      })
    },
    // update(data) {
    //   this.$api.updateAddress(data).then(res => {
    //     console.log("");
    //     if (res.status_code === 1) {
    //       this.getAddressData();
    //       this.$message({
    //         message: '修改成功！',
    //         type: 'success'
    //       });
    //     } else {
    //       this.$message.error('系统异常，修改失败！')
    //     }
    //   }).catch(() => {
    //     this.$message.error('网络异常！')
    //   })
    // },
  }
}
</script>

<style lang="less" scoped>
.lists {
  width: 100%;
  margin: auto;
  padding-top: 30px;
  max-width: 1200px;
  position: relative;

  .list:hover {
    background-color: #ddd;
  }

  .list {
    margin-top: 30px;
    width: 70%;
    height: 100px;
    display: flex;
    align-items: center;
    align-items: center;
    margin: auto;
    position: relative;

    .check {
      width: 30px;
      // margin: auto;
      margin-right: 50px;
    }

    .adMain {
      width: 60%;

      .name {
        font-size: 18px;
        font-weight: bold;

        span {
          font-weight: normal;
          font-size: 16px;
          margin-left: 50px;
        }
      }

      .address {
        display: flex;
        font-size: 14px;
        margin-top: 10px;
      }
    }

    .btns {
      position: absolute;
      right: 10px;
    }
  }
}

.adFoot {
  position: fixed;
  bottom: 0px;
  height: 80px;
  background-color: #fff;
  width: 100%;
  // border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  .footBtn {
    position: absolute;
    width: 400px;
    background-color: orange;
    border-style: none;
  }
}
</style>