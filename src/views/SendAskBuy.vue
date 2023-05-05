<template>
  <div id="pub">
    <TopNav></TopNav>
    <TopSearch></TopSearch>
    <div class="content">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="商品标题：">
          <el-input v-model="formLabelAlign.idleName"></el-input>
        </el-form-item>
        <el-form-item label="商品详情：">
          <el-input v-model="formLabelAlign.idleDetails"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上传照片：">
          <el-upload action="http://localhost:8080/file/" list-type="picture-card" :file-list="fileList"
            :auto-upload="true" :on-success="fileHandleSuccess">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img height="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item> -->
        <!-- <el-form-item label="设置价格：">
          <el-input v-model="formLabelAlign.idlePrice"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="分类：">
          <el-select v-model="formLabelAlign.idleLabel" placeholder="请选择类别">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="地址：">
          <el-cascader clearable :options="options" v-model="value" @change="selectValue"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="release">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import TopSearch from "@/components/Home/TopSearch.vue";
export default {
  data() {
    return {
      formLabelAlign: {
        idleName: "",
        idleDetails: "",
        //分类
        idleLabel: "",
        idlePrice: 0,
        //地址
        idlePlace: '',
        //照片
        pictureList: ''
      },
      fileList: [],
      options2: [{
        value: 1,
        label: '电子产品'
      }, {
        value: 2,
        label: '生活用品'
      }, {
        value: 3,
        label: '运动相关'
      }, 
       {
        value: 4,
        label: '图书笔记'
       }, 
    ],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      value: [],
      options: [
        {
          value: "本校区",
          label: "本校区",
          children: [
            {
              value: "东区",
              label: "东区",
              children: [
                {
                  value: "东一",
                  label: "东一",
                },
                {
                  value: "东二",
                  label: "东二",
                },
                {
                  value: "东三",
                  label: "东三",
                },
                {
                  value: "东四",
                  label: "东四",
                },
                {
                  value: "东五",
                  label: "东五",
                },
                {
                  value: "东六",
                  label: "东六",
                },
                {
                  value: "东七",
                  label: "东七",
                },
                {
                  value: "东八",
                  label: "东八",
                },
                {
                  value: "东九",
                  label: "东九",
                },
                {
                  value: "东十",
                  label: "东十",
                }
              ],
            },
            {
              value: "西区",
              label: "西区",
              children: [
                {
                  value: "西一",
                  label: "西一",
                },
                {
                  value: "西二",
                  label: "西二",
                },
                {
                  value: "西三",
                  label: "西三",
                },
                {
                  value: "西四",
                  label: "西四",
                },
                {
                  value: "西五",
                  label: "西五",
                },
                {
                  value: "西六",
                  label: "西六",
                },
                {
                  value: "西七",
                  label: "西七",
                },
                {
                  value: "西八",
                  label: "西八",
                },
                {
                  value: "西九",
                  label: "西九",
                },
                {
                  value: "西十",
                  label: "西十",
                }
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    TopNav,
    TopSearch,
  },
  methods: {
    selectValue() {
      this.formLabelAlign.idlePlace = this.value[2]
    },
    //发布按钮
    release() {
      console.log("被调用了");
      console.log(this.formLabelAlign);
      this.formLabelAlign.pictureList=JSON.stringify('');
      this.formLabelAlign.idlePrice=0;
      this.formLabelAlign.idleLabel=5
      if (this.formLabelAlign.idleName &&
        this.formLabelAlign.idleDetails &&
        this.formLabelAlign.idlePlace &&
        this.formLabelAlign.idleLabel &&
        (this.formLabelAlign.idlePrice || this.formLabelAlign.idleLabel === 5)) {
        this.$api.addIdleItem(this.formLabelAlign).then(res => {
          if (res.status_code === 1) {
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            console.log(res.data);
            this.$router.replace({ path: '/goodsDetail', query: { id: res.data.id } });
          } else {
            this.$message.error('发布失败！' + res.msg);
            console.log(res);
          }
        }).catch(e => {
          this.$message.error('请填写完整信息');
        })
      } else {
        this.$message.error('请填写完整信息！');
      }
    },
  },
};
</script>

<style lang="less" scoped>
#pub {
  width: 100%;

  .content {
    width: 100%;
    background-color: #fff;
    padding-top: 30px;

    .el-form {
      width: 50%;
      margin: auto;

      .el-form-item {
        margin: 0;

        .el-button {
          margin-top: 30px;

        }
      }
    }
  }
}
</style>
