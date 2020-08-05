<template>
                <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px" @open="openDialog">
              <el-form :model="form" ref="addInfoForm">

                <el-form-item label="类型" :label-width="formLabelWidth" prop="category">
                    <el-select v-model="form.category" placeholder="请选择活动区域">
                        <el-option v-for="items in categoryOption.item" 
                          :key="items.id"
                         :label="items.category_name" :value="items.id">
                         </el-option>
                    </el-select>
                </el-form-item>            

                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="form.title"  placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
                    <el-input type="textarea"  v-model="form.content" placeholder="请输入"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="submit" :loading="submitLoading">确 定</el-button>
            </div>
        </el-dialog>
</template>
<script>
import { ref, reactive, watch} from '@vue/composition-api';
import { AddInfo } from "@/api/news";
export default {
    name: "dialogInfo",
        //父组件向子组件是单向数据流 不能反向修改
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { root, emit, refs  }){
        const dialog_info_flag=ref(false) ;
        const formLabelWidth=ref("70px")
        const form=reactive({
          category: '',
          title: '',
          content: ''
        })
        const categoryOption = reactive({
            item: []
        })
        const submitLoading = ref(false);
        //watch
        watch(() => dialog_info_flag.value = props.flag)
        const close = () =>{
            dialog_info_flag.value= false;
            emit("update:flag", false)
            // this.$emit('close', false);  //回掉时需要做逻辑处理的时候就不能用修饰器
            refs.addInfoForm.resetFields();
        }
        const openDialog = () => {
            categoryOption.item = props.category;

        }
        const submit = () => {
            let requestData = {
                category: form.category,
                title: form.title,
                content: form.content
            }
            if(!form.category){
                root.$message({
                    message: '分类不能唯恐',
                    type: 'error'
                })
                return false;
            }
            submitLoading.value = true;
            AddInfo(requestData).then( response => {
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
                submitLoading.value = false;
                //chongzhi
                refs['addInfoForm'].resetFields();
                console.log(response.data)
            }).catch( error => {
                submitLoading.value = false;
                console.log(error)
            })
        }
        return {
            dialog_info_flag,formLabelWidth, form,categoryOption,submitLoading,
            close, openDialog, submit
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