const axios = require('axios');
import appState from '../states/HqAppState'
import ReactDOM from 'react-dom';
import HqLoading from "../compontents/HqLoading";



// 显示loading
export const showLoading = () => {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<HqLoading tip="请稍后 ..."/>, dom);

}

// 隐藏loading
export const hideLoading = () => {
    const lTag = document.getElementById('loading');
    if(lTag){
        console.log('remove');
        document.body.removeChild(lTag);
    }
};




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
async function decryptAuthToken(auth_token,loginToken){
    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
        "x-c-token-letmespeak":loginToken,
    };
    const data = {"token":headers['x-device-token-letmespeak'],auth_token:auth_token};
    console.log('decryptAuthToken:',data);
    const config = {headers};
    console.log('headers:',headers);
    const out = await axios.post('https://api2.letmespeak.pro/api/1.0/auth',data,config);
    return out;
}

export async function login(email,password){
    showLoading();
    const authLogin = await reqAuthToken(email,password);
    console.log('authLogin:',authLogin);
    const auth_token = authLogin.data.profiles[0].auth_token;
    const loginToken = authLogin.data.token;
    const loginTokenInfo  = await decryptAuthToken(auth_token,loginToken);
    console.log('loginTokenInfo:',loginTokenInfo);

    hideLoading();
    return loginTokenInfo;
}

export async function getTaskDetail(taskId){
    showLoading();
    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    const config = {headers};
    const url=  `https://api2.letmespeak.pro/lms/dialog/byOrder/${taskId}?v=1&newwordsets=true`
    const out = await axios.post(url,config);
    // console.log('getTaskDetail:',out);
    hideLoading();
    return out;
}

export async function finishTask(taskId,game_id,token){
    showLoading();
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
    hideLoading();
    return out;
}
