<template>
  <div id="orderAdmin">
    <el-table :data="orderData" style="width: 100%" height="90vh">
      <el-table-column fixed prop="orderNumber" label="订单号">
      </el-table-column>
      <el-table-column prop="idleItem.idleName" label="商品名称">
      </el-table-column>
      <el-table-column prop="idleItem.idlePrice" label="价格">
      </el-table-column>
      <el-table-column prop="createTime" label="订单提交时间">
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <div>{{ orderStatus[scope.row.orderStatus] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" plain @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: [],
      orderStatus: ['待付款', '待发货', '待收货', '已完成', '已取消'],
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    //获取订单信息
    getOrder() {
      this.$api.getOrderList({
        page: 1,
        nums: 100
      }).then(res => {
        if (res.status_code == 1) {
          this.orderData = res.data.list;
          console.log(this.orderData);
          // const idleItem=res.data.list.idleItem
          // this.orderGoods=idleItem
          // console.log(this.orderGoods);
        } else {
          this.$message.error(res.msg)
        }

      }).catch(e => {
        console.log(e)
      })
    },
    //删除订单列
    del(i) {
      console.log(i);
      this.$api.deleteOrder({
        id: i.id
      }).then(res => {
        if (res.status_code == 1) {
          this.getOrder();
        } else {
          this.$message.error(res.msg)
        }

      }).catch(e => {
        console.log(e)
      })

    }
  }

}
</script>

<style lang="less" scoped>
#orderAdmin {
  width: 100%;
  height: 90vh;
  .el-table{
    // overflow: scroll;
  }

}
</style>