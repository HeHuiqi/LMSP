const hostname = 'api2.letmespeak.pro';
const axios = require('axios');
import appState from '../states/HqAppState'



// https://api2.letmespeak.pro/api/1.0/auth

// rRktTj9X0x2PKnUPbjEp3j+hTETEvSdPplA2yt8QsP
// dXntLvT9O8AIirRh1DujVoxSbMWQ5EcH

// 设备token 抓包获取，每个账户唯一个
const device_token_letmespeak = 'lPuSP3yzzrjumOtq';
const headers = { 
    "Content-Type": "application/json",
    // "x-client-id":'ios',
    "x-device-token-letmespeak":appState.deviceToken,
};

async function reqAuthToken(email,password){
    const data = {"login":email,password:password};
    const config = {headers};
    const out = await axios.post('https://api2.letmespeak.pro/user/v2/auth',data,config);
    return out;
}
async function decryptAuthToken(auth_token){
    const data = {"token":device_token_letmespeak,auth_token:auth_token};
    const config = {headers};
    const out = await axios.post('https://api2.letmespeak.pro/api/1.0/auth',data,config);
    return out;
}

export async function login(email,password){
    const authLogin = await reqAuthToken(email,password);
    console.log('authLogin:',authLogin);
    const auth_token = authLogin.data.profiles[0].auth_token;
    // console.log('authLogin:',auth_token);

    const loginTokenInfo  = await decryptAuthToken(auth_token);
    console.log('loginTokenInfo:',loginTokenInfo);
    return loginTokenInfo;
}

export async function getTaskDetail(taskId){

    const config = {headers};
    const url=  `https://api2.letmespeak.pro/lms/dialog/byOrder/${taskId}?v=1&newwordsets=true`
    const out = await axios.post(url,config);
    // console.log('getTaskDetail:',out);
    return out;
}

export async function finishTask(taskId,game_id,token){
    const data = {"result":"3","id":taskId,"game_id":game_id};
    let myHeaders = headers;
    myHeaders["x-auth-token-letmespeak"] = token;
    const config = {
        headers:myHeaders,
    };
    console.log('config:',config);
    const url=  'https://api2.letmespeak.pro/api/1.0/training/finish/dialogue'
    const out = await axios.post(url,data,config);
    console.log('finishTask:',out);
    return out;
}
