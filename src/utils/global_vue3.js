import { MessageBox } from 'element-ui';
import { ref } from '@vue/composition-api';
export function global(){
    const str = ref("");
    const confirm = (params) => {
        MessageBox.confirm(params.content, params.tip || '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type ||'warning',
            center: true
        }).then(() => {
            //确定
            params.fn && params.fn(params.id || "");
            // console.log(params.fn())
            
        }).catch(() => {
            //取消
            params.catchFn && params.catchFn();
            // root.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // });
        });
    }


    return {
        str, confirm
    }
}
