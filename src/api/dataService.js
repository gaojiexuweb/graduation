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
  getOrder(req){
    return doGetRequest('order/getOrder',req)
  },
  getVehicleInformation(req){
    return doGetRequest('/vehicle/information',req)
  },
  getVehicleConfiguration(req){
    return doGetRequest('/vehicle/configuration',req)
  },
  //价格
  getPrice(req){
    return doGetRequest('/price/getPrice',req)
  },
  getPriceAdd(req){
    return doGetRequest('/price/add',req)
  },
  getPriceUpdate(req){
    return doGetRequest('/price/update',req)
  }
}
