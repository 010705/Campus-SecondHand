<template>
  <div id="admin">
    <div class="left">
      <div class="admin-info">
        <div class="ad-title">后台管理</div>
        <div class="ad-name">
          <div class="block"><el-avatar shape="square" :size="60"
              src="https://img.icons8.com/dusk/1600/admin-settings-male.png"></el-avatar>
          </div>
          <div class="title">
            <div>{{ userInfo.adminName }}</div>
            <div>{{ userInfo.accountNumber }}</div>
          </div>
        </div>
      </div>
      <el-row class="tac">
        <el-col>
          <el-menu default-active="/admin/user" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
            class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/admin/user">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/order">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/goods">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="right">
      <div class="top">
        <el-button type="danger" @click="exit">退出</el-button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: []
    }
  },
  components: {

  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('admin'))
    console.log(this.userInfo);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      this.$api.loginOut({}).then(res => {
        if (res.status_code === 1) {
          this.$sta.isLogin = false;
          this.$sta.adminName = '';
          this.$router.replace( '/login' );
          localStorage.setItem("admin",'')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#admin {
  display: flex;

  .left {
    width: 250px;
    height: 100vh;
    // border-right: 1px #ddd solid;
    // background-color:"#545c64"
    background-color: #545c64;

    .admin-info {
      margin-top: 20px;

      .ad-title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }

      .ad-name {
        display: flex;
        margin-top: 20px;
        align-items: center;

        .block {
          margin-left: 15px;
        }

        .title {
          font-size: 15px;
          font-weight: bold;
          margin-left: 10px;
          color: #409EFF;
        }

      }

    }

    .tac {
      margin-top: 50px;
      width: 250px;

      .el-menu {
        border-style: none;
      }
    }
  }

  .right {
    flex: 1;
    // height: 100vh;

    .top {
      width: 100%;
      height: 8vh;
      display: flex;
      align-items: center;
      justify-content: end;
      box-shadow: 0 0 15px #ddd;
      margin-bottom: 2vh;

      .el-button {
        margin-right: 50px;
      }
    }
  }

}</style>