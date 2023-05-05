<template>
  <div id="goodsAdmin">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="在线商品" name="first">
        <el-table :data="onlineGoods" style="width: 100%">
          <el-table-column prop="releaseTime" label="发布时间" width="200">
          </el-table-column>
          <el-table-column prop="idleName" label="商品名称">
          </el-table-column>
          <el-table-column prop="idleDetails" label="详细信息">
          </el-table-column>
          <el-table-column prop="user.nickname" label="发布人">
          </el-table-column>
          <el-table-column prop="idlePrice" label="价格">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" plain @click="down(scope.row)">强制下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已下架商品" name="second">
        <el-table :data="OfflineGoods" style="width: 100%">
          <el-table-column prop="releaseTime" label="发布时间" width="200">
          </el-table-column>
          <el-table-column prop="idleName" label="商品名称">
          </el-table-column>
          <el-table-column prop="idleDetails" label="详细信息">
          </el-table-column>
          <el-table-column prop="user.nickname" label="发布人">
          </el-table-column>
          <el-table-column prop="idlePrice" label="价格">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" plain @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      onlineGoods: [],
      OfflineGoods: []
    }
  },
  created() {
    this.getOnlineGoods(),
      this.getOfflineGoods()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获取上线商品
    getOnlineGoods() {
      this.$api.getGoods({
        status: 1,
        page: 1,
        nums: 100
      }).then(res => {
        if (res.status_code == 1) {
          this.onlineGoods = res.data.list;
          console.log(this.onlineGoods);
          this.total = res.data.count;
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //强制下架
    down(i) {
      console.log(i);
      this.$api.updateGoods({
        id: i.id,
        status: 2
      }).then(res => {
        if (res.status_code == 1) {
          this.getOnlineGoods();
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //下架产品
    getOfflineGoods() {
      this.$api.getGoods({
        status: 2,
        page: 1,
        nums: 100
      }).then(res => {
        if (res.status_code == 1) {
          this.OfflineGoods = res.data.list;
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //删除下架产品
    del(i) {
      console.log(i);
      this.$api.updateGoods({
        id: i.id,
        status: 0
      }).then(res => {
        if (res.status_code == 1) {
          this.getOfflineGoods();
        } else {
          this.$message.error(res.msg)
        }

      }).catch(e => {
        console.log(e)
      })
    }
  },

}
</script>

<style lang="less" scoped>
#goodsAdmin {
  width: 100%;
  height: 90vh;

  .el-tabs {
    height: 90vh;
    overflow: scroll;
    margin: 0 20px;
  }
}
</style>