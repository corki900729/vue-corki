<template>
        <el-form ref="form" :model="form" label-width="120px">

            <el-form-item label="信息分类">
                <el-select  placeholder="" v-model="form.categoryId">
                    <el-option v-for="item in data.category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="新闻标题">
                <el-input v-model="form.title" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="缩略图">
                <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig" />
            </el-form-item>

            <el-form-item label="发布日期">
                    <el-date-picker
                        v-model="form.dataTime"
                        type="date"
                        placeholder="选择日期"
                        disabled>
                    </el-date-picker>
            </el-form-item>

            <el-form-item label="详细内容">
                <template>
                    <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
                </template>
                
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit" :loading="data.submitLoading">保存</el-button>
            </el-form-item>
        </el-form>
</template>
<script>
import { ref, onMounted, reactive, onActivated } from '@vue/composition-api';
import { QiNiuToken } from "@/api/common"
import { AddInfo, GetList, EditInfo  } from "@/api/news";
import { timestampToTime } from "@/utils/common";
//组件
import UploadImg from "@c/UploadImg"
//富文本编辑器
import { quillEditor } from 'vue-quill-editor'


export default {
    name: "infoDetailed",
    components: {
        quillEditor, UploadImg
    },
    setup(props, { root }){
        //图片上传配置
        const uploadImgConfig = reactive({

        })
        const data = reactive({
            id: root.$route.params.id || root.$store.getters["infoDetailed/infoId"],
            category: [],
            editorOption: {},
            submitLoading: false
        })

        const form = reactive({
            categoryId: '',
            title: '',
            dataTime: '',
            content: '',
            imgUrl: ''
        });


        /**
         * 获取信息分类
         */
        const getInfoCategory = () => {
                 root.$store.dispatch("common/getInfoCategory").then(response => {
                 data.category = response.data.data;
                // console.log(response);
            })
        }
        /**
         * 获取当前id的信息
         */
        const getInfo = () => {
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: data.id
            }
            GetList(requestData).then(response => {
                let responseData = response.data.data.data[0];
                form.categoryId = responseData.category;
                form.title = responseData.title;
                form.content = responseData.content;
                form.dataTime = responseData.created_at ? responseData.created_at: timestampToTime(Date.parse(new Date())/1000);
                form.imgUrl = responseData.imgUrl;

            })
        }     
        const submit = () => {
            let requestData = {
                id: data.id,
                category: form.categoryId,
                title: form.title,
                content: form.content,
                imgUrl: form.imgUrl
            }
            data.submitLoading = true;
            EditInfo(requestData).then( response => {
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
          
                data.submitLoading = false;

            }).catch( error => {
                data.submitLoading = false;
            })
        }     
        

        onMounted( () => {
            getInfoCategory();
            console.log('mounte')
        })
        onActivated( () => {
            data.id = root.$route.params.id || root.$store.getters["infoDetailed/infoId"];
            getInfo();
            console.log('active')
        })

        return {
            data, form, submit, uploadImgConfig

        }
    }
}
</script>
<style  scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>