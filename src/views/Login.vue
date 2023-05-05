<template>
  <div id="login">
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName:'login'
      // input1: '',
      // input: ''
    }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      }
  },
}
</script>

<style lang="less" scoped>
#login {
  // height: 100vh;
  background-image: url("@/assets/login.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 800px;

  .content {
    width: 700px;
    height: 400px;
    border-radius: 20px;
    background-color: #fff;
    display: flex;

    .left {
      width: 50%;
      height: 100%;
      background-image: url("@/assets/login-caption.png");
      background-size: cover;
    }

    .right{
      width: 50%;
      height: 400px;
    }
  }

}</style>