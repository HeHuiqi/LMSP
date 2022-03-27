
import HqInput from "./HqInput";
import HqDiv from './HqDiv';
import HqTextarea from './HqTextarea'

import appState from '../states/HqAppState'
import { useState } from "react";

import {login}  from '../HqUtils/HqNetUtils';

const device_token_letmespeak = 'lPuSP3yzzrjumOtq';

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
        console.log('ps:',password);
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
    return (
        <HqDiv>
            <HqInput inputName={'邮箱'} onInputChange={onInputChangeEmail}></HqInput>
            <HqInput inputName={'密码'} onInputChange={onInputChangePassword} isSecrutiyInput={true}></HqInput>
            <HqInput inputName={'DeviceToken'} onInputChange={onInputChangeDeviceToken} defaultValue={deviceToken}></HqInput>
            <button onClick={startLogin}>登录</button>
            <HqTextarea result={loginToken}></HqTextarea>
        </HqDiv>
    );
}
export default HqLogin;
