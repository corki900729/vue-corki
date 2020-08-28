<template>
                <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="680px" @open="openDialog">
              <el-form :model="data.form" ref="addInfoForm"  :rules="rules" >

                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input id="username" v-model="data.form.username" placeholder=""></el-input>
                </el-form-item>  


                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="data.form.password" placeholder=""></el-input>
                </el-form-item>    
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="truename">
                    <el-input v-model="data.form.truename"  placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input  v-model="data.form.phone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="地区" :label-width="formLabelWidth" prop="region">
                    <div class="overflow-h">
                        <CityPicker :cityPickerLevel="['province','city','area','street']" :cityPickerData.sync="data.cityPickerData" />
                    </div>
                </el-form-item>    
                <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
                    <el-radio v-model="data.form.status" label="1">禁用</el-radio>
                    <el-radio v-model="data.form.status" label="2">启用</el-radio>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                    <el-checkbox-group v-model="data.form.role">
                        <el-checkbox v-for="item in data.roleItem" :key="item.id" :label="item.role">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="按钮权限" :label-width="formLabelWidth" prop="role">
                    <template v-if="data.btnPerm.length > 0">
                        <div v-for="item in data.btnPerm">
                            <h4>{{ item.name }}</h4>
                            <template v-if="item.perm && item.perm.length > 0">
                                <el-checkbox-group v-model="data.form.btnPerm">
                                    <el-checkbox v-for="buttons in item.perm" :key="buttons.value" :label="buttons.value">{{ buttons.name }}</el-checkbox>
                                </el-checkbox-group>
                            </template>    
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="submitForm('addInfoForm')" :loading="submitLoading">确 定</el-button>
            </div>
        </el-dialog>
</template>
<script>
import { ref, reactive, watch, onBeforeMount} from '@vue/composition-api';
import { GetRole, addUser, UserEdit, GetPermButton } from "@/api/user";
import { stripscript ,validateEmail , validatePass ,validateVCode} from "@/utils/validate.js";
//组件
import CityPicker from "@c/CityPicker";
//中央事件
import Bus from "@/utils/bus";
export default {
    name: "dialogInfo",
    components: { CityPicker }, //注入足奖
        //父组件向子组件是单向数据流 不能反向修改
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default: ()=>{}
        }
    },
    setup(props, { root, emit, refs  }){
        //注册方法
        Bus.$on("showFun", (data)=>{
            console.log(data)
        })
        const data = reactive({
            cityPickerData: {},
            roleStatus: "1", //启用状态
            //角色
            roleItem: [],
            btnPerm:[], //按钮权限
            form: {
                username: '',
                truename: '',
                password: '',
                phone: '',
                status: '1',
                region: '',
                role: [],
                btnPerm: []
            },

        })
        const rules= reactive({
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                role: [
                    { required: true, message: "请选择绝俗", trigger: 'change' }
                ]
            })
        const dialog_info_flag=ref(false) ;
        const formLabelWidth=ref("70px")
        const form=reactive({
          category: '',
          title: '',
          content: ''
        })

        const submitLoading = ref(false);
        //watch

//请求角色
        const getRole =  () => {
            GetRole().then(response => {
                data.roleItem = response.data.data;
            })
            GetPermButton().then( response =>{
                data.btnPerm = response.data.data
            })
        }
        const close = () =>{
            dialog_info_flag.value= false;
            emit("update:flag", false)
            // this.$emit('close', false);  //回掉时需要做逻辑处理的时候就不能用修饰器
            refs.addInfoForm.resetFields();
        }
        //弹窗打开动画结束时
        const openDialog = () => {
            //角色请罪
            getRole()
            //初始值处理
            let editData = props.editData;
            if(editData.id){//编辑
                editData.role = editData.role ? editData.role.split(',') : [];//角色分割成为数组
                editData.btnPerm = editData.btnPerm ? editData.btnPerm.split(','):[]
                for( let key in editData){
                    data.form[key] = editData[key];
                }                
            }else{//添加
                data.form.id && delete data.form.id;
            }
            console.log(data.form)
        }

      const validateUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                // refs.addInfoForm.validateField("username");
                callback();
            }else{
                callback();
            }
      };
      //y验证密码
      let validatePassword = (rule, value, callback) => {
            // console.log(stripscript(value))
            //重新绑定多虑后数字
            data.form.password = stripscript(value);
            //重新为value负值
            value = data.form.password;
            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
            callback(new Error('密码为6-20位数字加字母!'));
            } else {
            callback();
            }
      };    
      //角色校验
      let validateRole = ( rule, value, callback ) => {
          if(value === ''){
              callback(new Error("请输入角色"))
          }else{
              callback();
          }
      }    
        const submitForm = (formName => {
            refs[formName].validate((valid) => {
                if(valid){
                    console.log('ok')
                }else{
                    console.log('false')
                    return false;
                }
            } )
            if(!data.form.username){
                root.$message({
                    message: '用户名不能为空',
                    type: 'error'
                })
                return false;
            }   
            if(!data.form.password){
                root.$message({
                    message: '密码不能为空',
                    type: 'error'
                })
                return false;
            }   
            if(data.form.role.length==0){
                root.$message({
                    message: '角色j不能为空',
                    type: 'error'
                })
                return false;
            }      
            //todo 这里直接改值会影响之前数据绑定，值得引用传递-----使用深拷贝或者浅拷贝可以解决 -》函数和一些数据类型会被丢失
            // 深拷贝 JSON.parse(JSON.stringify(data.form))
            
            let requestData = Object.assign({}, data.form); //浅拷贝 -》 只有第一层被脱离，二维的东西还会被影响
            requestData.role = requestData.role.join()
            requestData.btnPerm = requestData.btnPerm.join();
            requestData.region = JSON.stringify(data.cityPickerData);
            if(requestData.id){
                userEdit(requestData)
            }else{
                userAdd(requestData)
            }

        })
        const userAdd = (requestData) => {
            addUser(requestData).then(response => {
            // refs.addInfoForm.resetField();
            root.$message({
                message: "新增成功",
                type: "success"
            })
            close()
            emit("update:flag",false);
            emit("refreshData");
          })
        }
        const userEdit = (requestData) => {
            UserEdit(requestData).then(response => {
            // refs.addInfoForm.resetField();
            root.$message({
                message: "编辑成功",
                type: "success"
            })
            close()
            emit("update:flag",false);
            emit("refreshData");
          })            
        }
        watch(() => dialog_info_flag.value = props.flag)
        return {
            dialog_info_flag,formLabelWidth, form,submitLoading, data, rules,
            close, openDialog, submitForm, getRole
        }
    }

    // watch: {
    //     flag: {
    //         handler(newValue, oldvalue){
    //             this.dialog_info_flag=newValue;
    //         }
    //     }
    // }
}
</script>
<style scoped>

</style>