<template>
  <div id="userLogin">
    <div class="content">
      <div class="input">
        <div class="i">
          电话：<el-input v-model="username" placeholder="请输入账号"></el-input>
        </div>
        <div class="i">
          密码：<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="login">登录</el-button>
        <el-button type="primary" round @click="register">注册</el-button>
      </div>
      <router-link to="/adminLogin">管理员登录<i class="el-icon-right"></i></router-link>
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
      this.$api.userLogin({
        accountNumber: this.username,
        userPassword: this.password
      }).then(res => {
        console.log("res",res);
        if (res.status_code === 1) {
          res.data.signInTime = res.data.signInTime.substring(0, 10);
          this.$globalData.userInfo = res.data;
          // console.log("this.$globalData.userInfo",this.$globalData.userInfo);
          localStorage.setItem('person',JSON.stringify(res.data))
          this.$router.replace({ path: '/home' });
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    register() {
      this.$router.push('/register')
    }
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
        width: 100px;
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
}</style>