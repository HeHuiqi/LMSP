
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
        
        // test loading
        // const fun = isShow ? showLoading: hideLoading;
        // fun();
        // isShow = !isShow;

        if(email && password){
            // await login(email,password);
            // const myToken = 'DW5x3+cVjeQ9Ujxt7wIjiTBalYOGgosBiZoXUPsNVlmWptsmUjFTVtizKCUgW+pvqbo6bfwiNuXPykO8pPFjN7Mtw1h44OvpG7ZatLOOICGqktfy8kQDzlJ5iIxd5LQVzaseCg3Q265oXWYoVpzwwnHb0HssTuUNPUSyCP/wzyxbDOjx5MSJCKaGjIkNOInbS2jsva3aIuUSa8CSHI+qqtrJ+dFpzXNSvv2teALdso9GkZMx4zQTYNPNT42TkxcA9LTyiMWiocDLn8Xu4p7Nobh+vOBkrORBNJOCW5GMOlPjl4/2ShFOvXl174J7MQyis6HGKl7oFCT2p6Ru3JAFVnsQqgQecm7bKUdVtWV0qaLcIj27S9tqL6TtOHE9+Civ75e/IsisVLLrP0S8vpN9Ss/HLCyEJ4eRN+4aWKAxi7RZ4dIpsmU4QCO7UZpbl4JL2OkWpgkgQK7Xy8+aLr9Aj4p3zMb2tIuLwjFLEl0XCkAcZjSC9uFSosVqqJURQiggvSCtpFkVORMafe2lQbkzRzxxeJZSCvvLSIpbZPOn8AQ0D2IjHtwKWf4gFn+is1G73yX0c+EEgmAruKdXiGPe+fPdjR6siaAcA4YopXKAY/IiGMLGctsSLPDJLTY0RpOBDe1tLkKBrlij2XruE5q4cE7SapovOWGgcUq+ulb5z0CxY4K76F6OFoEP4sTwgYeocgedZmVe9q0aTje/BDhBDf4='
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
            <HqTextarea result={loginToken} isReadOnly={false}></HqTextarea>

        </HqDiv>
    );
}
export default HqLogin;
