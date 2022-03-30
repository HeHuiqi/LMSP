
import HqInput from "./HqInput";
import HqDiv from './HqDiv';
import HqTextarea from './HqTextarea'

import appState from '../states/HqAppState'
import { useState } from "react";
let account = {};
import {login,showLoading,hideLoading}  from '../HqUtils/HqNetUtils';

// 0DCPqVLTZwrexfXU
// 设备token 抓包获取，每个账户有一个在登录的即可请求头 'x-device-token-letmespeak' 字段中
let device_token_letmespeak = '0DCPqVLTZwrexfXU';
device_token_letmespeak = 'YbDdxHdzYDnsvhhz';
device_token_letmespeak = 'Z32PYUopSr1URpuV';

let isShow = 1;

function HqLogin(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginToken, setLoginToken] = useState('');
    const [deviceToken, setDeviceToken] = useState(device_token_letmespeak);
    appState.deviceToken = deviceToken;
    const onInputChangeEmail = (event)=>{
        setEmail(event.target.value);
    };
    const onInputChangePassword = (event)=>{
        setPassword(event.target.value);
    };
    const onInputChangeDeviceToken = (event)=>{
        const deviceToken = event.target.value;
        if(deviceToken){
            setDeviceToken(deviceToken);
            appState.deviceToken = deviceToken;
        }
    };

    const startLogin = async function(){
        console.log('email:',email);
        // console.log('ps:',password);

        if(email && password){
            // await login(email,password);
            const loginTokenInfo = await login(email,password);
            appState.token = loginTokenInfo.data.token;
            console.log('appState.token:',appState.token);
            setLoginToken(appState.token);
        }else{
            alert('请输入账户和密码')
        }
        
    }
    const clearLocalToken = async function(){
        let account_save = {
            token:'',
            expired_at:0
        };
        localStorage.setItem(email,JSON.stringify(account_save));
        alert('清除成功');
    }
    return (
        <HqDiv>
            <HqInput inputName={'邮箱'} onInputChange={onInputChangeEmail}></HqInput>
            <HqInput inputName={'密码'} onInputChange={onInputChangePassword} isSecrutiyInput={true}></HqInput>
            <HqInput inputName={'DeviceToken'} onInputChange={onInputChangeDeviceToken} defaultValue={deviceToken}></HqInput>
            <button onClick={startLogin}>登录</button>
            <button onClick={clearLocalToken}>清楚本地token</button>

            <HqTextarea result={loginToken} isReadOnly={false}></HqTextarea>

        </HqDiv>
    );
}
export default HqLogin;
