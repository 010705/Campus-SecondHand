<template>
  <div id="home">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="list">
      <el-button type="primary" @click="post">发布</el-button>
      <el-table :data="listData" style="width: 100%" :row-class-name="tableRowClassName" @row-click="jump">
        <el-table-column prop="releaseTime" label="发布时间">
        </el-table-column>
        <el-table-column prop="user.nickname" label="发布用户">
        </el-table-column>
        <el-table-column prop="idleName" label="内容">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <span>查看</span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue';
import TopSearch from '@/components/Home/TopSearch.vue';
export default {
  data() {
    return {
      listData: []
    }
  },
  mounted() {
    this.getSortGood()
  },
  methods: {
    async getSortGood() {
      this.$api.findIdleTiemByLable({
        idleLabel: 5,
        page: 1,
        nums: 100
      }).then(res => {
        console.log("分类列表的数据", res);
        this.listData = res.data.list
      }).catch(e => {
        console.log(e)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    jump(row) {
      console.log(row);
      this.id = row.id
      this.$router.push({ path: '/goodsDetail', query: { id: row.id } })
    },
    post(){
      this.$router.push('/sendAskBuy')
    },
  },
  components: {
    TopNav,
    TopSearch,
  }
}
</script>

<style lang="less" scoped>
#home {
  background-color: #fff;
  width: 100%;
  .list {
    width: 80%;
    margin: auto;
    padding-top: 30px;
    .el-button{
    }

    .el-table {
      margin-top: 20px;
    }
  }


}
</style>