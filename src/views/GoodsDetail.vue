<template>
  <div id="goodsDetail">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <!-- {{ goodsDetail }} -->
    <div class="main">
      <div class="content" v-for="item in goodsDetail">
        <!-- {{ item }} -->
        <div class="left">
          <div class="block">
            <el-carousel height="350px">
              <el-carousel-item v-for="i in pictureList">
                <img :src="i" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right">
          <div class="gd-title">
            {{ item.idleName }}
            <span class="note">(备注：{{ item.idleDetails }})</span>
          </div>
          <div class="gd-price">
            <div class="now">
              价格：<span>￥{{ item.idlePrice }}</span>
            </div>
          </div>

          <div class="gd-button">
            <div v-if="!isMaster">
              <el-button type="primary" round @click="addCart(item)">加入购物车</el-button>
              <el-button type="danger" round @click="buying()">立即购买</el-button>
            </div>
            <div v-if="isMaster">
              <el-button type="danger" round @click="down(item)" v-if="!downStatus">下架</el-button>
              <el-button type="danger" round @click="online(item)" v-if="downStatus">重新上架</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ goodsDetail }} -->
      <div class="seller" v-for="a in goodsDetail">
        <div class="block"><el-avatar :size="50" :src="a.user.avatar"></el-avatar></div>
        <div class="sellerInfo">
          <div class="nickname">{{ a.user.nickname }}</div>
          <div class="time">注册时间：{{ a.user.signInTime }}</div>
        </div>
      </div>
      <div class="commentArea">
        <div class="title">评论区</div>
        <div class="release">
          <div class="block" v-if="person.avatar"><el-avatar :size="50" :src="person.avatar"></el-avatar></div>
          <el-autocomplete class="inline-input" v-model="messageContent" :fetch-suggestions="querySearch"
            placeholder="发布评论" @select="handleSelect" @keyup.enter.native="sendMessage">
          </el-autocomplete>
          <el-button type="primary" round @click="sendMessage">确认</el-button>
        </div>
        <div class="area" v-for="i in messageList">
          <!-- {{ i }} -->
          <div class="block">
            <el-avatar :size="30" :src="i.fromU.avatar">
            </el-avatar>
          </div>
          <div class="right">
            <div class="fromName">{{ i.fromU.nickname }}</div>
            <div class="msgDetail">{{ i.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
// import {  } from "@/api/api";
export default {
  data() {
    return {
      goodsDetail: [],
      pictureList: '',
      cartGoods: [],
      messageList: [],
      state1: '',
      restaurants: [],
      messageContent: "",
      toUser: null,
      toMessage: null,
      person: [],
      //判断是否为自己发布的商品
      isMaster: false,
      downStatus: false
    };
  },
  created() {
    this.getDetail();
    this.getAllIdleMessage();
    this.restaurants = this.loadAll();
    var personData = JSON.parse(localStorage.getItem('person'))
    this.$globalData.userInfo = personData
    console.log("this.$globalData.userInfo", this.$globalData.userInfo);
    this.person = personData
    console.log("this.person", this.person);
  },
  components: {
    TopNav,
    TopSearch,
  },
  methods: {
    async getDetail() {
      const id = this.$route.query.id;
      // console.log(id);
      this.$api.getIdleItem({
        id: id
      }).then(res => {
        // console.log(res);
        this.goodsDetail.push(res.data)
        this.pictureList = JSON.parse(res.data.pictureList)
        console.log("this.goodsDetail", this.goodsDetail[0]);
        // console.log(this.$globalData.userInfo);
        let userId = this.$globalData.userInfo.id
        console.log("userId", userId);
        if (userId == this.goodsDetail[0].userId) {
          this.isMaster = true;
        }
      })
    },

    //加入购物车
    addCart(i) {
      //先调用actions中的方法再间接触发mutations中的方法
      // this.$store.dispatch('addGoods',this.goodsDetail)
      //直接调用mutation中的方法
      // console.log(this.goodsDetail);
      this.$store.commit("AddGoods", i);
      // console.log(this.goodsDetail.id);
    },
    //立即购买
    buying() {
      console.log(this.goodsDetail[0]);
      if(this.goodsDetail[0].idleStatus==1){
        this.$router.push({ path: '/buying', query: { id: this.goodsDetail[0].id } });
      }
      
      // this.$api.addOrder({
      //   idleId: this.goodsDetail[0].id,
      //   orderPrice: this.goodsDetail[0].idlePrice,
      // }).then(res => {
      //   console.log("res",res.data.id);
      //   if (res.status_code === 1) {
      //     this.$router.push({ path: '/buying', query: { id: res.data.id } });
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // }).catch(e => {
      // })
    },
    //获取评论信息
    getAllIdleMessage() {
      console.log(this.$route.query.id);
      let id = this.$route.query.id;
      console.log(id);
      this.$api.getAllIdleMessage({
        idleId: id
      }).then(res => {
        console.log('getAllIdleMessage', res.data);
        if (res.status_code === 1) {
          this.messageList = res.data;
        }
      }).catch(() => {
      })
    },
    //发送评论
    sendMessage() {
      console.log("触发事件");
      console.log("this.goodsDetail[0]",this.goodsDetail[0]);
      let content = this.messageContent.trim();
      if (this.toUser == null) {
        this.toUser = this.goodsDetail[0].userId;
      }
      if (content) {
        let contentList = content.split(/\r?\n/);
        let contenHtml = contentList[0];
        for (let i = 1; i < contentList.length; i++) {
          contenHtml += '<br>' + contentList[i];
        }
        this.$api.sendMessage({
          idleId: this.goodsDetail[0].id,
          content: contenHtml,
          toUser: this.toUser,
          toMessage: this.toMessage
        }).then(res => {
          console.log(res);
          if (res.status_code === 1) {
            this.$message({
              message: '留言成功！',
              type: 'success'
            });
            this.messageContent = '';
            this.getAllIdleMessage();
          } else {
            this.$message.error("留言失败！" + res.msg);
          }
        }).catch((error) => {
          console.log(error);
          this.$message.error("留言失败！");
        });

      } else {
        this.$message.error("留言为空！");
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "可小刀吗？" },
        { "value": "还在吗？" }

      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    //下架
    down(i) {
      console.log(i);
      this.$api.updateIdleItem({
        id: i.id,
        idleStatus: 2
      }).then(res => {
        console.log(res);
        if (res.status_code === 1) {
          i.idleStatus = 2;
          //下架成功
          this.downStatus = true
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    //重新上线
    online(e) {
      this.$api.updateIdleItem({
        id: e.id,
        idleStatus: 1
      }).then(res => {
        console.log(res);
        if (res.status_code === 1) {
          e.idleStatus = 1;
          //下架成功
          this.downStatus = false
        } else {
          this.$message.error(res.msg)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#goodsDetail {
  width: 100%;

  .main {
    width: 100%;
    padding-top: 50px;
    background-color: #fff;

    .content {
      width: 80%;
      max-width: 1200px;
      margin: auto;
      display: flex;

      .left {
        width: 30%;

        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 150px;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .right {
        width: 70%;
        margin-left: 50px;
        margin-top: 10px;
        position: relative;

        .gd-title {
          font-size: 20px;
          font-weight: bold;
          color: #5f5f5f;

          .note {
            color: #999;
            font-size: 16px;
          }
        }

        .gd-price {
          width: 100%;
          height: 60px;
          margin-top: 10px;
          font-size: 18px;
          color: #999;
          margin-left: 5px;

          span {
            margin-left: 15px;
            color: red;
          }
        }

        .gd-button {
          position: absolute;
          bottom: 20px;
        }
      }
    }

    .seller {
      width: 80%;
      height: 100px;
      max-width: 1200px;
      margin: auto;
      margin-top: 30px;
      display: flex;
      background-color: #ddd;
      border-radius: 20px;
      align-items: center;

      .block {
        width: 80px;
        margin-left: 50px;
      }

      .sellerInfo {
        .nickname {
          font-size: 18px;
          font-weight: bold;
        }

        .time {
          margin-top: 20px;
        }
      }
    }

    .commentArea {
      width: 80%;
      max-width: 1200px;
      margin: auto;
      margin-top: 30px;
      // background-color: #d3dce6;
      border-radius: 20px;

      .title {
        padding-top: 20px;
        height: 50px;
        font-size: 18px;
        color: #999;
      }

      .release {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .inline-input {
          margin-left: 30px;
          margin-right: 30px;
          width: 600px;

          .el-input__inner {
            width: 500px;
            border-radius: 20px;
          }
        }
      }

      .area {
        display: flex;
        margin-left: 20px;
        margin-top: 10px;

        .right {
          .fromName {
            margin-left: 10px;
            font-size: 13px;
            color: #999;
          }

          .msgDetail {
            margin-left: 10px;
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }

    }
  }
}
</style>
