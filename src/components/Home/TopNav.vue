<template>
  <div id="topNav">
    <div class="left">
      <i class="el-icon-location-information">学校名</i>
    </div>
    <div class="right">
      <div class="item"><router-link to="/mySell">我发布的</router-link></div>
      <div class="item"><router-link to="/myBuy">我购买的</router-link></div>
      <div class="item"><router-link to="/cart">购物车</router-link></div>
      <div class="item"><router-link to="/address/list">地址管理</router-link></div>
      <div class="item"><router-link to="/publish">商品发布</router-link></div>
      <div class="item"><router-link to="/askBuy">求购平台</router-link></div>
      <router-link v-if="!isLogin" class="user-name-text" to="/login">登录</router-link>
      <el-dropdown trigger="click" v-else>
        <!-- <div>111</div> -->
        <div style="cursor: pointer; display: flex; align-items: center">
          <!-- <div style="font-size: 14px; color: #409eff; padding-right: 5px">{{ nicknameValue ? nicknameValue : nickname }}
          </div> -->
          <el-avatar :src="avatarValue ? avatarValue : avatar"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="toMe">个人信息</div>
          </el-dropdown-item>
          <el-dropdown-item divided style="color: red">
            <div @click="loginOut">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nicknameValue: '',
      avatarValue: '',
      nickname: '登录',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      isLogin: false
    };
  },
  created() {
    // console.log(!this.$globalData.userInfo.nickname);
    if (!this.$globalData.userInfo.nickname) {
      //未登录时
      this.$api.getUserInfo().then(res => {
        console.log('Header getUserInfo:', res);
        if (res.status_code === 1) {
          this.nickname = res.data.nickname;
          this.avatar = res.data.avatar;
          res.data.signInTime = res.data.signInTime.substring(0, 10);
          this.$globalData.userInfo = res.data;
          this.isLogin = true;
        }
      })
    } else {
      //登录后
      this.nickname = this.$globalData.userInfo.nickname;
      this.avatar = this.$globalData.userInfo.avatar;
      this.isLogin = true;
    }
  },
  methods: {
    already() {
      this.$router.push('/order');
    },
    myPublish() { },
    toMe() {
      if ('/myInfo' !== this.$route.path) {
        this.$router.push({ path: '/myInfo' });
      }
    },
    loginOut() {
      this.$api.logout().then(res => {
        if (res.status_code === 1) {
          this.$globalData.userInfo = {};
          console.log("this.$globalData.userInfo ",this.$globalData.userInfo );
          // console.log("login out");
          localStorage.setItem("person", '')
          if (this.$router.path = '/home') {
            this.$router.go(0)
          }
          else {
            this.$router.replace('/home');
          }
        } else {
          this.$message.error('网络或系统异常，退出登录失败！');
        }
      });

    }

  }
};
</script>

<style lang="less" scoped>
#topNav {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  color: #333;
  background: #f5f5f5;

  .left {
    width: 200px;
  }

  .right {
    display: flex;
    align-items: center;

    .item {
      margin: 0 10px;
    }

    .el-dropdown-link {
      cursor: pointer;
      // display: flex;
      .el-icon-arrow-down {
        font-size: 15px;
        color: #333;
      }
    }

    a {
      text-decoration: none;
      color: #333;
    }
  }
}
</style>
