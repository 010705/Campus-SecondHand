<template>
  <div id="topSearch">
    <div class="logo">
      <router-link to="/home">
        <img src="@/assets/logo.png" />
      </router-link>
    </div>
    <div class="search">
      <el-input placeholder="请输入内容" v-model="searchValue" @keyup.enter.native="searchIdle" clearable> </el-input>
      <button @click="searchIdle">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: this.searchInput,
      goods: []
    };
  },
  methods: {
    searchIdle() {
      if ('/search' !== this.$route.path) {
        this.$router.push({ path: '/search', query: { searchValue: this.searchValue } });
      } else {
        this.$router.replace({ path: '/search', query: { searchValue: this.searchValue } });
        this.$router.go(0);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#topSearch {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  background-image: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png);

  .logo {
    img {
      // width: 300px;
      height: 70px;
    }
  }

  .search {
    display: flex;
    align-items: center;
    width: 500px;
    height: 40px;
    border: 2px solid orange;
    border-radius: 20px;
    padding-left: 15px;
    padding-right: 3px;
    background-color: #fff;

    .el-input__inner {
      border-style: none;
    }

    button {
      width: 80px;
      height: 35px;
      background-color: orange;
      border-style: none;
      border-radius: 20px;
    }
  }
}</style>
