<template>
  <div id="ad-user">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通用户" name="first">
          <el-table :data="userData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column label="头像">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="40" :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="accountNumber" label="账号">
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称">
            </el-table-column>
            <el-table-column prop="signInTime" label="注册时间">
            </el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope">
                <el-button type="danger" plain @click="ban(scope.row)">封号</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="管理员" name="second">
          <div class="manger">
            <el-table :data="userManage" style="width: 100%">
              <el-table-column prop="accountNumber" label="账号">
              </el-table-column>
              <el-table-column prop="adminName" label="昵称">
              </el-table-column>
            </el-table>
            <el-button type="primary" plain class="addManger" @click="dialogFormVisible = true">添加管理员</el-button>
            <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="accountNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input v-model="adminName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="adminPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                  <el-input v-model="adminPassword1" autocomplete="off" show-password></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addManger">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="违规用户" name="third">违规用户
          <el-table :data="badUserData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column label="头像">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="40" :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="accountNumber" label="账号">
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称">
            </el-table-column>
            <el-table-column prop="signInTime" label="注册时间">
            </el-table-column>
            <el-table-column prop="done" label="操作">
              <template slot-scope="scope">
                <el-button  type="primary" plain @click="deblock(scope.row)">解封</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      userData: [],
      userManage: [],
      badUserData: [],
      dialogTableVisible: false,
      //弹出输入表单
      dialogFormVisible: false,
      accountNumber: '',
      adminName: '',
      adminPassword: '',
      adminPassword1: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      formLabelWidth: '120px'

    }
  },
  mounted() {
    this.getUserData();
    this.getUserManage();
    this.getBadUserData()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    //获取普通用户
    getUserData() {
      //正常普通用户
      this.$api.getUserData({
        page: 1,
        nums: 8,
        status: 0
      }).then(res => {
        if (res.status_code == 1) {
          this.userData = res.data.list;
          // console.log("this.userData", this.userData);
          // this.total = res.data.count;
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //获取被封禁的账号
    getBadUserData() {
      //违规用户
      this.$api.getUserData({
        page: 1,
        nums: 100,
        status: 1
      }).then(res => {
        if (res.status_code == 1) {
          this.badUserData = res.data.list;
          // console.log(" this.badUserData", this.badUserData);
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      });
    },
    //获取管理员
    getUserManage() {
      this.$api.getUserManage({
        page: this.nowPage,
        nums: 8,
      }).then(res => {
        if (res.status_code == 1) {
          this.userManage = res.data.list;
          // console.log("this.userManage", this.userManage);
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //封禁账号
    ban(i) {
      // console.log(i);
      this.$api.updateUserStatus({
        id: i.id,
        status: 1
      }).then(res => {
        if (res.status_code == 1) {
          this.getUserData();
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //添加管理员
    addManger() {
      if (this.adminPassword == this.adminPassword1) {
        // console.log(this.form.adminName);
        this.$api.regAdministrator({
          adminName: this.adminName,
          accountNumber: this.accountNumber,
          adminPassword: this.adminPassword,
        }).then(res => {
          if (res.status_code == 1) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.getUserManage();
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          console.log(e);
          this.$message.error("添加失败，账号重复或网络异常")
        });
        this.dialogFormVisible = false
      }
      else {
        this.$message.error("两次输入的密码不一致");
      }
    },
    //解封
    deblock(i){
      // console.log(i);
      this.$api.updateUserStatus({
        id: i.id,
        status: 0
      }).then(res => {
        if (res.status_code == 1) {
          this.getBadUserData();
          this.getUserData()
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
#ad-user {
  margin: 0 20px;

  .manger {
    width: 100%;
    height: 100%;
    display: flex;

    .addManger {
      height: 40px;
      width: 120px;
      margin-right: 20px;
      margin-left: 20px;
    }
  }
}
</style>