<template>
  <div id="address">
    <el-cascader clearable :options="options" v-model="value" @change="selectValue"></el-cascader>
    <!-- {{ value }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:[],
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
  methods:{
    selectValue(){
      // console.log("数据",this.value);
      this.$emit('valueChange',this.value)
    }
  }
};
</script>

<style lang="less" scoped></style>
