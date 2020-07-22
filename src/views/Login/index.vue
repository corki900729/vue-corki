<template>
    <div id="login">
        <div class="login-warp">
            <ul class="meau-tab">
                <li :class="{'current': item.current}" @click="toggleMenu(item)" v-for="(item, index) in menuTab" v-bind:key="item.id" >{{item.txt}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="login-form" size="medium">

                <el-form-item  prop="username" class="item-from">
                <label for="username">邮箱</label>  
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-from">
                <label for="password">密码</label>
                    <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-from" v-if="model ==='register'">
                <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                    
                <el-form-item  prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input  v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" class="block login-btn" :disabled="loginButtonStatus"  >{{  model === "login" ? "登陆" : "注册" }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { GetSms, Register } from "api/login";
import { reactive, ref, isRef, onMounted } from '@vue/composition-api';
import { stripscript ,validateEmail , validatePass ,validateVCode} from "@/utils/validate.js";
export default{
    name: "login",
    setup(props,context){
    // setup(props, { refs }){} 解构写法
        // attrs: (...) == this.attrs
        // emit: (...)
        // isServer: (...)
        // listeners: (...)
        // parent: (...)
        // refs: (...)
        // root: (...) this
        let checkCode = (rule, value, callback) => {
        ruleForm.code = stripscript(value);
        value = ruleForm.code;
        if (!value) {
          return callback(new Error('请输入验证码'));
        }else if(validateVCode(value)){
            return callback(new Error('验证码输入有误'));
        }else{
            return callback();
        }
        
      };
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
            callback(new Error('用户名格式有误'));
        }else{

          callback();
        }
      };
      //y验证密码
      let validatePassword = (rule, value, callback) => {
        console.log(stripscript(value))
        //重新绑定多虑后数字
        ruleForm.password = stripscript(value);
        //重新为value负值
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('密码为6-20位数字加字母!'));
        } else {
          callback();
        }
      };
            //y验证重复密码
      let validatePasswords = (rule, value, callback) => {
          //如果模块职位login的话直接通过
        if(model.value == 'login') { callback() };
        //重新绑定多虑后数字
        ruleForm.passwords = stripscript(value);
        //重新为value负值
        value = ruleForm.passwords;
        if (value === '') {
          callback(new Error('请在此输入密码'));
        } else if (value != ruleForm.password) {
          callback(new Error('重复密码不正确!'));
        } else {
          callback();
        }
      };
        /** todo
         * 生命数据 **************************************/

//此处防止data数据，生命周期，自定义函数
        const  menuTab= reactive([
                { txt: '登陆', current: true , type: 'login'},
                { txt: '注册', current: false, type: 'register'}
            ])
            //模块值
        const model = ref('login');   
        //登陆按钮禁用状态
        const loginButtonStatus = ref(true);
        //验证码按钮状态
        // const codeButtonStatus = ref(false);
        // const codeButtonText = ref('获取验证码');
//使用对象方式
        const codeButtonStatus = reactive({
            status: false,
            text: "获取验证码"
        });
        //倒计时
        const timer =ref(null);
        //表单绑定数据
        const ruleForm= reactive({
            username: '',
            password: '',
            passwords: '',
            code: ''
            })
            //表单的验证
            const    rules= reactive({
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            passwords: [
                { validator: validatePasswords, trigger: 'blur' }
            ],
            code: [
                { validator: checkCode, trigger: 'blur' }
            ]
            })
        /** 生命函数 */
                //vue数据驱动试图渲染 js操作dom元素
       const toggleMenu = (data => {
            //循环
            menuTab.forEach(element => {
                element.current=false;
            });
            //高光
            data.current = true;
            //修改模块知
            model.value = data.type;
            //充值表单 this.$refs[formName].resetFields();2.0
            context.refs["loginForm"].resetFields(); //3.0c ontenx.refsloginForm.resetFields()
        });
        //提交验证码
        const getSms = ( () => {
//判断邮箱
            if(ruleForm.username == ''){
                context.root.$message.error('邮箱不能为空');
                return false;
            }
            if(validateEmail(ruleForm.username)){
                context.root.$message.error('邮箱格式有误');
                return false;
            }
            let data = {
                username: ruleForm.username,
                module: model.value
            }
            //验证码按钮改为不可用
            codeButtonStatus.status = true;
            codeButtonStatus.text = "信息发送中" ;

            setTimeout(() => {
                GetSms(data).then( response => {
                    //接受正确的返回函数
                    let data = response.data;
                    console.log(data)
                    context.root.$message({
                        message: data.message,
                        type: 'success'
                        });
                //调定时器进行倒计时
//启用登陆或者户厕按钮
                loginButtonStatus.value = false;
                countDown(60);//倒计时方法
                }).catch(error => {
    //接受错误的返回值
                    // console.log(error)
                });
            },3000)

//延时情况


        })
    //提交表单
      const submitForm = (formName => {

        context.refs[formName].validate((valid) => {
          if (valid) {
              let data = {
                  email: ruleForm.username,
                  password: ruleForm.password,
                  code: ruleForm.code,
                  module: 'register',
                  name: ruleForm.username
              };
              Register(data).then( response => {
                  let data = response.data;
                  context.root.$message({
                      message: data.message,
                      type: "success"
                  })
                  console.log(response)
              }).catch( error => {

              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }) 
      /**
       *  倒计时
       */
      const countDown = ((num) => {
        //setTimeout 执行一次clearTimeout
        // setInterval 不断执行 需要条件才会停止 clearInterval
        // setTimeout(() => {
        //     console.log('settimeout');
        // }, 1000)
        let time =num;
        timer.value = setInterval(() => {
            time--;
            if(time === 0){
                clearInterval(timer.value);
                codeButtonStatus.text = '重新发送';
                codeButtonStatus.status = false; //按钮重新可用
            }else{
                codeButtonStatus.text = `倒计时${time}秒`
            }
            
        }, 1000)

      });
        /**生命周期 */
        //挂在完成后 挂在完成后 自动执行`
        onMounted( () => {
        } )
    return  {
        menuTab ,model, loginButtonStatus,codeButtonStatus,
        toggleMenu, submitForm, getSms,
        ruleForm, rules
    }    
    },
    // create(){}, 3.0废除
    //挂在完成后 自动执行` 基本数据类型是值传递（ndefined null boolean number string 引用数据类型 object array function
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
    width: 330px;
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