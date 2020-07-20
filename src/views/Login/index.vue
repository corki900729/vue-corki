<template>
    <div id="login">
        <div class="login-warp">
            <ul class="meau-tab">
                <li :class="{'current': item.current}" @click="toggleMenu(item)" v-for="(item, index) in menuTab" v-bind:key="item.id" >{{item.txt}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">

                <el-form-item  prop="username" class="item-from">
                <label>邮箱</label>  
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-from">
                <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                    
                <el-form-item  prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input  v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" >获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { stripscript } from "@/utils/validate.js";
export default{
    name: "login",
    data(){
      var checkCode = (rule, value, callback) => {
        let reg = /^[a-z0-9]{6}$/
        if (!value) {
          return callback(new Error('请输入验证码'));
        }else if(!reg.test(value)){
            return callback(new Error('验证码输入有误'));
        }else{
            return callback();
        }
        
      };
      var validateUsername = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
            callback(new Error('用户名格式有误'));
        }else{
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        let reg = /^(?!\D+$)(?![^A-Za-z+$])\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字加字母!'));
        } else {
          callback();
        }
      };
        return {
            menuTab: [
                { txt: '登陆', current: true},
                { txt: '注册', current: false}
            ],
            ruleForm: {
            username: '',
            password: '',
            code: ''
            },
            rules: {
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            code: [
                { validator: checkCode, trigger: 'blur' }
            ]
            }
        }
    },
    create(){},
    //挂在完成后 自动执行` 基本数据类型是值传递（ndefined null boolean number string 引用数据类型 object array function
    mounted() {
        // let a=[11,22];
        // let b=a;
        // b[0]=33;
        // console.log(`a: ${a}`)
        // console.log(`b : ${b}`);
    },
    //函数
    methods: {
        //vue数据驱动试图渲染 js操作dom元素
        toggleMenu(data){
            //循环
            this.menuTab.forEach(element => {
                element.current=false;
            });
            data.current = true;

            console.log(data)
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    props: {},
    watch: {
        
    },
}
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background: #344a5f;
}
.login-warp {
    width: 330ps;
    margin: auto;
}
.meau-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current {
        background-color: rgba(0, 0, 0, .1);
    }
}
.login-form {
    margin-top: 29px;
    label {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .iterm-from {
        margin-bottom: 13px;
    }
    .block{
        display: block;
        width: 100%;
    }
    .login-btn {
        margin-top: 19px;
    }
}
</style>