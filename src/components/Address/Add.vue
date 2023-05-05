<template>
  <div class="addInfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="收货人" prop="consigneeName">
        <el-input v-model="ruleForm.consigneeName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="consigneePhone">
        <el-input v-model="ruleForm.consigneePhone"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" >
        <Address @valueChange="getValue"></Address>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input v-model="ruleForm.detailAddress"></el-input>
      </el-form-item>
      <el-form-item label="设为默认收货地址" prop="defaultFlag">
        <el-switch v-model="ruleForm.defaultFlag" @click="setDefault"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Address from "@/components/Address/Address.vue";
export default {
  data() {
    return {
      ruleForm: {
        consigneeName: '',
        consigneePhone: '',
        provinceName: '',
        cityName: '',
        regionName: '',
        detailAddress: '',
        defaultFlag: false,

      },
      selectedOptions: [],//存放默认值
      addressData: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名,长度为2~8个字符', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        telNum: [{ required: true, message: '手机号不能为空' },
        {
          type: 'number',
          message: '手机号格式不正确',
          trigger: 'blur',
          transform(value) {
            var phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
            if (!phonereg.test(value)) {
              return false
            } else {
              return Number(value)
            }
          }
        }]
      }
    }
  },
  components: {
    Address
  },
  methods: {
    getValue(val) {
      console.log("参数为vla：", val);
      this.ruleForm.provinceName = val[0]
      this.ruleForm.cityName = val[1]
      this.ruleForm.regionName = val[2]
    },
    submitForm(ruleForm) {
      console.log("详细地址为", this.ruleForm.detailAddress);
      console.log(this.ruleForm.provinceName, this.ruleForm.cityName, this.ruleForm.regionName);
      this.$api.addAddress(this.ruleForm).then(res => {
        console.log(res);
      })
      this.$router.push('/address/list')
    },
    //设为默认地址
    setDefault(){
      this.ruleForm.defaultFlag=true
    }
  }
}
</script>

<style lang="less" scoped>
.addInfo {
  width: 600px;
  display: flex;
  margin: auto;

  .demo-ruleForm {
    width: 100%;
    margin-top: 80px;

    .el-form-item__label {
      width: 100px;
      text-align: center;
    }
  }
}
</style>