const axios = require('axios');
import appState from '../states/HqAppState'
import ReactDOM from 'react-dom';
import HqLoading from "../compontents/HqLoading";



// 显示loading
export const showLoading = () => {
    hideLoading();
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

export async function reqAuthToken(email,password){
    const data = {"login":email,password:password};

    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };

    const config = {headers};
    console.log('config:',config);
    const out = await axios.post('https://api2.letmespeak.pro/user/v2/auth',data,config);
    return out;
}
export async function decryptAuthToken(auth_token,loginToken){
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
    let loginTokenInfo;
    try {
        const account_email = email;
        let account_save = {
            token:'',
            expired_at:0
        };
        let savedToken = localStorage.getItem(account_email);
        if(savedToken){
            savedToken = JSON.parse(savedToken);
            account_save.token = savedToken.token;
            account_save.expired_at = savedToken.expired_at;
            console.log('savedToken:',savedToken);
        }
        let currentTime = new Date();
        currentTime = currentTime.getTime()/1000;
        if(currentTime > account_save.expired_at){
          
            const authLogin = await reqAuthToken(email,password);
            console.log('authLogin:',authLogin);
            const auth_token = authLogin.data.profiles[0].auth_token;
            const loginToken = authLogin.data.token;
            loginTokenInfo  = await decryptAuthToken(auth_token,loginToken);
            account_save.token = loginTokenInfo.data.token;
            account_save.expired_at = loginTokenInfo.data.expired_at;

            localStorage.setItem(email,JSON.stringify(account_save));
            console.log('saveToken：',account_save);

            console.log('loginTokenInfo:',loginTokenInfo);
        }else{
            console.log('加载本地token');
            loginTokenInfo = {
                data: account_save
            };
        }
        hideLoading();

    } catch (error) {
        hideLoading();

    }
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
    const url=  `https://api2.letmespeak.pro/lms/dialog/byOrder/${taskId}?v=2&newwordsets=true`
    console.log('data:',url);

    let out;
    try {
        out = await axios.post(url,config);
        // console.log('getTaskDetail:',out);
        hideLoading();
    } catch (error) {
        hideLoading();

    }
    return out;
}

export async function finishTask(taskId,game_id,x_auth_token){
    showLoading();
    const data = {"result":"3","id":taskId,"game_id":game_id};

    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    headers["x-auth-token-letmespeak"] = x_auth_token;
    const config = {
        headers,
    };
    console.log('finishTask-config:',config);
    console.log('finishTask-data:',data);

    const url=  'https://api2.letmespeak.pro/api/1.0/training/finish/dialogue';

    let out;
    try {
        out = await axios.post(url,data,config);
        // console.log('finishTask:',out);
        hideLoading();
    } catch (error) {
        hideLoading();
    }

    return out;
}

// 获取单词任务
export async function getWordTaskDetail(taskId){
    showLoading();
    const data = {"translationLanguageCode":"en","originalLanguageCode":"zh"};
    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
        "x-auth-token-letmespeak":appState.token,
    };
    const config = {headers};
    const url=  `https://api2.letmespeak.pro/lms/wordset/v2/get/${taskId}`
    console.log('url:',url);
    console.log('data:',data);
    console.log('config:',config);


    let out;
    try {
        out = await axios.post(url,data,config);
        console.log('getWordTaskDetail:',out);
        hideLoading();
    } catch (error) {
        hideLoading();

    }
    return out;
}
// wordIDs 数组json
export async function finishWordTask(game_id,errsCount,totalCount,wordIDs){
    showLoading();
    const data = {"game_id":game_id,"errors":errsCount,"total":totalCount,"wordIDs":wordIDs.toString()};

    const headers = { 
        "Content-Type": "application/json",
        // "x-client-id":'ios',
        "x-device-token-letmespeak":appState.deviceToken,
    };
    // headers["x-auth-token-letmespeak"] = x_auth_token;
    headers["x-auth-token-letmespeak"] = appState.token;

    const config = {
        headers,
    };
    console.log('finishTask-config:',config);
    console.log('finishTask-data:',data);

    const url=  'https://api2.letmespeak.pro/api/1.0/training/finish/wordset';

    let out;
    try {
        out = await axios.post(url,data,config);
        // console.log('finishTask:',out);
        hideLoading();
    } catch (error) {
        hideLoading();
    }

    return out;
}

function mockRequest(){
    return new Promise((resovle)=>{
        setTimeout(() => {
            resovle('data:mockRequest');
        }, 3000);
    });
}
export const reqMock = async function (){
  
    console.log('reqmock');
    showLoading();
    let data =  await mockRequest();
    console.log("result:",data);
    hideLoading();
   
}
