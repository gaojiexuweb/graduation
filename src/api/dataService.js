import axios from 'axios';
import CONFIG from './conf';

function doRequest(url, req, headers, param) {
  let h = headers ? headers : { 'Content-Type': 'application/json', 'BsmAjaxHeader': true }
  let r = req ? req : {}
  //return axios.post(CONFIG.baseUrl+"/login.do",obj,{'Content-Type': 'application/x-www-form-urlencoded','BsmAjaxHeader': true});
  return axios({
    url: url,
    method: 'POST',
    data: param ? $.param(r) : r,
    headers: h
  });
}

function doGetRequest(url, req, headers) {
  let h = headers ? headers : { 'Content-Type': 'application/json', 'BsmAjaxHeader': true }
  return axios.get(url, {
    params: req,
    headers: h
  })
}
export default {
  login(req){
    return doGetRequest('user/login',req)
  },
  register(req){
    return doGetRequest('user/register',req)
  },
  // 订单获取
  getOrder(req){
    return doGetRequest('order/getOrder',req)
  },
  // 处理订单  删除
  getOrderDelete(req){
    return doGetRequest('order/orderDelete',req)
  },
  // 车辆安排  查询
  getVehicleInformation(req){
    return doGetRequest('/vehicle/mange',req)
  },
  // 车辆安排  编辑
  getVehicleMangeUpdate(req){
    return doGetRequest('/vehicle/mangeUpdate',req)
  },
   // 车辆安排  删除
   getVehicleMangeDelete(req){
    return doGetRequest('/vehicle/mangeDelete',req)
  },
   // 车辆安排 新增
   getVehicleMangeAdd(req){
    return doGetRequest('/vehicle/mangeAdd',req)
  },

  // 车辆配置 查询
  getVehicleConfiguration(req){
    return doGetRequest('/vehicle/config',req)
  },
 // 车辆配置 编辑
  getVehicleConfigUpdate(req){
    return doGetRequest('/vehicle/configUpdate',req)
  },
  // 车辆配置 删除
  getVehicleConfigDelete(req){
    return doGetRequest('/vehicle/configDelete',req)
  },
  // 车辆配置 新增
  getVehicleConfigAdd(req){
    return doGetRequest('/vehicle/configAdd',req)
  },

  //价格获取  查询
  getPrice(req){
    return doGetRequest('/price/getPrice',req)
  },
  // 新增价格
  getPriceAdd(req){
    return doGetRequest('/price/add',req)
  },
  // 编辑价格
  getPriceUpdate(req){
    return doGetRequest('/price/update',req)
  },
  // 删除价格
  getPriceDelete(req){
    return doGetRequest('/price/delete',req)
  },

  // 线路查询
  getLine(req){
    return doGetRequest('/price/line',req)
  },
  // 车辆查询
  getVNumber(req){
    return doGetRequest('/price/vNumber',req)
  },
  // 负责人查询
  getResponse(req){
    return doGetRequest('/price/response',req)
  },
  // 号码查询
  getPhone(req){
    return doGetRequest('/price/phone',req)
  },
  // 订单发货
  getGoods(req){
    return doGetRequest('/price/goods',req)
  }
}
