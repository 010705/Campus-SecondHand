<template>
  <div id="userLogin">
    <div class="content">
      <div class="input">
        <div class="i">
          <span>昵称：</span><el-input v-model="userInfo.nickname" placeholder="请输入账号"></el-input>
        </div>
        <div class="i">
          <span>密码：</span>
          <el-input placeholder="请输入密码" v-model="userInfo.userPassword" show-password></el-input>
        </div>
        <div class="i">
          <span>确认密码：</span>
          <el-input placeholder="请输入密码" v-model="userPassword1" show-password></el-input>
        </div>
        <div class="i">
          <span>手机号：</span>
          <el-input placeholder="请输入手机号码" v-model="userInfo.accountNumber"></el-input>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="login">去登录</el-button>
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
      userInfo: {
        nickname: '',
        userPassword: '',
        accountNumber: ''
      },
      userPassword1: '',
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    register() {
      if (this.userInfo.accountNumber && this.userInfo.userPassword && this.userInfo.nickname) {

        if (this.userInfo.accountNumber.length !== 11) {
          this.$message.error('手机号长度不符合要求!')
        } else if (this.userInfo.userPassword !== this.userPassword1) {
          this.$message.error('两次输入的密码不相同！');
        } else {
          console.log("this.userInfo", this.userInfo);
          this.$api.signIn(this.userInfo).then(res => {
            if (res.status_code === 1) {
              this.$message({
                message: '注册成功！',
                type: 'success'
              });
              this.$router.replace({ path: '/login' });
            } else {
              this.$message.error('注册失败，用户已存！');
            }
          }).catch(e => {
            console.log(e);
            this.$message.error('注册失败，网络异常！');
          })
        }
      } else {
        this.$message.error('注册信息未填写完整！');
      }
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
    padding-top: 50px;

    .input {
      .i {
        display: flex;
        margin: 5px 0;

        span {
          width: 80px;
          text-align: center;
        }

        .el-input {
          width: 200px;
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
}
</style>