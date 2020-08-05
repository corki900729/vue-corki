import { MessageBox } from 'element-ui';
export default {
    install (Vue, option) {
        Vue.prototype.confirm = (params) => {
            MessageBox.confirm(params.content, params.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type ||'warning',
                center: true
            }).then(() => {
                console.log(params)
                params.fn && params.fn(params.id);
                // console.log(params.fn())
                
            }).catch(() => {
                // root.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        }
        
    }
}