const hostname = 'api2.letmespeak.pro';
const axios = require('axios');
import appState from '../states/HqAppState'



// https://api2.letmespeak.pro/api/1.0/auth

async function reqAuthToken(email,password){
    const data = {"login":email,password:password};

    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };

    const config = {headers};
    const out = await axios.post('https://api2.letmespeak.pro/user/v2/auth',data,config);
    return out;
}
async function decryptAuthToken(auth_token){
    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    const data = {"token":headers['x-device-token-letmespeak'],auth_token:auth_token};
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
    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    const config = {headers};
    const url=  `https://api2.letmespeak.pro/lms/dialog/byOrder/${taskId}?v=1&newwordsets=true`
    const out = await axios.post(url,config);
    // console.log('getTaskDetail:',out);
    return out;
}

export async function finishTask(taskId,game_id,token){
    const data = {"result":"3","id":taskId,"game_id":game_id};

    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    headers["x-auth-token-letmespeak"] = token;
    const config = {
        headers,
    };
    console.log('config:',config);
    const url=  'https://api2.letmespeak.pro/api/1.0/training/finish/dialogue'
    const out = await axios.post(url,data,config);
    console.log('finishTask:',out);
    return out;
}
