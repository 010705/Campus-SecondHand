<template>
  <div id="userLogin">
    <div class="content">
      <div class="input">
        <div class="i">
          账号：<el-input v-model="username" placeholder="请输入账号"></el-input>
        </div>
        <div class="i">
          密码：<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="login">登录</el-button>
      </div>
      <router-link to="/login">用户登录<i class="el-icon-right"></i></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log("登录")
      this.$api.adminLogin({
        accountNumber: this.username,
        adminPassword: this.password
      }).then(res => {
        console.log(res);
        if (res.status_code === 1) {
          console.log(res);
          localStorage.setItem("admin",JSON.stringify(res.data))
          this.$sta.isLogin = true;
          this.$sta.adminName = res.data.adminName;
          this.$router.replace({ path: '/admin' });
        } else {
          this.$message.error('登录失败，账号或密码错误！');
        }
      });
    },
  },

}
</script>

<style lang="less" scoped>
#userLogin {
  width: 100%;
  height: 100%;
  position: relative;

  .content {
    width: 80%;
    height: 100%;
    margin: auto;
    padding-top: 100px;

    .input {
      .i {
        display: flex;
        margin: 5px 0;

        .el-input {
          width: 200px;
          margin-left: 10px;
        }
      }
    }

    .btn {
      padding-top: 30px;
      padding-left: 20px;
      width: 80%;
      display: flex;
      justify-content: space-around;

      .el-button {
        width: 80%;
      }
    }

    a {
      position: absolute;
      margin-top: 30px;
      right: 60px;
      text-decoration: none;
      color: #409EFF;
      font-size: 14px;
    }
  }
}
</style>