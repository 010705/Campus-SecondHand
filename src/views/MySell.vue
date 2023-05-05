<template>
  <div>
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="content">
      <div class="sellBody" v-for="item in dataList">
        <!-- {{ item }} -->
        <router-link :to="{ path: '/goodsDetail', query: { id: item.id } }">
          <div class="img" v-for="(i, index) in item.pictureList" v-if="index < 1"><img
              :src="JSON.parse(item.pictureList)" /></div>
          <div class="info">
            <div class="title">{{ item.idleName }}</div>
            <div class="mes">备注：{{ item.idleDetails }}</div>
            <div class="time">发布时间：{{ item.releaseTime }}</div>
            <div class="price">￥{{ item.idlePrice }}</div>
          </div>
        </router-link>
        <div class="status">
          {{ orderStatus[item.idleStatus - 1] }}
        </div>
        <div class="btn">
          <el-button type="danger" round @click="down(item)">{{ status[item.idleStatus - 1] }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue';
import TopSearch from '@/components/Home/TopSearch.vue';
export default {
  data() {
    return {
      sellOrder: [],
      orderStatus: ['', '已下架','待发货'],
      dataList: [],
      status: ["下架", "删除"]
    }
  },
  created() {
      this.getIdleItemData()
  },
  methods: {
    //获取出售信息
    // getMySoldIdle() {
    //   this.$api.getMySoldIdle().then(res => {
    //     if (res.status_code === 1) {
    //       console.log('111getMySoldIdle', res.data);
    //       this.sellOrder=res.data
    //       // for (let i = 0; i < res.data.length; i++) {
    //       //   let pictureList = JSON.parse(res.data[i].idleItem.pictureList);
    //       //   this.dataList.push({
    //       //     id: res.data[i].id,
    //       //     imgUrl: pictureList.length > 0 ? pictureList[0] : '',
    //       //     idleName: res.data[i].idleItem.idleName,
    //       //     idleDetails: res.data[i].idleItem.idleDetails,
    //       //     timeStr: res.data[i].createTime.substring(0, 10) + " " + res.data[i].createTime.substring(11, 19),
    //       //     idlePrice: res.data[i].orderPrice,
    //       //     orderStatus: res.data[i].orderStatus
    //       // });
    //       // }
    //     }
    //   })
    // },
    getIdleItemData() {
      this.$api.getAllIdleItem().then(res => {
        console.log("刚刚信息为", res);
        if (res.status_code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].timeStr = res.data[i].releaseTime.substring(0, 10) + " " + res.data[i].releaseTime.substring(11, 19);
            let pictureList = JSON.parse(res.data[i].pictureList);
            console.log("pictureList", typeof (pictureList));
            res.data[i].imgUrl = pictureList.length > 0 ? pictureList[0] : '';
            this.dataList = res.data
          }
        }
      })
    },
    down(e) {
      console.log("下架");
      console.log(e);
      this.$confirm('是否确认？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (e.idleStatus===1) {
          //下架操作
          this.$api.updateIdleItem({
            id: e.id,
            idleStatus: 2
          }).then(res => {
            console.log(res);
            if (res.status_code === 1) {
              e.idleStatus = 2;
            } else {
              this.$message.error(res.msg)
            }
          });
        } else{
          //删除操作
          this.$api.updateIdleItem({
            id: e.id,
            idleStatus: 0
          }).then(res => {
            console.log(res);
            if (res.status_code === 1) {
              this.dataList.splice(e);
              this.getIdleItemData()
            } else {
              this.$message.error(res.msg)
            }
          });
        } 
      }).catch(() => {
      })
    }
  },
  components: {
    TopNav,
    TopSearch,
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 80%;
  max-width: 1200px;
  margin: auto;
  // position: relative;

  .sellBody {
    display: flex;
    height: 150px;
    align-items: center;
    position: relative;

    a {
      text-decoration: none;
      display: flex;
      color: black;
    }

    .img {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
      }
    }

    .info {
      margin-left: 50px;

      .title {
        font-size: 17px;
        font-weight: bold;
      }

      .mes {
        font-size: 14px;
        margin-top: 5px;
      }

      .time {
        font-size: 14px;
        margin-top: 5px;
      }

      .price {
        font-size: 15px;
        color: red;
        margin-top: 5px;
      }
    }

    .status {
      color: red;
      position: absolute;
      right: 5px;
    }

    .btn {
      position: absolute;
      right: 0px;
      bottom: 10px;
    }
  }
}
</style>