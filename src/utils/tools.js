// 写request请求方法
function myPro(options){
    return new Promise((resolve,reject)=>{
        wx.request({
          url:options.url || 'url', //开发者服务器接口地址",
          data:options.data || 'data', //请求的参数",
          method:options.method || 'GET',
          dataType:options.dataType || 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          success: resolve,
          fail: reject,
          complete: () => {}
        });
    })
}
// 接口基地址
const baseUrl = "https://autumnfish.cn/wx/"
// 把方法暴露出去
// 用ES6的
export default {
    myPro,
    baseUrl
}