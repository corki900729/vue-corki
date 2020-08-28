import { reactive } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export function loadData(){
    const tableData = reactive({
        item: [],
        total: 0
    });
    const tableLoadData = (params) => {
        let requestJson = params;
        let requestData = {
            url: requestUrl[requestJson.url],
            method: params.method,
            data: params.data
        }
        loadTableData(requestData).then( response => {
            let responseData = response.data.data.data;
                tableData.item = responseData;
                tableData.total = responseData.length===0 ? 0 : response.data.data.total

        }).catch( error => {

        })
    }
    return {
        tableData, tableLoadData
    }
}